/* =========================================================
   loja.js — SÓ NA PÁGINA INICIAL (index.html)
   Cardápio, carrinho, formulário do pedido e massa do hero.
   Usa as funções de script.js ($, $$, money, openWhatsApp...).
   Índice: 4 Cardápio · 5 Carrinho · 6 Pedido · 7 Massa do hero
   ========================================================= */

$("#paymentSelect").append(...CONFIG.payments.map((p) => new Option(p, p)));

/* ---------- 4. CARDÁPIO ---------- */
$("#menuGrid").innerHTML = MENU.map((p) => `
  <article class="menu-item">
    ${CONFIG.menuBadge ? `<span class="badge">${CONFIG.menuBadge}</span>` : ""}
    <div class="photo photo--square">
      <img src="${p.image}" alt="Pizza ${p.name}" width="600" height="600" loading="lazy">
    </div>
    <div class="menu-info">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      ${(p.extras || []).length ? `
      <fieldset class="extras">
        <legend>Opcionais</legend>
        ${p.extras.map((x, i) => `
        <label class="extra">
          <input type="checkbox" value="${i}">
          <span>${x.name}</span>
          <em>+ ${money(x.price)}</em>
        </label>`).join("")}
      </fieldset>` : ""}
      <span class="price">${money(p.price)}</span>
      <button class="add-btn" data-add="${p.id}">Adicionar</button>
    </div>
  </article>
`).join("");

$("#menuGrid").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-add]");
  if (!btn) return;
  const item = btn.closest(".menu-item");
  const extras = $$(".extras input:checked", item).map((i) => Number(i.value));
  flyToCart(item.querySelector(".photo"));
  addLine(Number(btn.dataset.add), extras);
  $$(".extras input", item).forEach((i) => (i.checked = false));
});

/* ---------- 5. CARRINHO ---------- */
let cart = {};   // { chave: { id, extras: [índices], qty } } — chave = pizza + opcionais

const drawer = $("#drawer");
const overlay = $("#overlay");

function toggleDrawer(open) {
  drawer.classList.toggle("open", open);
  overlay.classList.toggle("open", open);
  drawer.inert = !open;
  document.body.style.overflow = open ? "hidden" : "";
}
$("#cartOpen").addEventListener("click", () => toggleDrawer(true));
$("#showCart").addEventListener("click", () => toggleDrawer(true));
$("#cartClose").addEventListener("click", () => toggleDrawer(false));
overlay.addEventListener("click", () => toggleDrawer(false));
document.addEventListener("keydown", (e) => e.key === "Escape" && toggleDrawer(false));

const lineKey = (id, extras) => `${id}|${[...extras].sort((x, y) => x - y).join(",")}`;

function addLine(id, extras = []) {
  const key = lineKey(id, extras);
  cart[key] = cart[key] || { id, extras: [...extras].sort((x, y) => x - y), qty: 0 };
  changeQty(key, 1);
}

function changeQty(key, delta) {
  if (!cart[key]) return;
  cart[key].qty += delta;
  if (cart[key].qty <= 0) delete cart[key];
  renderCart();
}

// Cada linha do carrinho: nome, opcionais escolhidos e valores
const cartEntries = () =>
  Object.entries(cart).map(([key, line]) => {
    const pizza = MENU.find((p) => p.id === line.id);
    const extras = line.extras.map((i) => pizza.extras[i]).filter(Boolean);
    const unit = pizza.price + extras.reduce((s, x) => s + x.price, 0);
    return { key, name: pizza.name, extras, qty: line.qty, unit, subtotal: unit * line.qty };
  });

function renderCart() {
  const entries = cartEntries();
  const count = entries.reduce((sum, i) => sum + i.qty, 0);
  const total = entries.reduce((sum, i) => sum + i.subtotal, 0);

  $$("[data-cart-count]").forEach((el) => (el.textContent = count));
  $("#cartTotal").textContent = money(total);
  $("#checkout").disabled = !count;
  $("#checkoutFields").hidden = !count;

  $("#cartItems").innerHTML = count
    ? entries.map((i) => `
        <div class="cart-row">
          <span>${i.name}${i.extras.length ? `<small class="cart-extras">+ ${i.extras.map((x) => x.name).join(", ")}</small>` : ""}</span>
          <strong>${money(i.subtotal)}</strong>
          <div class="qty">
            <button type="button" data-dec="${i.key}" aria-label="Diminuir">−</button>
            <span>${i.qty}</span>
            <button type="button" data-inc="${i.key}" aria-label="Aumentar">+</button>
          </div>
        </div>`).join("")
    : `<div class="empty"><strong>Seu carrinho está vazio</strong>Escolha pizzas no cardápio.</div>`;
}

$("#cartItems").addEventListener("click", (e) => {
  const { inc, dec } = e.target.dataset;
  if (inc) changeQty(inc, 1);
  if (dec) changeQty(dec, -1);
});

