/**
 * ============================================================================
 * ELÉTRICA PARANÁ - LÓGICA E CONVERSÃO DA LANDING PAGE
 * ============================================================================
 * 
 * Este arquivo controla as interações na página:
 * 1. FAQ Acordeão (Abrir / fechar perguntas)
 * 2. Direcionamento dinâmico de botões de produtos para o formulário
 * 3. Validação e formatação de campos do formulário
 * 4. Rastreamento e tags (GTM/GA4/Pixel via dataLayer)
 * 5. Integração híbrida do Formulário -> WhatsApp (redirecionamento com mensagem)
 */

// CONFIGURAÇÃO DOS PLACEHOLDERS (Substitua pelos valores de produção)
const CONFIG = {
    // Número do WhatsApp que receberá os orçamentos (incluindo DDI 55 + DDD 65 + Número)
    // EXEMPLO DE PRODUÇÃO: "556533880800" (Telefone comercial da Matriz)
    // SUBSTITUIR ANTES DE PUBLICAR
    whatsappNumber: "55659XXXXXXXX", 
};

document.addEventListener("DOMContentLoaded", () => {
    // Inicializar funções principais
    initDarkMode();
    initFaqAccordion();
    initProductCtas();
    initFileInputDecorator();
    initWhatsAppDirectClicks();
    initFormSubmission();
    initBenefitsCarousel();
    initStatsCounter();
    initScrollVideo();
});

/**
 * 1. FAQ ACORDEÃO (Perguntas Frequentes)
 * Permite expandir e recolher as respostas de forma suave, ativando classes CSS corretas.
 */
function initFaqAccordion() {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(question => {
        question.addEventListener("click", () => {
            const item = question.parentNode;
            const isOpen = item.classList.contains("active");

            // Fecha todos os outros acordeões abertos
            document.querySelectorAll(".faq-item").forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                    otherItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
                }
            });

            // Alterna o estado do item clicado
            if (isOpen) {
                item.classList.remove("active");
                question.setAttribute("aria-expanded", "false");
            } else {
                item.classList.add("active");
                question.setAttribute("aria-expanded", "true");
            }
        });
    });
}

/**
 * 2. DIRECIONAMENTO DINÂMICO DE PRODUTOS/SERVIÇOS PARA O FORMULÁRIO
 * Captura o clique em "Pedir preço deste produto" ou "Solicitar orçamento técnico"
 * e insere a informação correspondente de forma automática no campo textarea do formulário.
 */
function initProductCtas() {
    const productButtons = document.querySelectorAll(".btn-product");
    const servicesCta = document.getElementById("cta-servicos");
    const txtNecessidade = document.getElementById("form-necessidade");

    // Lógica para botões de produtos individuais
    productButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const productName = btn.getAttribute("data-product") || "Produto";
            if (txtNecessidade) {
                txtNecessidade.value = `Gostaria de solicitar orçamento e saber preços e prazo de entrega para: ${productName}. \n\n[Insira aqui detalhes como quantidade ou especificações técnicas]`;
            }
            
            // Disparar evento de clique de produto (opcional para tracking)
            triggerDataLayerEvent("click_cta_produto", {
                produto: productName
            });
        });
    });

    // Lógica para o botão de cotação de serviços técnicos
    if (servicesCta) {
        servicesCta.addEventListener("click", () => {
            if (txtNecessidade) {
                txtNecessidade.value = `Gostaria de solicitar um orçamento técnico de engenharia para: \n- [ ] Quadros de comando e automação \n- [ ] Correção de fator de potência \n- [ ] Quadros de baixa tensão (QGDT/QTA) \n- [ ] Soluções com inversores e soft-starters \n\n[Escreva aqui uma breve descrição da sua necessidade ou anexe o projeto no formulário abaixo]`;
            }
        });
    }
}

/**
 * 3. DECORADOR DE UPLOAD DE ARQUIVO
 * Mostra o nome do arquivo selecionado pelo usuário no campo do formulário de forma amigável.
 */
function initFileInputDecorator() {
    const fileInput = document.getElementById("form-arquivo");
    const nameDisplay = document.getElementById("file-name-display");

    if (fileInput && nameDisplay) {
        fileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                // Validação de tamanho local básico (10MB)
                const maxSize = 10 * 1024 * 1024;
                if (file.size > maxSize) {
                    alert("O arquivo selecionado excede o limite de 10MB. Por favor, envie um arquivo menor.");
                    fileInput.value = ""; // Limpa o input
                    nameDisplay.textContent = "Nenhum arquivo selecionado (Limite 10MB)";
                    return;
                }
                
                nameDisplay.textContent = file.name;
                nameDisplay.style.color = "var(--color-primary)";
                nameDisplay.style.fontWeight = "600";
            } else {
                nameDisplay.textContent = "Nenhum arquivo selecionado (Limite 10MB)";
                nameDisplay.style.color = "";
                nameDisplay.style.fontWeight = "";
            }
        });
    }
}

