/*
  Comedor Raquel - Landing Page (Vanilla JS)
  - Scroll suave
  - Tabs del menú (render dinámico)
  - Pedidos por WhatsApp con mensaje prellenado
  - Validación simple del formulario (sin backend)
*/

// =========================
// CONFIG
// =========================
const WHATSAPP_NUMBER = "50587654321"; // (placeholder) sin +

// =========================
// DATA (edita fácil)
// =========================
const menuData = [
  // Almuerzos
  {
    id: 1,
    nombre: "Gallo Pinto",
    categoria: "Almuerzos",
    descripcion: "Arroz y frijoles refritos con su toque nica. Incluye ensalada.",
    precio: 4.5,
    //badge: "Popular",
    image: "https://pub-abbf7ac480e44031bc258c3d83e958e5.r2.dev/gallopinto.png",
  },
  {
    id: 2,
    nombre: "Carne Asada",
    categoria: "Almuerzos",
    descripcion: "Carne de res a la parrilla con arroz, frijoles y tajadas.",
    precio: 7.5,
    badge: "",
    image: "https://pub-abbf7ac480e44031bc258c3d83e958e5.r2.dev/carneasada.png",
  },
  {
    id: 3,
    nombre: "Pollo Asado",
    categoria: "Almuerzos",
    descripcion: "Pollo jugoso con arroz, frijoles y ensalada fresca.",
    precio: 6.5,
    //badge: "Nuevo",
  },
  {
    id: 4,
    nombre: "Almuerzo Típico",
    categoria: "Almuerzos",
    descripcion: "Comida completa con proteína, arroz, frijoles, plátano y ensalada.",
    precio: 6.0,
    badge: "",
  },

  // Típicos
  {
    id: 5,
    nombre: "Vigorón",
    categoria: "Típicos",
    descripcion: "Yuca con chicharrón y encurtido. Bien servido.",
    precio: 5.0,
    badge: "Popular",
  },
  {
    id: 6,
    nombre: "Tajadas con Queso",
    categoria: "Típicos",
    descripcion: "Plátano frito con queso y ensalada.",
    precio: 3.25,
    badge: "",
  },
  {
    id: 7,
    nombre: "Quesillo",
    categoria: "Típicos",
    descripcion: "Queso suave con cebolla y crema (estilo tradicional).",
    precio: 3.0,
    badge: "",
  },
  {
    id: 8,
    nombre: "Enchilada Nica",
    categoria: "Típicos",
    descripcion: "Tortilla rellena con carne y ensalada, con salsita.",
    precio: 5.5,
    badge: "Nuevo",
  },

  // Bebidas
  {
    id: 9,
    nombre: "Cacao Caliente",
    categoria: "Bebidas",
    descripcion: "Cacao tradicional preparado con leche. Bien cremoso.",
    precio: 2.0,
    badge: "Popular",
    image: "https://pub-abbf7ac480e44031bc258c3d83e958e5.r2.dev/cacao.png",
  },
  {
    id: 10,
    nombre: "Batido",
    categoria: "Bebidas",
    descripcion: "Batido natural (consulta sabores disponibles).",
    precio: 2.25,
    badge: "",
    image: "https://pub-abbf7ac480e44031bc258c3d83e958e5.r2.dev/batido.png",
  },
  {
    id: 11,
    nombre: "Café",
    categoria: "Bebidas",
    descripcion: "Café caliente (negro o con leche).",
    precio: 1.25,
    badge: "",
    image: "https://pub-abbf7ac480e44031bc258c3d83e958e5.r2.dev/cafe.png",
  },
  {
    id: 12,
    nombre: "Refresco Natural",
    categoria: "Bebidas",
    descripcion: "Refresco casero de frutas (según temporada).",
    precio: 1.5,
    badge: "",
  },

  // Extras
  {
    id: 13,
    nombre: "Arroz extra",
    categoria: "Extras",
    descripcion: "Porción adicional de arroz.",
    precio: 1.0,
    badge: "",
  },
  {
    id: 14,
    nombre: "Ensalada extra",
    categoria: "Extras",
    descripcion: "Ensalada fresca (pepino, tomate y repollo).",
    precio: 1.25,
    badge: "",
  },
  {
    id: 15,
    nombre: "Gaseosa",
    categoria: "Extras",
    descripcion: "Gaseosa fría (consulta disponibles).",
    precio: 1.5,
    badge: "",
    image: "https://pub-abbf7ac480e44031bc258c3d83e958e5.r2.dev/gaseosa.png",
  },
];

const galeriaImages = [
  { url: "https://pub-abbf7ac480e44031bc258c3d83e958e5.r2.dev/gallopinto.png", alt: "Gallo Pinto" },
  { url: "https://pub-abbf7ac480e44031bc258c3d83e958e5.r2.dev/carneasada.png", alt: "Carne Asada" },
  { url: "https://pub-abbf7ac480e44031bc258c3d83e958e5.r2.dev/cacao.png", alt: "Cacao" },
  { url: "https://pub-abbf7ac480e44031bc258c3d83e958e5.r2.dev/batido.png", alt: "Batido" },
  { url: "https://pub-abbf7ac480e44031bc258c3d83e958e5.r2.dev/cafe.png", alt: "Café" },
  { url: "https://pub-abbf7ac480e44031bc258c3d83e958e5.r2.dev/gaseosa.png", alt: "Gaseosa" },
  { url: "https://pub-abbf7ac480e44031bc258c3d83e958e5.r2.dev/hamburguesa.png", alt: "Hamburguesa" },
  { url: "https://pub-abbf7ac480e44031bc258c3d83e958e5.r2.dev/hotdog.png", alt: "Hot Dog" },
];

