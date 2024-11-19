const UserController = require("../controller/user");

class UserApi {
  async createUser(req, res) {
    const { name, email, password } = req.body;

    try {
      const user = await UserController.createUser(
        name,
        email,
        password,
        "viewer"
      );
      return res.status(201).send(user);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao criar usuário ${e.message}` });
    }
  }
  async createUserAdmin(req, res) {
    const { name, email, password } = req.body;

    try {
      const user = await UserController.createUser(
        name,
        email,
        password,
        "admin"
      );
      return res.status(201).send(user);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao criar usuário ${e.message}` });
    }
  }

  async updateUser(req, res) {
    const id = req.params.id || req.session.id;
    const { name, email, password, situacao } = req.body;
    try {
      const user = await UserController.update(
        Number(id),
        name,
        email,
        password,
        situacao || "ativo"
      );
      return res.status(200).send(user);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao alterar usuário ${e.message}` });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;

    try {
      await UserController.delete(Number(id));
      return res.status(204).send();
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao deletar usuário ${e.message}` });
    }
  }

  async findUsers(req, res) {
    try {
      const users = await UserController.findUsers();
      return res.status(200).send(users);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao listar usuário ${e.message}` });
    }
  }

  async findOneUser(req, res) {
    const id = req.params.id || req.session.id;

    try {
      const user = await UserController.findOne(Number(id));
      return res.status(200).send(user);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao listar usuário ${e.message}` });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const token = await UserController.login(email, password);

      res.status(200).send({ token });
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }
}

module.exports = new UserApi();
