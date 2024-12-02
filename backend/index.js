const express = require("express");
const cors = require("cors");
const database = require("./src/config/database");

const UserApi = require("./src/api/user");
const UserRouter = require("./src/routes/user");
const AdviceRouter = require("./src/routes/advice");
const UserAdviceRouter = require("./src/routes/user_advice");
const authMiddleware = require("./src/middleware/auth");
const UserModel = require("./src/model/user");
const bcrypt = require("bcrypt")
require("./src/model/association");

const SALT_VALUE = 10;

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.post("/api/v1/login", UserApi.login);
app.post("/api/v1/user", UserApi.createUser);
app.post("/api/v1/user/admin", authMiddleware(['admin']), UserApi.createUserAdmin);

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/advice", AdviceRouter);
app.use("/api/v1/userAdvice", UserAdviceRouter);

const createAdminUser = async () => {
  try {
    const adminUser = await UserModel.findOne({ where: { role: 'admin' } });

    const hashedPassword = await bcrypt.hash('admin', SALT_VALUE);

    if (!adminUser) {
      await UserModel.create({
        name: "Admin",
        email: "admin@admin.com",
        password: hashedPassword,
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
  .sync({ force:  false })
  .then(async (_) => {
    await createAdminUser();

    if (!process.env.TEST) {
      app.listen(3100, (_) => {
        console.log("Server running on port 3100");
      });
    }
  })
  .catch((e) => {
    console.error(`Erro ao inicializar o banco de dados: ${e}`);
  });

module.exports = app;
