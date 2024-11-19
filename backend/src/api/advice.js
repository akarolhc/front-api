const AdviceController = require("../controller/advice");

class AdviceApi {
  async createAdvice(req, res) {
    const { advice } = req.body;

    try {
      const createdAdvice = await AdviceController.createAdvice(advice);
      return res.status(201).send(createdAdvice);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao criar conselho: ${e.message}` });
    }
  }

  async updateAdvice(req, res) {
    const {id} = req.params;
    const {advice} = req.body;

    try {
      const updatedAdvice = await AdviceController.updateAdvice(
        id,
        advice
      );
      return res.status(200).send(updatedAdvice);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao alterar conselho: ${e.message}` });
    }
  }

  async deleteAdvice(req, res) {
    const { id } = req.params;

    try {
      await AdviceController.deleteAdvice(Number(id));
      return res.status(204).send();
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao deletar conselho: ${e.message}` });
    }
  }

  async findAdvices(req, res) {
    try {
      const Advices = await AdviceController.findAllAdvices();
      return res.status(200).send(Advices);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao listar conselho: ${e.message}` });
    }
  }

  async findById(req, res) {
    const { id } = req.params;
    try {
      const advice = await AdviceController.findById(Number(id));
      return res.status(200).send(advice);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao listar conselho: ${e.message}` });
    }
  }

  async findOne(req, res) {
    try {
      const advice = await AdviceController.findOne();
      return res.status(200).send(advice);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao listar conselho: ${e.message}` });
    }
  }
}

module.exports = new AdviceApi();
