# Documentação da API - Gestão de Férias

Guia em linguagem simples para o time de **QA** entender a API e desenvolver
cenários de **testes manuais e automatizados**.

---

## 1. Informações gerais

| Item | Valor |
|------|-------|
| URL base | `http://localhost:3001/api` |
| Documentação interativa (Swagger) | `http://localhost:3001/api-docs/` |
| Health check | `http://localhost:3001/api/health` |
| Formato dos dados | JSON (`Content-Type: application/json`) |
| Autenticação | Token JWT no cabeçalho `Authorization: Bearer <token>` |

### Como a autenticação funciona (resumo para QA)

1. O usuário faz **login** ou **cadastro** e recebe um `token`.
2. Esse `token` deve ser enviado no cabeçalho `Authorization` em todas as rotas de férias.
3. O token expira em **8 horas**.
4. Sem token (ou com token inválido) as rotas de férias retornam **401**.

### Perfis de usuário (roles)

| Role | Descrição |
|------|-----------|
| `employee` | Funcionário. Cria solicitações e vê apenas as próprias. |
| `manager` | Gestor. Vê todas as solicitações e pode aprovar/rejeitar. |

> Ao se cadastrar, todo usuário começa com **saldo de 30 dias** de férias.
> Quando uma solicitação é **aprovada**, os dias são descontados do saldo.

### Usuários de teste (modo armazenamento local)

| Perfil | Email | Senha |
|--------|-------|-------|
| Gestor | `testegestor@example.com` | `teste@123` |
| Funcionário | `testefuncionario@example.com` | `teste@123` |

---

## 2. Endpoints

### 2.1. `POST /auth/register` — Cadastrar usuário

Cria um novo usuário e já devolve um token (login automático).

**Corpo da requisição:**

| Campo | Tipo | Obrigatório | Observação |
|-------|------|-------------|------------|
| `name` | texto | Sim | Nome do usuário |
| `email` | texto | Sim | Deve ser único |
| `password` | texto | Sim | Senha em texto puro (é criptografada no servidor) |
| `role` | texto | Não | `employee` (padrão) ou `manager` |
| `manager_id` | número | Não | ID do gestor responsável |

**Exemplo de corpo:**

```json
{
  "name": "Maria Silva",
  "email": "maria.silva@example.com",
  "password": "senha123",
  "role": "employee"
}
```

**Respostas possíveis:**

| Código | Quando acontece |
|--------|-----------------|
| `200` | Cadastro feito com sucesso (retorna `user` + `token`) |
| `400` | Faltou `name`, `email` ou `password` |
| `409` | Email já cadastrado |
| `500` | Erro interno do servidor |

---

### 2.2. `POST /auth/login` — Login

Valida email e senha e devolve um token.

**Corpo da requisição:**

| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| `email` | texto | Sim |
| `password` | texto | Sim |

**Exemplo de corpo:**

```json
{
  "email": "testegestor@example.com",
  "password": "teste@123"
}
```

**Respostas possíveis:**

| Código | Quando acontece |
|--------|-----------------|
| `200` | Login com sucesso (retorna `user` + `token`) |
| `400` | Faltou `email` ou `password` |
| `401` | Email não existe ou senha errada |
| `500` | Erro interno do servidor |

---

### 2.3. `GET /vacations` — Listar solicitações de férias

Lista as solicitações. **Requer token.**

- Se o usuário for `manager` → retorna **todas** as solicitações.
- Se for `employee` → retorna **apenas as dele**.

**Cabeçalho:** `Authorization: Bearer <token>`

**Respostas possíveis:**

| Código | Quando acontece |
|--------|-----------------|
| `200` | Lista retornada (pode ser uma lista vazia `[]`) |
| `401` | Token não enviado ou inválido |
| `500` | Erro interno do servidor |

---

### 2.4. `POST /vacations` — Criar solicitação de férias

Cria uma nova solicitação com status inicial `pending`. **Requer token.**

**Cabeçalho:** `Authorization: Bearer <token>`

**Corpo da requisição:**

| Campo | Tipo | Obrigatório | Observação |
|-------|------|-------------|------------|
| `start_date` | data (`AAAA-MM-DD`) | Sim | Data de início |
| `end_date` | data (`AAAA-MM-DD`) | Sim | Deve ser igual ou depois de `start_date` |
| `total_days` | número | Sim | Não pode ser maior que o saldo disponível |

**Exemplo de corpo:**

