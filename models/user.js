const { ValidationError, RecordNotFoundError } = require('../error-types');
const db = require('../db');

const findOne = async (id, failIfNotFound = true) => {
  const rows = await db.query(`SELECT * FROM users WHERE id = ?`, [id]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError('users', id);
  return null;
};

const emailAlreadyExists = async (email) => {
  console.log('checking email existence for', email);
  // TODO
};

const validate = async (attributes) => {
  console.log('validating user attributes : ', attributes);
  const valid = false;
  if (!valid) {
    throw new ValidationError();
  }
  // TODO
};

const hashPassword = async (user) => {
  console.log('hashing password for user : ', user);
  // TODO
};

const create = async (newAttributes) => {
  console.log('creating user : ', newAttributes);
  // TODO
};

const verifyPassword = async (user, plainPassword) => {
  console.log('verifying password for user : ', user);
  console.log('against non-encrypted password : ', plainPassword);
  // TODO
};

module.exports = {
  validate,
  create,
  emailAlreadyExists,
  findOne,
  hashPassword,
  verifyPassword,
};
