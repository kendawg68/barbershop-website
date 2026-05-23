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

// ------------------Services Data (Array of objects)----------------

const services = [
    {
        title: "Classic Haircut",
        text: "Timeless cuts with modern precision tailored to your style.",
        image: "assets/feature-1.jpg"
    },
    {
        title: "Beard Trim",
        text: "Shape and line-up your beard for a clean, sharp finish",
        image: "assets/feature-2.jpg"
    },
    {
        title: "Straight Razor Shave",
        text: "Hot towel treatment with a smooth traditional shave",
        image: "assets/feature-3.jpg"
    }
];

// -----------Navigation Data (Array of Objects)--------------------

const navLinks = [
    { label: "Home", href: "#hero"},
    { label: "Services", href: "#features"},
    { label: "Book", href: "#cta"},
    { label: "Contact", href: "footer"}
];

// Render feature using forEach

// const renderFeatures = () => {

//     if (!featureGrid) return;

//     services.forEach(service => { //calls the array name and use forEach to loop through it service is the paramater the represents each item in the array as we loop through it

//     const card = document.createElement("article");
//     //creating the element
//     card.classList.add("feature-card");

//     card.innerHTML = `
//     <img src="${service.image}" alt="${service.title}" class="feature-img" />
//     <h3 class="feature-title">${service.title}</h3>
//     <p class="feature-text">${service.text}</p>
//     `; //insert data into the card using template literals

//     featureGrid.appendChild(card);
// });
// };

const renderFeaturesMap = () => {
  const cardsHTML = services.map(service => {
    return `
    <article class="feature-card">
      <img src="${service.image}" alt="${service.title}" class="feature-img" />
      <h3 class="feature-title">${service.title}</h3>
      <p class="feature-text">${service.text}</p>
    </article>
    `;
  })
  .join("");

  featureGrid.innerHTML = cardsHTML;
};

// -------- Render Navigation Using Map() --------------

const renderNavigation = () => {
  // Desktop nav
  if (nav) {
    const navHTML = navLinks
      .map((link) => {
        return `
        <a href="${link.href}" class="nav-link">
          ${link.label}
        </a>
      `;
    })
    .join(""); //.join is needed to convery the array of string into one big string that we use without commas in between
    //we use empty string ("") as a seperator because we dont want anything in between the links (no commas, spaces, dashes, etc)
    nav.innerHTML = navHTML // this is where we insert the generated HTML into the pasge
  } // innerHTML is a property that allows us to set the HTML content of an element. When we set it, the browser parses the string as HTML and creates the corresponding DOM elements. In this case, it will create <a> elements inside the nav based on our navLinks data. 
}

// ----- Helpers / Functions -----

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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
renderFeaturesMap();
renderNavigation();