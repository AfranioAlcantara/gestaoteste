module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'Gestão de Férias API',
    version: '1.0.0',
    description: 'API backend para o sistema de gestão de férias',
  },
  servers: [
    {
      url: 'http://localhost:3001/api',
      description: 'Servidor local',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      RegisterRequest: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Teste Gestor' },
          email: { type: 'string', example: 'testegestor@example.com' },
          password: { type: 'string', example: 'teste@123' },
          role: { type: 'string', enum: ['employee', 'manager'], example: 'manager' },
          manager_id: { type: 'integer', example: 1 },
        },
        required: ['name', 'email', 'password'],
      },
      LoginRequest: {
        type: 'object',
        properties: {
          email: { type: 'string', example: 'testegestor@example.com' },
          password: { type: 'string', example: 'teste@123' },
        },
        required: ['email', 'password'],
      },
      AuthResponse: {
        type: 'object',
        properties: {
          user: {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              name: { type: 'string', example: 'Teste Gestor' },
              email: { type: 'string', example: 'testegestor@example.com' },
              role: { type: 'string', example: 'manager' },
              manager_id: { type: ['integer', 'null'], example: null },
              vacation_balance: { type: 'integer', example: 30 },
            },
          },
          token: { type: 'string' },
        },
      },
      VacationRequestCreate: {
        type: 'object',
        properties: {
          start_date: { type: 'string', format: 'date', example: '2026-06-10' },
          end_date: { type: 'string', format: 'date', example: '2026-06-15' },
          total_days: { type: 'integer', example: 6 },
        },
        required: ['start_date', 'end_date', 'total_days'],
      },
      VacationRequestDecision: {
        type: 'object',
        properties: {
          action: { type: 'string', enum: ['approved', 'rejected', 'cancelled'], example: 'approved' },
          manager_comment: { type: 'string', example: 'Aprovado pelo gestor.' },
        },
        required: ['action'],
      },
      VacationRequest: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          user_id: { type: 'integer', example: 2 },
          user_name: { type: 'string', example: 'Teste Funcionario' },
          start_date: { type: 'string', format: 'date', example: '2026-06-10' },
          end_date: { type: 'string', format: 'date', example: '2026-06-15' },
          total_days: { type: 'integer', example: 6 },
          status: { type: 'string', example: 'pending' },
          manager_comment: { type: ['string', 'null'], example: null },
          created_at: { type: 'string', format: 'date-time', example: '2026-05-18T12:00:00.000Z' },
        },
      },
    },
  },
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Registrar novo usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterRequest' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Usuário registrado com sucesso',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthResponse' },
              },
            },
          },
          '400': { description: 'Dados inválidos' },
          '409': { description: 'Email já cadastrado' },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login de usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Login bem-sucedido',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthResponse' },
              },
            },
          },
          '401': { description: 'Credenciais inválidas' },
        },
      },
    },
    '/vacations': {
      get: {
        tags: ['Vacations'],
        summary: 'Listar solicitações de férias',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Lista de solicitações retornada',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/VacationRequest' },
                },
              },
            },
          },
          '401': { description: 'Token não fornecido ou inválido' },
        },
      },
      post: {
        tags: ['Vacations'],
        summary: 'Criar nova solicitação de férias',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/VacationRequestCreate' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Solicitação criada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/VacationRequest' },
              },
            },
          },
          '400': { description: 'Dados inválidos ou saldo insuficiente' },
          '401': { description: 'Token não fornecido ou inválido' },
        },
      },
    },
    '/vacations/{id}/decision': {
      put: {
        tags: ['Vacations'],
        summary: 'Decidir solicitação de férias',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
            description: 'ID da solicitação',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/VacationRequestDecision' },
            },
          },
        },
        responses: {
          '200': { description: 'Decisão registrada' },
          '400': { description: 'Ação inválida ou status não pendente' },
          '401': { description: 'Token não fornecido ou inválido' },
          '403': { description: 'Aprovação somente para gestores' },
          '404': { description: 'Solicitação não encontrada' },
        },
      },
    },
  },
};
