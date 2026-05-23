# Plano de Testes - Gestão de Férias
**Período:** 2 meses de desenvolvimento  
**Equipe QA:** Afrânio Alcântara (QA Sr) | Nicolas Lopes (QA Jr)  
**Data de Início:** 23/05/2026  
**Data de Término:** 23/07/2026  
**Modelo:** Ágil com Sprints de 2 semanas

---

## 1. Visão Geral

Este plano de testes define a estratégia de garantia de qualidade para o desenvolvimento do sistema de gestão de férias, um sistema web que permite colaboradores registrarem pedidos de férias e gestores aprovarem ou recusarem esses pedidos. O plano segue a metodologia ágil com 4 sprints de 2 semanas cada.

---

## 2. Papéis e Responsabilidades

| Papel | Nome | Responsabilidades |
|-------|------|-------------------|
| **QA Sênior** | Afrânio Alcântara | - Liderar a estratégia de testes<br>- Revisar e validar casos de teste<br>- Realizar testes exploratórios<br>- Testes de integração e regressão<br>- Relatórios de qualidade e métricas<br>- Mentoria do QA Jr |
| **QA Junior** | Nicolas Lopes | - Executar casos de teste manuais<br>- Documentar bugs e defeitos<br>- Testes de funcionalidade básica<br>- Suporte em testes exploratórios<br>- Auxiliar em testes de regressão |

---

## 3. Escopo de Testes

### 3.1 Funcionalidades Cobertas
- ✅ Módulo de Autenticação (Cadastro e Login)
- ✅ Módulo de Pedidos de Férias
- ✅ Módulo de Aprovação/Recusa de Pedidos
- ✅ Integrações Frontend-Backend
- ✅ Validações de Dados
- ✅ Fluxos Completos de Negócio

### 3.2 Tipos de Testes
- **Testes Funcionais:** Validação de features contra requisitos
- **Testes de Validação:** Validação de dados e regras de negócio
- **Testes de Integração:** Comunicação entre frontend e backend
- **Testes de Regressão:** Garantir que mudanças não quebrem features anteriores
- **Testes Exploratórios:** Descoberta de bugs em cenários não planejados
- **Testes de Interface:** Usabilidade e responsividade da UI

---

## 4. Estrutura de Sprints

### 📅 **SPRINT 1** - Fundação (23/05 a 06/06)
**Foco:** Setup, autenticação e validações básicas

#### 4.1.1 Objetivos
- Validar environment de testes
- Testes do módulo de cadastro
- Testes do módulo de login
- Validação de regras de cadastro
- Documentação de ambiente

#### 4.1.2 Casos de Teste - Módulo de Cadastro

| ID | Caso de Teste | Pré-requisitos | Passos | Resultado Esperado | Responsável | Status |
|---|---|---|---|---|---|---|
| TC-001 | Cadastro com dados válidos | Sistema acessível | 1. Acessar página de cadastro<br>2. Preencher nome, email, senha<br>3. Clicar em registrar | Usuário criado com sucesso, mensagem de confirmação | Nicolas Lopes | ⏳ |
| TC-002 | Cadastro com nome vazio | Sistema acessível | 1. Acessar página de cadastro<br>2. Deixar nome vazio<br>3. Preencher email e senha<br>4. Clicar em registrar | Mensagem de erro abaixo do campo nome | Nicolas Lopes | ⏳ |
| TC-003 | Cadastro com email vazio | Sistema acessível | 1. Acessar página de cadastro<br>2. Preencher nome e senha<br>3. Deixar email vazio<br>4. Clicar em registrar | Mensagem de erro abaixo do campo email | Nicolas Lopes | ⏳ |
| TC-004 | Cadastro com email inválido | Sistema acessível | 1. Acessar página de cadastro<br>2. Preencher nome<br>3. Inserir email sem @<br>4. Preencher senha | Mensagem de erro "Email inválido" | Nicolas Lopes | ⏳ |
| TC-005 | Cadastro com senha vazia | Sistema acessível | 1. Acessar página de cadastro<br>2. Preencher nome e email<br>3. Deixar senha vazia<br>4. Clicar em registrar | Mensagem de erro abaixo do campo senha | Nicolas Lopes | ⏳ |
| TC-006 | Validação de email duplicado | Usuário já existe no sistema | 1. Tentar cadastrar com email existente<br>2. Preencher todos os campos | Mensagem de erro "Email já cadastrado" | Afrânio Alcântara | ⏳ |
| TC-007 | Validação backend vs frontend | Sistema funcionando | 1. Tentar burlar validação frontend<br>2. Enviar requisição direta ao backend | Backend rejeita dados inválidos | Afrânio Alcântara | ⏳ |

