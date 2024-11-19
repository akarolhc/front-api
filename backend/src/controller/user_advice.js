const userAdviceModel = require("../model/user_advice");
const adviceModel = require("../model/advice");

class AdviceController {
    async createUserAdvice(adviceId,userId) {
        if (!adviceId || !userId) {
            throw new Error("Conselho e usuário são obrigatórios");
        }

        const userAdviceValue = await userAdviceModel.create({
            adviceId,
            userId
        });

        return userAdviceValue;
    }

    async findById(id) {
        if (id === undefined) {
            throw new Error("Id não fornecido");
        }

        const userAdviceValue = await userAdviceModel.findByPk(id);

        if (!userAdviceValue) {
            throw new Error("Conselho não encontrado");
        }

        return userAdviceValue;
    }

    async findAll(){
        const userAdviceValue = await userAdviceModel.findAll();

        return userAdviceValue;
    }

    async updateUserAdvice(id, adviceId, userId) {
        const oldUserAdvice = await userAdviceModel.findByPk(id);

        if (!oldUserAdvice) {
            throw new Error("Registro não encontrado");
        }

        oldUserAdvice.adviceId = adviceId || oldUserAdvice.adviceId;
        oldUserAdvice.userId = userId || oldUserAdvice.userId;
        await oldUserAdvice.save();

        return oldUserAdvice;
    }

    async deleteUserAdvice(id) {
        if (id === undefined) {
            throw new Error("Id não fornecido");
        }

        const userAdviceValue = await userAdviceModel.findByPk(id);

        if (!userAdviceValue) {
            throw new Error("Conselho não encontrado");
        }

        await userAdviceValue.destroy();

        return;
    }

    async findAdvicesByUserId(id) {
        if (id === undefined) {
            throw new Error("Id não fornecido");
        }
    
        const userAdviceValue = await userAdviceModel.findAll({
            where: {
                userId: id
            },
            include: [
                {
                    model: adviceModel,  // Incluir o modelo adviceModel
                    as: 'advice',        // Alias usado na associação, como definido no modelo
                    attributes: ['advice'] // Campos específicos que você quer da tabela advices
                }
            ]
        });
    
        return userAdviceValue;
    }

    async findAllByAdvice(advice) {
        if (advice === undefined) {
            throw new Error("Conselho não fornecido");
        }

        const userAdviceValue = await userAdviceModel.findAll({
            where: {
                adviceId: advice
            }
        });

        return userAdviceValue;
    }
}

module.exports = new AdviceController();