/**
 * 4. MONITORAMENTO DE CLIQUE NOS BOTÕES DIRETOS DO WHATSAPP
 * Dispara eventos no dataLayer sempre que um usuário clica em um link de contato direto do WhatsApp
 * (sem passar pelo preenchimento do formulário qualificador).
 */
function initWhatsAppDirectClicks() {
    const whatsappButtons = document.querySelectorAll(".target-whatsapp");

    whatsappButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const origem = btn.getAttribute("data-origem") || "desconhecido";
            
            // Dispara conversão no dataLayer
            triggerDataLayerEvent("whatsapp_click", {
                origem: origem
            });
        });
    });
}

/**
 * 5. TRATAMENTO DO ENVIO DO FORMULÁRIO (MODELO HÍBRIDO FORMULÁRIO -> WHATSAPP)
 * Valida os dados, dispara conversão qualificada no dataLayer (com controle anti-duplicação)
 * e redireciona o usuário para o WhatsApp com uma mensagem estruturada e pré-preenchida.
 */
function initFormSubmission() {
    const form = document.getElementById("form-qualificador");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Impede o envio tradicional e reload da página

            // Coleta de dados dos campos do formulário
            const nome = document.getElementById("form-nome").value.trim();
            const whatsappRaw = document.getElementById("form-whatsapp").value.trim();
            const tipoCliente = document.getElementById("form-tipo").value;
            const cidade = document.getElementById("form-cidade").value.trim();
            const loja = document.getElementById("form-loja").value;
            const necessidade = document.getElementById("form-necessidade").value.trim();
            const quantidade = document.getElementById("form-quantidade").value.trim() || "Não especificado";
            const prazo = document.getElementById("form-prazo").value;

            // Validação de inputs obrigatórios (Camada extra de JS)
            if (!nome || !whatsappRaw || !tipoCliente || !cidade || !loja || !necessidade || !prazo) {
                alert("Por favor, preencha todos os campos obrigatórios marcados com asterisco (*).");
                return;
            }

            // Formatação do telefone simples (limpeza de caracteres não numéricos)
            const whatsappFormatted = whatsappRaw.replace(/\D/g, "");
            if (whatsappFormatted.length < 10) {
                alert("Por favor, digite um número de WhatsApp válido com DDD.");
                return;
            }

            // DISPARO DE EVENTOS DE RASTREAMENTO NO DATALAYER
            // Aplica flag anti-duplicação (window.__epEnviado) conforme regras da seção 6
            if (!window.__epEnviado) {
                triggerDataLayerEvent("form_orcamento_enviado", {
                    tipo_cliente: tipoCliente,
                    cidade: cidade,
                    loja: loja,
                    urgencia: prazo
                });
                
                // Marca a flag para evitar disparos repetidos caso o usuário clique de novo ou volte
                window.__epEnviado = true;
                console.log("Evento 'form_orcamento_enviado' enviado ao dataLayer com sucesso.");
            }

            // MONTAGEM DA MENSAGEM DO WHATSAPP (Estrutura Obrigatória da Seção 4 - BLOCO 7)
            const breakLine = "\n";
            let messageText = `Olá, vim pelo site da Elétrica Paraná e quero solicitar um orçamento.` + breakLine;
            messageText += `Nome/Empresa: ${nome}` + breakLine;
            messageText += `Cidade: ${cidade}` + breakLine;
            messageText += `Tipo de cliente: ${tipoCliente}` + breakLine;
            messageText += `Loja de preferência: ${loja}` + breakLine;
            messageText += `Preciso de: ${necessidade}` + breakLine;
            messageText += `Quantidade: ${quantidade}` + breakLine;
            messageText += `Prazo: ${prazo}`;

            // URL Encode para codificar espaços e quebras de linha para a URL do WhatsApp
            const messageEncoded = encodeURIComponent(messageText);
            
            // Construção da URL de Redirecionamento Híbrido
            const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${messageEncoded}`;

            // Notificação de sucesso visual suave para o usuário antes de redirecionar
            const submitBtn = document.getElementById("btn-submit-form");
            const originalBtnText = submitBtn.textContent;
            
            submitBtn.textContent = "Direcionando para o WhatsApp comercial...";
            submitBtn.disabled = true;
            submitBtn.style.backgroundColor = "var(--color-success)";
            submitBtn.style.color = "var(--color-white)";

            setTimeout(() => {
                // Abre o WhatsApp em uma nova aba
                window.open(whatsappUrl, "_blank");

                // Restaura o botão na página original
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = "";
                submitBtn.style.color = "";
                
                // Limpa o formulário após o redirecionamento
                form.reset();
                const nameDisplay = document.getElementById("file-name-display");
                if (nameDisplay) {
                    nameDisplay.textContent = "Nenhum arquivo selecionado (Limite 10MB)";
                    nameDisplay.style.color = "";
                    nameDisplay.style.fontWeight = "";
                }
            }, 800);
        });
    }
}

/**
 * 0. DARK MODE TOGGLE
 * Lê a preferência salva no localStorage (ou o sistema do usuário) e aplica o tema.
 * Persiste a escolha para sessões futuras.
 */
function initDarkMode() {
    const toggle = document.getElementById("dark-mode-toggle");
    const html = document.documentElement;

    // Aplica tema salvo ou preferência do sistema
    const saved = localStorage.getItem("ep-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (saved === "dark" || (!saved && prefersDark)) {
        html.setAttribute("data-theme", "dark");
    }

    if (!toggle) return;

    toggle.addEventListener("click", () => {
        const isDark = html.getAttribute("data-theme") === "dark";
        if (isDark) {
            html.removeAttribute("data-theme");
            localStorage.setItem("ep-theme", "light");
        } else {
            html.setAttribute("data-theme", "dark");
            localStorage.setItem("ep-theme", "dark");
        }
    });
}

/**
 * UTILIÁRIO: DISPARO DE EVENTOS NO DATALAYER DO GTM/GA4
 * Envia um objeto estruturado para o array global dataLayer.
 * 
 * @param {string} eventName Nome do evento disparado
 * @param {object} params Chave-valor com os dados do evento
 */
function triggerDataLayerEvent(eventName, params) {
    if (window.dataLayer && typeof window.dataLayer.push === "function") {
        window.dataLayer.push({
            event: eventName,
            ...params
        });
    } else {
        console.warn(`dataLayer indisponível. Evento não registrado: ${eventName}`, params);
    }
}

/**
 * 6. CARROSSEL DE DIFERENCIAIS ("Sua operação não pode parar")
 * Controla a navegação por setas de forma fluida e cíclica (loop).
 */
function initBenefitsCarousel() {
    const track = document.getElementById("benefits-carousel-track");
    const prevBtn = document.getElementById("carousel-btn-prev");
    const nextBtn = document.getElementById("carousel-btn-next");

    if (!track || !prevBtn || !nextBtn) return;

    let currentIndex = 0;

    function getSlidesVisible() {
        const width = window.innerWidth;
        if (width >= 992) return 3;
        if (width >= 576) return 2;
        return 1;
    }

    function getSlideWidth() {
        const cards = track.querySelectorAll(".benefit-carousel-card");
        if (cards.length === 0) return 0;
        // Obter largura do card + gap (gap é 24px)
        return cards[0].offsetWidth + 24;
    }

    function updateCarousel() {
        const slideWidth = getSlideWidth();
        const totalCards = track.querySelectorAll(".benefit-carousel-card").length;
        const visible = getSlidesVisible();
        const maxIndex = Math.max(0, totalCards - visible);
        
        if (currentIndex > maxIndex) {
            currentIndex = 0; // Volta para o início (loop)
        } else if (currentIndex < 0) {
            currentIndex = maxIndex; // Vai para o fim (loop)
        }

        const translateX = -currentIndex * slideWidth;
        track.style.transform = `translateX(${translateX}px)`;
    }

    prevBtn.addEventListener("click", () => {
        currentIndex--;
        updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex++;
        updateCarousel();
    });

    // Ajusta o posicionamento ao redimensionar a janela
    window.addEventListener("resize", () => {
        updateCarousel();
    });

    // Inicializa o posicionamento após o carregamento das dimensões
    setTimeout(updateCarousel, 200);
}

/**
 * 7. EFEITO DE CONTADOR ANIMADO (Barra de números)
 * Anima os números de 0 até o valor final quando a seção entra em foco, respeitando movimento reduzido.
 */
function initStatsCounter() {
    const statsSection = document.querySelector(".stats-section");
    if (!statsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect(); // Anima apenas uma vez
            }
        });
    }, { threshold: 0.3 });

    observer.observe(statsSection);

    function animateCounters() {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const counters = document.querySelectorAll(".stat-number-anim");

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute("data-target"), 10);
            const prefix = counter.getAttribute("data-prefix") || "";
            const suffix = counter.getAttribute("data-suffix") || "";

            if (prefersReduced) {
                counter.textContent = `${prefix}${target}${suffix}`;
                return;
            }

            const duration = 1600;
            const startTime = performance.now();

            const tick = (now) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);
                
                counter.textContent = `${prefix}${current}${suffix}`;

                if (progress < 1) {
                    requestAnimationFrame(tick);
                }
            };

            requestAnimationFrame(tick);
        });
    }
}

/**
 * 8. VIDEO CONTROLADO POR SCROLL (VIDEO EXPANSION HERO)
 * Anima a expansão retangular da moldura de vídeo a partir do centro
 * até ocupar a tela inteira, reduzindo as bordas de forma inercial e suave.
 */
function initScrollVideo() {
    const track = document.getElementById('hero-scroll-track');
    const frame = document.getElementById('hero-video-frame');
    const video = document.getElementById('hero-video');

    if (!track || !frame || !video) return;

    // Garante a reprodução imediata (com mudo habilitado para autoplay)
    video.play().catch(() => {});

    const START_W = 360;
    const START_H = 460;
    const START_RADIUS = 24;
    const easeOut = t => 1 - Math.pow(1 - t, 3); // Easing suave de saída

    let targetProgress = 0;
    let currentProgress = 0;
    let rafId = null;
    let active = false;

    function getProgress() {
        const rect = track.getBoundingClientRect();
        const scrollable = track.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
        return scrollable > 0 ? scrolled / scrollable : 0;
    }

    function onScroll() {
        targetProgress = getProgress();
    }

    function tick() {
        const LERP_SPEED = 0.12; // Suavização inercial
        currentProgress += (targetProgress - currentProgress) * LERP_SPEED;
        
        if (Math.abs(targetProgress - currentProgress) < 0.0001) {
            currentProgress = targetProgress;
        }

        const p = easeOut(currentProgress);
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Atualiza as variáveis CSS para largura, altura e raio da moldura
        frame.style.setProperty('--w', (START_W + (vw - START_W) * p) + 'px');
        frame.style.setProperty('--h', (START_H + (vh - START_H) * p) + 'px');
        frame.style.setProperty('--radius', (START_RADIUS * (1 - p)) + 'px');

        rafId = requestAnimationFrame(tick);
    }

    // IntersectionObserver para ativar a lógica de scroll apenas se a dobra estiver visível (performance)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !active) {
                active = true;
                window.addEventListener('scroll', onScroll, { passive: true });
                rafId = requestAnimationFrame(tick);
                onScroll();
            } else if (!entry.isIntersecting && active) {
                active = false;
                window.removeEventListener('scroll', onScroll);
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        });
    }, { threshold: 0 });

    observer.observe(track);

    window.addEventListener('resize', () => {
        onScroll();
    }, { passive: true });

    // Estado inicial
    onScroll();
}

/* ==========================================
   CARROSSEL 3D — NOSSA EQUIPE
   (port do componente React "carousel": navegação,
   parallax do mouse e rotação automática)
   ========================================== */
(function () {
    const carousel = document.getElementById('team-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.tc3d-track');
    const slides = Array.from(carousel.querySelectorAll('.tc3d-slide'));
    const total = slides.length;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const AUTOPLAY_MS = 5000;

    let current = 0;
    let timer = null;

    function render() {
        track.style.transform = 'translateX(-' + (current * (100 / total)) + '%)';
        slides.forEach(function (slide, i) {
            slide.classList.toggle('is-active', i === current);
        });
    }

    function goTo(index) {
        current = ((index % total) + total) % total;
        render();
    }

    function startAutoplay() {
        if (reducedMotion || timer) return;
        timer = setInterval(function () { goTo(current + 1); }, AUTOPLAY_MS);
    }

    function stopAutoplay() {
        clearInterval(timer);
        timer = null;
    }

    function restartAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    carousel.querySelector('.tc3d-prev').addEventListener('click', function () {
        goTo(current - 1);
        restartAutoplay();
    });

    carousel.querySelector('.tc3d-next').addEventListener('click', function () {
        goTo(current + 1);
        restartAutoplay();
    });

    slides.forEach(function (slide, i) {
        // Clique num slide lateral traz ele para o centro
        slide.addEventListener('click', function (event) {
            if (i !== current) {
                event.preventDefault();
                goTo(i);
                restartAutoplay();
            }
        });

        // Parallax do mouse no slide ativo
        if (!reducedMotion) {
            slide.addEventListener('mousemove', function (event) {
                const r = slide.getBoundingClientRect();
                slide.style.setProperty('--x', (event.clientX - (r.left + r.width / 2)) + 'px');
                slide.style.setProperty('--y', (event.clientY - (r.top + r.height / 2)) + 'px');
            });
            slide.addEventListener('mouseleave', function () {
                slide.style.setProperty('--x', '0px');
                slide.style.setProperty('--y', '0px');
            });
        }
    });

    // Pausa enquanto o mouse está sobre o carrossel
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    render();
    startAutoplay();
})();
