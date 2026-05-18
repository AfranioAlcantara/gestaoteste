# Sistema de Gestão de Férias

Aplicação de exemplo para gerenciar solicitações de férias com frontend em React e backend em Node.js/Express.

## Visão geral

- Frontend: `frontend/`
- Backend: `backend/`
- API Docs: `http://localhost:3001/api-docs`
- Execução local possível com ou sem PostgreSQL

## Pré-requisitos

- Node.js 18+ instalado
- NPM disponível
- Opcional: PostgreSQL se quiser usar banco de dados real

## Estrutura do projeto

- `backend/`
  - `index.js` - servidor Express
  - `routes/` - rotas de autenticação e férias
  - `middleware/` - autenticação JWT
  - `store.js` - armazenamento local JSON opcional
  - `swagger.js` - documentação Swagger
  - `migrate.sql` - script de criação de tabelas PostgreSQL
- `frontend/`
  - `src/` - código React
  - `src/services/api.js` - configuração de Axios
  - `src/components/` - formulários e telas

## Configuração rápida

### 1. Backend

1. Abra um terminal e entre em `backend/`
2. Copie `.env.example` para `.env`
3. Ajuste as variáveis em `.env`

Exemplo de `.env` usando armazenamento local (sem PostgreSQL):

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=gestao_ferias
DB_PASS=
DB_PORT=5432
JWT_SECRET=chave_mestra_secreta
USE_LOCAL_STORE=true
```

Se for usar PostgreSQL, configure os valores reais e use `USE_LOCAL_STORE=false`.

4. Instale dependências:

```bash
cd backend
npm install
```

5. Inicie o backend:

```bash
npm start
```

6. Confirme que ele está rodando em:

- `http://localhost:3001/api/health`
- `http://localhost:3001/api-docs`

### 2. Frontend

1. Abra outro terminal e entre em `frontend/`
2. Instale dependências:

```bash
cd frontend
npm install
```

3. Inicie o frontend:

```bash
npm start
```

4. Acesse o site em:

- `http://localhost:3000`

## Uso rápido

### Cadastro e login

- Ao abrir `http://localhost:3000`, escolha entre **Login** e **Cadastro**.
- No cadastro, informe:
  - Nome
  - Email
  - Senha
  - Confirmar senha
- Após cadastrar, você será logado automaticamente.

### Fluxo de uso

1. Crie um usuário gestor ou funcionário.
2. Faça login com o funcionário e crie uma solicitação de férias.
3. Faça login com o gestor para aprovar ou rejeitar a solicitação.
4. O saldo do funcionário é reduzido automaticamente quando a solicitação é aprovada.

### Testes iniciais rápidos

- Usuário gestor criado no backend local:
  - `testegestor@example.com`
  - `teste@123`
- Usuário funcionário criado no backend local:
  - `testefuncionario@example.com`
  - `teste@123`

> Esses usuários existem apenas se o backend estiver rodando em modo local e os dados não tiverem sido resetados.

## Documentação da API

A documentação Swagger está disponível em:

- `http://localhost:3001/api-docs`

Lá você pode consultar e testar as rotas de:

- `POST /auth/register`
- `POST /auth/login`
- `GET /vacations`
- `POST /vacations`
- `PUT /vacations/{id}/decision`

## Notas importantes

- `http://localhost:3001` não possui rota raiz definida. Use `/api-docs` ou `/api/health`.
- `USE_LOCAL_STORE=true` habilita armazenamento local em `backend/data.json` e dispensa PostgreSQL.
- Se usar PostgreSQL:
  - execute `backend/migrate.sql`
  - atualize `.env` com as credenciais reais

## Dicas para outra pessoa rodar rápido

1. Clone o repositório
2. Copie `.env.example` para `backend/.env`
3. Defina `USE_LOCAL_STORE=true` para não precisar de banco
4. Rode `npm install` em `backend/` e `frontend/`
5. Inicie backend e frontend
6. Acesse `http://localhost:3000`

## Problemas comuns

- Se o backend não iniciar, verifique se a porta `3001` já está em uso.
- Se o frontend não abrir, verifique se `npm install` foi executado no diretório `frontend/`.
- Se o login falhar, verifique se o backend está ativo e se o token foi salvo no `localStorage`.
