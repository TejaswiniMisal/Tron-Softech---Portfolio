/* Contact Scripting */
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const formResponse = document.getElementById('formResponse');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('number').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    fetch('http://localhost:3000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, phone, email, message }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          formResponse.innerText = 'Thanks for your message!';
          form.reset();
        } else {
          formResponse.innerText = 'Error: ' + data.message;
        }
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        formResponse.innerText = 'An error occurred. Please try again.';
      });
  });
});

/* Active Link Scripting */
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      // Remove 'active' class from all links
      navLinks.forEach(l => l.classList.remove("active"));
      
      // Add 'active' to the clicked link
      this.classList.add("active");
    });
  });
});

/* Menu Btn */
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("show");
});