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
      description:
        'API REST con autenticación JWT, validación Zod, rate limiting y testing completo',
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
        // ---------- USER ----------
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'ID del usuario' },
            email: { type: 'string', format: 'email', description: 'Email del usuario' },
            name: { type: 'string', description: 'Nombre del usuario' },
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
            email: { type: 'string', format: 'email', description: 'Email del usuario' },
            name: { type: 'string', minLength: 2, description: 'Nombre del usuario' },
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
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 8 },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            user: { $ref: '#/components/schemas/User' },
            token: { type: 'string', description: 'JWT token' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },

        // ---------- PROFILE ----------
        Profile: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'ID del perfil' },
            username: { type: 'string', description: 'Nombre de usuario visible' },
            bio: { type: 'string', description: 'Biografía del usuario' },
            avatarUrl: {
              type: 'string',
              description: 'URL del avatar del usuario',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Última actualización del perfil',
            },
            userId: { type: 'integer', description: 'ID del usuario asociado' },
          },
        },
        CreateProfileInput: {
          type: 'object',
          required: ['username'],
          properties: {
            username: { 
              type: 'string', 
              minLength: 3, 
              description: 'Nombre de usuario único' 
            },
            bio: { 
              type: 'string', 
              minLength: 5,
              description: 'Biografía del usuario (opcional)' 
            },
            avatarUrl: {
              type: 'string',
              format: 'uri',
              description: 'URL del avatar del usuario (opcional)',
            },
          },
        },
        UpdateProfileInput: {
          type: 'object',
          properties: {
            // Campos de User
            name: { 
              type: 'string', 
              minLength: 2, 
              description: 'Nombre del usuario' 
            },
            email: { 
              type: 'string', 
              format: 'email',
              description: 'Email del usuario' 
            },
            // Campos de Profile
            username: { 
              type: 'string', 
              minLength: 3, 
              description: 'Nombre de usuario visible' 
            },
            bio: { 
              type: 'string', 
              description: 'Biografía del usuario' 
            },
            avatarUrl: {
              type: 'string',
              format: 'uri',
              description: 'URL del avatar del usuario',
            },
          },
        },
        UserWithProfile: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'ID del usuario' },
            email: { type: 'string', format: 'email', description: 'Email del usuario' },
            name: { type: 'string', description: 'Nombre del usuario' },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
            },
            profile: {
              oneOf: [
                { $ref: '#/components/schemas/Profile' },
                { type: 'null' }
              ],
              description: 'Perfil del usuario (puede ser null si no existe)'
            },
          },
        },
        ChangePasswordInput: {
          type: 'object',
          required: ['currentPassword', 'newPassword'],
          properties: {
            currentPassword: { type: 'string', description: 'Contraseña actual' },
            newPassword: {
              type: 'string',
              minLength: 8,
              description: 'Nueva contraseña (mínimo 8 caracteres)',
            },
          },
        },
      },
    },
    tags: [
      { name: 'Auth', description: 'Endpoints de autenticación' },
      { name: 'Users', description: 'Gestión de usuarios' },
      { name: 'Profile', description: 'Gestión del perfil del usuario autenticado' },
    ],
  },
  apis: [join(__dirname, '../modules/**/*.routes.js')],
};

export const swaggerSpec = swaggerJsdoc(options);