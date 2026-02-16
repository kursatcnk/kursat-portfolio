$(function() {

    // Formu al
    var form = $('#contact-form');

    // Mesaj kutusunu al
    var formMessages = $('.form-message');

    // Form gönderimi için dinleyici ekle
    $(form).submit(function(e) {
        // Tarayıcının normal form gönderimini durdur
        e.preventDefault();

        // Form verisini serialize et
        var formData = $(form).serialize();

        // AJAX ile POST isteği gönder
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })
        .done(function(response) {
            // Başarılı durumda mesajı göster
            $(formMessages).removeClass('error');
            $(formMessages).addClass('success');
            $(formMessages).text(response);

            // Formu temizle
            $('#contact-form input, #contact-form textarea').val('');
        })
        .fail(function(data) {
            // Hata durumunda mesajı göster
            $(formMessages).removeClass('success');
            $(formMessages).addClass('error');

            if (data.responseText !== '') {
                $(formMessages).text(data.responseText);
            } else {
                $(formMessages).text('Bir hata oluştu. Mesajınız gönderilemedi.');
            }
        });
    });

});
