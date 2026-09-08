<script setup lang="ts">
const search = useSearchStore()
const route = useRoute()

const showSearch = computed(() => route.path === '/')
</script>

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

      <button
        v-if="showSearch"
        type="button"
        class="app-header__search"
        aria-label="Buscar projetos"
        @click="search.open()"
      >
        <IconSearch />
      </button>
    </div>

    <Transition name="fade">
      <SearchBar
        v-if="showSearch && search.isOpen"
        @close="search.close()"
      />
    </Transition>
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

.app-header__search {
  position: absolute;
  top: 50%;
  right: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: var(--color-white);
  transform: translateY(-50%);
  transition: background-color 0.15s ease;
}

.app-header__search:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.app-header__search:focus-visible {
  outline-color: var(--color-white);
}

@media (max-width: 768px) {
  .app-header__inner {
    padding: 0 24px;
  }

  .app-header__search {
    right: 24px;
  }
}
</style>