#### 4.1.3 Casos de Teste - Módulo de Login

| ID | Caso de Teste | Pré-requisitos | Passos | Resultado Esperado | Responsável | Status |
|---|---|---|---|---|---|---|
| TC-008 | Login com credenciais válidas | Usuário cadastrado | 1. Acessar página de login<br>2. Inserir email e senha corretos<br>3. Clicar em entrar | Usuário redirecionado ao painel | Nicolas Lopes | ⏳ |
| TC-009 | Login com email inexistente | Sistema funcionando | 1. Inserir email não cadastrado<br>2. Inserir qualquer senha<br>3. Clicar em entrar | Mensagem de erro "Credenciais inválidas" | Nicolas Lopes | ⏳ |
| TC-010 | Login com senha incorreta | Usuário cadastrado | 1. Inserir email correto<br>2. Inserir senha incorreta<br>3. Clicar em entrar | Mensagem de erro "Credenciais inválidas" | Nicolas Lopes | ⏳ |
| TC-011 | Login com campos vazios | Sistema funcionando | 1. Deixar email vazio<br>2. Deixar senha vazia<br>3. Clicar em entrar | Mensagem de erro "Preencha todos os campos" | Nicolas Lopes | ⏳ |
| TC-012 | Validação de token JWT | Usuário logado | 1. Fazer login<br>2. Verificar localStorage/cookies<br>3. Validar token | Token JWT válido armazenado | Afrânio Alcântara | ⏳ |

#### 4.1.4 Critérios de Aceitação
- ✅ 100% dos casos de teste TC-001 a TC-012 aprovados
- ✅ Sem bugs críticos abertos
- ✅ Validações funcionam tanto frontend quanto backend
- ✅ Mensagens de erro claras e posicionadas corretamente

---

### 📅 **SPRINT 2** - Funcionalidades Principais (07/06 a 20/06)
**Foco:** Pedidos de férias, listagem e fluxo básico

#### 4.2.1 Objetivos
- Testes de criação de pedidos de férias
- Testes de listagem de pedidos
- Validação de datas
- Testes de visualização do histórico

#### 4.2.2 Casos de Teste - Criação de Pedido de Férias

| ID | Caso de Teste | Pré-requisitos | Passos | Resultado Esperado | Responsável | Status |
|---|---|---|---|---|---|---|
| TC-013 | Criar pedido com datas válidas | Usuário logado como colaborador | 1. Acessar formulário de pedido<br>2. Selecionar data de início<br>3. Selecionar data de fim (posterior)<br>4. Clicar em solicitar | Pedido criado com status "Pendente" | Nicolas Lopes | ⏳ |
| TC-014 | Criar pedido com data fim anterior ao início | Usuário logado | 1. Preencher data de início<br>2. Preencher data de fim anterior<br>3. Clicar em solicitar | Mensagem de erro "Data de fim deve ser posterior à data de início" | Nicolas Lopes | ⏳ |
| TC-015 | Criar pedido com campo de data vazio | Usuário logado | 1. Deixar data de início vazia<br>2. Preencher data de fim<br>3. Clicar em solicitar | Mensagem de erro "Preencha a data de início" | Nicolas Lopes | ⏳ |
| TC-016 | Criar pedido com ambas as datas vazias | Usuário logado | 1. Deixar ambas as datas vazias<br>2. Clicar em solicitar | Mensagem de erro para ambos os campos | Nicolas Lopes | ⏳ |
| TC-017 | Validar período de férias | Usuário logado | 1. Criar pedido de 1 mês<br>2. Verificar cálculo de dias | Sistema calcula corretamente os dias de férias | Afrânio Alcântara | ⏳ |
| TC-018 | Criar múltiplos pedidos | Usuário logado | 1. Criar primeiro pedido<br>2. Criar segundo pedido em datas diferentes<br>3. Verificar ambos foram registrados | Ambos os pedidos aparecem no histórico | Afrânio Alcântara | ⏳ |

#### 4.2.3 Casos de Teste - Visualização de Pedidos (Colaborador)

