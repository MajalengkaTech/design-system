<script setup lang="ts">
import { ref } from 'vue';

export interface ComponentDemoProps {
	title?: string;
	code?: string;
}

defineProps<ComponentDemoProps>();
const activeTab = ref<'preview' | 'code'>('preview');
</script>

<template>
	<div class="my-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
		<div class="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-950/50">
			<span class="text-xs font-bold text-slate-700 dark:text-slate-300">
				{{ title || 'Contoh Komponen' }}
			</span>
			<div class="flex items-center gap-1 rounded-lg bg-slate-200/60 p-0.5 text-xs dark:bg-slate-800">
				<button
					type="button"
					class="rounded-md px-2.5 py-1 font-semibold transition"
					:class="activeTab === 'preview' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'"
					@click="activeTab = 'preview'"
				>
					Pratinjau
				</button>
				<button
					v-if="code || $slots.code"
					type="button"
					class="rounded-md px-2.5 py-1 font-semibold transition"
					:class="activeTab === 'code' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'"
					@click="activeTab = 'code'"
				>
					Kode
				</button>
			</div>
		</div>

		<div v-show="activeTab === 'preview'" class="p-6">
			<slot />
		</div>

		<div v-if="(code || $slots.code) && activeTab === 'code'" class="bg-slate-950 p-4 text-xs font-mono text-slate-200 overflow-x-auto">
			<slot name="code">
				<pre><code>{{ code }}</code></pre>
			</slot>
		</div>
	</div>
</template>
