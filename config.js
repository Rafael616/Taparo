/* =========================================================
   config.js — TUDO QUE VOCÊ PROVAVELMENTE VAI EDITAR
   Textos de contato, número do WhatsApp, cardápio e pagamentos.
   Os textos longos (história, eventos...) ficam no index.html.
   ========================================================= */

const CONFIG = {
  locale: "pt-BR",
  currency: "BRL",

  /* ---- Marca e contato (aparecem no topo e no rodapé) ---- */
  brand: {
    name: "Táparo Artigianale",
    slogan: "Pizza napolitana de fermentação natural por 48h.",
    address: "Rua Ziraldo Prezzi, 337\nImigrante — Farroupilha, RS\n95170-001",
    phone: "(54) 99957-5538",
    instagram: "https://www.instagram.com/taparoartigianale/",
  },

  /* ---- WhatsApp ---- */
  whatsapp: {
    number: "5554999575538", // DDI + DDD + número, só dígitos
    messages: {              // usados pelos botões com data-whatsapp="chave"
      contact: "Olá! Gostaria de saber mais sobre as pizzas.",
      event: "Olá! Tenho interesse em levar a experiência da Táparo Artigianale para o meu evento. Gostaria de saber mais sobre como funciona e solicitar um orçamento.",
    },
  },

  /* ---- Fermentação (usado na animação da massa no topo) ---- */
  fermentationHours: 48,

  /* ---- Selo exibido nas fotos do cardápio ("" para ocultar) ---- */
  menuBadge: "Massa 48 h",

  /* ---- Opções do formulário de pedido ---- */
  payments: ["Pix", "Dinheiro", "Cartão de crédito", "Cartão de débito"],
};

/* ---------------------------------------------------------
   CARDÁPIO
   Para adicionar uma pizza, copie uma linha e mude o id.
   Para trocar a foto, coloque o arquivo na pasta img/ e
   ajuste "image". Se o arquivo não existir, aparece um
   espaço reservado no lugar.
   --------------------------------------------------------- */
const MENU = [
  { id: 1, name: "Margherita",             desc: "Molho de tomate, muçarela e manjericão.", price: 42, image: "img/margherita.jpg" },
  { id: 2, name: "Calabresa",              desc: "Calabresa fatiada e cebola.",             price: 46, image: "img/calabresa.jpg" },
  { id: 3, name: "Quatro queijos",         desc: "Quatro tipos de queijo derretidos.",      price: 52, image: "img/quatro-queijos.jpg" },
  { id: 4, name: "Frango com requeijão",   desc: "Frango desfiado e requeijão cremoso.",    price: 50, image: "img/frango-requeijao.jpg" },
  { id: 5, name: "Pepperoni",              desc: "Fatias de pepperoni e muçarela.",         price: 54, image: "img/pepperoni.jpg" },
  { id: 6, name: "Chocolate com morango",  desc: "Chocolate e morangos frescos.",           price: 48, image: "img/chocolate-morango.jpg" },
];
