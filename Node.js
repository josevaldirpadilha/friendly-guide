const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// Simular pagamentos validos
const validPayments = ["chavePixExemplo123", "testePagamento456"];

// Rota para validar o pagamento
app.post("/validate-payment", (req, res) => {
    const { pixKey } = req.body;

    if (validPayments.includes(pixKey)) {
        const token = generateToken(); // Gere um token �nico
        return res.json({ success: true, token });
    } else {
        return res.status(400).json({ success: false, message: "Pagamento n�o encontrado." });
    }
});

// Fun��o para gerar um token
function generateToken() {
    return Math.random().toString(36).substring(2);
}

// Rota segura para download
app.get("/download", (req, res) => {
    const token = req.query.token;

    // Valida��o do token (simula��o; em produ��o, valide no banco de dados)
    if (token !== "valid-token") {
        return res.status(403).json({ success: false, message: "Acesso negado." });
    }

    const filePath = path.join(__dirname, "protected/livro.pdf");
    res.download(filePath, "livro.pdf", (err) => {
        if (err) {
            console.error("Erro ao enviar o arquivo:", err);
            res.status(500).json({ success: false, message: "Erro ao enviar o arquivo." });
        }
    });
});

// Inicia o servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