| ID | Caso de Teste | Pré-requisitos | Passos | Resultado Esperado | Responsável | Status |
|---|---|---|---|---|---|---|
| TC-019 | Visualizar histórico de pedidos | Usuário logado com pedidos | 1. Acessar seção de histórico<br>2. Verificar lista | Todos os pedidos do usuário aparecem | Nicolas Lopes | ⏳ |
| TC-020 | Filtrar pedidos por status | Usuário logado | 1. Acessar histórico<br>2. Usar filtro de status | Apenas pedidos com status selecionado aparecem | Afrânio Alcântara | ⏳ |
| TC-021 | Visualizar detalhes do pedido | Usuário logado | 1. Clicar em um pedido<br>2. Verificar informações | Data de início, fim e status visíveis corretamente | Nicolas Lopes | ⏳ |

#### 4.2.4 Critérios de Aceitação
- ✅ 100% dos casos TC-013 a TC-021 aprovados
- ✅ Validações de datas funcionam corretamente
- ✅ Histórico lista todos os pedidos do usuário
- ✅ Status do pedido sempre "Pendente" na criação
- ✅ Sem bugs críticos ou regressão dos sprints anteriores

---

### 📅 **SPRINT 3** - Fluxo de Aprovação (21/06 a 04/07)
**Foco:** Funcionalidades de gestor, aprovação e recusa

#### 4.3.1 Objetivos
- Testes do painel de gestor
- Testes de aprovação de pedidos
- Testes de recusa de pedidos
- Validação de permissões de acesso
- Testes de integração entre colaborador e gestor

#### 4.3.2 Casos de Teste - Visualização de Pedidos (Gestor)

| ID | Caso de Teste | Pré-requisitos | Passos | Resultado Esperado | Responsável | Status |
|---|---|---|---|---|---|---|
| TC-022 | Gestor visualiza todos os pedidos | Usuário logado como gestor | 1. Fazer login com credencial gestor<br>2. Acessar painel de pedidos | Lista de todos os pedidos pendentes aparece | Nicolas Lopes | ⏳ |
| TC-023 | Gestor vê pedidos de todos colaboradores | Múltiplos colaboradores com pedidos | 1. Fazer login como gestor<br>2. Verificar lista | Pedidos de todos os colaboradores aparecem | Afrânio Alcântara | ⏳ |
| TC-024 | Gestor não vê dados de login alheios | Sistema funcionando | 1. Gestor faz login<br>2. Tenta acessar senhas/emails | Informações sensíveis não são exibidas | Afrânio Alcântara | ⏳ |

#### 4.3.3 Casos de Teste - Aprovação de Pedidos

| ID | Caso de Teste | Pré-requisitos | Passos | Resultado Esperado | Responsável | Status |
|---|---|---|---|---|---|---|
| TC-025 | Gestor aprova pedido de férias | Gestor logado, pedido pendente existe | 1. Acessar lista de pedidos<br>2. Encontrar pedido pendente<br>3. Clicar em "Aprovar" | Status muda para "Aprovado", mensagem de sucesso | Nicolas Lopes | ⏳ |
| TC-026 | Notificação após aprovação | Pedido aprovado | 1. Verificar se colaborador recebeu notificação | Colaborador recebe confirmação da aprovação | Afrânio Alcântara | ⏳ |
| TC-027 | Histórico colaborador atualiza | Pedido aprovado | 1. Fazer login como colaborador<br>2. Verificar histórico | Pedido aparece com status "Aprovado" | Nicolas Lopes | ⏳ |

#### 4.3.4 Casos de Teste - Recusa de Pedidos

| ID | Caso de Teste | Pré-requisitos | Passos | Resultado Esperado | Responsável | Status |
|---|---|---|---|---|---|---|
| TC-028 | Gestor recusa pedido de férias | Gestor logado, pedido pendente | 1. Acessar lista de pedidos<br>2. Clicar em "Recusar"<br>3. Opcionalmente adicionar motivo | Status muda para "Recusado", mensagem de sucesso | Nicolas Lopes | ⏳ |
| TC-029 | Recusa com motivo | Gestor pode adicionar texto | 1. Recusar pedido<br>2. Adicionar motivo<br>3. Confirmar | Motivo é salvo e visível para colaborador | Afrânio Alcântara | ⏳ |
| TC-030 | Colaborador vê recusa com motivo | Pedido recusado | 1. Fazer login como colaborador<br>2. Visualizar pedido recusado | Status "Recusado" e motivo aparecem | Nicolas Lopes | ⏳ |

