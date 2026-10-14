import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { convertToModelMessages, streamText } from 'ai'

/**
 * Endpoint AI assistant Docus, memakai Gemini API (Google AI Studio) secara langsung.
 *
 * Docus otomatis mengalah ke route ini karena path-nya sama dengan
 * `docus.assistant.apiPath` (default `/__docus__/assistant`).
 *
 * - Ada GOOGLE_GENERATIVE_AI_API_KEY → panggil Gemini langsung (model: `geminiModel`).
 * - Tidak ada, tapi ada AI_GATEWAY_API_KEY → tetap lewat Vercel AI Gateway seperti sebelumnya.
 */
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

  return createAssistantResponse(streamText({
    ...await getAssistantDefaultOptions(event),
    model,
    messages: await convertToModelMessages(messages),
  }))
})
