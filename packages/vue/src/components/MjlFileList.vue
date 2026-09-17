<script setup lang="ts">
export interface MjlFileItem {
	name: string;
	size: string;
	date?: string;
}

export interface MjlFileListProps {
	files: MjlFileItem[];
}

defineProps<MjlFileListProps>();
</script>

<template>
	<ul class="mjl-file-list">
		<li
			v-for="(file, i) in files"
			:key="i"
			class="mjl-file-list__item"
		>
			<span
				class="mjl-file-list__icon"
				aria-hidden="true"
			>
				<slot
					name="icon"
					:file="file"
				>📄</slot>
			</span>
			<span class="mjl-file-list__info">
				<span class="mjl-file-list__name">{{ file.name }}</span>
				<span class="mjl-file-list__meta">{{ file.size }}<template v-if="file.date"> · {{ file.date }}</template></span>
			</span>
			<slot
				name="actions"
				:file="file"
			/>
		</li>
	</ul>
</template>