```json
{
  "start_date": "2026-06-10",
  "end_date": "2026-06-15",
  "total_days": 6
}
```

**Respostas possíveis:**

| Código | Quando acontece |
|--------|-----------------|
| `201` | Solicitação criada com sucesso |
| `400` | Faltou algum campo, `end_date` antes de `start_date`, ou `total_days` maior que o saldo |
| `401` | Token não enviado ou inválido |
| `500` | Erro interno do servidor |

---

### 2.5. `PUT /vacations/{id}/decision` — Decidir solicitação

Aprova, rejeita ou cancela uma solicitação. **Somente gestores (`manager`).**

**Cabeçalho:** `Authorization: Bearer <token>`

**Parâmetro de URL:** `id` = ID da solicitação.

**Corpo da requisição:**

| Campo | Tipo | Obrigatório | Observação |
|-------|------|-------------|------------|
| `action` | texto | Sim | `approved`, `rejected` ou `cancelled` |
| `manager_comment` | texto | Não | Comentário do gestor |

**Exemplo de corpo:**

```json
{
  "action": "approved",
  "manager_comment": "Aprovado pelo gestor."
}
```

**Regras importantes:**

- Quando a ação é `approved`, o saldo de dias do funcionário é **reduzido** automaticamente.
- Só é possível decidir solicitações que ainda estão com status `pending`.
- Um gestor **não pode** decidir sobre a própria solicitação.

**Respostas possíveis:**

| Código | Quando acontece |
|--------|-----------------|
| `200` | Decisão registrada com sucesso |
| `400` | `action` inválida ou solicitação não está mais `pending` |
| `401` | Token não enviado ou inválido |
| `403` | Usuário não é gestor, ou gestor tentou decidir a própria solicitação |
| `404` | Solicitação não encontrada |
| `500` | Erro interno do servidor |

---

## 3. Exemplos de casos de teste

Modelo simples para o QA reaproveitar (manual ou automatizado). Cada caso tem:
**ID, objetivo, pré-condições, passos, dados de entrada e resultado esperado.**

### 3.1. Auth

#### CT-AUTH-01 — Cadastro de usuário com dados válidos

| Campo | Descrição |
|-------|-----------|
| **Endpoint** | `POST /auth/register` |
| **Objetivo** | Garantir que um novo usuário é cadastrado com sucesso e recebe um token |
| **Pré-condições** | Backend rodando; o email usado **não** pode existir ainda |
| **Dados de entrada** | `{ "name": "Maria Silva", "email": "maria.silva@example.com", "password": "senha123", "role": "employee" }` |
| **Passos** | 1. Enviar `POST /auth/register` com o corpo acima |
| **Resultado esperado** | - Status `200`<br>- Resposta contém objeto `user` com `id`, `name`, `email`, `role` = `employee` e `vacation_balance` = `30`<br>- Resposta contém um `token` (texto não vazio)<br>- A resposta **não** deve conter `password` nem `password_hash` |
| **Tipo** | Positivo / caminho feliz |

> **Dica de variação negativa:** repetir o cadastro com o mesmo email deve retornar `409`. Enviar sem `password` deve retornar `400`.

#### CT-AUTH-02 — Login com credenciais válidas

| Campo | Descrição |
|-------|-----------|
| **Endpoint** | `POST /auth/login` |
| **Objetivo** | Garantir que o usuário consegue autenticar e receber um token válido |
| **Pré-condições** | Usuário de teste existente (`testegestor@example.com` / `teste@123`) |
| **Dados de entrada** | `{ "email": "testegestor@example.com", "password": "teste@123" }` |
| **Passos** | 1. Enviar `POST /auth/login` com o corpo acima |
| **Resultado esperado** | - Status `200`<br>- Resposta contém `user` com `role` = `manager`<br>- Resposta contém um `token` (texto não vazio)<br>- O `token` pode ser usado nas rotas de férias sem retornar `401` |
| **Tipo** | Positivo / caminho feliz |

> **Dica de variação negativa:** senha errada deve retornar `401`. Corpo sem `email` deve retornar `400`.

### 3.2. Vacations

#### CT-VAC-01 — Listar solicitações como gestor

