const ALLOWED_ROLES = ['student', 'teacher'];
const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/user-repository');
const { JWT_SECRET } = process.env;

const generateToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register({ firstName, lastName, email, password, role }) {
    const name = `${firstName} ${lastName}`;

    if (!firstName || !lastName) throw new Error('Name is required');
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');


    if (!ALLOWED_ROLES.includes(role)) {
      throw new Error('Invalid role');
    }

    const existing = await this.userRepository.findByEmail(email);
    if (existing) throw new Error('Email already in use');

    const user = await this.userRepository.create({ name, email, password, role });

    const token = generateToken(user);
    return { token, user };
  }

  async login({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('User not found');

    if (user.password !== password) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user);
    return { token, user };
  }
}

module.exports = UserService;
