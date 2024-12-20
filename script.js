document.addEventListener("DOMContentLoaded", function () {
    const confirmButton = document.getElementById("confirm-button");
    const paymentInput = document.getElementById("payment-confirm");
    const downloadLink = document.getElementById("download-link");
    const downloadSection = document.getElementById("download");

    confirmButton.addEventListener("click", function () {
        const paymentKey = paymentInput.value.trim();

        if (paymentKey === "") {
            alert("Por favor, insira a chave PIX usada para o pagamento.");
            return;
        }

        // Valida o pagamento no backend
        fetch("/validate-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pixKey: paymentKey }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Pagamento confirmado! O download foi liberado.");
                const token = data.token; // Token recebido do backend
                downloadLink.href = `/download?token=${token}`;
                downloadSection.style.display = "block";
            } else {
                alert("Pagamento nao encontrado. Verifique a chave PIX.");
            }
        })
        .catch(error => {
            console.error("Erro ao validar o pagamento:", error);
            alert("Erro ao validar o pagamento. Tente novamente mais tarde.");
        });
    });
});
