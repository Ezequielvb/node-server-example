import swaggerJsdoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { env } from './env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Express + PostgreSQL',
      version: '1.0.0',
      description: 'API REST con autenticación JWT, validación Zod, rate limiting y testing completo',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: 'Servidor de desarrollo',
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
        Plan: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nombre: { type: 'string' },
            userId: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
            activities: { type: 'array', items: { type: 'integer' } },
          },
        },
        CreatePlanInput: {
          type: 'object',
          required: ['nombre'],
          properties: {
            nombre: { type: 'string', minLength: 3 },
            activities: { type: 'array', items: { type: 'integer' } },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID del usuario',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario',
            },
            name: {
              type: 'string',
              description: 'Nombre del usuario',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
            },
          },
        },
        RegisterInput: {
          type: 'object',
          required: ['email', 'name', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario',
            },
            name: {
              type: 'string',
              minLength: 2,
              description: 'Nombre del usuario',
            },
            password: {
              type: 'string',
              minLength: 8,
              description: 'Contraseña del usuario',
            },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
            },
            password: {
              type: 'string',
              minLength: 8,
            },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            user: {
              $ref: '#/components/schemas/User',
            },
            token: {
              type: 'string',
              description: 'JWT token',
            },
          },
        },
        UpdateProfileInput: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
            },
            name: {
              type: 'string',
              minLength: 2,
            },
          },
        },
        ChangePasswordInput: {
          type: 'object',
          required: ['currentPassword', 'newPassword'],
          properties: {
            currentPassword: {
              type: 'string',
            },
            newPassword: {
              type: 'string',
              minLength: 8,
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Auth',
        description: 'Endpoints de autenticación',
      },
      {
        name: 'Users',
        description: 'Gestión de usuarios',
      },
      {
        name: 'Planes',
        description: 'Gestión de planes',
      },
    ],
  },
  apis: [join(__dirname, '../modules/**/*.routes.js')],
};

export const swaggerSpec = swaggerJsdoc(options);

/*

POST /api/planes
Descripción: Crear plan (necesita Authorization header).
Códigos:
201 Created — plan creado.
400 Bad Request — validación (Zod) — devuelve { errors: ... }.
401 Unauthorized — sin token o token inválido.
Ejemplo request body:
{
"nombre": "Plan entrenamiento A",
"activities": [1, 2, 3]
}
Ejemplo 201 response:
{
"id": 1,
"nombre": "Plan entrenamiento A",
"createdAt": "2025-11-09T12:12:00.000Z",
"activities": [1,2,3],
"userId": 1
}
Ejemplo 401 response (middleware):
{ "message": "No autorizado" } // o { "message": "Token inválido" }
GET /api/planes/user/{userId}
Descripción: Listar planes de un usuario (solo el mismo usuario puede ver su lista).
Códigos:
200 OK — devuelve array de Plan.
400 Bad Request — userId inválido.
401 Unauthorized — sin token.
403 Forbidden — el userId en la ruta no coincide con el token.
Ejemplo request path: /api/planes/user/1
Ejemplo 200 response:
[
{ "id": 1, "nombre": "Plan A", "createdAt":"...", "activities":[1,2], "userId":1 },
{ "id": 2, "nombre": "Plan B", "createdAt":"...", "activities":[3], "userId":1 }
]
Ejemplo 403 response:
{ "message": "Forbidden" }
GET /api/planes/{planId}
Descripción: Obtener detalles de un plan (solo propietario).
Códigos:
200 OK — devuelve Plan.
400 Bad Request — planId inválido.
401 Unauthorized — sin token.
403 Forbidden — no propietario.
404 Not Found — plan no existe.
Ejemplo request path: /api/planes/1
Ejemplo 200 response:
{ "id":1, "nombre":"Plan A", "createdAt":"...", "activities":[1,2], "userId":1 }
Ejemplo 404 response:
{ "message": "Plan no encontrado." }
*/