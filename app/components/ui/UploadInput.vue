<script setup lang="ts">
import { fileToDataUrl, IMAGE_MESSAGES, isAcceptedImage } from '~/utils/image'

defineProps<{
  label: string
}>()

const model = defineModel<string | null>({ default: null })

const fileInput = ref<HTMLInputElement | null>(null)
const errorMessage = ref('')
const isProcessing = ref(false)
const isDragging = ref(false)

function openPicker() {
  fileInput.value?.click()
}

async function handleFile(file: File | undefined) {
  if (!file) return

  errorMessage.value = ''
  if (!isAcceptedImage(file)) {
    errorMessage.value = IMAGE_MESSAGES.invalidType
    return
  }

  isProcessing.value = true
  try {
    model.value = await fileToDataUrl(file)
  }
  catch (error) {
    errorMessage.value = error instanceof Error ? error.message : IMAGE_MESSAGES.readError
  }
  finally {
    isProcessing.value = false
    if (fileInput.value) fileInput.value.value = ''
  }
}

function onChange(event: Event) {
  const input = event.target as HTMLInputElement
  void handleFile(input.files?.[0])
}

function onDrop(event: DragEvent) {
  isDragging.value = false
  void handleFile(event.dataTransfer?.files?.[0])
}

function remove() {
  model.value = null
  errorMessage.value = ''
}
</script>

<template>
  <div class="upload">
    <span class="form-label">{{ label }}</span>

    <div
      v-if="model"
      class="upload__preview"
    >
      <img
        :src="model"
        alt="Pré-visualização da capa do projeto"
        class="upload__image"
      >
      <button
        type="button"
        class="upload__remove"
        aria-label="Remover imagem de capa"
        @click="remove"
      >
        <IconTrash
          width="20"
          height="20"
        />
      </button>
    </div>

    <div
      v-else
      class="upload__dropzone"
      :class="{ 'upload__dropzone--active': isDragging }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
    >
      <IconUpload class="upload__icon" />
      <p class="upload__text">
        Escolha uma imagem .jpg ou .png no seu dispositivo
      </p>
      <BaseButton
        variant="secondary"
        size="md"
        class="upload__button"
        :disabled="isProcessing"
        @click="openPicker"
      >
        {{ isProcessing ? 'Carregando...' : 'Selecionar' }}
      </BaseButton>
      <input
        ref="fileInput"
        type="file"
        accept="image/png,image/jpeg"
        class="upload__input"
        tabindex="-1"
        aria-hidden="true"
        @change="onChange"
      >
    </div>

    <p
      v-if="errorMessage"
      class="form-error"
      role="alert"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
.upload {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.upload__dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  border: 1px dashed var(--color-text);
  border-radius: var(--radius-sm);
  text-align: center;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

.upload__dropzone--active {
  border-color: var(--color-primary);
  background-color: rgba(105, 92, 205, 0.06);
}

.upload__icon {
  color: var(--color-text);
}

.upload__text {
  margin: 16px 0 24px;
  font-size: 16px;
  line-height: 22px;
  color: var(--color-text);
}

.upload__button {
  min-width: 144px;
}

.upload__input {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.upload__preview {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  aspect-ratio: 702 / 395;
  background-color: var(--color-divider);
}

.upload__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload__remove {
  position: absolute;
  top: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--color-white);
  color: var(--color-primary);
  box-shadow: var(--shadow-md);
  transition: background-color 0.15s ease;
}

.upload__remove:hover {
  background-color: var(--color-bg);
}
</style>
