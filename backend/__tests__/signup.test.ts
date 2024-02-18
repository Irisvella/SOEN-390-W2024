import express from 'express';
import request from 'supertest';

import signupRouter from '../routes/signup'; 
import prisma from '../prisma/client'; 
import bcrypt from 'bcryptjs';

// Mocks the prisma client to prevent any actual database changes during testing
jest.mock('../prisma/client', () => ({
  users: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
  public_users: {
    create: jest.fn(),
  },
  management_companies: {
    create: jest.fn(),
  },
  $transaction: jest.fn(async (cb) => {
    await cb();
  }),
}));

// Mock bcrypt to prevent actual password hashing during testing
jest.mock('bcryptjs', () => ({
  hash: jest.fn((_, __, callback) => {
    callback(null, 'hashed_password');
  }),
}));

// Creates a new express app instance and use the signupRouter for testing
const app = express();
app.use(express.json());
app.use('/signup', signupRouter); //attaches the signupRouter to the /signup route


// the describe blocks defines the test suite for the signup functions for public users
describe('POST /signup/public-user', () => {
  it('should create a new public user with valid data', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      phone: '1234567890',
    };

    // Mock findFirst to simulate no existing user
    (prisma.users.findFirst as jest.Mock).mockResolvedValueOnce(null);

    // Mock simulates user creation and public_user creation. 
    (prisma.users.create as jest.Mock).mockResolvedValueOnce({ id: 1 });
    (prisma.public_users.create as jest.Mock).mockResolvedValueOnce({});

    //POST request to the /signup/public-user endpoint
    const response = await request(app).post('/signup/public-user').send(userData);

    // assertion/expects
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('User created successfully');
    expect(prisma.users.create).toHaveBeenCalledWith({
      data: {
        email: userData.email,
        hashed_password: 'hashed_password',
      },
    });
  });

  it('should not create a user if they already exist', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      phone: '1234567890',
    };

    // Mock findFirst to simulate existing user
    (prisma.users.findFirst as jest.Mock).mockResolvedValueOnce(userData);

    // returns error message since  user already exists
    const response = await request(app).post('/signup/public-user').send(userData);
    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe('User already exists');
  });

  //additional test cases: s

});

 // TODO Company sign up tests