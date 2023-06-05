$(document).ready(function() {
    $('.php-email-form').submit(function(event) {
      event.preventDefault();
  
      var form = $(this);
      var url = form.attr('action');
      var formData = form.serialize();
  
      $.ajax({
        type: 'POST',
        url: url,
        data: formData,
        beforeSend: function() {
          form.find('.loading').addClass('d-block');
          form.find('.error-message').removeClass('d-block');
          form.find('.sent-message').removeClass('d-block');
        },
        success: function(response) {
          form.find('.loading').removeClass('d-block');
          if (response.trim() == 'OK') {
            form.find('.sent-message').addClass('d-block');
            form[0].reset();
          } else {
            form.find('.error-message').html(response).addClass('d-block');
          }
        },
        error: function(xhr, status, error) {
          console.log(xhr.responseText);
        }
      });
    });
  });
  