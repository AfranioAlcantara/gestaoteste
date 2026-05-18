# Regras de Negócio

## Visão geral
O site é um sistema de gestão de férias onde os colaboradores podem registrar pedidos e os gestores podem aprovar ou recusar. A ideia é permitir controle simples de férias e facilitar a comunicação entre funcionário e gestor.

## Usuários e permissões
- **Colaborador**
  - Pode se registrar no sistema.
  - Pode fazer login com email e senha.
  - Pode criar pedido de férias com data de início e fim.
  - Pode ver o histórico dos seus pedidos de férias.

- **Gestor**
  - Pode fazer login com email e senha.
  - Pode visualizar pedidos de férias de todos os colaboradores.
  - Pode aprovar ou recusar pedidos.
  - Quando aprova ou recusa, o status do pedido é atualizado.

## Fluxos principais
1. **Cadastro**
   - O usuário informa nome, email e senha.
   - O sistema valida que nenhum campo fique vazio.
   - O email deve ter formato válido.
   - Se os dados forem válidos, o cadastro é criado.

2. **Login**
   - O usuário informa email e senha.
   - O sistema valida que os campos não estejam vazios.
   - O email deve ter formato válido.
   - Se as credenciais estiverem corretas, o usuário recebe acesso ao painel.

3. **Criação de pedido de férias**
   - O usuário seleciona data de início e data de fim.
   - O sistema valida que as datas estão preenchidas.
   - O sistema valida que a data de início é anterior à data de fim.
   - O pedido é registrado com status inicial "Pendente".

4. **Aprovação e recusa de pedidos**
   - O gestor vê todos os pedidos pendentes.
   - O gestor escolhe aprovar ou recusar cada pedido.
   - Após a ação, o status do pedido muda para "Aprovado" ou "Recusado".

## Regras de dados e validações
- Email deve conter `@` e um domínio válido.
- Senha não pode ficar vazia.
- Nome não pode ficar vazio.
- Data de início deve ser antes da data de fim.
- Um pedido de férias só pode ser criado se todas as informações forem válidas.

## Comportamento esperado do sistema
- O sistema deve exibir mensagens claras de erro quando o usuário não preencher algum campo obrigatório.
- Não deve haver validação apenas pelo navegador; as mensagens devem ser controladas pela aplicação.
- O backend deve oferecer suporte para armazenamento local caso o banco de dados não esteja configurado.
- O site deve permitir acesso ao backend e frontend separadamente, com frontend em `http://localhost:3000` e backend em `http://localhost:3001`.

## Cenários de teste sugeridos
1. Cadastro com dados válidos
2. Cadastro com nome vazio
3. Cadastro com email inválido
4. Cadastro com senha vazia
5. Login com credenciais válidas
6. Login com email inexistente
7. Login com senha incorreta
8. Criação de pedido de férias com datas válidas
9. Criação de pedido com data de início posterior à data de fim
10. Criação de pedido com campo de data vazio
11. Gestor visualiza lista de pedidos
12. Gestor aprova pedido de férias
13. Gestor recusa pedido de férias

## Observações para testes
- Verificar se as mensagens de erro aparecem diretamente abaixo dos campos.
- Confirmar que o sistema não permite envio de formulário com campos obrigatórios vazios.
- Confirmar o fluxo completo de pedido de férias desde a criação até a aprovação ou recusa.
- Verificar se o status do pedido atualiza corretamente após cada ação.
