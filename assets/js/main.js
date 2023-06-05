$(document).ready(function () {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return $(el);
    } else {
      return $(el).first();
    }
  };

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      selectEl.on(type, listener);
    }
  };

  const onscroll = (el, listener) => {
    el.scroll(listener);
  };

  let navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.each(function () {
      let section = select($(this).attr('href'));
      if (!section) return;
      if (position >= section.offset().top && position <= (section.offset().top + section.outerHeight())) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  };
  $(window).on('load', navbarlinksActive);
  onscroll($(document), navbarlinksActive);

  const scrollto = (el) => {
    let elementPos = select(el).offset().top;
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    });
  };

  let backtotop = select('.back-to-top');
  if (backtotop.length) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.addClass('active');
      } else {
        backtotop.removeClass('active');
      }
    };
    $(window).on('load', toggleBacktotop);
    onscroll($(document), toggleBacktotop);
  }

  on('click', '.mobile-nav-toggle', function (e) {
    $('body').toggleClass('mobile-nav-active');
    $(this).toggleClass('bi-list bi-x');
  });

  on('click', '.scrollto', function (e) {
    if (select($(this).attr('href')).length) {
      e.preventDefault();

      let body = select('body');
      if (body.hasClass('mobile-nav-active')) {
        body.removeClass('mobile-nav-active');
        let navbarToggle = select('.mobile-nav-toggle');
        navbarToggle.toggleClass('bi-list bi-x');
      }
      scrollto($(this).attr('href'));
    }
  });

  $(window).on('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash).length) {
        scrollto(window.location.hash);
      }
    }
  });

  let preloader = select('#preloader');
  if (preloader.length) {
    $(window).on('load', () => {
      preloader.remove();
    });
  }

  const typed = select('.typed');
  if (typed.length) {
    let typed_strings = typed.attr('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  let skilsContent = select('.skills-content');
  if (skilsContent.length) {
    new Waypoint({
      element: skilsContent[0],
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.each(function () {
          $(this).css('width', $(this).attr('aria-valuenow') + '%');
        });
      }
    });
  }

  $(window).on('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer.length) {
      let portfolioIsotope = new Isotope(portfolioContainer[0], {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.each(function () {
          $(this).removeClass('filter-active');
        });
        $(this).addClass('filter-active');

        portfolioIsotope.arrange({
          filter: $(this).attr('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh();
        });
      });
    }

  });

  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  $(window).on('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  });

  new PureCounter();


  $('.php-email-form').submit(function (event) {
    event.preventDefault();

    var form = $(this);
    var formData = form.serialize();

    // Mostrar los datos del formulario en la consola
    console.log(formData);

    // Agrega aquí tu lógica adicional para procesar los datos del formulario

    // Resto del código para mostrar mensajes y limpiar el formulario
    form.find('.loading').addClass('d-block');
    form.find('.error-message').removeClass('d-block');
    form.find('.sent-message').removeClass('d-block');

    setTimeout(function () {
      form.find('.loading').removeClass('d-block');
      form.find('.sent-message').addClass('d-block');
      form[0].reset();
    }, 2000);
  });
});
