# Task Manager - CRUD de Tarefas

Este projeto é uma aplicação de gerenciamento de tarefas (TODO List) desenvolvida com Angular 14+ no frontend e ASP.NET Core 6+ no backend.

## Visão Geral

O Task Manager é uma aplicação SPA (Single Page Application) que permite ao usuário:
- Visualizar lista de tarefas
- Adicionar novas tarefas
- Editar tarefas existentes
- Marcar tarefas como concluídas
- Excluir tarefas

## Estrutura do Projeto Frontend

```
src/
├── app/
│   ├── components/
│   │   ├── confirm-dialog/    # Diálogo de confirmação para exclusão
│   │   └── task-dialog/       # Diálogo para adicionar/editar tarefas
│   ├── models/
│   │   └── task.model.ts      # Interface do modelo de tarefa
│   ├── pages/
│   │   └── task-list/         # Página principal com listagem de tarefas
│   ├── services/
│   │   └── task.service.ts    # Serviço para comunicação com a API
│   ├── app.component.ts       # Componente raiz
│   └── app.module.ts          # Módulo principal com importações
└── assets/
    └── styles/               # Estilos globais
```

## Funcionalidades

### 1. Listagem de Tarefas
- Exibe todas as tarefas com título, descrição e status
- Indicação visual para tarefas concluídas
- Estado vazio quando não há tarefas

### 2. Adição de Tarefas
- Formulário modal para adicionar nova tarefa
- Validação de campos obrigatórios
- Feedback visual após adição

### 3. Edição de Tarefas
- Formulário modal preenchido com dados da tarefa
- Opção para marcar como concluída
- Validação de campos

### 4. Exclusão de Tarefas
- Diálogo de confirmação antes da exclusão
- Feedback visual após remoção

## Instalação e Execução

### Pré-requisitos
- Node.js e npm instalados
- .NET Core 6+ SDK instalado
- Angular CLI instalado (`npm install -g @angular/cli`)

### Frontend
1. Clone este repositório
2. Navegue até a pasta do frontend
3. Instale as dependências:
   ```
   npm install
   ```
4. Execute o servidor de desenvolvimento:
   ```
   ng serve
   ```
5. Acesse a aplicação em `http://localhost:4200`

### Backend
1. Navegue até a pasta do backend
2. Execute o projeto:
   ```
   dotnet run
   ```
3. A API estará disponível em `https://localhost:8080`

## Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET    | /tasks   | Lista todas as tarefas |
| GET    | /tasks/{id} | Retorna uma tarefa específica |
| POST   | /tasks   | Adiciona uma nova tarefa |
| PUT    | /tasks/{id} | Atualiza uma tarefa existente |
| DELETE | /tasks/{id} | Remove uma tarefa |

## Modelo de Dados

```typescript
interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
}
```