// Animação: a foto "voa" até o botão do carrinho no header
function flyToCart(photo) {
  if (reduceMotion) return;
  const from = photo.getBoundingClientRect();
  const to = $("#cartOpen").getBoundingClientRect();
  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);

  const clone = photo.cloneNode(true);
  clone.className = "photo fly";
  Object.assign(clone.style, { left: `${from.left}px`, top: `${from.top}px`, width: `${from.width}px`, height: `${from.height}px` });
  document.body.append(clone);

  clone.animate([
    { transform: "translate(0, 0) scale(1)", opacity: 1 },
    { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 60}px) scale(.55)`, opacity: 1, offset: 0.55 },
    { transform: `translate(${dx}px, ${dy}px) scale(.08)`, opacity: 0.4 },
  ], { duration: 750, easing: "cubic-bezier(.5, 0, .75, .4)" }).onfinish = () => {
    clone.remove();
    ["#cartOpen", "#showCart"].forEach((sel) =>
      $(sel).animate([{ transform: "scale(1)" }, { transform: "scale(1.12)" }, { transform: "scale(1)" }], { duration: 300 })
    );
  };
}

/* ---------- 6. PEDIDO ---------- */
const form = $("#orderForm");

// Endereço só aparece (e só é obrigatório) na entrega
function updateDeliveryFields() {
  const delivery = form.tipo.value === "Entrega";
  $("#addressField").hidden = !delivery;
  form.endereco.required = delivery;
}
form.addEventListener("change", (e) => e.target.name === "tipo" && updateDeliveryFields());
updateDeliveryFields();

// A mensagem leva itens, opcionais, valores e o total no final.
// Para mudar o texto do pedido, edite esta função.
function buildOrderMessage(data, entries) {
  const delivery = data.get("tipo") === "Entrega";
  const total = entries.reduce((sum, i) => sum + i.subtotal, 0);
  return [
    "*Novo pedido*",
    "",
    `Nome: ${data.get("nome").trim()}`,
    `Tipo: ${data.get("tipo")}`,
    delivery && `Endereço: ${data.get("endereco").trim()}`,
    `Pagamento: ${data.get("pagamento")}`,
    "",
    "*Itens*",
    ...entries.flatMap((i) => [
      `${i.qty}x ${i.name} — ${money(i.subtotal)}`,
      ...i.extras.map((x) => `   + ${x.name} (${money(x.price)})`),
    ]),
    "",
    `*Total: ${money(total)}*`,
  ].filter((line) => line !== false).join("\n");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const entries = cartEntries();
  if (entries.length) openWhatsApp(buildOrderMessage(new FormData(form), entries));
});

renderCart();

/* ---------- 7. MASSA DO HERO ----------
   A massa cresce enquanto o relógio vai de 0 até CONFIG.fermentationHours. */
(function initDough() {
  const root = $("#dough");
  const ring = $(".ring-progress", root);
  const body = $("#doughBody");
  const hoursEl = $("#doughHours");
  const caption = $("#doughCaption");

  const DURATION = 5500;   // ms da animação
  const CIRC = 2 * Math.PI * 150;
  const STAGES = [         // [fração do tempo, legenda]
    [0, "Mistura da massa"], [0.25, "Primeiro descanso"], [0.5, "Massa em porções"],
    [0.75, "Maturação"], [1, "Pronta para o forno"],
  ];
  const BUBBLES = [        // [x, y, raio, fração do tempo em que aparece]
    [130,125,7,.08],[185,140,5,.17],[150,175,9,.21],[200,185,6,.29],[120,170,5,.33],[175,120,4,.38],
    [210,150,8,.46],[140,205,6,.5],[165,215,5,.54],[110,145,4,.58],[195,110,6,.63],[225,180,5,.67],
    [100,190,6,.75],[155,150,12,.79],[185,200,10,.88],[130,100,5,.92],
  ];

  ring.style.strokeDasharray = CIRC;
  const bubbleEls = BUBBLES.map(([cx, cy, r, t]) => {
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("class", "bubble");
    c.setAttribute("cx", cx); c.setAttribute("cy", cy); c.setAttribute("r", r);
    c.style.transformOrigin = `${cx}px ${cy}px`;
    $("#bubbles").append(c);
    return { c, t };
  });

  // f vai de 0 a 1
  function render(f) {
    hoursEl.textContent = String(Math.floor(f * CONFIG.fermentationHours)).padStart(2, "0");
    ring.style.strokeDashoffset = CIRC * (1 - f);
    body.style.transform = `scale(${0.55 + 0.45 * f})`;
    bubbleEls.forEach(({ c, t }) => {
      const k = clamp((f - t) / 0.06, 0, 1);
      c.style.opacity = k;
      c.style.transform = `scale(${0.4 + 0.6 * k})`;
    });
    caption.textContent = STAGES.findLast(([t]) => f >= t)[1];
  }

  let frame;
  function play() {
    cancelAnimationFrame(frame);
    if (reduceMotion) return render(1);
    const start = performance.now();
    const tick = (now) => {
      const t = clamp((now - start) / DURATION, 0, 1);
      render(1 - (1 - t) ** 3);               // desacelera no final
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }

  render(0);
  setTimeout(play, 500);
  root.addEventListener("click", play);
})();
