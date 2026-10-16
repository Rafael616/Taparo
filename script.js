/* =========================================================
   script.js — COMUM ÀS DUAS PÁGINAS (index.html e eventos.html)
   Os dados (marca, WhatsApp, cardápio, galeria) ficam em config.js.
   Índice: 1 Utilidades · 2 Dados do config · 3 Página · 4 Galeria
   O cardápio, o carrinho e a animação da massa ficam em loja.js.
   ========================================================= */

/* ---------- 1. UTILIDADES ---------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const money = (n) => n.toLocaleString(CONFIG.locale, { style: "currency", currency: CONFIG.currency });
const openWhatsApp = (text) =>
  window.open(`https://wa.me/${CONFIG.whatsapp.number}?text=${encodeURIComponent(text)}`, "_blank", "noopener");

/* ---------- 2. DADOS DO CONFIG NA PÁGINA ---------- */
$$("[data-brand]").forEach((el) => (el.textContent = CONFIG.brand[el.dataset.brand]));
$$("[data-brand-href]").forEach((el) => (el.href = CONFIG.brand[el.dataset.brandHref]));
$$("[data-whatsapp]").forEach((el) =>
  el.addEventListener("click", (e) => {
    e.preventDefault();
    openWhatsApp(CONFIG.whatsapp.messages[el.dataset.whatsapp]);
  })
);

/* ---------- 3. COMPORTAMENTOS DA PÁGINA ---------- */
// Header ganha fundo ao rolar
const header = $("#header");
const onScroll = () => header.classList.toggle("scrolled", scrollY > 40);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Menu mobile
const burger = $("#burger");
const nav = $("#nav");
const toggleNav = (open = !nav.classList.contains("open")) => {
  nav.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
};
burger.addEventListener("click", () => toggleNav());
nav.addEventListener("click", (e) => e.target.closest("a") && toggleNav(false));

// Elementos .reveal aparecem ao entrar na tela
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.15 });
$$(".reveal").forEach((el) => revealObserver.observe(el));

// Foto que não carrega: esconde a imagem quebrada e deixa o espaço reservado
document.addEventListener("error", (e) => {
  const el = e.target;
  if (el instanceof HTMLImageElement) el.classList.add("is-broken");
  if (el instanceof HTMLSourceElement) el.closest("video")?.classList.add("is-broken"); // vídeo sem arquivo
}, true);
$$("img").forEach((img) => img.complete && img.naturalWidth === 0 && img.classList.add("is-broken"));

/* ---------- 4. GALERIA DE EVENTOS (só existe em eventos.html) ---------- */
function mediaHTML(m) {
  const alt = m.alt || "";
  if (m.type === "video") {
    return `<figure class="photo photo--video media-wide">
      <video controls playsinline preload="metadata" ${m.poster ? `poster="${m.poster}"` : ""} aria-label="${alt}">
        <source src="${m.src}">
      </video></figure>`;
  }
  if (m.type === "youtube") {
    return `<figure class="photo photo--video media-wide">
      <iframe src="https://www.youtube-nocookie.com/embed/${m.id}" title="${alt}" loading="lazy" allowfullscreen></iframe></figure>`;
  }
  return `<figure class="photo"><img src="${m.src}" alt="${alt}" loading="lazy"></figure>`;
}
const gallery = $("#eventGallery");
if (gallery) gallery.innerHTML = EVENT_MEDIA.map(mediaHTML).join("");