#### 4.3.5 Critérios de Aceitação
- ✅ 100% dos casos TC-022 a TC-030 aprovados
- ✅ Controle de acesso: colaborador não acessa painel de gestor
- ✅ Status atualiza corretamente (Pendente → Aprovado/Recusado)
- ✅ Fluxo bidirecional funcionando (mudanças refletem em ambos os lados)
- ✅ Sem regressão em sprints anteriores

---

### 📅 **SPRINT 4** - Testes Completos e Otimização (05/07 a 18/07)
**Foco:** Testes de regressão, exploratórios, integração e performance

#### 4.4.1 Objetivos
- Testes de regressão completos
- Testes exploratórios
- Testes de edge cases
- Testes de integração completa
- Testes de performance/carga
- Preparação para produção

#### 4.4.2 Casos de Teste - Regressão Completa

| ID | Caso de Teste | Pré-requisitos | Passos | Resultado Esperado | Responsável | Status |
|---|---|---|---|---|---|---|
| TC-031 | Regressão - Fluxo completo cadastro | Sistema funcionando | Executar TC-001 até TC-007 novamente | Todos os casos passam sem novos bugs | Afrânio Alcântara | ⏳ |
| TC-032 | Regressão - Fluxo completo login | Sistema funcionando | Executar TC-008 até TC-012 novamente | Todos os casos passam sem novos bugs | Afrânio Alcântara | ⏳ |
| TC-033 | Regressão - Criação de pedidos | Sistema funcionando | Executar TC-013 até TC-018 novamente | Todos os casos passam sem novos bugs | Afrânio Alcântara | ⏳ |
| TC-034 | Regressão - Visualização histórico | Sistema funcionando | Executar TC-019 até TC-021 novamente | Todos os casos passam sem novos bugs | Afrânio Alcântara | ⏳ |
| TC-035 | Regressão - Aprovação/Recusa | Sistema funcionando | Executar TC-022 até TC-030 novamente | Todos os casos passam sem novos bugs | Afrânio Alcântara | ⏳ |

#### 4.4.3 Casos de Teste - Testes Exploratórios

| ID | Caso de Teste | Pré-requisitos | Passos | Resultado Esperado | Responsável | Status |
|---|---|---|---|---|---|---|
| TC-036 | Logout e limpeza de sessão | Usuário logado | 1. Fazer logout<br>2. Tentar acessar página protegida<br>3. Ser redirecionado ao login | Sessão é limpa, redirecionamento funciona | Nicolas Lopes | ⏳ |
| TC-037 | Acesso direto sem autenticação | Sistema funcionando | 1. Tentar acessar URLs protegidas diretamente<br>2. Sem fazer login | Redirecionamento para login | Afrânio Alcântara | ⏳ |
| TC-038 | Período de férias sobreposto | Colaborador com pedido aprovado | 1. Tentar criar pedido que sobrepõe férias aprovadas | Validação impede ou avisa sobre sobreposição | Afrânio Alcântara | ⏳ |
| TC-039 | Teste de responsividade mobile | Navegador com modo mobile | 1. Abrir site em mobile<br>2. Testar todos os formulários | Interface ajusta corretamente, testes funcionam | Nicolas Lopes | ⏳ |
| TC-040 | Teste com navegadores diferentes | Chrome, Firefox, Safari | 1. Executar testes em múltiplos navegadores | Comportamento consistente entre navegadores | Afrânio Alcântara | ⏳ |

#### 4.4.4 Casos de Teste - Integração e Edge Cases

| ID | Caso de Teste | Pré-requisitos | Passos | Resultado Esperado | Responsável | Status |
|---|---|---|---|---|---|---|
| TC-041 | Múltiplas abas abertas | Mesmo usuário em 2 abas | 1. Fazer login em aba 1<br>2. Abrir aba 2<br>3. Criar pedido em aba 1<br>4. Verificar aba 2 | Dados sincronizam ou atualizam corretamente | Afrânio Alcântara | ⏳ |
| TC-042 | Backend offline | Servidor backend parado | 1. Tentar enviar formulário | Mensagem de erro clara aparece | Nicolas Lopes | ⏳ |
| TC-043 | Conexão lenta | Simulação de rede lenta | 1. Enviar formulário<br>2. Verificar loading estados | Loading visual aparece, requisição completa | Afrânio Alcântara | ⏳ |
| TC-044 | Caracteres especiais nos campos | Cadastro com acentos e símbolos | 1. Cadastrar com "João", "josé@example.com"<br>2. Verificar armazenamento | Dados armazenados corretamente | Nicolas Lopes | ⏳ |
| TC-045 | Data de férias em anos diferentes | Férias de 28/12 a 02/01 | 1. Criar pedido entre anos<br>2. Verificar cálculo | Cálculo de dias correto (5 dias) | Afrânio Alcântara | ⏳ |

