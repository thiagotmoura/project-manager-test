<script setup lang="ts">
import { splitHighlight } from '~/utils/text'

const props = withDefaults(defineProps<{
  text: string
  term?: string
}>(), {
  term: '',
})

const segments = computed(() => splitHighlight(props.text, props.term))
</script>

<template>
  <span>
    <template
      v-for="(segment, index) in segments"
      :key="index"
    >
      <mark
        v-if="segment.highlight"
        class="highlight"
      >{{ segment.text }}</mark>
      <template v-else>{{ segment.text }}</template>
    </template>
  </span>
</template>
