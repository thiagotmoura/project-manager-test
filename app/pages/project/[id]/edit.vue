<script setup lang="ts">
import type { ProjectInput } from '~/types/project'

useHead({ title: 'Editar projeto' })

const route = useRoute()
const projectsStore = useProjectsStore()

const projectId = computed(() => String(route.params.id))
const project = computed(() => projectsStore.getById(projectId.value))

const initialValues = computed<Partial<ProjectInput> | undefined>(() =>
  project.value
    ? {
        name: project.value.name,
        client: project.value.client,
        startDate: project.value.startDate,
        endDate: project.value.endDate,
        coverImage: project.value.coverImage,
      }
    : undefined,
)

const saving = ref(false)
const submitError = ref('')

async function handleSubmit(values: ProjectInput) {
  saving.value = true
  submitError.value = ''
  try {
    projectsStore.update(projectId.value, values)
    await navigateTo('/')
  }
  catch (error) {
    submitError.value = error instanceof Error ? error.message : 'Não foi possível salvar as alterações.'
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div>
    <div class="page-heading">
      <BackLink to="/" />
      <h1 class="page-title">
        Editar projeto
      </h1>
    </div>

    <section
      class="form-panel"
      aria-label="Formulário de edição de projeto"
    >
      <ProjectForm
        v-if="initialValues"
        :key="projectId"
        :initial-values="initialValues"
        submit-label="Salvar projeto"
        :saving="saving"
        :submit-error="submitError"
        @submit="handleSubmit"
      />

      <ResultsEmpty
        v-else
        title="Projeto não encontrado"
        description="O projeto que você tentou editar não existe ou foi removido."
      >
        <BaseButton
          to="/"
          size="md"
        >
          Ir para a listagem
        </BaseButton>
      </ResultsEmpty>
    </section>
  </div>
</template>
