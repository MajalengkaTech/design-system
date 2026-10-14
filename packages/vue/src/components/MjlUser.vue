<script setup lang="ts">
import MjlAvatar from './MjlAvatar.vue';

export interface MjlUserProps {
	name: string;
	/** Jabatan, NIP, atau keterangan singkat. */
	description?: string;
	avatarSrc?: string;
	avatarSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

withDefaults(defineProps<MjlUserProps>(), {
	description: undefined,
	avatarSrc: undefined,
	avatarSize: 'md',
});
</script>

<template>
	<div class="mjl-user">
		<MjlAvatar
			:src="avatarSrc"
			:name="name"
			:size="avatarSize"
			decorative
		/>
		<div class="mjl-user__content">
			<span class="mjl-user__name">{{ name }}</span>
			<span
				v-if="description"
				class="mjl-user__desc"
			>{{ description }}</span>
		</div>
	</div>
</template>
