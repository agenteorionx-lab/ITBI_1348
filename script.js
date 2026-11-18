/**
 * LANDING PAGE AULÃO ITBI NA HOLDING PÓS TEMA 1348
 * Dra. Mariana Arteiro
 * Troca Automática de Versão Conforme a Data (Ao Vivo vs Gravada) + Animações de Scroll
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ====================================================
       1. CONTROLE AUTOMÁTICO DE VERSÃO POR DATA
       - Até 02/12/2026 às 23:59:59 -> Versão Ao Vivo ('live')
       - Após 02/12/2026 às 23:59:59 (03/12 em diante) -> Versão Gravada ('recorded')
       - Permite forçar via parâmetro na URL para visualização/teste:
         ?v=aovivo  ou ?v=live      -> Versão Ao Vivo
         ?v=gravada ou ?v=gravado   -> Versão Gravada
       ==================================================== */
    function getAutoVersion() {
        const now = new Date();
        // Mês 11 no JS equivale a Dezembro (0 = Janeiro ... 11 = Dezembro)
        const cutoffLive = new Date(2026, 11, 2, 23, 59, 59);

        if (now <= cutoffLive) {
            return 'live';
        } else {
            return 'recorded';
        }
    }

    function resolveVersion() {
        const urlParams = new URLSearchParams(window.location.search);
        const rawParam = (urlParams.get('v') || urlParams.get('versao') || '').toLowerCase().trim();

        if (rawParam === 'gravada' || rawParam === 'gravado' || rawParam === 'recorded' || rawParam === '2' || rawParam === 'b') {
            return 'recorded';
        }
        if (rawParam === 'aovivo' || rawParam === 'ao-vivo' || rawParam === 'live' || rawParam === '1' || rawParam === 'a') {
            return 'live';
        }

        return getAutoVersion();
    }

    const activeVersion = resolveVersion();

    document.body.classList.remove('version-live', 'version-recorded');
    if (activeVersion === 'recorded') {
        document.body.classList.add('version-recorded');
    } else {
        document.body.classList.add('version-live');
    }

    /* ====================================================
       2. ANIMAÇÃO DE REVELAÇÃO SUAVE NO SCROLL
       ==================================================== */
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.14,
            rootMargin: '0px 0px -30px 0px'
        });

        revealElements.forEach((el) => revealObserver.observe(el));
    } else {
        revealElements.forEach((el) => el.classList.add('revealed'));
    }

});
