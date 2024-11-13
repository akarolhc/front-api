const UserAdviceController = require("../controller/user_advice");

class UserAdviceApi {
  async createUserAdvice(req, res) {
    const {id} = req.session
    const adviceId = req.body.id;

    console.log(id, adviceId)

    try {
      const createdAdvice = await UserAdviceController.createUserAdvice(adviceId, id);
      return res.status(201).send(createdAdvice);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao criar conselho: ${e.message}` });
    }
  }

  async updateUserAdvice(req, res) {
    const { id } = req.params;
    const advice = req.body;
    const userId = req.session.id;

    try {
      const updatedAdvice = await UserAdviceController.updateUserAdvice(
        Number(id),
        advice.advice,
        userId
      );
      return res.status(200).send(updatedAdvice);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao alterar conselho: ${e.message}` });
    }
  }

  async deleteUserAdvice(req, res) {
    const { id } = req.params;

    try {
      await UserAdviceController.deleteUserAdvice(Number(id));
      return res.status(204).send();
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao deletar conselho: ${e.message}` });
    }
  }

  async findAdvices(req, res) {
    try {
      const Advices = await UserAdviceController.findAll();
      return res.status(200).send(Advices);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao listar conselho: ${e.message}` });
    }
  }

  async findAdvicesByUserId(req,res){
    const {id} = req.session
    try{
        const UserAdvices = await UserAdviceController.findAdvicesByUserId(id);
        return res.status(200).send(UserAdvices);
    } catch (e){
        return res.status(400).send({ error: `Erro ao listar conselhos: ${e.message}` });
    }
  }
}

module.exports = new UserAdviceApi();
