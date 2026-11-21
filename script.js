/**
 * LANDING PAGE AULÃO ITBI NA HOLDING PÓS TEMA 1348
 * Dra. Mariana Arteiro
 * Troca Automática de Versão Conforme a Data (Ao Vivo vs Gravada) + Animações de Scroll
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ====================================================
       1. CONTROLE AUTOMÁTICO DE VERSÃO POR DATA (HORÁRIO DE BRASÍLIA)
       - Até 02/12/2026 às 23:59:59 (BRT / UTC-3) -> Versão Ao Vivo ('live')
       - A partir de 03/12/2026 às 00:00:00 (BRT / UTC-3) -> Versão Gravada ('recorded')
       - Monitora em tempo real (a cada 1 segundo) para virar automaticamente
         mesmo se o visitante estiver com a aba aberta na virada da meia-noite.
       - Permite forçar via parâmetro na URL para visualização/teste:
         ?v=aovivo  ou ?v=live      -> Versão Ao Vivo
         ?v=gravada ou ?v=gravado   -> Versão Gravada
       ==================================================== */
    const CUTOFF_LIVE_BRT = new Date('2026-12-02T23:59:59-03:00').getTime();

    function getAutoVersion() {
        return Date.now() <= CUTOFF_LIVE_BRT ? 'live' : 'recorded';
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

    function applyVersion() {
        const activeVersion = resolveVersion();
        const isRecorded = activeVersion === 'recorded';

        if (isRecorded && !document.body.classList.contains('version-recorded')) {
            document.body.classList.remove('version-live');
            document.body.classList.add('version-recorded');
        } else if (!isRecorded && !document.body.classList.contains('version-live')) {
            document.body.classList.remove('version-recorded');
            document.body.classList.add('version-live');
        }
    }

    applyVersion();
    setInterval(applyVersion, 1000);

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
