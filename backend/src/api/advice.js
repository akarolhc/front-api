const AdviceController = require('../controller/advice');

class AdviceApi {
    async createAdvice(req, res) {
        const { Advice } = req.body;

        try {
            const createdAdvice = await AdviceController.createAdvice(Advice);
            return res.status(201).send(createdAdvice);
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar conselho: ${e.message}` });
        }
    }

    async updateAdvice(req, res) {
        const { id } = req.params;
        const { Advice } = req.body;

        try {
            const updatedAdvice = await AdviceController.updateAdvice(Number(id), Advice);
            return res.status(200).send(updatedAdvice);
        } catch (e) {
            return res.status(400).send({ error: `Erro ao alterar conselho: ${e.message}` });
        }
    }

    async deleteAdvice(req, res) {
        const { id } = req.params;

        try {
            await AdviceController.deleteAdvice(Number(id));
            return res.status(204).send();
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar conselho: ${e.message}` });
        }
    }

    async findAdvices(req, res) {
        try {
            const Advices = await AdviceController.findAdvices();
            return res.status(200).send(Advices);
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar conselho: ${e.message}` });
        }
    }

    async login(req, res) {
        const { email, senha } = req.body;
        console.log(req.body);

        try {
            const token = await AdviceController.login(email, senha);
            return res.status(200).send({ token });
        } catch (e) {
            return res.status(400).send({ error: `Erro ao fazer login: ${e.message}` });
        }
    }
}

module.exports = AdviceApi;
