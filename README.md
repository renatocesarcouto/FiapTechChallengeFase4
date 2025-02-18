# Arquitetura e Uso da Aplicação - Plataforma de Blog em React Native do Tech Challenge Fase 4


## 1 Visão Geral
A plataforma de blog do Tech Challenge Fase 4 é uma aplicação mobile desenvolvida em React Native com backend em Node.js, permitindo que professores da rede pública de educação postem e gerenciem conteúdo educacional online através de dispositivos móveis.


## 2 Tecnologias Utilizadas

Frontend Mobile:
    - React Native
    - TypeScript
    - React Navigation
    - Styled Components
    - Jest e React Native Testing Library
    - Axios

Backend:
    - Node.js com Express.js
    - PostgreSQL
    - Docker e Docker Compose
    - Jest
    - JWT para autenticação
    - Bcrypt para criptografia


## 3 Arquitetura do Sistema

Frontend Mobile:
    /src
        /components: Componentes reutilizáveis da interface
        /screens: Telas principais do aplicativo
        /navigation: Configuração de rotas e navegação
        /services: Serviços de API e integrações
        /types: Definições de tipos TypeScript
        /styles: Temas e estilos globais
        /utils: Funções utilitárias
        /hooks: Custom hooks React
        /contexts: Contextos globais da aplicação

Backend:
    /src
        /controllers: Controladores da aplicação
        /models: Modelos do banco de dados
        /routes: Rotas da API
        /middlewares: Middlewares de autenticação e validação
        /services: Regras de negócio
        /utils: Funções utilitárias
        /config: Configurações do sistema
    /tests: Testes automatizados
    Dockerfile e docker-compose.yml: Configuração de containers


## 4 Banco de Dados

Estrutura das Tabelas:

Teachers:
    id: SERIAL (chave primária)
    name: VARCHAR(120) (não nulo)
    email: VARCHAR(120) (não nulo, único)
    password: VARCHAR(255) (não nulo)

Students:
    id: SERIAL (chave primária)
    name: VARCHAR(120) (não nulo)
    email: VARCHAR(120) (não nulo, único)
    password: VARCHAR(255) (não nulo)

Posts:
    id: SERIAL (chave primária)
    title: VARCHAR(150) (não nulo)
    content: TEXT (não nulo)
    author: VARCHAR(120) (não nulo)
    date: TIMESTAMP (não nulo, default CURRENT_TIMESTAMP)
    teacher_id: INTEGER (referência à tabela teachers)


## 5 Funcionalidades do App Mobile

Área do Professor:
    - Login e autenticação de professores
    - Criação de posts educacionais
    - Edição dos próprios posts
    - Exclusão dos próprios posts
    - Visualização de todos os posts
    - Gerenciamento do perfil
    - Busca avançada de conteúdo

Área do Aluno:
    - Login e autenticação de alunos
    - Visualização de posts educacionais
    - Busca de conteúdo por tema
    - Acesso ao histórico de leituras
    - Visualização detalhada dos posts
    - Gerenciamento do perfil

Recursos Gerais:
    - Interface adaptativa
    - Navegação intuitiva
    - Modo offline para conteúdos salvos
    - Compartilhamento de posts
    - Filtros por categoria
    - Notificações de novos conteúdos


## 6 Endpoints da API

Autenticação:
    POST /auth/login/teacher: Login de professores
    POST /auth/login/student: Login de alunos

Posts:
    GET /posts: Lista todos os posts para alunos
    GET /posts/admin: Lista todos os posts para professores
    GET /posts/search: Busca posts por termo
    GET /posts/:id: Retorna um post específico
    POST /posts: Cria um novo post
    PUT /posts/:id: Atualiza um post existente
    DELETE /posts/:id: Remove um post

Professores:
    GET /teachers: Lista todos os professores
    GET /teachers/:id: Retorna dados de um professor
    POST /teachers: Cadastra novo professor
    PUT /teachers/:id: Atualiza dados do professor
    DELETE /teachers/:id: Remove um professor

Alunos:
    GET /students: Lista todos os alunos
    GET /students/:id: Retorna dados de um aluno
    POST /students: Cadastra novo aluno
    PUT /students/:id: Atualiza dados do aluno
    DELETE /students/:id: Remove um aluno


## 7 Inicialização
Backend:
    Use o comando docker-compose up para iniciar a API e o banco de dados.

Frontend Mobile:
    1. Instale as dependências: npm install
    2. Inicie o app: 
       - Android: npm run android


## 8 Testes
Backend: Execute docker-compose run test
Frontend: npm run test
