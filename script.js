document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    
    // Credenciais armazenadas
    const storedUsername = 'user';
    const storedEmail = 'user1234@gmail.com';
    const storedPassword = '1234';
    
    // Obtém valores inseridos no formulário
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validação simples
    if (username === storedUsername && email === storedEmail && password === storedPassword) {
        window.location.href = "menu.html"; // Redireciona para a página "menu"
    } else {
        document.getElementById('errorMessage').textContent = "Nome, email ou senha incorretos!";
    }
});
