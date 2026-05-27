// ----- DOM Elements -----

const yearEl = document.getElementById("year");

const menuBtn = document.getElementById("menuBtn");

const mobileMenu = document.getElementById("mobileMenu");

const ctaBtn = document.getElementById("ctaBtn");

const callBtn = document.getElementById("callBtn");

const phoneLink = document.getElementById("phoneLink");

const heading = document.getElementById("heroHeading");

const featureGrid = document.getElementById("featureGrid");

const nav = document.getElementById("nav");

const siteHeader = document.querySelector(".site-header");

const cardsContainer = document.querySelector(".cards-container");

//------ Services Data (Array of Objects) -----

const services = [
  {
    title: "Classic Haircut",
    text: "Timeless cuts with modern precision tailored to your style.",
    image: "assets/images/feature-1.jpg",
  },
  {
    title: "Beard Trim",
    text: "Shape and line-up your beard for a clean, sharp finish.",
    image: "assets/images/feature-2.jpg",
  },
  {
    title: "Straight Razor Shave",
    text: "Hot towel treatment with a smooth traditional shave.",
    image: "assets/images/feature-3.jpg",
  },
];

// ----- Navigation Data (Array of Objects) -----

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#features" },
  { label: "Book", href: "#cta" },
  { label: "Contact", href: "#footer" },
];

// ----- Render Features using forEach -----

const renderFeatures = () => {
  if (!featureGrid) return;

  services.forEach((service) => {
    const card = document.createElement("article");
    card.classList.add("feature-card");

    card.innerHTML = `
    <img src="${service.image}" alt="${service.title}"
      class="feature-img" />
    <h3 class="feature-title">${service.title}</h3>
    <p class="feature-text">${service.text}</p>
    `;

    featureGrid.appendChild(card);
  });
};

// ----- Helpers / Functions -----
const handleHeaderOnScroll = () => {
  if (!siteHeader) return;

  if (window.scrollY > 10) {
    siteHeader.classList.add("is-scrolled");
  } else {
    siteHeader.classList.remove("is-scrolled");
  }
};
// Update footer year automatically

const setCurrentYear = () => {
  const now = new Date();

  yearEl.textContent = now.getFullYear();
};

// Toggle mobile menu open/close

let isMenuOpen = false;

const toggleMobileMenu = () => {
  if (!mobileMenu) return;

  if (isMenuOpen === false) {
    mobileMenu.classList.add("is-open");

    isMenuOpen = true;
  } else {
    mobileMenu.classList.remove("is-open");

    isMenuOpen = false;
  }
};

// Close mobile menu (used when a link is clicked)

const closeMobileMenu = () => {
  if (!mobileMenu) return;

  mobileMenu.classList.remove("is-open");

  isMenuOpen = false;
};

// Reusable function with parameters (practice pattern)

const updateHeadingText = (newText) => {
  if (!heading) return;

  heading.textContent = newText;
};

// ----- Event Listeners -----

// 1) Set year on page load

setCurrentYear();

window.addEventListener("scroll", handleHeaderOnScroll);

//Run once on page load in case user refreshes mid-scroll
handleHeaderOnScroll();

//Initialize when the page loads
document.addEventListener("DOMContentLoaded", createCardShiftEffect);

// 2) Hamburger menu toggle

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    toggleMobileMenu();
  });
}

// 3) Close mobile menu when a mobile link is clicked (event delegation)

if (mobileMenu) {
  mobileMenu.addEventListener("click", (event) => {
    // If they clicked an <a> inside the menu, close it

    if (event.target.tagName === "A") {
      closeMobileMenu();
    }
  });
}

// 4) CTA Button: “Book Now” (placeholder behavior)

if (ctaBtn) {
  ctaBtn.addEventListener("click", () => {
    updateHeadingText("Booking coming next — great choice!");
  });
}

// 5) Call Button: try to use the phone number in the footer

if (callBtn) {
  callBtn.addEventListener("click", () => {
    // If you later set phoneLink href to tel:, this will work perfectly.

    // For now, this is a beginner-friendly placeholder.

    if (phoneLink) {
      updateHeadingText("Call us at " + phoneLink.textContent);
    } else {
      updateHeadingText("Call feature coming next!");
    }
  });
}

renderFeatures();
// Render navigation links (mobile/desktop)
const renderFeaturesNav = () => {
  if (!nav) return;

  const list = document.createElement("ul");
  list.classList.add("nav-list");

  navLinks.forEach((link) => {
    const li = document.createElement("li");
    li.classList.add("nav-item");

    const a = document.createElement("a");
    a.href = link.href;
    a.textContent = link.label;
    a.classList.add("nav-link");

    li.appendChild(a);
    list.appendChild(li);
  });

  // Clear existing nav content then append
  nav.innerHTML = "";
  nav.appendChild(list);
};
// Card shift function: cards shift LEFT when scrolling DOWN, RiGHT when scrolling up
function createCardShiftEffect() {
  const cardsContainer = featureGrid; //reuse your existing variable (no new query needed)

  if (!cardsContainer) {
    console.warn("Feature grid not found for card shift effect");
    return;
  }

  //Use CSS custom property for smooth updates
  cardsContainer.style.setProperty("--translate-x", "0px");

  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const deltaY = currentScrollY - lastScrollY; //positive = scrolling down

    let currentTranslate =
      parseFloat(
        getComputedStyle(cardsContainer).getPropertyValue("--translate-x"),
      ) || 0;

    //Sensitivity: negative = shift LEFT on scroll DOWN, positive would reverse it
    const sensitivity = -1.8;
    let newTranslate = currentTranslate + deltaY * sensitivity;

    //Optional soft limits so it doesn't fly off too far
    const maxShift = 600;
    newTranslate = Math.max(-maxShift, Math.min(maxShift, newTranslate));

    cardsContainer.style.setProperty("--translate-x", `${newTranslate}px`);

    lastScrollY = currentScrollY;
  };

  //High-performance scroll listener (already in your file)
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true },
  );

  console.log("✅ Card shift effect initialized (left on down / right on up)");
}

renderFeaturesNav();
