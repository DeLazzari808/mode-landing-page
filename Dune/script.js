// Script para animação de entrada suave das seções
const sections = document.querySelectorAll('.fade-in-section');
const options = {
    threshold: 0.1, // A seção se torna visível quando 10% dela está na viewport
    rootMargin: "0px 0px -50px 0px" // Começa a animar um pouco antes de entrar totalmente na tela
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Não precisa observar mais depois que for visível
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

// Script para navegação suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80; // Altura aproximada do seu cabeçalho fixo
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Script para controlar o vídeo da seção de IA com som baixo (IaVideoTest.mp4)
const aiVideoTest = document.getElementById('aiFeatureVideoTest');
if (aiVideoTest) {
    aiVideoTest.volume = 0.2; // Define o volume para 20% (0.0 para mudo, 1.0 para máximo)

    const videoObserverOptions = {
        root: null, // Observa em relação à viewport
        rootMargin: '0px',
        threshold: 0.5 // Dispara quando 50% do vídeo estiver visível
    };

    const videoIntersectionCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tenta tocar o vídeo quando ele entra na viewport
                const playPromise = aiVideoTest.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        // Autoplay com som pode ser bloqueado pelos navegadores.
                        // O erro é logado no console. Para produção, considere um botão de play.
                        console.warn("Autoplay com som foi impedido para o vídeo de IA (IaVideoTest.mp4):", error);
                    });
                }
            } else {
                // Pausa o vídeo quando ele sai da viewport
                aiVideoTest.pause();
            }
        });
    };

    const videoObserver = new IntersectionObserver(videoIntersectionCallback, videoObserverOptions);
    videoObserver.observe(aiVideoTest); // Começa a observar o elemento de vídeo
} 