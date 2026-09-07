<template>
  <header class="app-header">
    <div class="app-header__inner">
      <NuxtLink
        to="/"
        class="app-header__brand"
        aria-label="Gerenciador de Projetos - página inicial"
      >
        <img
          src="/logo.svg"
          alt="Gerenciador de Projetos"
          width="193"
          height="72"
        >
      </NuxtLink>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 30;
  height: var(--header-height);
  background-color: var(--color-header);
  box-shadow: var(--shadow-md);
}

.app-header__inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 64px;
}

.app-header__brand {
  display: flex;
  border-radius: var(--radius-sm);
}

.app-header__brand:focus-visible {
  outline-color: var(--color-white);
}
</style>