// Hero carousel labels (solo para accesibilidad / posible uso)
const heroSlidesMeta = [
  { title: "Gallo pinto", subtitle: "El clásico nica" },
  { title: "Carne asada", subtitle: "Bien servida" },
  { title: "Cacao", subtitle: "Tradicional" },
];

// =========================
// HELPERS
// =========================
function money(n) {
  // USD de ejemplo
  return `$${n.toFixed(2)}`;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildWhatsAppMessage({ producto = "", precio = "" } = {}) {
  let msg = "¡Hola! 👋\nQuiero hacer un pedido en *Comedor Raquel*.";

  if (producto) {
    msg += `\n\n*Producto:* ${producto}`;
    if (precio) msg += `\n*Precio:* ${precio}`;
  }

  msg += "\n\n¿Me confirmas disponibilidad y tiempo de entrega/para llevar?";
  return msg;
}

function openWhatsApp({ producto = "", precio = "" } = {}) {
  const text = encodeURIComponent(buildWhatsAppMessage({ producto, precio }));
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

// =========================
// HERO CAROUSEL
// =========================
let currentSlide = 0;
let carouselTimer = null;

function initCarousel() {
  const carousel = document.getElementById("heroCarousel");
  if (!carousel) return;

  const slides = carousel.querySelectorAll(".carousel__slide");
  const dotsContainer = document.getElementById("dots");

  const show = (idx) => {
    slides.forEach((s, i) => s.classList.toggle("is-active", i === idx));

    if (dotsContainer) {
      dotsContainer.querySelectorAll("button").forEach((b, i) => {
        b.classList.toggle("is-active", i === idx);
        b.setAttribute("aria-current", i === idx ? "true" : "false");
      });
    }
  };

  const next = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    show(currentSlide);
  };

  const prev = () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    show(currentSlide);
  };

  // Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "dot";
      dot.setAttribute("aria-label", `Ir al slide ${i + 1}`);
      dot.addEventListener("click", () => {
        currentSlide = i;
        show(currentSlide);
        restartTimer();
      });
      dotsContainer.appendChild(dot);
    });
  }

  // Nav buttons
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  prevBtn?.addEventListener("click", () => {
    prev();
    restartTimer();
  });
  nextBtn?.addEventListener("click", () => {
    next();
    restartTimer();
  });

  const restartTimer = () => {
    if (carouselTimer) clearInterval(carouselTimer);
    carouselTimer = setInterval(next, 5200);
  };

  // Pause on hover/focus
  carousel.addEventListener("mouseenter", () => carouselTimer && clearInterval(carouselTimer));
  carousel.addEventListener("mouseleave", () => restartTimer());

  show(currentSlide);
  restartTimer();
}