#### 4.4.5 Critérios de Aceitação
- ✅ 100% dos casos TC-031 a TC-045 aprovados
- ✅ Zero bugs críticos ou bloqueadores
- ✅ Taxa de regressão < 2%
- ✅ Performance: resposta < 2s em todas operações
- ✅ Cobertura de testes > 90% das funcionalidades

---

## 5. Métricas de Qualidade

### 5.1 Métricas por Sprint

| Métrica | Sprint 1 | Sprint 2 | Sprint 3 | Sprint 4 | Meta |
|---------|----------|----------|----------|----------|------|
| Taxa de Cobertura (%) | 30% | 60% | 85% | 100% | 100% |
| Bugs Críticos | 0 | 0 | 0 | 0 | 0 |
| Bugs Altos | ≤3 | ≤2 | ≤1 | 0 | 0 |
| Bugs Médios | ≤5 | ≤4 | ≤2 | ≤1 | 0 |
| Taxa de Regressão (%) | 0% | <2% | <2% | <2% | <2% |
| Tempo Médio Fix (h) | 24 | 18 | 12 | 8 | <8h |

### 5.2 Relatório de Bugs

Formato padrão de bug report:

```
ID: BUG-###
Título: [Descrição breve do bug]
Severidade: [Crítica | Alta | Média | Baixa]
Sprint: [Número do Sprint]
Reportado por: [Nome do QA]
Data: [Data do reporte]
Passos para Reproduzir:
  1. ...
  2. ...
  3. ...
Resultado Esperado: ...
Resultado Obtido: ...
Ambiente: [Browser, SO, versão]
Anexos: [Screenshots/Vídeos]
```

---

## 6. Estratégia de Teste

### 6.1 Abordagem de Teste
- **Manual:** Todos os testes funcionais e exploratórios (sprints 1-4)
- **Exploratório:** Testes exploratórios baseados em cenários reais (sprint 4)
- **Regressão:** Execução de suite completa no final de cada sprint
- **Integração:** Testes de fluxo completo envolvendo frontend + backend

### 6.2 Ciclo de Teste por Sprint

```
1. Planejamento (2 dias)
   ↓
2. Execução de Testes (7 dias)
   ↓
3. Documentação de Bugs (2 dias)
   ↓
4. Reporte e Retrospectiva (1 dia)
```

### 6.3 Priorização de Testes
- **P1 (Crítica):** Autenticação, Fluxo de aprovação, Persistência de dados
- **P2 (Alta):** Validações, Permissões, Histórico
- **P3 (Média):** UI, Mensagens de erro, Responsividade
- **P4 (Baixa):** Performance, Estetika

---

## 7. Ambientes de Teste

| Ambiente | URL | Banco de Dados | Propósito |
|----------|-----|---|----------|
| **Desenvolvimento** | http://localhost:3000 (FE)<br>http://localhost:3001 (BE) | Local JSON | Testes contínuos, exploratórios |
| **Testes** | [A definir] | [A definir] | Testes de regressão, integração |
| **Produção** | [A definir] | [A definir] | Produção |

---

## 8. Dados de Teste

### 8.1 Usuários de Teste

**Colaboradores:**
- Email: colaborador1@test.com | Senha: Test@123
- Email: colaborador2@test.com | Senha: Test@123
- Email: colaborador3@test.com | Senha: Test@123

**Gestores:**
- Email: gestor1@test.com | Senha: Test@123
- Email: gestor2@test.com | Senha: Test@123

### 8.2 Dados Inválidos (Para Testes Negativos)
- Emails inválidos: `user@`, `@domain.com`, `usuario.com`, `user @domain.com`
- Datas inválidas: 32/13/2026, 29/02/2025
- Caracteres especiais: `<script>`, `';--`, `%20`

---

## 9. Critérios de Saída

### Critérios para cada Sprint

✅ **Aceitar o Sprint se:**
- ✓ 95% ou mais dos casos de teste passaram
- ✓ 0 bugs críticos abertos
- ✓ Menos de 2% de regressão
- ✓ Documentação completa
- ✓ Aprovação do QA Sr

