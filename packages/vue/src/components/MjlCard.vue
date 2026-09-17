<script setup lang="ts">
export interface MjlCardProps {
	title?: string;
	desc?: string;
	interactive?: boolean;
	href?: string;
	as?: string;
}

const props = withDefaults(defineProps<MjlCardProps>(), {
	title: undefined,
	desc: undefined,
	interactive: false,
	href: undefined,
	as: 'div',
});
</script>

<template>
	<component
		:is="props.href ? 'a' : props.as"
		:href="props.href"
		:class="[
			'mjl-card',
			{ 'mjl-card--interactive': props.interactive || !!props.href },
		]"
	>
		<div
			v-if="title || desc || $slots.header"
			class="mjl-card__header"
		>
			<slot name="header">
				<h3
					v-if="title"
					class="mjl-card__title"
				>
					{{ title }}
				</h3>
				<p
					v-if="desc"
					class="mjl-card__desc"
				>
					{{ desc }}
				</p>
			</slot>
		</div>

		<div class="mjl-card__body">
			<slot />
		</div>

		<div
			v-if="$slots.footer"
			class="mjl-card__footer"
		>
			<slot name="footer" />
		</div>
	</component>
</template>
