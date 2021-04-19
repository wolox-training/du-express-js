module.exports = {
  '/users': {
    post: {
      tags: ['Users'],
      summary: 'Sign up user',
      description: 'Sign up user',
      operationId: 'signUp',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'User registered',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserResponse'
              }
            }
          }
        },
        400: {
          description: 'Missing parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: "the field 'email' is required",
                internal_code: 'input_data_error'
              }
            }
          }
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'inner exception from server',
                internal_code: 'default_error'
              }
            }
          }
        },
        503: {
          description: 'Database error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'Error creating user.',
                internal_code: 'database_error'
              }
            }
          }
        }
      }
    }
  }
};
