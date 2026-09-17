<script setup lang="ts">
export interface MjlFooterColumn {
	heading: string;
	links: { label: string; href: string }[];
}

export interface MjlFooterProps {
	columns?: MjlFooterColumn[];
}

withDefaults(defineProps<MjlFooterProps>(), {
	columns: () => [],
});
</script>

<template>
	<footer class="mjl-footer">
		<div class="mjl-footer__grid">
			<slot>
				<div
					v-for="col in columns"
					:key="col.heading"
				>
					<p class="mjl-footer__heading">{{ col.heading }}</p>
					<ul class="mjl-footer__list">
						<li
							v-for="link in col.links"
							:key="link.href"
						>
							<a :href="link.href">{{ link.label }}</a>
						</li>
					</ul>
				</div>
			</slot>
		</div>

		<div
			v-if="$slots.bottom"
			class="mjl-footer__bottom"
		>
			<slot name="bottom" />
		</div>
	</footer>
</template>
