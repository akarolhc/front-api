const jwt = require("jsonwebtoken");

function authMiddleware(rules = []) {
  return(req, res, next) =>{
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(400).json({ mensagem: "Token não fornecido" });
  }

  jwt.verify(token, "MeuSegredo123", async (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: "Token inválido" });
    }

    const userLogger = await user.findUser(decoded.id)
    if(!userLogger){
      return res.status(500).json("usuário não encontrado!")
    }
    if(rules.length && !rules.includes(userLogger.rule)){
      return res.status(401).json({ mensagem: "Usuário sem permissão!" });
    }

    req.session = decoded;

    next();
  });
}
}
module.exports = authMiddleware;