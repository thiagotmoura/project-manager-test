<script setup lang="ts">
const props = defineProps<{
  open: boolean
  projectName: string
}>()

const emit = defineEmits<{
  cancel: []
  confirm: []
}>()

const dialog = ref<HTMLElement | null>(null)
const isOpen = computed(() => props.open)

watch(isOpen, async (value) => {
  if (!value) return
  await nextTick()
  dialog.value?.focus()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="modal"
        @keydown.esc.prevent="emit('cancel')"
      >
        <div
          class="modal__backdrop"
          @click="emit('cancel')"
        />

        <div
          ref="dialog"
          class="modal__dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="remove-modal-title"
          aria-describedby="remove-modal-description"
          tabindex="-1"
        >
          <span
            class="modal__icon"
            aria-hidden="true"
          >
            <IconTrash
              width="20"
              height="20"
            />
          </span>

          <h2
            id="remove-modal-title"
            class="modal__title"
          >
            Remover projeto
          </h2>

          <hr class="modal__divider">

          <p
            id="remove-modal-description"
            class="modal__text"
          >
            Essa ação removerá definitivamente o projeto:
          </p>
          <p class="modal__name">
            {{ projectName }}
          </p>

          <div class="modal__actions">
            <BaseButton
              variant="secondary"
              @click="emit('cancel')"
            >
              Cancelar
            </BaseButton>
            <BaseButton @click="emit('confirm')">
              Confirmar
            </BaseButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px 24px;
}

.modal__backdrop {
  position: absolute;
  inset: 0;
  background-color: var(--color-overlay);
  backdrop-filter: blur(5px);
}

.modal__dialog {
  position: relative;
  width: 100%;
  max-width: 582px;
  padding: 48px 32px 32px;
  border-radius: var(--radius-md);
  background-color: var(--color-white);
  box-shadow: var(--shadow-md);
  text-align: center;
}

.modal__dialog:focus {
  outline: none;
}

.modal__icon {
  position: absolute;
  top: -32px;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: var(--color-white);
  box-shadow: var(--shadow-md);
  transform: translateX(-50%);
}

.modal__title {
  font-size: 22px;
  font-weight: 600;
  line-height: 32px;
  color: var(--color-primary-dark);
}

.modal__divider {
  margin: 24px 0 0;
  border: 0;
  border-top: 1px solid var(--color-divider-strong);
}

.modal__text {
  margin-top: 34px;
  font-size: 16px;
  line-height: 22px;
  color: var(--color-text);
}

.modal__name {
  margin-top: 13px;
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  color: var(--color-text-dark);
  overflow-wrap: anywhere;
}

.modal__actions {
  display: flex;
  gap: 32px;
  margin-top: 32px;
}

.modal__actions > * {
  flex: 1;
}

@media (max-width: 600px) {
  .modal__dialog {
    padding: 48px 20px 24px;
  }

  .modal__actions {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
