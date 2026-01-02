/* PORTAL DICAS DO FERNANDO - SCRIPT PRINCIPAL
   Contém: Menu Mobile, Header Inteligente, Trena e Ícones
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. INICIALIZAR ÍCONES (LUCIDE)
    // Verifica se a biblioteca foi carregada antes de executar
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- 2. CONTROLE DO MENU MOBILE ---
    const menuBtn = document.getElementById('menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Função para abrir/fechar o menu
    function toggleMenu() {
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
            
            // Opcional: Bloquear o scroll do corpo quando o menu está aberto
            document.body.style.overflow = mobileMenu.classList.contains('hidden') ? 'auto' : 'hidden';
        }
    }

    // Event Listeners para o Menu
    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);
    
    // Fechar o menu ao clicar num link (para navegar na mesma página)
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // --- 3. SCROLL INTELIGENTE (HEADER + TRENA) ---
    const header = document.getElementById('main-header');
    const trenaContainer = document.getElementById('trena-container');
    const trenaBar = document.getElementById("trena-bar");
    const trenaNum = document.getElementById("trena-number");
    
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        // Obtém a posição atual do scroll (compatibilidade cross-browser)
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // A. Lógica do Header (Esconder ao descer, Mostrar ao subir)
        if (header) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Descendo: Esconde (-100% no eixo Y)
                header.style.transform = 'translateY(-100%)';
            } else {
                // Subindo ou no topo: Mostra (0 no eixo Y)
                header.style.transform = 'translateY(0)';
            }
        }
        
        // Atualiza a última posição de scroll, garantindo que não seja negativa
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        // B. Lógica da Trena (Barra de Progresso)
        if (trenaContainer && trenaBar && trenaNum) {
            // Só mostra a trena depois de rolar 50px
            if (scrollTop > 50) {
                trenaContainer.style.display = 'block';
                
                // Cálculos matemáticos da página
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100; // Porcentagem 0 a 100
                
                // Aplica a largura
                trenaBar.style.width = scrolled + "%";
                
                // Simula a medida em CM (multiplicador x5 para parecer real)
                trenaNum.innerText = Math.round(scrolled * 5); 
            } else {
                trenaContainer.style.display = 'none';
            }
        }
    });
});