❌ **Rejeitar o Sprint se:**
- ✗ Menos de 95% de aprovação
- ✗ Bugs críticos presentes
- ✗ Mais de 2% de regressão
- ✗ Falta documentação

### Critério de Saída Final (Sprint 4)
- ✅ 100% de cobertura de teste
- ✅ 0 bugs críticos ou altos abertos
- ✅ Taxa de regressão < 2%
- ✅ Aprovação formal do QA Sr
- ✅ Site pronto para produção

---

## 10. Riscos e Mitigação

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|--------|-----------|
| Atrasos no desenvolvimento | Alta | Alto | Alinhamento diário com dev, testes paralelos |
| Mudanças de requisitos | Alta | Médio | Sprint planning rigoroso, documentação viva |
| Indisponibilidade de ambiente | Média | Alto | Ambientes duplicados, comunicação com infra |
| Falta de dados para teste | Média | Médio | Fixtures de teste criadas no Sprint 1 |
| Bugs críticos em produção | Baixa | Crítico | Testes de regressão completos antes de release |
| Equipe reduzida (falta Nicolas) | Média | Alto | Documentação detalhada, overlapping conhecimento |

---

## 11. Comunicação e Reporte

### 11.1 Reuniões Regulares
- **Daily Standup:** 10min, seg-sex às 9h30 (via call/chat)
- **Sprint Planning:** 2h, início de cada sprint (seg 9h)
- **Sprint Review:** 1h, fim de cada sprint (sex 17h)
- **Sprint Retrospectiva:** 1h, após review (sex 18h)

### 11.2 Reporte
- **Relatório Diário:** Atualização de status em canal dedicado
- **Relatório de Sprint:** Resumo de testes, bugs, métricas (ao final de cada sprint)
- **Relatório Executivo:** Status geral, riscos, próximos passos (bi-semanal)

### 11.3 Escalação de Bugs
- **Bugs Críticos:** Comunicação imediata via chat
- **Bugs Altos:** Reporte no mesmo dia
- **Bugs Médios/Baixos:** Reporte ao final do dia

---

## 12. Checklist de Qualidade

### Sprint 1 - Autenticação
- [ ] Todos os 12 casos de teste executados
- [ ] Validações de cadastro funcionam
- [ ] Validações de login funcionam
- [ ] Sem bugs críticos
- [ ] Documentação atualizada
- [ ] Aprovado por QA Sr

### Sprint 2 - Pedidos de Férias
- [ ] Todos os 9 casos de teste executados
- [ ] Criação de pedidos funciona
- [ ] Listagem funciona
- [ ] Validação de datas funciona
- [ ] Sem regressão de Sprint 1
- [ ] Aprovado por QA Sr

### Sprint 3 - Aprovação
- [ ] Todos os 9 casos de teste executados
- [ ] Painel de gestor funciona
- [ ] Aprovação funciona
- [ ] Recusa funciona
- [ ] Fluxo bidirecional funciona
- [ ] Sem regressão de Sprints anteriores
- [ ] Aprovado por QA Sr

### Sprint 4 - Finalização
- [ ] Todos os 15 casos de teste executados
- [ ] Testes de regressão 100% passam
- [ ] Testes exploratórios completados
- [ ] Zero bugs críticos/altos
- [ ] Performance aceitável
- [ ] Documentação final completa
- [ ] Aprovação final por QA Sr

---

## 13. Documentação

### 13.1 Artefatos de Teste
- [ ] Plano de testes (este documento)
- [ ] Casos de teste detalhados
- [ ] Relatórios de execução por sprint
- [ ] Relatório de bugs e defeitos
- [ ] Plano de testes exploratórios
- [ ] Documento de métricas finais
- [ ] Lições aprendidas

### 13.2 Localização dos Documentos
```
/projeto site/
├── plano-de-testes.md (este arquivo)
├── testes/
│   ├── sprint-1-resultados.md
│   ├── sprint-2-resultados.md
│   ├── sprint-3-resultados.md
│   ├── sprint-4-resultados.md
│   ├── bugs-report.md
│   └── metricas-finais.md
```

---

## 14. Aprovações

| Papel | Nome | Assinatura | Data |
|-------|------|-----------|------|
| QA Sênior | Afrânio Alcântara | _________________ | ___/___/___ |
| QA Junior | Nicolas Lopes | _________________ | ___/___/___ |
| Product Owner | [Nome] | _________________ | ___/___/___ |

