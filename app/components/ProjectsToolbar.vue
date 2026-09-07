<script setup lang="ts">
import type { SortOption } from '~/types/project'
import { SORT_OPTIONS } from '~/utils/projects'

defineProps<{
  total: number
}>()

const favoritesOnly = defineModel<boolean>('favoritesOnly', { default: false })
const sortBy = defineModel<SortOption>('sortBy', { default: 'alphabetical' })
</script>

<template>
  <div class="toolbar">
    <h1 class="toolbar__title page-title">
      Projetos
      <span class="toolbar__count">({{ total }})</span>
    </h1>

    <div class="toolbar__controls">
      <BaseToggle
        v-model="favoritesOnly"
        label="Apenas favoritos"
      />

      <BaseSelect
        v-model="sortBy"
        :options="SORT_OPTIONS"
        aria-label="Ordenar projetos"
        class="toolbar__sort"
      />

      <BaseButton
        to="/project/new"
        size="md"
      >
        <IconPlusCircle />
        Novo projeto
      </BaseButton>
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px 32px;
}

.toolbar__title {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.toolbar__count {
  font-size: 17px;
  font-weight: 400;
  line-height: 21px;
  color: var(--color-primary);
}

.toolbar__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 32px;
}

@media (max-width: 768px) {
  .toolbar__controls {
    width: 100%;
  }

  .toolbar__sort {
    width: 100%;
  }
}
</style>
