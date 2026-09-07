<template>
  <div class="app-shell">
    <AppHeader />
    <main class="app-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-main {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: var(--page-padding-y) var(--page-padding-x);
}
</style>
