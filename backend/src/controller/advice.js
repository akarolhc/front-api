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
    const advices = await adviceModel.findAll({ attributes: ["id"] });
    
    const ids = advices.map((advice) => advice.id);

    console.log("IDs encontrados:", ids);

    if (ids.length === 0) {
      throw new Error("Nenhum conselho encontrado");
    }

    const randomIndex = Math.floor(Math.random() * ids.length);
    const randomId = ids[randomIndex];

    const response = await this.findById(randomId);

    console.log("Resposta:", response);

    if (!response || !response.dataValues) {
      throw new Error("Erro ao buscar conselho");
    }

    return response;
  }

  async findAllAdvices() {
    return await adviceModel.findAll({
      order: [["advice", "ASC"]],
    });
  }

  async alimentarConselhos() {
    const page = 1;
    const limit = 100;

    const offset = (page - 1) * limit;

    console.log("AAA");

    const AdviceValue = await adviceModel.findAll({
      limit: limit,
      offset: offset,
    });

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    for (let i = 0; i < 100; i++) {
      try {
        const response = await fetch(
          `https://api.adviceslip.com/advice`,
          requestOptions
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar conselhos");
        }

        const data = await response.json();
        adviceModel.create({
          advice: data.slip.advice,
        });
      } catch (error) {
        console.error(error);
      }
    }

    const count = AdviceValue.length;
    const pages = Math.ceil(count / limit);

    const result =
      page <= pages
        ? {
            info: {
              count: count,
              pages: pages,
              next: pages == page ? null : `https://api.adviceslip.com/advice`,
              prev: page == 1 ? null : `https://api.adviceslip.com/advice`,
            },
            results: AdviceValue,
          }
        : {
            info: {
              count: count,
              pages: pages,
              next: `https://api.adviceslip.com/advice`,
              prev: `https://api.adviceslip.com/advice`,
            },
            results: [],
          };

    return result;
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
