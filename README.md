# Gerenciador de Projetos

Aplicação para gerenciar projetos: listagem com ordenação e filtro de favoritos, criação, edição, remoção com confirmação e busca por nome com histórico.

Não há back-end. Os projetos e o histórico de busca ficam no `localStorage`, então os dados são locais a cada navegador e se perdem ao limpar os dados do site.

Nuxt 4, Vue 3, Pinia e TypeScript. CSS puro, sem framework de UI.

## Requisitos

Node 20 ou superior.

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

A aplicação sobe em http://localhost:3000.

## Testes

```bash
npm test
```

Vitest no ambiente do Nuxt. Os testes cobrem a validação do formulário, o destaque dos termos da busca e as stores de projetos e de busca.

## Build de produção

```bash
npm run build
npm run preview
```