// =========================
// MENU RENDER
// =========================
function renderFeatured() {
  const wrap = document.getElementById("featuredDishes");
  if (!wrap) return;

  const picks = [
    menuData.find((x) => x.nombre === "Gallo Pinto"),
    menuData.find((x) => x.nombre === "Carne Asada"),
    menuData.find((x) => x.nombre === "Cacao Caliente"),
  ].filter(Boolean);

  wrap.innerHTML = picks
    .map((item) => {
      const badge = item.badge ? `<span class="badge ${item.badge === "Nuevo" ? "badge--new" : "badge--popular"}">${escapeHtml(item.badge)}</span>` : "";

      const img = item.image
        ? `<img src="${item.image}" alt="${escapeHtml(item.nombre)}" loading="lazy" />`
        : `<div class="ph"><span class="material-icons" aria-hidden="true">restaurant</span></div>`;

      return `
        <article class="product">
          <div class="product__media">
            ${badge}
            ${img}
          </div>
          <div class="product__body">
            <div class="product__top">
              <h3>${escapeHtml(item.nombre)}</h3>
              <span class="price">${money(item.precio)}</span>
            </div>
            <p class="product__desc">${escapeHtml(item.descripcion)}</p>
            <button class="btn btn--primary btn--sm" data-whatsapp data-name="${escapeHtml(item.nombre)}" data-price="${money(item.precio)}">
              <span class="material-icons" aria-hidden="true">shopping_bag</span>
              Pedir
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderMenu(category) {
  const grid = document.getElementById("menuItems");
  if (!grid) return;

  const items = menuData.filter((x) => x.categoria === category);

  grid.innerHTML = items
    .map((item) => {
      const badge = item.badge ? `<span class="badge ${item.badge === "Nuevo" ? "badge--new" : "badge--popular"}">${escapeHtml(item.badge)}</span>` : "";

      return `
        <article class="menuItem">
          <header class="menuItem__head">
            <h3>${escapeHtml(item.nombre)}</h3>
            ${badge}
          </header>

          <p class="menuItem__desc">${escapeHtml(item.descripcion)}</p>

          <footer class="menuItem__foot">
            <span class="price">${money(item.precio)}</span>
            <button class="btn btn--secondary btn--sm" data-whatsapp data-name="${escapeHtml(item.nombre)}" data-price="${money(item.precio)}">
              <span class="material-icons" aria-hidden="true">whatsapp</span>
              Pedir
            </button>
          </footer>
        </article>
      `;
    })
    .join("");
}

// =========================
// GALERÍA
// =========================
function renderGallery() {
  const grid = document.getElementById("galeriaGrid");
  if (!grid) return;

  grid.innerHTML = galeriaImages
    .map(
      (img) => `
        <figure class="gallery__item">
          <img src="${img.url}" alt="${escapeHtml(img.alt)}" loading="lazy" />
          <figcaption>${escapeHtml(img.alt)}</figcaption>
        </figure>
      `
    )
    .join("");
}

// =========================
// NAV + SCROLL
// =========================
function initNav() {
  const toggle = document.getElementById("menuToggle");
  const list = document.getElementById("navList");
  if (!toggle || !list) return;

  const close = () => {
    list.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const open = list.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;

    // Close when clicking a link
    if (t.classList.contains("nav__link")) close();

    // Close when clicking outside
    if (!list.contains(t) && !toggle.contains(t)) close();
  });
}

function initSmoothScroll() {
  // Fallback: asegura scroll suave al click (por si un navegador ignora CSS)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
    });
  });
}

// =========================
// WHATSAPP BUTTONS
// =========================
function initWhatsAppButtons() {
  // Hero + Footer CTA (mensaje general)
  document.getElementById("whatsappHero")?.addEventListener("click", (e) => {
    e.preventDefault();
    openWhatsApp();
  });

  document.getElementById("whatsappFooter")?.addEventListener("click", (e) => {
    e.preventDefault();
    openWhatsApp();
  });

  // Delegación para botones de pedir
  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;

    const btn = t.closest("[data-whatsapp]");
    if (!(btn instanceof HTMLElement)) return;

    const name = btn.getAttribute("data-name") || "";
    const price = btn.getAttribute("data-price") || "";
    openWhatsApp({ producto: name, precio: price });
  });
}

// =========================
// TABS
// =========================
function initTabs() {
  const tabs = Array.from(document.querySelectorAll(".tab"));
  if (!tabs.length) return;

  const setActive = (category) => {
    tabs.forEach((t) => {
      const isActive = t.getAttribute("data-category") === category;
      t.classList.toggle("is-active", isActive);
      t.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    renderMenu(category);
  };

  tabs.forEach((t) => {
    t.addEventListener("click", () => {
      const category = t.getAttribute("data-category") || "Almuerzos";
      setActive(category);
    });
  });

  // Default
  setActive("Almuerzos");
}

// =========================
// FORM VALIDATION (simple)
// =========================
function initForm() {
  const form = document.getElementById("contactoForm");
  if (!form) return;

  const getErr = (name) => form.querySelector(`[data-error-for="${name}"]`);

  const setError = (name, message) => {
    const input = form.querySelector(`[name="${name}"]`);
    const err = getErr(name);
    if (input instanceof HTMLElement) input.classList.add("is-invalid");
    if (err) err.textContent = message;
  };

  const clearError = (name) => {
    const input = form.querySelector(`[name="${name}"]`);
    const err = getErr(name);
    if (input instanceof HTMLElement) input.classList.remove("is-invalid");
    if (err) err.textContent = "";
  };

  ["nombre", "telefono", "mensaje"].forEach((n) => {
    form.querySelector(`[name="${n}"]`)?.addEventListener("input", () => clearError(n));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const telefono = form.telefono.value.trim();
    const mensaje = form.mensaje.value.trim();

    let ok = true;

    // Limpia antes
    clearError("nombre");
    clearError("telefono");
    clearError("mensaje");

    if (!nombre) {
      setError("nombre", "Ingresa tu nombre.");
      ok = false;
    }

    const digits = telefono.replace(/\D/g, "");
    if (!digits) {
      setError("telefono", "Ingresa tu teléfono.");
      ok = false;
    } else if (digits.length < 8) {
      setError("telefono", "Teléfono inválido (mínimo 8 dígitos)." );
      ok = false;
    }

    if (!mensaje) {
      setError("mensaje", "Escribe tu mensaje.");
      ok = false;
    }

    if (!ok) return;

    // Demo (sin backend): muestra feedback y sugiere WhatsApp
    const summary = `Nombre: ${nombre}\nTeléfono: ${telefono}\nMensaje: ${mensaje}`;
    openWhatsApp({ producto: "Consulta", precio: "" });

    // Limpia
    form.reset();
  });
}

// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", () => {
  // Año en footer
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  initNav();
  initSmoothScroll();
  initCarousel();

  renderFeatured();
  initTabs();
  renderGallery();

  initWhatsAppButtons();
  initForm();
});