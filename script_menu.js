document.addEventListener("DOMContentLoaded", () => {
    const accountIcon = document.getElementById("accountIcon");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const departureSelect = document.getElementById("departure");
    const destinationSelect = document.getElementById("destination");
    const searchButton = document.getElementById("searchButton");
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

    // Locais de saída e destino
    const locations = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Salvador", "Brasília", "Curitiba", "Fortaleza"];

    // Preenche os selects com os locais
    locations.forEach(location => {
        const option1 = document.createElement("option");
        option1.value = location;
        option1.textContent = location;
        departureSelect.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = location;
        option2.textContent = location;
        destinationSelect.appendChild(option2);
    });

    // Filtro ao clicar em "Comprar Passagens"
    searchButton.addEventListener("click", () => {
        const saida = departureSelect.value;
        const destino = destinationSelect.value;

        if (!saida || !destino) {
            alert("Por favor, selecione um local de saída e um local de destino.");
        } else if (saida === destino) {
            alert("O local de saída e o local de destino não podem ser o mesmo.");
        } else {
            // Armazena as escolhas no sessionStorage
            sessionStorage.setItem("localSaida", saida);
            sessionStorage.setItem("localDestino", destino);

            // Redireciona para a página de assentos
            window.location.href = "assentos.html";
        }
    });
});