| Campo | Descrição |
|-------|-----------|
| **Endpoint** | `GET /vacations` |
| **Objetivo** | Garantir que o gestor consegue listar todas as solicitações |
| **Pré-condições** | Login feito como gestor; token válido em mãos |
| **Dados de entrada** | Nenhum corpo. Cabeçalho `Authorization: Bearer <token_do_gestor>` |
| **Passos** | 1. Fazer login como gestor e copiar o `token`<br>2. Enviar `GET /vacations` com o cabeçalho `Authorization` |
| **Resultado esperado** | - Status `200`<br>- Corpo da resposta é uma **lista** (array)<br>- Cada item (quando houver) traz `id`, `user_id`, `user_name`, `start_date`, `end_date`, `total_days`, `status` |
| **Tipo** | Positivo / caminho feliz |

> **Dica de variação negativa:** chamar `GET /vacations` sem o cabeçalho `Authorization` deve retornar `401`.

#### CT-VAC-02 — Criar solicitação de férias válida

| Campo | Descrição |
|-------|-----------|
| **Endpoint** | `POST /vacations` |
| **Objetivo** | Garantir que um funcionário cria uma solicitação dentro do saldo disponível |
| **Pré-condições** | Login feito como funcionário com saldo suficiente (ex.: 30 dias) |
| **Dados de entrada** | `{ "start_date": "2026-06-10", "end_date": "2026-06-15", "total_days": 6 }` + cabeçalho `Authorization: Bearer <token_do_funcionario>` |
| **Passos** | 1. Login como funcionário e copiar o `token`<br>2. Enviar `POST /vacations` com o corpo e o cabeçalho |
| **Resultado esperado** | - Status `201`<br>- Resposta traz a solicitação criada com `status` = `pending`<br>- `total_days` = `6` e `manager_comment` = `null` |
| **Tipo** | Positivo / caminho feliz |

> **Dica de variação negativa:** `total_days` maior que o saldo deve retornar `400`. `end_date` anterior a `start_date` deve retornar `400`.

#### CT-VAC-03 — Aprovar solicitação como gestor

| Campo | Descrição |
|-------|-----------|
| **Endpoint** | `PUT /vacations/{id}/decision` |
| **Objetivo** | Garantir que o gestor aprova uma solicitação pendente e o saldo é descontado |
| **Pré-condições** | Existe uma solicitação com status `pending` (criada no CT-VAC-02); login feito como gestor (que não seja o dono da solicitação) |
| **Dados de entrada** | URL com o `id` da solicitação pendente. Corpo: `{ "action": "approved", "manager_comment": "Aprovado pelo gestor." }` + cabeçalho `Authorization: Bearer <token_do_gestor>` |
| **Passos** | 1. Login como gestor e copiar o `token`<br>2. Identificar o `id` de uma solicitação `pending`<br>3. Enviar `PUT /vacations/{id}/decision` com o corpo e o cabeçalho |
| **Resultado esperado** | - Status `200`<br>- Resposta traz `status` = `approved`<br>- O `vacation_balance` do funcionário diminui exatamente o valor de `total_days` da solicitação |
| **Tipo** | Positivo / caminho feliz |

> **Dica de variação negativa:** funcionário tentando aprovar deve retornar `403`. `action` inválida (ex.: `"aprovar"`) deve retornar `400`. `id` inexistente deve retornar `404`.

---

## 4. Roteiro sugerido de teste de ponta a ponta (E2E)

Sequência recomendada para validar o fluxo completo em uma rodada:

1. **Cadastrar** um funcionário (`POST /auth/register`).
2. **Cadastrar** um gestor (`POST /auth/register` com `role = manager`).
3. **Login** como funcionário (`POST /auth/login`) → guardar token.
4. **Criar** solicitação de férias (`POST /vacations`).
5. **Login** como gestor (`POST /auth/login`) → guardar token.
6. **Listar** solicitações (`GET /vacations`) → confirmar que a nova aparece como `pending`.
7. **Aprovar** a solicitação (`PUT /vacations/{id}/decision`).
8. **Login** novamente como funcionário → conferir que o `vacation_balance` foi reduzido.

---

## 5. Dicas para automação

- Reaproveite o `token` retornado no login em uma variável de ambiente da ferramenta (Postman, Newman, Cypress, Playwright, RestAssured etc.).
- Sempre valide **status code** e **estrutura/valores do corpo** da resposta.
- Crie dados únicos (ex.: emails com timestamp) para evitar conflito de `409` em execuções repetidas.
- No modo de armazenamento local, os dados ficam em `backend/data.json`; apagar/limpar esse arquivo "zera" o ambiente para um novo ciclo de testes.
- Lembre-se de que o token expira em 8 horas: em suítes longas, gere um token novo no início da execução.