---

**Versão:** 1.0  
**Data de Criação:** 23/05/2026  
**Última Atualização:** 23/05/2026  
**Status:** ✅ Plano Aprovado

---

## 15. Apêndice - Comandos Úteis

### Executar ambiente de teste
```bash
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Frontend
cd frontend && npm start
```

### Acessar dados de teste
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- API Docs: http://localhost:3001/api-docs

### Limpar dados de teste
```bash
# Resetar dados locais (quando needed)
# Limpar localStorage no browser: DevTools → Application → Local Storage → Clear All
```

---

## 16. Testes Regressivos Automatizados com Cypress

### 16.1 Visão Geral da Automação

A automação de testes regressivos utilizará **Cypress** como framework de teste automatizado, focando em:
- Execução automatizada dos cenários críticos após cada build
- Redução do tempo de regressão manual
- Detecção rápida de regressões
- Integração com pipeline CI/CD
- Execução paralela para otimização

**Ferramenta:** Cypress 13.x  
**Cobertura de Automação:** 60-70% dos casos de teste (foco em regressão crítica)  
**Ambientes:** Desenvolvimento, Testes, Produção

### 16.2 Setup e Instalação do Cypress

#### 16.2.1 Instalação de Dependências

Instalar pacotes necessários no diretório frontend:
- `cypress` - Framework principal de testes E2E
- `@cypress/schematic` - Plugin para geração de testes
- `cypress-file-upload` - Suporte para upload de arquivos (opcional)

#### 16.2.2 Configuração Inicial

Criar arquivo `cypress.config.js` na raiz do frontend com as seguintes configurações:
- Base URL: http://localhost:3000
- Viewport: 1280x720
- Timeouts: 10 segundos para commands e requisições
- Screenshots em caso de falha
- Suporte a plugins customizados

#### 16.2.3 Estrutura de Diretórios

```
frontend/
├── cypress/
│   ├── e2e/
│   │   ├── auth/
│   │   │   ├── cadastro.cy.js
│   │   │   └── login.cy.js
│   │   ├── vacations/
│   │   │   ├── criar-pedido.cy.js
│   │   │   ├── listar-pedidos.cy.js
│   │   │   └── aprovar-recusar.cy.js
│   │   └── regressao/
│   │       ├── smoke-test.cy.js
│   │       └── fluxo-completo.cy.js
│   ├── fixtures/
│   │   ├── usuarios.json
│   │   ├── pedidos.json
│   │   └── dados-invalidos.json
│   ├── support/
│   │   ├── commands.js
│   │   ├── e2e.js
│   │   └── helpers.js
│   └── screenshots/ (auto-gerado)
└── cypress.config.js
```

### 16.3 Casos de Teste Automatizados - Regressão

#### 16.3.1 Testes de Autenticação (cadastro.cy.js)
**Casos:** AT-AUTO-001 a AT-AUTO-004 - Validações de cadastro (dados válidos, email vazio, email inválido, senha vazia)

#### 16.3.2 Testes de Login (login.cy.js)
**Casos:** AT-AUTO-005 a AT-AUTO-008 - Validações de login e logout

#### 16.3.3 Testes de Criação de Pedidos (criar-pedido.cy.js)
**Casos:** PED-AUTO-001 a PED-AUTO-004 - Criação de pedidos e cálculo de dias

#### 16.3.4 Testes de Aprovação/Recusa (aprovar-recusar.cy.js)
**Casos:** APR-AUTO-001 a APR-AUTO-003 - Aprovação, recusa e sincronização de status

#### 16.3.5 Teste de Fluxo Completo (fluxo-completo.cy.js)
**Casos:** FLUX-AUTO-001, FLUX-AUTO-002 - Fluxos end-to-end de colaborador e gestor

### 16.4 Commands e Helpers Customizados (support/commands.js)

**Commands a Implementar:**
- `cy.login(email, password)` - Automatizar processo de login
- `cy.logout()` - Automatizar processo de logout
- `cy.createVacationRequest(startDate, endDate)` - Criar pedido de férias
- `cy.cleanupData()` - Limpar dados de teste via API

### 16.5 Dados de Teste (fixtures/usuarios.json)

**Estrutura:**
- Colaboradores: email, password, name (mínimo 2)
- Gestores: email, password, name, role (mínimo 2)

