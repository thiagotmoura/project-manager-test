<script setup lang="ts">
import type { ProjectInput } from '~/types/project'

useHead({ title: 'Novo projeto' })

const projectsStore = useProjectsStore()

const saving = ref(false)
const submitError = ref('')

async function handleSubmit(values: ProjectInput) {
  saving.value = true
  submitError.value = ''
  try {
    projectsStore.create(values)
    await navigateTo('/')
  }
  catch (error) {
    submitError.value = error instanceof Error ? error.message : 'Não foi possível salvar o projeto.'
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
        Novo projeto
      </h1>
    </div>

    <section
      class="form-panel"
      aria-label="Formulário de novo projeto"
    >
      <ProjectForm
        submit-label="Salvar projeto"
        :saving="saving"
        :submit-error="submitError"
        @submit="handleSubmit"
      />
    </section>
  </div>
</template>
