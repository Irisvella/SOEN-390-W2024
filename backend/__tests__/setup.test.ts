import express from 'express';
import signupRouter from '../routes/signup';
import logInRouter from '../routes/login';
import prisma from '../prisma/client';
import bcrypt from 'bcryptjs';

// Put mocks here
jest.mock('../prisma/client', () => ({
    users: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
    public_users: {
      create: jest.fn(),
      findFirst: jest.fn().mockImplementation(() => {
        return Promise.resolve( {
            id: 1,
            email: 'test@mail.com',
            hashed_password: 'hashed_password',
            username: 'testuser',
            phone: '1234567890',
            profile_image_key: 'image_key',
        })})
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
    compareSync: jest.fn().mockReturnValue(true), // or false, depending on the test
  }));

  
const app = express();
app.use(express.json());
app.use('/signup', signupRouter);
app.use('/login', logInRouter);

export { app };
