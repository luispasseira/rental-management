
// ----------------------  SHOW SOURCES DATA IN LIST VIEW  ---------------------- //

$(document).ready(function () {
    (function () {

        var form = $('#form_registarRefood');
        var error = form.find('#mensagemErro');

        var input_horariofim = form.find('#horariofim');
        var input_horarioinicio = form.find('#horarioinicio');

        var select_responsavel = form.find('#nomeResponsavel');

        var url = $('#url4').attr("value");


        function init() {
            input_horariofim.val("teste");
             form.find('#horariofim').val();
            initializeSelect();
            $('.clockpicker').clockpicker({
                placement: 'top',
                align: 'left',
                donetext: 'Done'
            });
        }

        $('#submit').click(function () {
            if (!validateForm()) {
                return;
            }

            var contacts = $(".new-contact").map(function () {
                return $(this);
            }).get();

            var contact_array = [];

            for (var i = 0; i < contacts.length; i++) {
                var contact = contacts[i].find('#contact' + contacts[i].attr('data-value')).val();
                var type = contacts[i].find('#type' + contacts[i].attr('data-value')).attr("data-value");
                contact_array[i] = {contact: contact, type: type};
            }

            var file = $('#photo').get(0).files[0];
            var formData = new FormData();
            var dataForm = $('#form_registarRefood').find('input, textarea, select');
            var data = {};
            for (var i = 0; i < dataForm.length; i++) {
                data[dataForm[i].name] = dataForm[i].value;
            }

            data['contacts'] = contact_array;

            formData.append('data', JSON.stringify(data));
            formData.append('file', file);

            $.ajax({
                type: "POST",
                url: $('#url5').attr("value"),
                data: formData,
                processData: false,
                contentType: false,
                success: function (result) {
                    if (result[1] === "success") {

                        swal({
                            title: "Nova Refood criada com sucesso",
                            type: "success",
                            confirmButtonText: "OK"
                        }, function () {
                            window.location.href = $('#url4').attr('value');
                        });

                    } else if (result[1] === "warning") {

                        swal({
                            title: "Nova Refood criada com sucesso",
                            text: result[2],
                            type: "success",
                            confirmButtonText: "OK"
                        }, function () {
                            window.location.href = $('#url4').attr('value');
                        });

                    } else {
                        swal({
                            title: "Resposta desconhecida do servidor",
                            text: "Será redirecionado/a em 2 segundos",
                            timer: 2000,
                            showConfirmButton: false
                        }, function () {
                            window.location.href = $('#url4').attr('value');
                        });
                    }
                },
                error: function (xhr, status, error) {
                    sweetAlert("Oops...", error.toString(), "error");
                }
            });
        });

        function validateForm() {

            var validated = true;

            form.find("#nomeRefood").closest(".form-group").removeClass("has-error");
            form.find('#codPostal').closest(".form-group").removeClass("has-error");
            form.find('#porta').closest(".form-group").removeClass("has-error");
            form.find('#localidade').closest(".form-group").removeClass("has-error");
            form.find('#horarioinicio').closest(".form-group").removeClass("has-error");

            if (form.find("#nomeRefood").val() === "") {
                form.find("#nomeRefood").closest(".form-group").addClass("has-error");
                error.show();
                error.find('.msg').text("Por favor, prencha o campo relativo ao nome da nova Refood!");
                validated = false;
            }

            var selected = form.find('#codPostal option:selected').val();

            if (selected === null || selected === "") {
                form.find('#codPostal').closest(".form-group").addClass("has-error");
                error.show();
                error.find('.msg').text("Por favor, selecione o código postal da nova Refood!");
                validated = false;
            }

            if (form.find('#porta').val() === "") {
                form.find('#porta').closest(".form-group").addClass("has-error");
                error.show();
                error.find('.msg').text("Por favor, prencha o campo relativo à porta da nova Refood!");
                validated = false;
            }

            if (form.find('#localidade').val() === "") {
                form.find('#localidade').closest(".form-group").addClass("has-error");
                error.show();
                error.find('.msg').text("Por favor, prencha o campo relativo à localidade da nova Refood!");
                validated = false;
            }

            if (!ishour(form.find('#horarioinicio').val()) || !ishour(form.find('#horariofim').val())) {
                form.find('#horarioinicio').closest(".form-group").addClass("has-error");
                error.show();
                error.find('.msg').text("Por favor, adicione o horário da nova Refood!");
                validated = false;
                select_responsavel.select2();
            }

            if (validated) {
                error.hide();
                error.find('.msg').text("");
            }
            return validated;
        }

        input_horariofim.change(function () {
            if (input_horariofim.val() < input_horarioinicio.val())
                input_horariofim.closest('.form-group').addClass("has-error");
            else
                input_horariofim.closest('.form-group').removeClass("has-error");
        });

        function initializeSelect() {
            select_responsavel.select2({
                minimumInputLength: 3,
                ajax: {
                    url: url,
                    dataType: 'json',
                    type: "GET",
                    delay: 250,
                    data: function (term) {
                        return {
                            term: term,
                            page: term.page
                        };
                    },
                    processResults: function (data, params) {
                        params.page = params.page || 1;

                        return {
                            results: $.map(data, function (item) {
                                return {
                                    text: item.cp,
                                    id: item.id
                                }
                            }),
                            pagination: {
                                more: (params.page * 30) < data.total_count
                            }
                        };
                    },
                    cache: true
                },
                escapeMarkup: function (markup) {
                    return markup;
                },
                templateResult: function (args) {
                    if (args.loading) return false;
                    return args.text;
                },
                templateSelection: function (args) {
                    return args.text;
                }
            });
        }

        function ishour(hour) {
            var regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
            return regex.test(hour);
        }

        return {init: init()}


    })($);
});
