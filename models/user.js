const { ValidationError, RecordNotFoundError } = require('../error-types');
const db = require('../db');

const findOne = async (id, failIfNotFound = true) => {
  const rows = await db.query(`SELECT * FROM users WHERE id = ?`, [id]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError();
  return null;
};

const findByEmail = async (email, failIfNotFound = true) => {
  const rows = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError();
  return null;
};

const emailAlreadyExists = async (email) => {
  console.log('checking email existence for', email);
  // TODO
};

const validate = async (attributes) => {
  console.log('validating user attributes : ', attributes);
  const valid = false;
  // TODO
  if (!valid) {
    throw new ValidationError();
  }
};

const hashPassword = async (user) => {
  console.log('hashing password for user : ', user);
  // TODO
};

const verifyPassword = async (user, plainPassword) => {
  console.log('verifying password for user : ', user);
  console.log('against non-encrypted password : ', plainPassword);
  // TODO
};

const create = async (newAttributes) => {
  console.log('creating user : ', newAttributes);
  // TODO
};

module.exports = {
  validate,
  create,
  emailAlreadyExists,
  findOne,
  findByEmail,
  hashPassword,
  verifyPassword,
};
