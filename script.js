(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  var links = Array.prototype.slice.call(navLinks.querySelectorAll("a"));

  /* ------------------------------------------------------------------
     Mobile menu
     ------------------------------------------------------------------ */
  function setMenu(open) {
    navToggle.setAttribute("aria-expanded", String(open));
    navLinks.classList.toggle("is-open", open);
  }

  navToggle.addEventListener("click", function () {
    var isOpen = navToggle.getAttribute("aria-expanded") === "true";
    setMenu(!isOpen);
  });

  // Close the menu after picking a link
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  // Close on Escape and return focus to the toggle
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      navToggle.focus();
    }
  });

  // Close if the viewport grows past the mobile breakpoint
  window.addEventListener("resize", function () {
    if (window.innerWidth > 760) {
      setMenu(false);
    }
  });

  /* ------------------------------------------------------------------
     Header shadow once the page has scrolled
     ------------------------------------------------------------------ */
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------------
     Highlight the nav link for the section currently in view
     ------------------------------------------------------------------ */
  var sections = links
    .map(function (link) {
      var id = link.getAttribute("href").slice(1);
      return document.getElementById(id);
    })
    .filter(Boolean);

  function setActive(id) {
    links.forEach(function (link) {
      var match = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-active", match);
      if (match) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        // Treat a section as "current" when it crosses the upper-middle of the viewport
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });

    // Clear the highlight when back in the hero
    var hero = document.getElementById("hero");
    if (hero) {
      new IntersectionObserver(
        function (entries) {
          if (entries[0].isIntersecting) {
            setActive("");
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      ).observe(hero);
    }
  }

  /* ------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------ */
  var year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
