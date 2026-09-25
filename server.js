const express = require("express");

const app = express();
const PORT = 3000;

// COLE O WEBHOOK DO DISCORD AQUI
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1552868105112391741/5nMuSsLpnbjvrxsf4i1ra8uA-w39Zn_cAYdYm3Z7dtsKdmcietg9WB94zuvoH8jXqLqb";

app.use(express.json());
app.use(express.static("public"));

app.post("/cadastro", async (req, res) => {
    const { nome, email, idade } = req.body;

    if (!nome || !email || !idade) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos."
        });
    }

    if (DISCORD_WEBHOOK_URL === "COLE_SEU_WEBHOOK_AQUI") {
        return res.status(500).json({
            sucesso: false,
            mensagem: "Configure o Webhook do Discord no server.js."
        });
    }

    try {
        const dados = {
            username: "Bot de Cadastro",

            embeds: [
                {
                    title: "📝 Novo cadastro",
                    color: 5793266,

                    fields: [
                        {
                            name: "👤 Nome",
                            value: nome,
                            inline: true
                        },
                        {
                            name: "📧 E-mail",
                            value: email,
                            inline: true
                        },
                        {
                            name: "🎂 Idade",
                            value: String(idade),
                            inline: true
                        }
                    ],

                    timestamp: new Date().toISOString()
                }
            ]
        };

        const resposta = await fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dados)
        });

        if (!resposta.ok) {
            throw new Error("Discord recusou o webhook.");
        }

        res.json({
            sucesso: true,
            mensagem: "Cadastro realizado com sucesso!"
        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao enviar para o Discord."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Site funcionando em http://localhost:${PORT}`);
});