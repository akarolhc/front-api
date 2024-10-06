const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "exemplo";
const SALT_VALUE = 10;

class UserController {
  async createUser(name, email, password, role ) {
    if (!name || !email || !password || !role) {
      throw new Error("Nome, email e senha são obrigatórios.");
    }

    const cypherSenha = await bcrypt.hash(String(password), SALT_VALUE);

    const userValue = await user.create({
      name,
      email,
      role,
      password: cypherSenha,
    });

    return userValue;
  }

  async findUser(id) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }

    const userValue = await user.findByPk(id);

    if (!userValue) {
      throw new Error("Usuário não encontrado.");
    }

    return userValue;
  }

  async update(id, name, email, password) {
    const oldUser = await user.findByPk(id);
    if(email){
      const sameEmail = await user.findOne({ where: { email } });
      if (sameEmail && sameEmail.id !== id) {
        throw new Error("Email já cadastrado.");
      }
    }
    oldUser.name = name || oldUser.name;
    oldUser.email = email || oldUser.email;
    oldUser.password = password
      ? await bcrypt.hash(String(password), SALT_VALUE)
      : oldUser.password;
    oldUser.save();

    return oldUser;
  }

  async delete(id) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }
    const userValue = await this.findUser(id);
    userValue.destroy();

    return;
  }

  async find() {
    return user.findAll();
  }

  async login(email, password) {
    if (email === undefined || password === undefined) {
      throw new Error("Email e senha são obrigatórios.");
    }

    const userValue = await user.findOne({ where: { email } });

    if (!userValue) {
      throw new Error("[1] Usuário e senha inválidos.");
    }

    const senhaValida = bcrypt.compare(String(password), userValue.password);
    if (!senhaValida) {
      throw new Error("[2] Usuário e senha inválidos.");
    }

    return jwt.sign({ id: userValue.id }, SECRET_KEY, { expiresIn: 60 * 60 });
  }
}

module.exports = new UserController();