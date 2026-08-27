document.addEventListener("DOMContentLoaded", function () {
  const year = document.getElementById("y");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el) => io.observe(el));

  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.parentElement.classList.toggle("active");
    });
  });

  // --- Review-reservoir ---
  // Voeg hier nieuwe reviews toe: { title, text, name, place, date }
  // (date en place mogen leeg "" zijn)
  const REVIEWS = [
    {
      title: "In een keer geslaagd",
      text: "Ik heb een half jaar gelesd bij Alan en ben in een keer geslaagd, super fijne aardige en vooral rustige instructeur.",
      name: "Meine",
      place: "Den Haag",
      date: "18-12-2023"
    },
    {
      title: "Wat een top gozer!",
      text: "Mijn instructeur Alan Aziz heeft op zijn dag vrij 4u lang de tijd genomen om mij rijles te geven. Wat een top gozer! Hij is streng maar daardoor heb ik wel mijn examen in 1 keer gehaald!!!",
      name: "Leerling",
      place: "Den Haag",
      date: ""
    },
    {
      title: "In een keer kunnen halen door uitstekende coaching!",
      text: "Door de hands-on approach van de instructeur voel je je al snel zelfverzekerd in de auto, je wordt zeker als examenkandidaat enorm geholpen met examengerichte lessen en routes. Mede daarom heb ik het in een keer kunnen halen.",
      name: "Hidde Visser",
      place: "Den Haag",
      date: "23-10-2025"
    },
    {
      title: "Hard werken met uitstekend resultaat!",
      text: "De lessen waren altijd fijn en nuttig, maar gedurende het traject werd het natuurlijk steeds zwaarder en ingewikkelder. Mijn instructeur kon goed inschatten wat ik nodig had!",
      name: "Marijn",
      place: "Delft",
      date: ""
    },
    {
      title: "Top ervaring!",
      text: "De rijlessen waren niet alleen heel leerzaam, maar ik ging er ook echt met veel plezier naar toe! Ondanks dat ik een hele slechte concentratie heb, heeft mijn rijinstructeur er alles aan gedaan om mij tot een niveau te brengen, waardoor ik in 1x ben geslaagd!",
      name: "Phae Louman",
      place: "'s-Gravenhage",
      date: "7-7-2021"
    },
    {
      title: "Helemaal klaargestoomd voor het examen",
      text: "Ik ben in 1x geslaagd met dank aan Alan. Hele goede rijlessen, je wordt helemaal klaargestoomd voor het examen. Ook een goede sfeer in de auto. Echt top!! Ik ben super tevreden.",
      name: "Leerling",
      place: "",
      date: ""
    },
    {
      title: "Fijne rijinstructeur die met je meedenkt",
      text: "Ik heb mijn lessen als prettig en leerzaam ervaren. Alan probeerde waar mogelijk mee te denken en oefent zolang het nodig is. Alan bedankt.",
      name: "Leerling",
      place: "",
      date: ""
    },
    {
      title: "Uitstekende rijinstructeur!",
      text: "Zelf was ik aan het begin geen natuurtalent in het rijden, maar Alan (mijn rijinstructeur) heeft er toch voor gezorgd dat ik in 1x mijn praktijkexamen heb gehaald! Hij stuurde mij niet naar het examen zonder dat ik het aan kon, maar probeerde er ook voor te zorgen dat ik geen overbodige lessen hoefde te betalen. Verder zorgde hij ervoor dat ik mij op mijn gemak voelde en was het niet altijd alleen maar serieus, maar ook gezellig. Topervaring!",
      name: "Leerling",
      place: "",
      date: ""
    },
    {
      title: "Echt top",
      text: "Mijn rijinstructeur was Alan. Die heeft mij alles op een rustige en goede manier leren rijden. We hadden samen mooie momenten beleefd en dat gaf mij zelfvertrouwen op de weg, vandaar ben ik in 1 keer geslaagd voor mijn praktijkexamen. Alan je bent de beste. Ga je missen!",
      name: "Leerling",
      place: "",
      date: ""
    },
    {
      title: "Prettige, leuke en leerzame ervaring",
      text: "Ik heb een erg leuke rijleservaring gehad. Ik heb natuurlijk veel geleerd maar ook gewoon veel plezier gehad. Rijles moet natuurlijk ook leuk zijn en ik keek er dan ook altijd naar uit. Extra dank aan Alan, beste rijinstructeur die een erg prettige manier van leren had en gewoon de omgang in het geheel heeft!! Had niet anders gewild.",
      name: "Channah",
      place: "",
      date: ""
    },
    {
      title: "Fijne rijlessen gehad",
      text: "Had er eerst veel moeite mee. Dankzij mijn rijinstructeur Alan heb ik mijn rijbewijs gehaald. Ben hem erg dankbaar daarvoor.",
      name: "Leerling",
      place: "",
      date: ""
    }
  ];

  const reviewsContainer = document.getElementById("reviewsSlider");
  if (reviewsContainer && REVIEWS.length) {
    const shuffled = REVIEWS.slice().sort(() => Math.random() - 0.5);
    const count = Math.min(shuffled.length, 7 + Math.floor(Math.random() * 3)); // 7 t/m 9
    reviewsContainer.innerHTML = "";
    shuffled.slice(0, count).forEach((r) => {
      const art = document.createElement("article");
      art.className = "review card";
      const stars = document.createElement("div");
      stars.className = "stars";
      stars.textContent = "★★★★★";
      const title = document.createElement("h3");
      title.className = "review-title";
      title.textContent = r.title;
      const quote = document.createElement("p");
      quote.className = "quote";
      quote.textContent = "“" + r.text + "”";
      const meta = document.createElement("div");
      meta.className = "meta";
      meta.textContent = "— " + r.name + (r.place ? ", " + r.place : "") + (r.date ? " · " + r.date : "");
      art.append(stars, title, quote, meta);
      reviewsContainer.appendChild(art);
    });
  }

  const hamburger = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
      });
    });
  }

  // --- Autootje op de weg bij 'Zo werkt het' ---
  const stepsRoad = document.getElementById("stepsRoad");
  const roadCar = document.getElementById("roadCar");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (stepsRoad && roadCar && !reducedMotion) {
    const mobileQuery = window.matchMedia("(max-width: 900px)");

    function updateCar() {
      const rect = stepsRoad.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 zodra de weg in beeld komt, 1 zodra halte 4 bovenin het scherm staat
      let p;
      if (mobileQuery.matches) {
        p = (vh - rect.top) / (vh * 0.65 + rect.height);
      } else {
        p = (vh - rect.top) / (vh * 0.85);
      }
      p = Math.max(0, Math.min(1, p));

      if (mobileQuery.matches) {
        roadCar.style.left = "";
        roadCar.style.top = 32 + p * (rect.height - 64) + "px";
      } else {
        roadCar.style.top = "";
        roadCar.style.left = 12.5 + p * 75 + "%";
      }
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          updateCar();
          ticking = false;
        });
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateCar();
  }

  // --- Winkelwagen ---
  const cartFab = document.getElementById("cartFab");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartBackdrop = document.getElementById("cartBackdrop");
  const cartClose = document.getElementById("cartClose");
  const cartItemsEl = document.getElementById("cartItems");
  const cartEmptyEl = document.getElementById("cartEmpty");
  const cartFootEl = document.getElementById("cartFoot");
  const cartCountEl = document.getElementById("cartCount");
  const cartTotalEl = document.getElementById("cartTotal");
  const cartWhatsapp = document.getElementById("cartWhatsapp");
  const cartFormBtn = document.getElementById("cartFormBtn");
  const WA_NUMBER = "31XXXXXXXXX";

  if (cartFab && cartDrawer) {
    let cart = [];
    try {
      cart = JSON.parse(localStorage.getItem("da_cart") || "[]");
    } catch (e) {
      cart = [];
    }

    function euro(n) {
      const parts = n.toFixed(2).split(".");
      const int = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return "€" + int + (parts[1] === "00" ? ",-" : "," + parts[1]);
    }

    function save() {
      localStorage.setItem("da_cart", JSON.stringify(cart));
    }

    function orderText() {
      const lines = cart.map((it) => `• ${it.qty}x ${it.name} — ${euro(it.price * it.qty)}`);
      const total = cart.reduce((s, it) => s + it.price * it.qty, 0);
      return (
        "Hallo! Ik wil graag het volgende aanvragen via rijschool-driveaway.nl:\n" +
        lines.join("\n") +
        "\nTotaal: " + euro(total)
      );
    }

    function render() {
      const count = cart.reduce((s, it) => s + it.qty, 0);
      cartCountEl.hidden = count === 0;
      cartCountEl.textContent = count;
      cartEmptyEl.hidden = cart.length > 0;
      cartFootEl.hidden = cart.length === 0;

      cartItemsEl.innerHTML = "";
      cart.forEach((it, idx) => {
        const row = document.createElement("div");
        row.className = "cart-item";

        const name = document.createElement("div");
        name.className = "cart-item-name";
        name.textContent = it.name;

        const qty = document.createElement("div");
        qty.className = "cart-qty";
        const minus = document.createElement("button");
        minus.type = "button";
        minus.textContent = "−";
        minus.setAttribute("aria-label", "Eén minder");
        minus.addEventListener("click", () => {
          it.qty -= 1;
          if (it.qty <= 0) cart.splice(idx, 1);
          save();
          render();
        });
        const num = document.createElement("span");
        num.textContent = it.qty;
        const plus = document.createElement("button");
        plus.type = "button";
        plus.textContent = "+";
        plus.setAttribute("aria-label", "Eén extra");
        plus.addEventListener("click", () => {
          it.qty += 1;
          save();
          render();
        });
        qty.append(minus, num, plus);

        const price = document.createElement("div");
        price.className = "cart-item-price";
        price.textContent = euro(it.price * it.qty);

        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "cart-remove";
        remove.textContent = "✕";
        remove.setAttribute("aria-label", "Verwijderen");
        remove.addEventListener("click", () => {
          cart.splice(idx, 1);
          save();
          render();
        });

        row.append(name, qty, price, remove);
        cartItemsEl.appendChild(row);
      });

      const total = cart.reduce((s, it) => s + it.price * it.qty, 0);
      cartTotalEl.textContent = euro(total);
      if (cartWhatsapp) {
        cartWhatsapp.href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(orderText());
      }
    }

    function openCart() {
      cartDrawer.hidden = false;
      cartBackdrop.hidden = false;
    }

    function closeCart() {
      cartDrawer.hidden = true;
      cartBackdrop.hidden = true;
    }

    cartFab.addEventListener("click", openCart);
    cartClose.addEventListener("click", closeCart);
    cartBackdrop.addEventListener("click", closeCart);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeCart();
    });

    document.querySelectorAll("[data-add]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const name = btn.getAttribute("data-name");
        const price = parseFloat(btn.getAttribute("data-price"));
        const existing = cart.find((it) => it.name === name);
        if (existing) {
          existing.qty += 1;
        } else {
          cart.push({ name: name, price: price, qty: 1 });
        }
        save();
        render();
        openCart();
      });
    });

    if (cartFormBtn) {
      cartFormBtn.addEventListener("click", () => {
        const bericht = document.getElementById("formBericht");
        if (bericht) bericht.value = orderText();
        closeCart();
        const doel = document.getElementById("aanmelden");
        if (doel) doel.scrollIntoView({ behavior: "smooth" });
      });
    }

    render();
  }

});
