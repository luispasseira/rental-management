/**
 * Created by lpasseira on 02-05-2017.
 */
$(document).ready(function () {
    (function () {

        var form = $('#form_registarVoluntary');
        var error = form.find('#mensagemErro');
        var perfil_img = $('#perfil_img');
        var nome_voluntary = form.find('#nomeVoluntary');
        var username = form.find('#usernameVoluntary');
        var datanascimento = form.find('#dataNascimento');

        var select_cp = form.find('#codPostal');
        var select_rua = form.find('#ruas');
        var select_refood = form.find('#selectNomeRefood');
        var select_has_access = form.find('#selectHasAccess');
        var select_cargo = form.find('#selectTipoCargo');

        var contactGroup = $('#contactgroup');

        var disabled_nome = form.find('#disabledNomeVoluntary');
        var disabled_username = form.find('#disabledUsernameVoluntary');
        var disabled_data_nascimento = form.find('#disabledDataNascimento');
        var disabled_ruas = form.find('#disabledRua');
        var disabled_codigo_postal = form.find('#disabledCodigoPostal');
        var disabled_porta = form.find('#disabledPorta');
        var disabled_contact = form.find('#disabledcontactgroup');
        var disabled_has_access = form.find('#disabledHasAccess');


        var editable_porta = form.find('#porta');

        var input_refood = form.find('#inputNomeRefood');
        var input_cargo = form.find('#inputTipoCargo');
        var input_contact = contactGroup.find('#contactinput');

        var btn_can = $('#btn-can');
        var btn_adicionar = $('#btn_adicionar');
        var btn_submit = form.find('#submit');


        var out = $('.st-pusher');
        var localidade = form.find('#localidade');

        function init() {
            $('.clockpicker').clockpicker({
                placement: 'top',
                align: 'left',
                donetext: 'Done'
            });

            var date = new Date();
            date.setDate(date.getDate() - 1);

            $('.datepicker').datepicker({
                autoclose: true,
                format: 'dd-mm-yyyy',
                orientation: "bottom",
                endDate: date
            });

        }

        btn_submit.click(function () {

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
                var target = contacts[i].attr("data-target");
                contact_array[i] = {contact: contact, type: type, target: target};
            }

            var file = $('#photo').get(0).files[0];
            var formData = new FormData();
            var dataForm = $('#form_registarVoluntary').find('input, textarea, select');
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
                        console.log(data);
                        swal("Warning", data.responseJSON, "warning");
                    },
                    500: function (data) {
                        console.log(data);
                        swal(data.responseJSON.title, data.responseJSON.message, "error");
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

        function camposVer() {
            nome_voluntary.fadeOut(function () {
                disabled_nome.fadeIn();
            });
            username.fadeOut(function () {
                disabled_username.fadeIn();
            });
            datanascimento.fadeOut(function () {
                disabled_data_nascimento.fadeIn();
            });
            select_cp.fadeOut(function () {
                disabled_codigo_postal.fadeIn();
            });
            select_rua.fadeOut(function () {
                disabled_ruas.fadeIn();
            });
            $('.select2').fadeOut();
            localidade.fadeOut(function () {
                localidade.fadeIn();
            });
            editable_porta.fadeOut(function () {
                disabled_porta.fadeIn();
            });
            select_refood.fadeOut(function () {
                input_refood.fadeIn();
            });
            select_cargo.fadeOut(function () {
                input_cargo.fadeIn();
            });
            select_has_access.fadeOut(function () {
                disabled_has_access.fadeIn();
            });
            btn_submit.fadeOut();
        }

        function camposAlterar() {
            disabled_nome.fadeOut(function () {
                nome_voluntary.fadeIn();
            });
            disabled_username.fadeOut(function () {
                username.fadeIn();
            });
            disabled_data_nascimento.fadeOut(function () {
                datanascimento.fadeIn();
            });
            disabled_codigo_postal.fadeOut(function () {
                select_cp.fadeIn();
            });
            disabled_ruas.fadeOut(function () {
                select_rua.fadeIn();
            });
            $('.select2').fadeIn();
            localidade.fadeOut(function () {
                localidade.fadeIn();
            });
            disabled_porta.fadeOut(function () {
                editable_porta.fadeIn();
            });

            select_refood.fadeOut(function () {
                input_refood.fadeIn();
            });
            input_cargo.fadeOut(function () {
                select_cargo.fadeIn();
            });
            disabled_has_access.fadeOut(function () {
                select_has_access.fadeIn();
            });
            btn_submit.fadeIn();
        }


        $('.btn_ver').click(loadData);

        /*******************
         * function (e) {
            e.preventDefault();
            loadData(e);
            camposVer();
            btn_submit.fadeOut();

        }
         *******************/
        /***********************************/
        /* **** ADICIONAR VOLUNTÁRIOS **** */
        /***********************************/

        btn_adicionar.click(function (e) {
            if (form.attr('data-value') === "editar" || form.attr('data-value') === "") {
                cleanForm();
                camposAlterar();
            }

            if (select_refood !== undefined) {
                select_refood.fadeIn(function () {
                    input_refood.fadeOut();
                });
            }

        });

        function cleanForm() {
            nome_voluntary.val("");

            select_cp.empty().trigger("change");
            select_rua.empty().trigger("change");
            username.val("");
            datanascimento.val("");
            localidade.val("");
            input_contact.val("");
            $('#contactgroup .new-contact').remove();
            $('#porta').val("");
            error.hide();
            $(".has-error").removeClass("has-error");
        }


        function validateForm() {

            var validated = true;

            $(".has-error").removeClass("has-error");

            if (form.find("#nomeVoluntary").val() === "") {
                form.find("#nomeVoluntary").closest(".form-group").addClass("has-error");
                error.show();
                error.find('.msg').text("Por favor, prencha o campo relativo ao nome do novo voluntário!");
                validated = false;
            }

            if (select_has_access.find(':selected').val() === "1") {

                var contacts = $(".new-contact").map(function () {
                    return $(this);
                }).get();

                var exists = false;

                for (var i = 0; i < contacts.length; i++) {
                    var type = contacts[i].find('#type' + contacts[i].attr('data-value')).attr("data-value");
                    if (type === "3" || type === 'Email') {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    error.show();
                    error.find('.msg').text("Por favor, insira no campo dos contactos um e-mail de início de sessão para o voluntário!");
                    validated = false;
                }

            }

            var selected = form.find('#codPostal option:selected').val();

            if (selected === null || selected === "") {
                form.find('#codPostal').closest(".form-group").addClass("has-error");
                error.show();
                error.find('.msg').text("Por favor, selecione o código postal do novo voluntário!");
                validated = false;
            }

            if (form.find('#porta').val() === "") {
                form.find('#porta').closest(".form-group").addClass("has-error");
                error.show();
                error.find('.msg').text("Por favor, prencha o campo relativo à porta do novo voluntário!");
                validated = false;
            }

            if (form.find('#localidade').val() === "") {
                form.find('#localidade').closest(".form-group").addClass("has-error");
                error.show();
                error.find('.msg').text("Por favor, prencha o campo relativo à localidade do novo voluntário!");
                validated = false;
            }

            if (form.find('#dataNascimento').val() === "") {
                form.find('#dataNascimento').closest(".form-group").addClass("has-error");
                error.show();
                error.find('.msg').text("Por favor, prencha o campo relativo à data de nascimento do novo voluntário!");
                validated = false;
            }

            if (validated) {
                error.hide();
                error.find('.msg').text("");
            }
            return validated;
        }

        /**********************************/
        /* ***** EDITAR VOLUNTÁRIOS ***** */
        /**********************************/
        $('.btn_editar').on('click', loadData);

        function loadData(ev) {
            ev.preventDefault();
            cleanForm();
            var clicked = $(this);
            if ($(this).hasClass("btn_editar")) {
                camposAlterar();
            } else if ($(this).hasClass("btn_ver")) {
                camposVer();
            }

            $.ajax({
                url: $(this).attr("href"),
                type: "GET",
                statusCode: {
                    404: function (data) {
                        swal({
                                title: "info",
                                text: "Este voluntário já não existe!",
                                timer: 2000
                            },
                            function () {
                                location.reload(true);
                            });
                    },
                    500: function (data) {
                        swal("Ups...", "Lamentávelmente mas neste momento não é possível atender ao seu pedido, por favor tente de novo mais tarde", "error");
                    }
                }, success: function (response) {

                    perfil_img.attr('src', response.thumbnail);

                    nome_voluntary.val(response.name);
                    username.val(response.username);
                    datanascimento.val(response.dataNascimento);

                    var op1 = $("<option></option>");
                    op1.val("" + response.cp.id);
                    op1.text(response.cp.name);
                    select_cp.empty().trigger("change");
                    select_cp.append(op1);

                    var op2 = $("<option></option>");
                    op2.val("" + response.rua.id);
                    op2.text(response.rua.name);
                    select_rua.empty().trigger("change");
                    select_rua.append(op2);
                    select_rua.trigger("change");

                    select_cargo.val(response.cargo);

                    input_cargo.val(select_cargo.find(':selected').text());
                    input_refood.val(response.refood.name);

                    editable_porta.val(response.numero);
                    disabled_username.val(response.username);
                    disabled_nome.val(response.name);

                    disabled_data_nascimento.val(response.dataNascimento);
                    disabled_codigo_postal.val(response.cp.name);
                    disabled_ruas.val(response.rua.name);
                    disabled_porta.val(response.numero);
                    disabled_has_access.val(response.locked === false ? "Sim" : "Não");
                    console.log(response.contacts);
                    if (response.contacts === undefined) {
                        $('.contactLabel').fadeOut();
                    }

                    else {
                        $('.contactLabel').fadeIn();
                        var arr = [];
                        for (var key in response.contacts) {
                            if (response.contacts.hasOwnProperty(key)) {
                                arr.push(response.contacts[key]);
                            }
                        }

                        if (clicked.hasClass("btn_editar")) {
                            for (var j = 0; j < arr.length; j++) {

                                appendContact(arr[j], j);
                            }
                        } else if (clicked.hasClass("btn_ver")) {
                            for (var j = 0; j < arr.length; j++) {

                                appendContactJustSee(arr[j], j);
                                $('.hide').fadeOut();
                            }
                        }
                    }
                }
            })

        }

        function appendContact(contact, contact_count) {

            contactGroup.append(
                '<div class="col-lg-12 dynamic_element new-contact pad-z" data-target="' + contact.contact_id + '" id="newcontact' + contact_count + '"  data-value="' + contact_count + '" data-target="0" style="margin-top:10px">' +
                '<div class="col-lg-6 pad-z"><input id="contact' + contact_count + '" name="contact' + contact_count + '"     value="' + contact.contact + '" type="text" value="938879854" disabled/> </div>' +

                '<div class="col-lg-5 w-100 pad-r-z"><input id="type' + contact_count + '" name="contact' + contact_count + '" class="" type="text" data-value="' + contact.type_id + '" value="' + contact.type + '" disabled /></div> ' +

                '<div class="col-lg-1"><button type="submit" class="no-border dynamic_element removecontact"><i class="glyphicon glyphicon-minus" style="color:white"></i></button></div>' +
                '</div>'
            );
        }

        function appendContactJustSee(contact, contact_count) {

            contactGroup.append(
                '<div class="col-lg-12 dynamic_element new-contact pad-z" data-target="' + contact.contact_id + '" id="newcontact' + contact_count + '"  data-value="' + contact_count + '" data-target="0" style="margin-top:10px">' +
                '<div class="col-lg-6 pad-z"><input id="contact' + contact_count + '" name="contact' + contact_count + '"     value="' + contact.contact + '" type="text" value="938879854" disabled/> </div>' +

                '<div class="col-lg-6 w-100 pad-r-z"><input id="type' + contact_count + '" name="contact' + contact_count + '" class="" type="text" data-value="' + contact.type_id + '" value="' + contact.type + '" disabled /></div> '
            );
        }

        return {init: init()}

    })($)
})
;