<script setup lang="ts">
import type { Project } from '~/types/project'

const projectsMock: Project[] = [{
  id: "123",
  name: "Projeto 01",
  client: "Clicksign",
  startDate: "01 de setembro de 2024",
  endDate: "12 de dezembro de 2024",
  coverImage: "/cover-placeholder.png",
  favorite: false,
  createdAt: "",
  updatedAt: "",
}]
</script>

<template>
  <div class="projects-page">
    <EmptyState v-if="!projectsMock.length" />

    <template v-else>
      <ul
        class="projects-grid"
        aria-label="Lista de projetos"
        >
        <li
        v-for="project in projectsMock"
        :key="project.id"
        >
        <ProjectCard
        :project="project"
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
