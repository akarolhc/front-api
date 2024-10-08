const express = require("express");
const cors = require("cors");
const database = require("../backend/src/config/database");

const UserApi = require("./src/api/user");
const UserRouter = require("./src/routes/user");
const AdviceRouter = require("./src/routes/advice");
const authMiddleware = require("./src/middleware/auth");
const UserModel = require("./src/model/user");

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

// Rotas sem token
app.post("/api/v1/login", UserApi.login);
app.post("/api/v1/user", UserApi.createUser);
app.post("/api/v1/user/admin", authMiddleware(['admin']), UserApi.createUserAdmin);

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/advice", AdviceRouter);

// Função assíncrona para criar usuário administrador
const createAdminUser = async () => {
  try {
    // Verificar se existe um usuário administrador
    const adminUser = await UserModel.findOne({ where: { role: 'admin' } });

    if (!adminUser) {
      // Criar usuário administrador padrão
      await UserModel.create({
        name: "Admin",
        email: "admin@example.com",
        password: "admin123", // Lembre-se de usar bcrypt para hashear a senha
        role: "admin",
      });
      console.log("Usuário administrador criado com sucesso");
    } else {
      console.log("Usuário administrador já existe");
    }
  } catch (error) {
    console.error("Erro ao criar usuário administrador:", error);
  }
};

database.db
  .sync({ force: false })
  .then(async (_) => {
    await createAdminUser(); // Chamar a função de criação do admin

    if (!process.env.TEST) {
      app.listen(8080, (_) => {
        console.log("Server running on port 8080");
      });
    }
  })
  .catch((e) => {
    console.error(`Erro ao inicializar o banco de dados: ${e}`);
  });

module.exports = app;
