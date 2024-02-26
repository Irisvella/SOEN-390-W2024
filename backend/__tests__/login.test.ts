import request from 'supertest';
import { app } from './setup.test'; // Import the app from your setup.test.ts file
import prisma from '../prisma/client'; // Adjust the import path as necessary
import bcrypt from 'bcryptjs';

jest.mock('bcryptjs', () => ({
  compareSync: jest.fn(),
}));


  describe('POST /login for users', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Clear mocks between tests to ensure a clean slate
    });
    it('should allow a public user to login with correct credentials', async () => {
      // Mock data to represent a public user
      const mockPublicUser = {
        id: 1,
        email: 'test@mail.com',
        hashed_password: 'hashed_password',
        username: 'testuser',
        phone: '1234567890',
        profile_image_key: 'image_key',
      };
  
      // Mock data for the response of the public_users findFirst query
      const mockPublicUserDetails = {
        id: 1,
        email: 'test@mail.com',
        hashed_password: 'hashed_password',
        username: 'testuser',
        phone: '1234567890',
        profile_image_key: 'image_key',
      };
  
      // Mock prisma to simulate finding the user
      (prisma.users.findFirst as jest.Mock).mockResolvedValueOnce(mockPublicUser);
  
      // Mock bcrypt to simulate password check
      (bcrypt.compareSync as jest.Mock).mockReturnValueOnce(true);
  
      // Mock prisma to simulate finding public user details
      (prisma.public_users.findFirst as jest.Mock).mockResolvedValueOnce(mockPublicUserDetails);
  
      // Perform the login request with supertest
      const response = await request(app)
        .post('/login')
        .send({ role: 'publicUser', email: mockPublicUser.email, password: '1234567890' });
  
      // Assertions to check if the response is as expected
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token'); // Check if the token is returned
      expect(response.body.data).toEqual({
        username: mockPublicUserDetails.username,
        imageKey: mockPublicUserDetails.profile_image_key,
      });
    });

    it('should not allow a public user to login with incorrect password', async () => {
        const mockUser = {
            id: 1,
            email: 'public@example.com',
            hashed_password: 'hashed_password',
          };
      
          // Mock prisma's findFirst to simulate finding the user but with an incorrect password
          (prisma.users.findFirst as jest.Mock).mockResolvedValueOnce(mockUser);
      
          // Mock bcrypt.compareSync to return false for an incorrect password
          (bcrypt.compareSync as jest.Mock).mockReturnValueOnce(false);
      
          // Attempt to login with an incorrect password
          const response = await request(app)
            .post('/login')
            .send({ role: 'publicUser', email: 'public@example.com', password: 'wrong_password' });
      
          // Assertions to ensure login fails with incorrect password
          expect(response.statusCode).toBe(401);
          expect(response.body.message).toBe('Incorrect password');
        });
      
        it('should not allow a public user to login if they do not exist', async () => {
          // Mock prisma's findFirst to simulate the user not being found
          (prisma.users.findFirst as jest.Mock).mockResolvedValueOnce(null);
      
          // Attempt to login with a non-existent user email
          const response = await request(app)
            .post('/login')
            .send({ role: 'publicUser', email: 'nonexistent@example.com', password: 'password123' });
      
          // Assertions to ensure login fails for a non-existent user
          expect(response.statusCode).toBe(401);
          expect(response.body.message).toBe('User does not exist');
        });
      });

describe('POST /login for companies', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('should allow a management company to login with correct credentials', async () => {
    const mockCompanyUser = {
      id: 2,
      email: 'companytest@mail.com',
      hashed_password: 'hashed_password',
    };

    const mockCompanyDetails = {
      id: 2,
      company_name: 'testcompany',
      phone: '1234567890',

    };

    //Mocks
    (prisma.users.findFirst as jest.Mock).mockResolvedValueOnce(mockCompanyUser);
    (bcrypt.compareSync as jest.Mock).mockReturnValueOnce(true);
    (prisma.management_companies.findFirst as jest.Mock).mockResolvedValueOnce(mockCompanyDetails);


    const response = await request(app)
      .post('/login')
      .send({ role: 'company', email: mockCompanyUser.email, password: 'correctPassword' });


    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token'); 
    expect(response.body.data).toEqual({
      companyName: mockCompanyDetails.company_name,
    });
  });

  it('should not allow a management company to login with incorrect password', async () => {
    const mockCompanyEmail = 'company@example.com';

    // Mock prisma for user lookup to simulate finding the user
    (prisma.users.findFirst as jest.Mock).mockResolvedValueOnce({
      id: 1,
      email: mockCompanyEmail,
      hashed_password: 'hashed_password',
    });

    // Mock bcrypt to simulate password check failing
    (bcrypt.compareSync as jest.Mock).mockReturnValueOnce(false);

    // Perform the login request with incorrect password
    const response = await request(app)
      .post('/login')
      .send({ role: 'company', email: mockCompanyEmail, password: 'incorrectPassword' });

    // Assertions
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Incorrect password');
  });

  it('should not allow a company to login if they do not exist', async () => {
    (prisma.users.findFirst as jest.Mock).mockResolvedValueOnce(null);

    const response = await request(app)
      .post('/login')
      .send({ role: 'company', email: 'nonexistent@example.com', password: 'password123' });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('User does not exist');
  });



});