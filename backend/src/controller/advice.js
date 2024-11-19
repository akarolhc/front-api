const adviceModel = require("../model/advice");
const userAdviceModel = require("../model/user_advice");

class AdviceController {
  async createAdvice(advice) {
    if (!advice) {
      throw new Error("Conselho não fornecido");
    }

    const AdviceValue = await adviceModel.create({
      advice,
    });

    return AdviceValue;
  }

  async findById(id) {
    if (id === undefined) {
      throw new Error("Id não fornecido");
    }

    const AdviceValue = await adviceModel.findByPk(id);

    if (!AdviceValue) {
      throw new Error("Conselho não encontrado");
    }

    return AdviceValue;
  }

  async findOne() {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    // Faz uma requisição para obter um conselho aleatório
    const response = await fetch(
      `https://api.adviceslip.com/advice`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar conselho");
    }

    const data = await response.json();
    // Retorna o conselho obtido da API
    return data.slip.advice;
  }

  async findAllAdvices() {
    return await adviceModel.findAll();
  }

  async updateAdvice(id, advice) {
    console.log(id);
    const oldAdvice = await adviceModel.findByPk(id);

    console.log(oldAdvice);

    if (!oldAdvice) {
      throw new Error("Conselho não encontrado");
    }

    oldAdvice.advice = advice || oldAdvice.advice;
    await oldAdvice.save();

    return oldAdvice;
  }

  async deleteAdvice(id) {
    if (id === undefined) {
      throw new Error("Id não fornecido");
    }

    const AdviceValue = await adviceModel.findByPk(id);

    if (!AdviceValue) {
      throw new Error("Conselho não encontrado");
    }

    await AdviceValue.destroy();


    return;
  }
}

module.exports = new AdviceController();
