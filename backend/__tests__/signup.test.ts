import express from 'express';
import request from 'supertest';
import { app } from './setup.test';
import signupRouter from '../routes/signup'; 
import prisma from '../prisma/client'; 
import bcrypt from 'bcryptjs';



/*
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

*/

// USER TESTS 
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


//COMPANY TESTS
describe('POST /signup/management-company', () => {
  it('should create a new management company with valid data', async () => {
    const companyData = {
      companyName: 'Test Company',
      email: 'company@example.com',
      password: 'securepassword',
      address: '123 Business St.',
      phone: '1234567890',
    };

    // Mock the prisma client responses for this specific test case
    (prisma.users.findFirst as jest.Mock).mockResolvedValueOnce(null); // Simulate no existing company found
    (prisma.users.create as jest.Mock).mockResolvedValueOnce({ id: 1 }); // Simulate user (company) creation in DB
    (prisma.management_companies.create as jest.Mock).mockResolvedValueOnce({}); // Simulate company creation in DB

    // Make a POST request to the signup endpoint with the companyData
    const response = await request(app).post('/signup/management-company').send(companyData);

    // Assertions to check if the response is as expected for successful signup
    expect(response.statusCode).toBe(201); // Expect a 201 status code for successful creation
    expect(response.body.message).toBe('User created successfully'); 
  });

  it('should not create a management company if the email already exists', async () => {
    const companyData = {
      companyName: 'Test Company',
      email: 'company@example.com',
      password: 'securepassword',
      address: '123 Business St.',
      phone: '1234567890',
      };

      (prisma.users.findFirst as jest.Mock).mockResolvedValueOnce({
        email: companyData.email,
      });
      
      // Make a POST request to the signup endpoint with the companyData that already exists
      const response = await request(app).post('/signup/management-company').send(companyData);
      
      // Assertions to check if the response is as expected when a company already exists
      expect(response.statusCode).toBe(409); // Expect a 409 status code for conflict (email already exists)
      expect(response.body.message).toBe('Email already exists'); 
    });
  });