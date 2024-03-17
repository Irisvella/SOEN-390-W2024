
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from './setup.test';
import verifyToken from '../middleware/verify-token';

jest.mock('../middleware/verify-token');
jest.mock('jsonwebtoken');

describe('Profile Routes', () => {
    beforeAll(() => {

      (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
        secret="could_be_anything";
        if (token === "valid-token-company") {
          callback(null, { data: { id: 1, role: 'company', email: 'test@company.com' } });
        } else if (token === "valid-token-publicUser") {
          callback(null, { data: { id: 2, role: 'publicUser', email: 'test@publicuser.com' } });
        } else {
          callback(new Error("jwt malformed"), null);
        }
      });
  
      (verifyToken as jest.Mock).mockImplementation((req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
  
        jwt.verify(token, 'could_be_anything', (err: any, user: any) => {
          if (err) return res.sendStatus(403);
          req.user = user;
          next();
        });
      });
    });
    
    describe('GET /profile', () => {
      it('for company should return company profile successfully', async () => {
        const response = await request(app)
          .get('/profile')
          .set('Authorization', 'Bearer valid-token-company');
  
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
          email: 'test@company.com',
          role: 'company',
        }));
      });
  
    it('without valid token should return unauthorized', async () => {
      const response = await request(app)
        .get('/profile')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.statusCode).toBe(401);
    });
  });

  describe('PUT /profile', () => {
    it('for public user should update successfully', async () => {
      const response = await request(app)
        .put('/profile')
        .send({ userName: 'updatedUser', phoneNumber: '987-654-3210' })
        .set('Authorization', 'Bearer valid-token-publicUser');

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual('Public User profile updated successfully');
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});
