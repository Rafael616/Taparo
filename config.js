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
   OPCIONAIS (ADICIONAIS)
   Listas reutilizáveis: cada sabor aponta para uma delas em "extras".
   Para editar: mude o name ou o price (valor em reais, somado ao
   preço da pizza). Para tirar um opcional, apague a linha.
   Para um sabor ter opcionais próprios, escreva a lista direto
   no "extras" dele. Use extras: [] para um sabor sem opcionais.
   --------------------------------------------------------- */
const EXTRAS_SALGADA = [
  { name: "Palhas", price: 8 },
  { name: "Bacon", price: 7 },
  { name: "Queijo extra", price: 6 },
  { name: "Azeitonas", price: 4 },
];

const EXTRAS_DOCE = [
  { name: "Borda recheada de chocolate", price: 8 },
  { name: "Granulado", price: 3 },
  { name: "Leite condensado", price: 4 },
];

/* ---------------------------------------------------------
   CARDÁPIO
   Para adicionar uma pizza, copie uma linha e mude o id.
   Para trocar a foto, coloque o arquivo na pasta img/ e
   ajuste "image". Se o arquivo não existir, aparece um
   espaço reservado no lugar.
   "extras": opcionais disponíveis para esse sabor (veja acima).
   --------------------------------------------------------- */
const MENU = [
  { id: 1, name: "Margherita", desc: "Molho de tomate, muçarela e manjericão.", price: 42, image: "img/margherita.jpg", extras: EXTRAS_SALGADA },
  { id: 2, name: "Calabresa", desc: "Calabresa fatiada e cebola.", price: 46, image: "img/calabresa.jpg", extras: EXTRAS_SALGADA },
  { id: 3, name: "Quatro queijos", desc: "Quatro tipos de queijo derretidos.", price: 52, image: "img/quatro-queijos.jpg", extras: EXTRAS_SALGADA },
  { id: 4, name: "Frango com requeijão", desc: "Frango desfiado e requeijão cremoso.", price: 50, image: "img/frango-requeijao.jpg", extras: EXTRAS_SALGADA },
  { id: 5, name: "Pepperoni", desc: "Fatias de pepperoni e muçarela.", price: 54, image: "img/pepperoni.jpg", extras: EXTRAS_SALGADA },
  { id: 6, name: "Chocolate com morango", desc: "Chocolate e morangos frescos.", price: 48, image: "img/chocolate-morango.jpg", extras: EXTRAS_DOCE },
];

/* ---------------------------------------------------------
   GALERIA DA PÁGINA DE EVENTOS (eventos.html)
   Para adicionar uma foto ou vídeo, copie uma linha e mude o caminho.
   Tipos: "photo", "video" (arquivo MP4) e "youtube" (só o código do vídeo).
   Se o arquivo ainda não existir, aparece um espaço reservado.
   Vídeos ocupam o dobro da largura; a grade se ajusta sozinha.
   --------------------------------------------------------- */
const EVENT_MEDIA = [
  { type: "video", src: "img/evento-01.mov", poster: "img/video-01.jpeg", alt: "Pizzaiolo preparando pizzas durante um evento" },
  { type: "photo", src: "img/foto-01.jpeg", alt: "Abertura manual da massa no evento" },
  { type: "photo", src: "img/foto-02.jpeg", alt: "Forno móvel em funcionamento" },
  { type: "photo", src: "img/foto-03.jpeg", alt: "Pizzas saindo do forno" },
  { type: "photo", src: "img/foto-04.jpeg", alt: "Convidados aproveitando o rodízio" },
  { type: "photo", src: "img/foto-05.jpeg", alt: "Convidados aproveitando o rodízio" },
  // { type: "youtube", id: "CODIGO_DO_VIDEO", alt: "Descrição do vídeo" },
];
