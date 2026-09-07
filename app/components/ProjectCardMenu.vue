<script setup lang="ts">
const emit = defineEmits<{
  edit: []
  remove: []
}>()

const isOpen = ref(false)

function select(action: 'edit' | 'remove') {
  isOpen.value = false
  if (action === 'edit') emit('edit')
  else emit('remove')
}
</script>

<template>
  <div
    ref="root"
    class="card-menu"
    @keydown.esc="isOpen = false"
  >
    <button
      type="button"
      class="card-menu__trigger"
      aria-haspopup="menu"
      :aria-expanded="isOpen"
      aria-label="Opções do projeto"
      @click="isOpen = !isOpen"
    >
      <IconEllipsis />
    </button>

    <ul
      v-if="isOpen"
      class="card-menu__list"
      role="menu"
    >
      <li role="none">
        <button
          type="button"
          role="menuitem"
          class="card-menu__item"
          @click="select('edit')"
        >
          <IconEdit />
          Editar
        </button>
      </li>
      <li role="none">
        <button
          type="button"
          role="menuitem"
          class="card-menu__item"
          @click="select('remove')"
        >
          <IconTrash />
          Remover
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.card-menu {
  position: relative;
}

.card-menu__trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--color-white);
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
  transition: background-color 0.15s ease;
}

.card-menu__trigger:hover {
  background-color: var(--color-bg);
}

.card-menu__list {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  z-index: 10;
  min-width: 180px;
  border-radius: var(--radius-md);
  background-color: var(--color-white);
  box-shadow: var(--shadow-md);
}

/* Seta apontando para o botão */
.card-menu__list::before {
  content: '';
  position: absolute;
  top: -8px;
  right: 12px;
  border-right: 6px solid transparent;
  border-bottom: 9px solid var(--color-white);
  border-left: 6px solid transparent;
}

.card-menu__item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 14px 20px;
  font-size: 16px;
  line-height: 16px;
  color: var(--color-primary);
  text-align: left;
  white-space: nowrap;
  transition: background-color 0.15s ease;
}

.card-menu__item:hover {
  background-color: var(--color-bg);
}

.card-menu__list li:first-child .card-menu__item {
  border-bottom: 1px solid var(--color-bg);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
}

.card-menu__list li:last-child .card-menu__item {
  border-radius: 0 0 var(--radius-md) var(--radius-md);
}
</style>
