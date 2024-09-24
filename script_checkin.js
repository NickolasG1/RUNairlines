const checkinButton = document.getElementById("checkinButton");

checkinButton.addEventListener("click", () => {
    window.location.href = "checkin.html";
});


    // Exibe/oculta o menu drop-down ao clicar no ícone da conta
    accountIcon.addEventListener("click", () => {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    // Oculta o menu drop-down se o usuário clicar fora dele
    document.addEventListener("click", (event) => {
        if (!accountIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        const veriBtn = document.getElementById('veri-btn');
        const checkinCaixa = document.getElementById('checkin_caixa');
        const verificationResult = document.getElementById('verification-result');
    
        veriBtn.addEventListener('click', () => {
            const userInputCode = checkinCaixa.value;
            const storedCode = sessionStorage.getItem('codigodecheckin');
    
            if (userInputCode === storedCode) {
                verificationResult.textContent = "Código de Check-in verificado com sucesso!";
                verificationResult.style.color = "green";
            } else {
                verificationResult.textContent = "Código de Check-in inválido. Tente novamente.";
                verificationResult.style.color = "red";
            }
    
            // Adiciona a classe para mostrar a mensagem
            verificationResult.classList.add('show');
    
            // Opcional: Limpa o campo após a verificação
            checkinCaixa.value = "";
        });
    });
    