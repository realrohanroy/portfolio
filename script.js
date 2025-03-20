// Navbar scroll effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

// Mobile menu toggle
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", function () {
  mobileMenu.classList.toggle("hidden");
});

// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll(".mobile-nav-link");
mobileLinks.forEach((link) => {
  link.addEventListener("click", function () {
    mobileMenu.classList.add("hidden");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Typewriter effect
const typewriterElement = document.getElementById("typewriter");
const titles = [
  "Web Developer",
  "MERN Stack Developer",
  "Django Developer",
  "React JS Developer",
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let erasingDelay = 50;
let newTextDelay = 2000;

function typeWriter() {
  const currentTitle = titles[titleIndex];

  if (isDeleting) {
    typewriterElement.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
  }

  let typingSpeed = isDeleting ? erasingDelay : typingDelay;

  if (!isDeleting && charIndex === currentTitle.length) {
    isDeleting = true;
    typingSpeed = newTextDelay;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
  }

  setTimeout(typeWriter, typingSpeed);
}

// Start the typewriter effect when the page loads
window.onload = function () {
  setTimeout(typeWriter, newTextDelay);

  // Initialize particles.js
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#60a5fa",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#60a5fa",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize skill progress bars
    initSkillProgress();
    
    // Initialize skills filtering
    initSkillsFilter();
    
    // Initialize animations on scroll
    initScrollAnimation();
  });
  
  // Function to animate skill progress bars
  function initSkillProgress() {
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    // Initial setup - set all to 0% width
    skillProgressBars.forEach(bar => {
      bar.style.width = '0%';
    });
    
    // Animate when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const level = progressBar.getAttribute('data-level');
          
          // Small delay before animation starts
          setTimeout(() => {
            progressBar.style.width = `${level}%`;
          }, 200);
          
          // Unobserve after animation
          observer.unobserve(progressBar);
        }
      });
    }, { threshold: 0.2 });
    
    // Observe all progress bars
    skillProgressBars.forEach(bar => {
      observer.observe(bar);
    });
  }
  
  // Function to handle skill filtering
  function initSkillsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter skill cards
        skillCards.forEach(card => {
          if (filterValue === 'all') {
            card.style.display = 'block';
          } else {
            const cardCategory = card.getAttribute('data-category');
            if (cardCategory.includes(filterValue)) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          }
          
          // Re-trigger animation for visible cards
          setTimeout(() => {
            if (card.style.display === 'block') {
              card.classList.add('visible');
            } else {
              card.classList.remove('visible');
            }
          }, 50);
        });
      });
    });
  }
  
  // Function to handle scroll animations
  function initScrollAnimation() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add staggered delay based on index
          const index = Array.from(skillCards).indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 100 * index);
          
          // Unobserve after animation
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    // Observe all skill cards
    skillCards.forEach(card => {
      observer.observe(card);
    });
  }
  
  // Optional: Add hover effects for skill cards
  document.addEventListener('mousemove', function(e) {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
      if (card.classList.contains('visible')) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
          const xPercent = Math.floor((x / rect.width) * 100);
          const yPercent = Math.floor((y / rect.height) * 100);
          
          // Apply subtle tilt effect based on mouse position
          // Only apply when mouse is over the card
          card.style.transform = `translateY(-5px) perspective(1000px) rotateX(${(yPercent - 50) * 0.03}deg) rotateY(${(xPercent - 50) * -0.03}deg)`;
        } else {
          card.style.transform = 'translateY(0)';
        }
      }
    });
  });

// Animate elements on scroll
const scrollElements = document.querySelectorAll(
  ".project-card, .skill-card, .timeline-content, .achievement-card, .testimonial-card"
);

const elementInView = (el, percentageScroll = 100) => {
  const elementTop = el.getBoundingClientRect().top;
  const elementHeight = el.getBoundingClientRect().height;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) *
      (percentageScroll / 100)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("opacity-100");
  element.classList.add("translate-y-0");
  element.classList.remove("opacity-0");
  element.classList.remove("translate-y-10");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 90)) {
      displayScrollElement(el);
    }
  });
};

// Initialize scroll animations
window.addEventListener("load", () => {
  scrollElements.forEach((el) => {
    el.classList.add("transition-all");
    el.classList.add("duration-700");
    el.classList.add("transform");
    el.classList.add("opacity-0");
    el.classList.add("translate-y-10");
  });

  handleScrollAnimation();
});

window.addEventListener("scroll", handleScrollAnimation);

// Initialize EmailJS
(function(){
  emailjs.init("OZdjKeto8tAuC6kGj"); // Replace with your EmailJS public key
})();

// Form submission
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Basic validation
      if (!name || !email || !message) {
          alert("Please fill in all required fields");
          return;
      }

      // Create a template object
      const templateParams = {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message
      };

      // Send the email using EmailJS
      emailjs.send("service_i17hgtc", "template_4we0n5v", templateParams) // Replace with your service ID and template ID
          .then(function(response) {
              console.log('SUCCESS!', response.status, response.text);
              alert("Thank you for your message! I will get back to you soon.");
              contactForm.reset();
          }, function(error) {
              console.log('FAILED...', error);
              alert("Failed to send message. Please try again later.");
          });
  });
}
