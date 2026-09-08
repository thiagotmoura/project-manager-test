<template>
  <section
    class="empty-state"
    aria-labelledby="empty-state-title"
  >
    <h1
      id="empty-state-title"
      class="page-title"
    >
      Nenhum projeto
    </h1>

    <p class="empty-state__text">
      Clique no botão abaixo para criar o primeiro e gerenciá-lo.
    </p>

    <BaseButton to="/project/new">
      <IconPlusCircle />
      Novo projeto
    </BaseButton>
  </section>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--header-height) - var(--page-padding-y) * 2);
  padding: 24px;
  border-radius: var(--radius-sm);
  background-color: var(--color-white);
  text-align: center;
}

.empty-state__text {
  margin: 24px 0 32px;
  font-size: 16px;
  line-height: 22px;
  color: var(--color-text);
}
</style>
