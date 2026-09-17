<script setup lang="ts">
export interface TableColumn {
	key: string;
	label: string;
	numeric?: boolean;
}

export interface MjlTableProps {
	columns: TableColumn[];
	rows: Record<string, any>[];
	caption?: string;
	responsive?: boolean;
}

withDefaults(defineProps<MjlTableProps>(), {
	caption: undefined,
	responsive: true,
});
</script>

<template>
	<div class="mjl-table-wrapper">
		<table
			:class="[
				'mjl-table',
				{ 'mjl-table--responsive': responsive },
			]"
		>
			<caption v-if="caption">
				{{ caption }}
			</caption>
			<thead>
				<tr>
					<th
						v-for="col in columns"
						:key="col.key"
						scope="col"
						:class="{ 'mjl-num': col.numeric }"
					>
						{{ col.label }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(row, rIndex) in rows"
					:key="rIndex"
				>
					<td
						v-for="col in columns"
						:key="col.key"
						:data-label="col.label"
						:class="{ 'mjl-num': col.numeric }"
					>
						<slot
							:name="`cell-${col.key}`"
							:row="row"
							:value="row[col.key]"
						>
							{{ row[col.key] }}
						</slot>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
