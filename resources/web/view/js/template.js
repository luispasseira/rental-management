$(document).ready(function () {
    (function () {

        var geral_form = $('#st-container').find('form');

        var default_image_src = $('#perfil_img').attr("src");


        $('#btn_adicionar').click(function () {
            setTimeout(function () {
                geral_form.attr('data-value', 'adicionar');
                $('#perfil_img').attr("src", default_image_src);
            }, 500);
            geral_form.attr('data-url', $('#path_add').val());
            $('#sidebar-title').text('Adicionar');
        });

        $('.btn_editar').on('click', function (ev) {
            setTimeout(function () {
                geral_form.attr('data-value', 'editar');
            }, 500);
            geral_form.attr('data-url', $(this).attr("href"));
            $('#sidebar-title').text('Editar');
            return false;
        });

        $('.btn_ver').on('click', function (ev) {
            setTimeout(function () {
                geral_form.attr('data-value', 'ver');
            }, 500);
            geral_form.attr('data-url', "");
            $('#sidebar-title').text('Ver');
            return false;
        });

        $('#btn-can').on("click", function () {
            $('.st-pusher').trigger("click");
        });

        $(document).keydown(function (e) {
            if (e.keyCode === 27) {
                $('.st-pusher').trigger("click");
            }
        });


        $('#photo').change(function () {
            if (this.files || this.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#perfil_img').attr('src', e.target.result);
                };

                reader.readAsDataURL(this.files[0]);
            }
        });

    })($)
});
