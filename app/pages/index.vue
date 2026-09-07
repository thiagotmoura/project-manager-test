<template>
  <div class="projects-page">
    <EmptyState />
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
