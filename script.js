/* ════════════════════════════════════
   script.js — Pizzeria Passione e Tradizione
   ════════════════════════════════════ */

// ── Navbar scroll effect ──
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Filtro do cardápio ──
const tabs   = document.querySelectorAll('.ctab');
const cards  = document.querySelectorAll('#pizzaGrid [data-cat]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.style.transition = 'opacity .3s, transform .3s';
      if (match) {
        card.style.opacity   = '1';
        card.style.transform = 'translateY(0)';
        card.style.display   = '';
      } else {
        card.style.opacity   = '0';
        card.style.transform = 'translateY(10px)';
        setTimeout(() => { if (card.style.opacity === '0') card.style.display = 'none'; }, 300);
      }
    });
  });
});

// ── Formulário de reserva ──
const form = document.getElementById('reservaForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit-site');
    btn.textContent = '✓ Reserva enviada!';
    btn.style.background = '#4a7c59';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = 'Confirmar Reserva <i class="bi bi-arrow-right ms-2"></i>';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3500);
  });
}

// ── Smooth scroll para links âncora ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    // fecha menu mobile se aberto
    const collapse = document.getElementById('navMenu');
    if (collapse && collapse.classList.contains('show')) {
      bootstrap.Collapse.getInstance(collapse)?.hide();
    }
  });
});

// ── Animação de entrada ao rolar (Intersection Observer) ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.pizza-card, .depo-card, .galeria-item, .sobre-img-wrap, .contato-box, .mapa-wrap'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  observer.observe(el);
});

document.addEventListener('animationend', () => {}, { once: true });

// Adiciona classe visible
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);
