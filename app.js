const store = {
  phoneDisplay: "+91 85002 17558",
  whatsappNumber: "918500217558",
  defaultMessage: "Hi, I want to order Dharani Agro Foods spices and masalas.",
};

const grid = document.querySelector("#productGrid");
const filters = document.querySelectorAll(".filter");
const offerTitle = document.querySelector("#offerTitle");
const offerText = document.querySelector("#offerText");
const offerWhatsapp = document.querySelector("#offerWhatsapp");
const whatsappHero = document.querySelector("#whatsappHero");
const whatsappLink = document.querySelector("#whatsappLink");
const phoneLink = document.querySelector("#phoneLink");
const hero = document.querySelector("#hero");
const heroEyebrow = document.querySelector("#heroEyebrow");
const heroTitle = document.querySelector("#heroTitle");
const heroText = document.querySelector("#heroText");
const heroDots = document.querySelectorAll(".hero-dot");

let products = [];
let heroSlideIndex = 0;

const heroSlides = [
  {
    eyebrow: "Dharani spices and masalas",
    title: "Pure masalas for everyday Indian cooking.",
    text: "FSSAI licensed spice blends with authentic taste for home kitchens, retailers, and bulk orders.",
  },
  {
    eyebrow: "Traditional grinding taste",
    title: "Fresh powders packed with real aroma.",
    text: "Chilli, turmeric, coriander, podi, and masala blends for reliable flavor in every recipe.",
  },
  {
    eyebrow: "Retail and wholesale orders",
    title: "Order Dharani products directly on WhatsApp.",
    text: "Call or message for product availability, current prices, offers, and bulk supply enquiries.",
  },
];

function rupees(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function whatsappUrl(message = store.defaultMessage) {
  return `https://wa.me/${store.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function renderProducts(category = "all") {
  const visible = category === "all" ? products : products.filter((item) => item.category === category);

  grid.innerHTML = visible.map((item) => `
    <article class="product-card">
      <img src="${item.image}" alt="${item.name}" loading="lazy">
      <div class="product-body">
        <div class="product-meta">
          <span>${item.category}</span>
          <span>${item.weight}</span>
        </div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="price-row">
          <span class="price">${rupees(item.price)}</span>
          ${item.offer ? `<span class="offer-tag">${item.offer}</span>` : ""}
        </div>
      </div>
    </article>
  `).join("");
}

function renderOffer() {
  const offerProduct = products.find((item) => item.offer) || products[0];
  if (!offerProduct) return;

  offerTitle.textContent = `${offerProduct.offer || "Fresh stock available"}: ${offerProduct.name}`;
  offerText.textContent = `${offerProduct.weight} pack available at ${rupees(offerProduct.price)}. Message us to confirm stock, delivery, and bulk order pricing.`;
  offerWhatsapp.href = whatsappUrl(`Hi, I want the offer for ${offerProduct.name}.`);
}

function bindContactLinks() {
  phoneLink.textContent = store.phoneDisplay;
  phoneLink.href = `tel:${store.phoneDisplay.replace(/\s/g, "")}`;
  whatsappLink.href = whatsappUrl();
  whatsappHero.href = whatsappUrl();
}

function renderHeroSlide(index) {
  const slide = heroSlides[index];
  heroEyebrow.textContent = slide.eyebrow;
  heroTitle.textContent = slide.title;
  heroText.textContent = slide.text;

  heroDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === index);
  });
}

function startHeroRotation() {
  renderHeroSlide(heroSlideIndex);

  setInterval(() => {
    heroSlideIndex = (heroSlideIndex + 1) % heroSlides.length;
    renderHeroSlide(heroSlideIndex);
  }, 4500);
}

heroDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    heroSlideIndex = Number(dot.dataset.slide);
    renderHeroSlide(heroSlideIndex);
  });
});

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderProducts(button.dataset.filter);
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
bindContactLinks();
startHeroRotation();

fetch("data/products.json")
  .then((response) => response.json())
  .then((data) => {
    products = Array.isArray(data) ? data : data.products;
    renderProducts();
    renderOffer();
  })
  .catch(() => {
    grid.innerHTML = "<p>Products could not be loaded. Please check data/products.json.</p>";
    offerTitle.textContent = "Products unavailable";
    offerText.textContent = "Please check the product data file and refresh the page.";
  });
