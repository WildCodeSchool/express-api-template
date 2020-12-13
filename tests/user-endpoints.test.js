const request = require('supertest');
const faker = require('faker');
const app = require('../app.js');
const User = require('../models/user.js');

const getValidAttributes = () => {
  const password = faker.internet.password();
  return {
    email: faker.unique(faker.internet.email),
    password,
    password_confirmation: password,
  };
};

const createRecord = (attributes) =>
  User.create(attributes || getValidAttributes());

let res;
let payload;

describe(`users endpoints`, () => {
  describe(`POST /users`, () => {
    describe('without request body', () => {
      beforeAll(async () => {
        res = await request(app).post(`/users`);
      });

      it('returns 400 status', async () => {
        expect(res.statusCode).toEqual(400);
      });
    });
    describe('when a valid payload is sent', () => {
      beforeAll(async () => {
        payload = getValidAttributes();
        res = await request(app).post(`/users`).send(payload);
      });

      it('returns 201 status', async () => {
        expect(res.statusCode).toEqual(201);
      });

      it('returns the id of the created user', async () => {
        expect(res.body).toHaveProperty('id');
      });

      it('returned object does not contain passwords', () => {
        expect(res.body.password_confirmation).toBe(undefined);
        expect(res.body.password).toBe(undefined);
        expect(res.body.encrypted_password).toBe(undefined);
      });
    });
    describe('when a user with the same email already exists in DB', () => {
      beforeAll(async () => {
        const validEntity = await createRecord();
        res = await request(app)
          .post(`/users`)
          .send({ ...getValidAttributes(), email: validEntity.email });
      });

      it('returns a 422 status', async () => {
        expect(res.status).toBe(422);
      });

      it('returns an error message', async () => {
        expect(res.body).toHaveProperty('errorMessage');
      });
    });

    describe('when email is not provided', () => {
      beforeAll(async () => {
        res = await request(app).post(`/users`).send({
          password: 'zfeyfgeyfgr',
          password_confirmation: 'zfeyfgeyfgr',
        });
      });

      it('returns a 422 status', async () => {
        expect(res.status).toBe(422);
      });

      it('returns an error message', async () => {
        expect(res.body).toHaveProperty('errorMessage');
      });
    });

    describe('when password is not provided', () => {
      beforeAll(async () => {
        res = await request(app).post(`/users`).send({
          password_confirmation: 'zfeyfgeyfgr',
          email: 'john.doe@gmail.com',
        });
      });

      it('returns a 422 status', async () => {
        expect(res.status).toBe(422);
      });

      it('returns an error message', async () => {
        expect(res.body).toHaveProperty('errorMessage');
      });
    });

    describe('when password_confirmation is not provided', () => {
      beforeAll(async () => {
        res = await request(app).post(`/users`).send({
          password: 'zfeyfgeyfgr',
          email: 'john.doe@gmail.com',
        });
      });

      it('returns a 422 status', async () => {
        expect(res.status).toBe(422);
      });

      it('returns an error message', async () => {
        expect(res.body).toHaveProperty('errorMessage');
      });
    });
  });
});
