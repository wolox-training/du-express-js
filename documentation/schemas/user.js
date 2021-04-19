module.exports = {
  id: {
    type: 'integer',
    description: 'Users identifier',
    example: 1
  },
  firstName: {
    type: 'string',
    description: 'First name of user',
    required: true,
    example: 'Jhon'
  },
  lastName: {
    type: 'string',
    description: 'Last name of user',
    required: true,
    example: 'Doe'
  },
  email: {
    type: 'string',
    description: 'user email from Wolox domain',
    required: true,
    example: 'email@wolox.com'
  },
  password: {
    type: 'string',
    required: true,
    description: 'user password to sign in'
  },
  User: {
    type: 'object',
    properties: {
      first_name: {
        $ref: '#/components/schemas/firstName'
      },
      last_name: {
        $ref: '#/components/schemas/lastName'
      },
      email: {
        $ref: '#/components/schemas/email'
      },
      password: {
        $ref: '#/components/schemas/password'
      }
    }
  },
  Users: {
    type: 'object',
    properties: {
      users: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/User'
        }
      }
    }
  },
  UserResponse: {
    type: 'object',
    properties: {
      id: {
        $ref: '#/components/schemas/id'
      },
      first_name: {
        $ref: '#/components/schemas/firstName'
      },
      last_name: {
        $ref: '#/components/schemas/lastName'
      },
      email: {
        $ref: '#/components/schemas/email'
      }
    }
  },
  Error: {
    type: 'object',
    properties: {
      message: {
        type: 'string'
      },
      internal_code: {
        type: 'string'
      }
    }
  }
};
