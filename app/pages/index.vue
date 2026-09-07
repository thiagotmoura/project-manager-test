<script setup lang="ts">
import type { Project } from '~/types/project'

useHead({ title: 'Projetos' })

const projectsStore = useProjectsStore()

const projectToRemove = ref<Project | null>(null)

const projects = computed(() => projectsStore.visibleProjects)

function goToEdit(id: string) {
  return navigateTo(`/project/${id}/edit`)
}

function confirmRemove() {
  if (projectToRemove.value) projectsStore.remove(projectToRemove.value.id)
  projectToRemove.value = null
}
</script>

<template>
  <div class="projects-page">
    <EmptyState v-if="!projects.length" />

    <template v-else>
      <ProjectsToolbar
        v-model:favorites-only="projectsStore.favoritesOnly"
        v-model:sort-by="projectsStore.sortBy"
        :total="projectsStore.total"
      />

      <ul
        class="projects-grid"
        aria-label="Lista de projetos"
      >
        <li
          v-for="project in projects"
          :key="project.id"
        >
          <ProjectCard
            :project="project"
            @toggle-favorite="projectsStore.toggleFavorite"
            @edit="goToEdit"
            @remove="projectToRemove = $event"
          />
        </li>
      </ul>
    </template>

    <ConfirmRemoveModal
      :open="projectToRemove !== null"
      :project-name="projectToRemove?.name ?? ''"
      @cancel="projectToRemove = null"
      @confirm="confirmRemove"
    />
  </div>
</template>

<style scoped>
.projects-page {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--card-width)), 1fr));
  gap: 32px;
  margin-top: 24px;
}

.projects-page__empty {
  margin-top: 24px;
}
</style>
