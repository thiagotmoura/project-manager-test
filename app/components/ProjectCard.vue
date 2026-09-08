<script setup lang="ts">
import type { Project } from '~/types/project'

const props = withDefaults(defineProps<{
  project: Project
  searchTerm?: string
}>(), {
  searchTerm: '',
})

const emit = defineEmits<{
  'toggle-favorite': [id: string]
  'edit': [id: string]
  'remove': [project: Project]
}>()

const coverSrc = computed(() => props.project.coverImage || '/cover-placeholder.png')

const favoriteLabel = computed(() =>
  props.project.favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos',
)
</script>

<template>
  <article
    class="project-card"
    :aria-label="project.name"
  >
    <div class="project-card__cover">
      <img
        :src="coverSrc"
        :alt="project.coverImage ? `Capa do projeto ${project.name}` : ''"
        class="project-card__image"
        loading="lazy"
      >

      <div class="project-card__actions">
        <button
          type="button"
          class="project-card__favorite"
          :aria-pressed="project.favorite"
          :aria-label="favoriteLabel"
          @click="emit('toggle-favorite', project.id)"
        >
          <IconStar :filled="project.favorite" />
        </button>

        <ProjectCardMenu
          @edit="emit('edit', project.id)"
          @remove="emit('remove', project)"
        />
      </div>
    </div>

    <div class="project-card__body">
      <h2 class="project-card__name">
        <HighlightText
          :text="project.name"
          :term="searchTerm"
        />
      </h2>

      <p class="project-card__client">
        <strong>Cliente:</strong> {{ project.client }}
      </p>

      <hr class="project-card__divider">

      <ul class="project-card__dates">
        <li>
          <IconCalendarDay />
          <span><span class="sr-only">Início: </span>{{ formatLongDate(project.startDate) }}</span>
        </li>
        <li>
          <IconCalendarCheck />
          <span><span class="sr-only">Término: </span>{{ formatLongDate(project.endDate) }}</span>
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 346px;
  height: 430px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background-color: var(--color-white);
}

.project-card__cover {
  position: relative;
  height: 232px;
  border-radius: 15px 15px 0 0;
  background-color: var(--color-primary);
}

.project-card__image {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-fit: cover;
}

.project-card__actions {
  position: absolute;
  right: 16px;
  bottom: 16px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.project-card__favorite {
  display: flex;
  border-radius: 50%;
  filter: drop-shadow(0 4px 2px rgba(0, 0, 0, 0.25));
  transition: transform 0.15s ease;
}

.project-card__favorite:hover {
  transform: scale(1.08);
}

.project-card__favorite:focus-visible {
  outline-color: var(--color-white);
}

.project-card__body {
  padding: 24px;
}

.project-card__name {
  font-size: 20px;
  font-weight: 700;
  line-height: 25px;
  color: var(--color-primary-dark);
  overflow-wrap: anywhere;
}

.project-card__client {
  margin-top: 5px;
  font-size: 16px;
  line-height: 20px;
  color: var(--color-text);
  overflow-wrap: anywhere;
}

.project-card__client strong {
  font-weight: 700;
}

.project-card__divider {
  margin: 16px 0;
  border: 0;
  border-top: 1px solid var(--color-divider);
}

.project-card__dates {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.project-card__dates li {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 16px;
  line-height: 20px;
  color: var(--color-text);
}

.project-card__dates svg {
  flex-shrink: 0;
}
</style>
