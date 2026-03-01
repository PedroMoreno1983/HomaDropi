/**
 * HomaDropi Theme - JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // AGREGAR AL CARRITO
  // ==========================================
  document.querySelectorAll('form[action="/cart/add"]').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = this.querySelector('[type="submit"]');
      var original = btn.innerHTML;
      
      btn.disabled = true;
      btn.innerHTML = 'Agregando...';
      
      fetch('/cart/add.js', { 
        method: 'POST', 
        body: new FormData(this) 
      })
      .then(function(r) { return r.json(); })
      .then(function() {
        btn.innerHTML = '¡Agregado! ✓';
        btn.style.background = '#48BB78';
        setTimeout(function() {
          window.location.href = '/checkout';
        }, 400);
      })
      .catch(function() {
        btn.disabled = false;
        btn.innerHTML = original;
        alert('Error al agregar. Intenta de nuevo.');
      });
    });
  });
  
  // ==========================================
  // HEADER SCROLL
  // ==========================================
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
      } else {
        header.style.boxShadow = '';
      }
    });
  }
  
  // ==========================================
  // MENÚ MÓVIL
  // ==========================================
  window.toggleMenu = function() {
    var nav = document.getElementById('headerNav');
    var toggle = document.querySelector('.mobile-menu-toggle');
    if (nav && toggle) {
      nav.classList.toggle('active');
      toggle.classList.toggle('active');
    }
  };
  
  // Cerrar menú al hacer click en link
  document.querySelectorAll('.header-nav a').forEach(function(link) {
    link.addEventListener('click', function() {
      var nav = document.getElementById('headerNav');
      var toggle = document.querySelector('.mobile-menu-toggle');
      if (nav) nav.classList.remove('active');
      if (toggle) toggle.classList.remove('active');
    });
  });
  
});
