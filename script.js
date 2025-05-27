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

// Script para navegação suave (opcional, mas melhora a UX)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Ajuste o valor de 'offset' se tiver um cabeçalho fixo
            const headerOffset = 80; // Altura aproximada do seu cabeçalho
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
}); 