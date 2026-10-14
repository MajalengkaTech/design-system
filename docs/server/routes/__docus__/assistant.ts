import type { H3Event } from 'h3'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { queryCollection } from '@nuxt/content/server'
import { convertToModelMessages, isStepCount, smoothStream, streamText, tool } from 'ai'
import { z } from 'zod'

/**
 * Endpoint AI assistant Docus (menggantikan bawaan karena path-nya sama
 * dengan `docus.assistant.apiPath`).
 *
 * Model:
 * - GOOGLE_GENERATIVE_AI_API_KEY diset → Gemini API langsung (`geminiModel`).
 * - Tidak ada, tapi AI_GATEWAY_API_KEY ada → Vercel AI Gateway.
 *
 * Tool pencarian dokumentasi ditulis di sini, bukan memakai MCP server Docus:
 * tool MCP Docus memanggil useEvent(), yang di Cloudflare Workers butuh
 * AsyncLocalStorage asli (nodejs_compat). Mengaktifkannya justru memecah render
 * halaman Nuxt, jadi tool di bawah memakai `event` request ini secara langsung.
 */

const MAX_STEPS = 8

function pageUrl(event: H3Event, path: string) {
  return new URL(path, getRequestURL(event).origin).toString()
}

function docsTools(event: H3Event) {
  return {
    'list-pages': tool({
      description: 'Daftar semua halaman dokumentasi (judul, path, deskripsi, url). Pakai untuk mencari halaman yang relevan sebelum membacanya dengan get-page.',
      inputSchema: z.object({}),
      execute: async () => {
        const pages = await queryCollection(event, 'docs')
          .where('path', 'NOT LIKE', '%.navigation')
          .select('title', 'path', 'description')
          .all()
        return pages.map(p => ({ ...p, url: pageUrl(event, p.path) }))
      },
    }),
    'get-page': tool({
      description: 'Baca isi lengkap (markdown) satu halaman dokumentasi berdasarkan path, mis. "/dokumentasi/memulai/instalasi".',
      inputSchema: z.object({
        path: z.string().describe('Path halaman dari list-pages, diawali "/"'),
      }),
      execute: async ({ path }) => {
        const page = await queryCollection(event, 'docs')
          .where('path', '=', path)
          .select('title', 'path', 'description')
          .first()
        if (!page) return { error: `Halaman ${path} tidak ditemukan. Gunakan list-pages untuk melihat path yang tersedia.` }
        const content = await event.$fetch<string>(`/raw${path}.md`)
        return { ...page, content, url: pageUrl(event, page.path) }
      },
    }),
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const { messages } = await readBody(event)

  let model
  if (config.googleApiKey) {
    model = createGoogleGenerativeAI({ apiKey: config.googleApiKey })(config.geminiModel)
  }
  else if (config.aiGatewayApiKey) {
    // String "provider/model" diresolusi AI SDK lewat Vercel AI Gateway.
    model = config.assistant.model
  }
  else {
    throw createError({
      statusCode: 503,
      statusMessage: 'AI assistant belum dikonfigurasi: set GOOGLE_GENERATIVE_AI_API_KEY (atau AI_GATEWAY_API_KEY).',
    })
  }

  const abortController = new AbortController()
  event.node.req.on('close', () => abortController.abort())

  return createAssistantResponse(streamText({
    model,
    instructions: `${getAssistantSystemPrompt(event)}

**Bahasa:** Jawab dalam Bahasa Indonesia, kecuali pengguna bertanya dalam bahasa lain.`,
    messages: await convertToModelMessages(messages),
    tools: docsTools(event),
    abortSignal: abortController.signal,
    maxOutputTokens: 8000,
    maxRetries: 2,
    stopWhen: isStepCount(MAX_STEPS),
    prepareStep: ({ stepNumber }) => (stepNumber >= MAX_STEPS - 1 ? { toolChoice: 'none' } : {}),
    experimental_transform: smoothStream(),
    onError: ({ error }) => console.error('[assistant] error:', error),
  }))
})
