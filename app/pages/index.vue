<script setup lang="ts">
const projectsStore = useProjectsStore()

const projects = computed(() => projectsStore.visibleProjects)
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
          />
        </li>
      </ul>
    </template>
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
