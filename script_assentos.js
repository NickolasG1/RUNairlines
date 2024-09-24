document.addEventListener("DOMContentLoaded", () => {
    // Exibe as escolhas do usuário (local de saída e destino)
    const saidaArmazenada = sessionStorage.getItem("localSaida");
    const destinoArmazenado = sessionStorage.getItem("localDestino");
    const accountIcon = document.getElementById("accountIcon");
    const dropdownMenu = document.getElementById("dropdownMenu");
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

    if (saidaArmazenada) {
        document.getElementById("saidah1").textContent = saidaArmazenada;
    }

    if (destinoArmazenado) {
        document.getElementById("destinoh1").textContent = destinoArmazenado;
    }

    // Variáveis para armazenar os assentos e bagagens
    let assentosSelecionados = [];
    let totalBagagens = 0;

    // Funcionalidade de seleção de assentos
    document.querySelectorAll('button.seat').forEach(button => {
        button.addEventListener('click', () => {
            const classe = button.closest('.seat-group').classList.contains('economica') ? 'Econômica' :
                           button.closest('.seat-group').classList.contains('premium') ? 'Premium' : 'Executiva';
            const valor = classe === 'Econômica' ? 1000 : classe === 'Premium' ? 1500 : 2500;

            if (button.classList.contains('selected')) {
                button.classList.remove('selected'); // Deseleciona o assento
                assentosSelecionados = assentosSelecionados.filter(seat => seat.id !== button.id);
            } else {
                button.classList.add('selected'); // Seleciona o assento
                assentosSelecionados.push({ id: button.id, classe, valor });
            }
        });
    });

    // Atualiza o total de bagagens e exibe
    document.getElementById("bagagens").addEventListener('input', (event) => {
        totalBagagens = parseInt(event.target.value) || 0; // Garante que seja um número
        document.getElementById("totalBagagens").textContent = totalBagagens;
    });

    // Função para o botão de finalizar compra
    document.getElementById("finalizar").addEventListener('click', () => {
        if (assentosSelecionados.length === 0) {
            alert("Por favor, selecione pelo menos um assento antes de finalizar a compra."); // Mensagem de alerta
            return; // Impede a navegação para a página de pagamento
        }

        const totalAssentos = assentosSelecionados.reduce((acc, seat) => acc + seat.valor, 0);
        const custoTotal = totalAssentos + (totalBagagens * 100);

        // Armazenar os dados no sessionStorage para acesso futuro
        sessionStorage.setItem("assentosSelecionados", JSON.stringify(assentosSelecionados));
        sessionStorage.setItem("totalBagagens", totalBagagens);
        
        window.location.href = "pagamento.html"; // Navega para a página de pagamento
    });
});
