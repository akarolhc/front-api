const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "exemplo";
const SALT_VALUE = 10;

class UserController {
  async createUser(name, email, password, role) {
    if (!name || !email || !password || !role) {
      throw new Error("Nome, email e senha são obrigatórios.");
    }

    const cypherSenha = await bcrypt.hash(String(password), SALT_VALUE);

    const userValue = await user.create({
      name,
      email,
      password: cypherSenha,
      role,
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

  async findOne(id) {
    if (id === undefined) {
      throw new Error("");
    }

    const userValue = await user.findOne({ where: { id } });

    if (!userValue) {
      throw new Error("Usuário não encontrado.");
    }

    return userValue;
  }

  async findUsers() {
    return await user.findAll(); // Obtém todos os usuários do banco de dados
  }

  async update(id, name, email, password, situacao) {
    const oldUser = await user.findByPk(id);
    if (email) {
      const sameEmail = await user.findOne({ where: { email } });
      if (sameEmail && sameEmail.id !== id) {
        throw new Error("Email já cadastrado.");
      }
    }
    oldUser.name = name || oldUser.name;
    oldUser.email = email || oldUser.email;
    oldUser.situacao = situacao || oldUser.situacao;
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

  async login(email, password) {
    if (!email || !password) {
      throw new Error("Email e senha são obrigatórios.");
    }
  
    const userValue = await user.findOne({ where: { email } });
  
    if (!userValue) {
      throw new Error("[1] Usuário e senha inválidos.");
    }
  
    if (userValue.situacao === "inativo") {
      throw new Error("Usuário inativo.");
    }
  
    const senhaValida = await bcrypt.compare(String(password), userValue.password);
    if (!senhaValida) {
      throw new Error("[2] Usuário e senha inválidos.");
    }

    return jwt.sign({ id: userValue.id, role: userValue.role }, SECRET_KEY, {
      expiresIn: 60 * 60, 
    });
  }
  
}

module.exports = new UserController();