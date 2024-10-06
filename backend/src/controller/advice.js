const adviceModel = require("../model/advice");

class AdviceController {
    async createAdvice(advice, titule) {
        if (!advice || !titule) {
            throw new Error("Conselho não fornecido");
        }

        const AdviceValue = await adviceModel.create({
            advice,
            titule
        });

        return AdviceValue;
    }

    async findOne(id) {
        if (id === undefined) {
            throw new Error("Id não fornecido");
        }

        const AdviceValue = await adviceModel.findByPk(id);

        if (!AdviceValue) {
            throw new Error("Conselho não encontrado");
        }

        return AdviceValue;
    }

    async findAll(page = 1, limit = 100) {

        const offset = (page - 1) * limit;
        const AdviceValue = await adviceModel.findAll({
            limit: limit,
            offset: offset
        });

        if (page === 1 && AdviceValue.length <= 0) {
            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            for (let i = 0; i < 100; i++) {
            
                try {
                    const response = await fetch(
                        `https://api.adviceslip.com/advice`,
                        requestOptions
                    );

                    if (!response.ok) {
                        throw new Error('Erro ao buscar conselhos');
                    }

                    const data = await response.json();

                    adviceModel.create({
                         advice: data.slip.advice,
                    });
                } catch (error) {
                    console.error(error);
                }
            }
    
        }

        const count = AdviceValue.length;
        const pages = Math.ceil(count / limit);

        const result = page <= pages
            ? {
                info: {
                    count: count,
                    pages: pages,
                    next: pages == page ? null : `https://api.adviceslip.com/advice`,
                    prev: page == 1 ? null : `https://api.adviceslip.com/advice`
                },
                results: AdviceValue
            }
            : {
                info: {
                    count: count,
                    pages: pages,
                    next: `https://api.adviceslip.com/advice`,
                    prev: `https://api.adviceslip.com/advice`
                },
                results: []
            };

        return result;
    }

    async updateAdvice(id, advice, titule) {
        const oldAdvice = await adviceModel.findByPk(id);

        if (!oldAdvice) {
            throw new Error("Conselho não encontrado");
        }

        oldAdvice.advice = advice || oldAdvice.advice;
        oldAdvice.titule = titule || oldAdvice.titule;
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
