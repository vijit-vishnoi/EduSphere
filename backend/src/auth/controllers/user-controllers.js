const UserService = require('../services/user-service');
const userService = new UserService();

const register = async (req, res) => {
  try {
    const { token, user } = await userService.register(req.body);

    res.status(201).json({
      token, 
      user,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { token, user } = await userService.login(req.body);

    res.status(200).json({
      token, 
      user,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};




module.exports = { register, login };