### 16.6 Scripts de Execução (package.json - Frontend)

Scripts NPM para controlar a execução de testes:
- `npm run cypress:open` - Interface interativa
- `npm run test:smoke` - Smoke tests (5 min)
- `npm run test:regression` - Regressão completa (30 min)
- `npm run test:auth` - Testes de autenticação
- `npm run test:vacations` - Testes de pedidos
- `npm run test:all` - Todos os testes

### 16.7 Estratégia de Execução

#### 16.7.1 Execução Diária (Smoke Test)
- Frequência: Antes de iniciar o dia
- Duração: ~5 minutos
- Escopo: Testes críticos (login, criar pedido, aprovar)

#### 16.7.2 Execução Pós-Sprint (Regressão Completa)
- Frequência: Ao final de cada sprint
- Duração: ~30 minutos
- Escopo: Suite completa de 10 casos

#### 16.7.3 Execução Manual
- Desenvolvimento local
- Investigação de bugs
- Validação de features específicas

### 16.8 Integração com CI/CD (GitHub Actions)

**Arquivo:** `.github/workflows/cypress-tests.yml`

**Funcionalidades:**
- Execução automática em push e PR
- Setup de ambiente (Node.js, PostgreSQL)
- Inicialização de backend e frontend
- Execução de testes
- Upload de artefatos (screenshots, vídeos)
- Relatório de resultados

**Triggers:** Push em main/develop, Pull Requests
**Timeout:** 15 minutos


### 16.9 Métricas de Automação

| Métrica | Sprint 1 | Sprint 2 | Sprint 3 | Sprint 4 | Meta |
|---------|----------|----------|----------|----------|------|
| Casos Automatizados | 0 | 5 | 8 | 10 | 10 |
| Cobertura Automática (%) | 0% | 15% | 25% | 30% | ≥30% |
| Tempo Execução Regressão (min) | - | 30 | 25 | 20 | <20min |
| Taxa Sucesso Testes (%) | - | 95% | 97% | 99% | ≥95% |
| Flaky Tests | - | 0 | 0 | 0 | 0 |

### 16.10 Manutenção de Testes Automatizados

#### 16.10.1 Frequência de Atualização
- **Semanalmente:** Revisar testes que falharam
- **Ao final de cada Sprint:** Adicionar novos testes automatizados
- **Mensalmente:** Refatorar testes para melhorar performance
- **Conforme mudanças:** Atualizar seletores CSS/XPath quando UI mudar

#### 16.10.2 Troubleshooting Comum

| Problema | Solução |
|----------|---------|
| Testes intermitentes (Flaky) | Adicionar waits explícitos com `cy.intercept()` |
| Seletores quebrados | Usar `data-cy` atributos em vez de classes CSS |
| Timeout em requisições | Aumentar timeout no `cypress.config.js` |
| Teste passa isolado, falha em suite | Verificar estado compartilhado, limpar dados antes |
| Screenshots grandes | Habilitar compressão em `cypress.config.js` |

#### 16.10.3 Checklist de Qualidade de Testes

- [ ] Cada teste tem apenas uma responsabilidade
- [ ] Testes usam `data-cy` attributes para seletores
- [ ] Não há hardcoded waits (`cy.wait()`)
- [ ] Testes são independentes e podem rodar em qualquer ordem
- [ ] Dados de teste são limpos após execução
- [ ] Testes documentam o que validam
- [ ] Não há testes duplicados
- [ ] Testes rodam < 3 segundos cada
- [ ] Suite completa executa em < 20 minutos

### 16.11 Roadmap de Automação

**Sprint 1 (Fundação):**
- [ ] Setup do Cypress
- [ ] Criar estrutura de diretórios
- [ ] Implementar commands básicos
- [ ] Primeiros 2 testes (cadastro e login)

**Sprint 2 (Expansão):**
- [ ] Adicionar 3 testes de criação de pedidos
- [ ] Adicionar 2 testes de listagem
- [ ] Setup CI/CD básico

**Sprint 3 (Consolidação):**
- [ ] Adicionar 3 testes de aprovação/recusa
- [ ] Integração CI/CD completa
- [ ] Otimizar performance

**Sprint 4 (Otimização):**
- [ ] Adicionar 2 testes de fluxo completo
- [ ] Refatorar testes existentes
- [ ] Documentação final
- [ ] Preparar para produção

---

**FIM DO DOCUMENTO**
