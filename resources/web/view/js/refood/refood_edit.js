$(document).ready(function () {
    (function () {

        var form = $('#form_registarRefood');
        var error = form.find('#mensagemErro');
        var nome_refood = $('#nomeRefood');
        var input_horariofim = form.find('#horariofim');
        var input_horarioinicio = form.find('#horarioinicio');
        var select_cp = form.find('#codPostal');
        var select_rua = form.find('#ruas');
        var select_responsavel = form.find('#selectNomeResponsavel');
        var input_responsavel = form.find('#inputNomeResponsavel');
        var btn_adicionar = $('#btn_adicionar');
        var contactGroup = $('#contactgroup');
        var localidade = form.find('#localidade');
        var input_contact = contactGroup.find('#contactinput');
        var perfil_img = $('#perfil_img');

        function init() {
            initializeSelect();
            $('.clockpicker').clockpicker({
                placement: 'top',
                align: 'left',
                autoclose: true
            });
        }

        $('#submit').click(function () {
            if (!validateForm()) {
                return;
            }

            // formValidator.validate($('#form_registarRefood'));

            var contacts = $(".new-contact").map(function () {//ciclo para percorrer cada elemento que contenha a class new-contact
                return $(this);
            }).get();

            var contact_array = [];

            for (var i = 0; i < contacts.length; i++) {
                var contact = contacts[i].find('#contact' + contacts[i].attr('data-value')).val();
                var type = contacts[i].find('#type' + contacts[i].attr('data-value')).attr("data-value");
                var target = contacts[i].attr("data-target");
                contact_array[i] = {contact: contact, type: type, target: target};
            }

            var file = $('#photo').get(0).files[0];
            var formData = new FormData();
            var dataForm = $('#form_registarRefood').find('input, textarea, select');
            var data = {};
            for (var i = 0; i < dataForm.length; i++) {
                data[dataForm[i].name] = dataForm[i].value;
            }

            data['contacts'] = contact_array;
            console.log(JSON.stringify(data));
            formData.append('data', JSON.stringify(data));
            formData.append('file', file);


            $.ajax({
                type: "POST",
                url: form.attr('data-url'),
                data: formData,
                processData: false,
                contentType: false,
                statusCode: {
                    403: function (data) {
                        swal("Warning", data.responseJSON, "warning");
                    },
                    500: function (data) {

                        swal("Oops...", data.responseJSON.message, "error");
                    }
                },
                success: function (result) {

                    swal({
                        title: result.message,
                        type: "success",
                        confirmButtonText: "OK"
                    }, function () {
                        location.reload();
                    });
                }
            });

        });


        btn_adicionar.click(function (e) {
            if (form.attr('data-value') === "editar" || form.attr('data-value') === "") {
                cleanForm();
            }
        });

        function cleanForm() {
            nome_refood.val("");
            select_cp.empty().trigger("change");
            select_rua.empty().trigger("change");
            localidade.val("");
            input_horariofim.val("");
            input_horarioinicio.val("");
            input_contact.val("");
            $('#contactgroup .new-contact').remove();
            $('#porta').val("");
            error.hide();
            $(".has-error").removeClass("has-error");
        }


        function validateForm() {

            var validated = true;

            $(".has-error").removeClass("has-error");
            var selected = form.find('#codPostal option:selected').val();

            if (!ishour(form.find('#horarioinicio').val()) || !ishour(form.find('#horariofim').val())) {
                form.find('#horarioinicio').closest(".form-group").addClass("has-error");
                error.show();
                error.find('.msg').text("Por favor, adicione o horário da nova Refood!");
                validated = false;
                select_responsavel.select2();
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

            if (selected === null || selected === "") {
                form.find('#codPostal').closest(".form-group").addClass("has-error");
                error.show();
                error.find('.msg').text("Por favor, selecione o código postal da nova Refood!");
                validated = false;
            }


            if (form.find("#nomeRefood").val() === "") {
                form.find("#nomeRefood").closest(".form-group").addClass("has-error");
                error.show();
                error.find('.msg').text("Por favor, prencha o campo relativo ao nome da nova Refood!");
                validated = false;
            }

            if (validated) {
                error.hide();
                error.find('.msg').text("");
            } else {
                error.show();
                $("html, body").animate({scrollTop: 0}, "slow");
            }

            return validated;
        }

        function ishour(hour) {
            var regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
            return regex.test(hour);
        }

        $('.btn_editar').on('click', function (ev) {
            cleanForm();

            // select_responsavel.fadeOut(function () {
            //     input_responsavel.fadeIn();
            // });


            $.ajax({
                url: $(this).attr("href"),
                type: "GET",
                statusCode: {
                    404: function (data) {
                        swal({
                                title: "info",
                                text: "Este núcleo já não existe!"
                            },
                            function () {
                                location.reload(true);
                            });
                    },
                    500: function (data) {
                        swal("Oops...", "Pedimos desculpa, mas neste momento não é possível atender ao seu pedido!", "error");
                    }
                }, success: function (response) {

                    perfil_img.attr('src', response.thumbnail);

                    $('#nomeRefood').val(response.name);
                    var $option = $("<option></option>");
                    $option.val("" + response.cp.id);
                    $option.text(response.cp.name);

                    select_cp.empty().trigger("change");

                    select_cp.append($option);
                    select_cp.trigger("change");
                    $('#porta').val(response.numero);

                    // $('#inputNomeResponsavel').val(response.);

                    var arr = [];
                    for (var key in response.contacts) {
                        if (response.contacts.hasOwnProperty(key)) {
                            arr.push(response.contacts[key]);
                        }
                    }

                    for (var j = 0; j < arr.length; j++) {

                        appendContact(arr[j], j);
                    }

                    var arrc = [];
                    for (var keyc in response.responsibles) {
                        if (response.responsibles.hasOwnProperty(keyc)) {
                            arrc.push(response.responsibles[key]);
                        }
                    }

                    input_horarioinicio.val(response.openat);
                    input_horariofim.val(response.closeat);

                }
            })

        });

        function appendContact(contact, contact_count) {

            contactGroup.append(
                '<div class="col-lg-12 dynamic_element new-contact pad-z" data-target="' + contact.contact_id + '" id="newcontact' + contact_count + '"  data-value="' + contact_count + '" data-target="0" style="margin-top:10px">' +
                '<div class="col-lg-6 pad-z"><input id="contact' + contact_count + '" name="contact' + contact_count + '"     value="' + contact.contact + '" type="text" value="938879854" disabled/> </div>' +

                '<div class="col-lg-5 w-100 pad-r-z"><input id="type' + contact_count + '" name="contact' + contact_count + '" class="" type="text" data-value="' + contact.type_id + '" value="' + contact.type + '" disabled /></div> ' +

                '<div class="col-lg-1"><button type="submit" class="no-border dynamic_element removecontact"><i class="glyphicon glyphicon-minus" style="color:white"></i></button></div>' +
                '</div>'
            );
        }

        return {init: init()}

    })($)
});