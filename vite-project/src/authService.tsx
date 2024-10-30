export const authService = {
    logout: async () => {
        //Exibir a mensagem de "Desconectando...":
        const logoutMessage = document.getElementById('logout-message');
        if (logoutMessage) {
            logoutMessage.style.display = 'block';
        }

        //Aguardar 3 segundos antes de redirecionar:
        await new Promise(resolve => setTimeout(resolve, 1000));

        //Remover token e outros dados do usuário:
        localStorage.removeItem('americanos.token');
        sessionStorage.clear();

        //Redirecionar para a página de login:
        window.location.href = '/';
    }
};

