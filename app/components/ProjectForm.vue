<script setup lang="ts">
import type { ProjectInput } from '~/types/project'
import { validateProject } from '~/utils/validation'

type FieldName = keyof ProjectInput

const props = withDefaults(defineProps<{
  initialValues?: Partial<ProjectInput>
  submitLabel?: string
  saving?: boolean
  submitError?: string
}>(), {
  initialValues: () => ({}),
  submitLabel: 'Salvar projeto',
  saving: false,
  submitError: '',
})

const emit = defineEmits<{
  submit: [values: ProjectInput]
}>()

const values = reactive<ProjectInput>({
  name: '',
  client: '',
  startDate: '',
  endDate: '',
  coverImage: null,
  ...props.initialValues,
})

const touched = reactive<Partial<Record<FieldName, boolean>>>({})
const submitAttempted = ref(false)

const errors = computed(() => validateProject(values))

const hasRequiredValues = computed(() =>
  values.name.trim() !== ''
  && values.client.trim() !== ''
  && values.startDate !== ''
  && values.endDate !== '',
)

const canSubmit = computed(() => hasRequiredValues.value && !props.saving)

function touch(field: FieldName) {
  touched[field] = true
}

function errorFor(field: FieldName): string {
  if (!touched[field] && !submitAttempted.value) return ''
  return errors.value[field] ?? ''
}

function onSubmit() {
  submitAttempted.value = true
  if (Object.keys(errors.value).length) return
  emit('submit', { ...values })
}
</script>

<template>
  <form
    class="project-form"
    novalidate
    @submit.prevent="onSubmit"
  >
    <BaseInput
      id="project-name"
      v-model="values.name"
      label="Nome do projeto"
      required
      :error="errorFor('name')"
      @blur="touch('name')"
    />

    <BaseInput
      id="project-client"
      v-model="values.client"
      label="Cliente"
      required
      :error="errorFor('client')"
      @blur="touch('client')"
    />

    <div class="project-form__row">
      <BaseInput
        id="project-start-date"
        v-model="values.startDate"
        type="date"
        label="Data de início"
        required
        :error="errorFor('startDate')"
        @blur="touch('startDate')"
      >
        <template #icon>
          <IconCalendarDay />
        </template>
      </BaseInput>

      <BaseInput
        id="project-end-date"
        v-model="values.endDate"
        type="date"
        label="Data final"
        required
        :min="values.startDate || undefined"
        :error="errorFor('endDate')"
        @blur="touch('endDate')"
      >
        <template #icon>
          <IconCalendarCheck />
        </template>
      </BaseInput>
    </div>

    <UploadInput
      v-model="values.coverImage"
      label="Capa do projeto"
    />

    <p
      v-if="submitError"
      class="form-error project-form__submit-error"
      role="alert"
    >
      {{ submitError }}
    </p>

    <BaseButton
      type="submit"
      block
      :disabled="!canSubmit"
    >
      {{ saving ? 'Salvando...' : submitLabel }}
    </BaseButton>
  </form>
</template>

<style scoped>
.project-form {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: 704px;
  margin: 0 auto;
}

.project-form__row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.project-form__submit-error {
  margin-top: -16px;
  text-align: center;
}

@media (max-width: 640px) {
  .project-form__row {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
