document.addEventListener('DOMContentLoaded', () => {
    const route = document.getElementById('route');
    const selectedSeatsElem = document.getElementById('selected-seats');
    const baggageCountElem = document.getElementById('baggage-count');
    const totalPriceElem = document.getElementById('total-price');
    const payBtn = document.getElementById('pay-btn');
    const installmentsContainer = document.getElementById('installments-container');
    const installmentsSelect = document.getElementById('installments');
    const accountIcon = document.getElementById("accountIcon");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const checkinButton = document.getElementById("checkinButton");

    checkinButton.addEventListener("click", () => {
        window.location.href = "checkin.html";
    });

    accountIcon.addEventListener("click", () => {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (event) => {
        if (!accountIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });

    // Recupera os dados do sessionStorage
    const selectedSeats = JSON.parse(sessionStorage.getItem('assentosSelecionados')).map(seat => seat.id);
    const totalPrice = sessionStorage.getItem('totalBagagens') ? 
        parseInt(sessionStorage.getItem('totalBagagens')) * 100 + 
        selectedSeats.reduce((total, seat) => total + JSON.parse(sessionStorage.getItem('assentosSelecionados')).find(s => s.id === seat).valor, 0) : 
        0;

    const baggageCount = sessionStorage.getItem('totalBagagens') || 0;

    const departureLocation = sessionStorage.getItem('localSaida') || 'São Paulo';
    const arrivalLocation = sessionStorage.getItem('localDestino') || 'Rio de Janeiro';

    route.innerText = `${departureLocation} ➔ ${arrivalLocation}`;
    selectedSeatsElem.innerText = selectedSeats.join(', ');
    baggageCountElem.innerText = baggageCount;
    totalPriceElem.innerText = `R$ ${totalPrice}`;

    // Mostrar parcelas apenas quando a opção de crédito for selecionada
    document.getElementById('payment-method').addEventListener('change', function () {
        const paymentMethod = this.value;
        if (paymentMethod === 'credit-card') {
            installmentsContainer.style.display = 'block';
            updateInstallmentsPrice(); // Atualiza o valor já no momento da escolha do crédito
        } else {
            installmentsContainer.style.display = 'none';
            totalPriceElem.innerText = `R$ ${totalPrice}`; // Restaura o preço total se não for crédito
        }
    });

    // Atualiza o valor parcelado toda vez que o número de parcelas for alterado
    installmentsSelect.addEventListener('change', updateInstallmentsPrice);

    // Função para atualizar o preço de acordo com o número de parcelas
    function updateInstallmentsPrice() {
        const installments = parseInt(installmentsSelect.value);
        const installmentPrice = (totalPrice / installments).toFixed(2);
        totalPriceElem.innerText = `R$ ${installmentPrice} x${installments}`;
    }

    payBtn.addEventListener('click', () => {
        const paymentMethod = document.getElementById('payment-method').value;
        if (paymentMethod) {
            let finalPrice = totalPrice;
            if (paymentMethod === 'credit-card') {
                const installments = parseInt(installmentsSelect.value);
                finalPrice = (totalPrice / installments).toFixed(2);
                totalPriceElem.innerText = `R$ ${(finalPrice)} x${installments}`;
            }

            alert('Pagamento realizado com sucesso!');
            const codigodecheckin = Math.random().toString(36).substr(2, 9).toUpperCase();
            const cod_subs = document.getElementById("cod_subs");
            const a = document.getElementById("a");
            cod_subs.textContent = "Código de Check-in: " + codigodecheckin;
            a.textContent = "Voltar para tela inicial.";
            sessionStorage.setItem('codigodecheckin', codigodecheckin);
        } else {
            alert('Por favor, selecione uma forma de pagamento.');
        }
    });
});
