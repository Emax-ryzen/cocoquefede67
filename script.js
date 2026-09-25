const formulario = document.getElementById("cadastroForm");
const botao = document.getElementById("botao");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", async (event) => {

    event.preventDefault();

    const nome =
        document.getElementById("nome").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const idade =
        document.getElementById("idade").value;

    botao.disabled = true;

    mensagem.textContent = "Enviando...";

    try {

        const resposta = await fetch("/cadastro", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nome,
                email,
                idade
            })

        });

        const resultado = await resposta.json();

        if (resultado.sucesso) {

            mensagem.textContent =
                "✅ " + resultado.mensagem;

            formulario.reset();

        } else {

            mensagem.textContent =
                "❌ " + resultado.mensagem;

        }

    } catch (erro) {

        console.error(erro);

        mensagem.textContent =
            "❌ Erro ao conectar ao servidor.";

    }

    botao.disabled = false;
});