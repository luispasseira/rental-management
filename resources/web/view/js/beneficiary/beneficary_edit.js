/**
 * Created by pbarreto on 24-05-2017.
 */

// ** RUN JQuery CODE AS SOON DOC IS READY (page is loaded)  ** /


$(document).ready(function () {
    (function () {

        //
        // MAKE CACHE OF ALL FORM VALUES
        //
        var form = $('#formRegisterBeneficiary');
        var agregadoGroup = $('#agregadoGroup'); // wrapper dos Dados da Família
        var nomeCabecaFamilia = $('#nomeCabecaFamilia');
        var addDataNascimento = $('#addDataNascimento');
        var MascFemSelect = $('#MascFemSelect');
        var addFamilyMemberButton = $('#addFamilyMemberButton');
        var restricoesTextArea = $('#restricoesTextArea'); // guarda as restrições alimentares.
        var codPostal = $('#codPostal'); // guarda os dados do Código Postal
        var morada = $('#ruas'); // guarda nome das vias (rua, beco, travessa, avenida, alameda, largo, praça...)
        var porta = $('#porta'); // guarda dados da porta (nº de polícia, andar/piso, lote, habitação, etc.)
        var horario = $('#horarioInicio'); // horário da recolha / entrega de alimentos a uma família
        var formaDeEntrega = $('#formaDeEntrega'); // recolha num Núcleo ou entrega ao Domicilio
        var observacoesTextArea = $('#observacoesTextArea'); // Quaisquer outras observações
        var horario = $('#horarioInicio'); // horário da recolha / entrega de alimentos a uma família
        var mensagemErro = $('#mensagemErro'); // guarda o txt das mensagens de erro

        var contactinput = $('#contactinput'); // contactos (tlm, tel, mail)
        var localidade = form.find('#localidade');
        var btn_adicionar = $('#btn_adicionar');
        var contactgroup = $('#contactgroup');
        var selectsAgregadoGroup = $('#selectsAgregadoGroup');
        var contactInputAndSelect= $('#contactInputAndSelect');
        var disabled_nomeCabecaFamilia = $('#disabledNomeCabecaFamilia');
        var disabled_addDataNascimento = $('#disabledDataNascimento');
        var disabled_MascFemSelect = $('#disabledMascFemSelect');
        var disabled_restricoesTextArea = $('#disabledRestricoesTextArea');
        var disabled_codPostal = $('#disabledCodPostal');
        var disabled_morada = $('#disabledRuas');
        var disabled_porta = $('#disabledPorta');
        var disabled_formaDeEntrega = $('#disabledFormaDeEntrega');
        var disabled_observacoesTextArea = $('#disabledObservacoesTextArea');
        var disabled_horario = $('#disabledhorarioInicio');


        // After AJAX 'submit' CLEAR ALL FORM FIELDS
        function cleanForm() {
            nomeCabecaFamilia.val("");
            restricoesTextArea.text("");
            porta.val("");
            localidade.val("");
            horario.val("");
            formaDeEntrega.val("");
            observacoesTextArea.val("");
            codPostal.empty().trigger("change");
            morada.empty().trigger("change");
            $('#contactgroup .new-contact').remove();
            $('#agregadoGroup .agregadoItem').remove();
            mensagemErro.hide();
            $(".has-error").removeClass("has-error");
        }

        function camposVer() {
            nomeCabecaFamilia.fadeOut(function () {
                disabled_nomeCabecaFamilia.fadeIn();
            });
            selectsAgregadoGroup.fadeOut();
            addDataNascimento.fadeOut(function () {
                disabled_addDataNascimento.fadeIn();
            });
            MascFemSelect.fadeOut(function () {
                disabled_MascFemSelect.fadeIn();
            });
            restricoesTextArea.fadeOut(function () {
                disabled_restricoesTextArea.fadeIn();
            });
            codPostal.fadeOut(function () {
                disabled_codPostal.fadeIn();
            });
            $('.select2').fadeOut();
            localidade.fadeOut(function () {
                localidade.fadeIn();
            });
            porta.fadeOut(function () {
                disabled_porta.fadeIn();
            });
            morada.fadeOut(function () {
                disabled_morada.fadeIn();
            });
            contactInputAndSelect.fadeOut();
            formaDeEntrega.fadeOut(function () {
                disabled_formaDeEntrega.fadeIn();
            });
            observacoesTextArea.fadeOut(function () {
                disabled_observacoesTextArea.fadeIn();
            });
            horario.fadeOut(function () {
                disabled_horario.fadeIn();
            });
            $('#guardar').fadeOut();
        }

        function camposAlterar() {
            disabled_nomeCabecaFamilia.fadeOut(function () {
                nomeCabecaFamilia.fadeIn();
            });
            selectsAgregadoGroup.fadeIn();
            disabled_addDataNascimento.fadeOut(function () {
                addDataNascimento.fadeIn();
            });
            disabled_MascFemSelect.fadeOut(function () {
                MascFemSelect.fadeIn();
            });
            disabled_restricoesTextArea.fadeOut(function () {
                restricoesTextArea.fadeIn();
            });
            disabled_codPostal.fadeOut(function () {
                codPostal.fadeIn();
            });
            $('.select2').fadeIn();
            localidade.fadeOut(function () {
                localidade.fadeIn();
            });
            disabled_porta.fadeOut(function () {
                porta.fadeIn();
            });
            disabled_morada.fadeOut(function () {
                morada.fadeIn();
            });
            contactInputAndSelect.fadeIn();
            disabled_formaDeEntrega.fadeOut(function () {
                formaDeEntrega.fadeIn();
            });
            disabled_observacoesTextArea.fadeOut(function () {
                observacoesTextArea.fadeIn();
            });
            disabled_horario.fadeOut(function () {
                horario.fadeIn();
            });
            $('#guardar').fadeIn();
        }

        // Refood --> 'Beneficiários' --> LISTA --> Botão 'Adicionar Beneficiários'
        btn_adicionar.click(function (e) {
            camposAlterar();
            if (form.attr('data-value') === "editar" || form.attr('data-value') === "") {
                cleanForm();
            }
        });

        //
        // EVENT --> OnClick == botão > id='guardar' --> VERIFY ALL FORM DATA AND SAVE TO DATABASE
        //
        $('#guardar').click(function () {
            if (!validateForm()) {
                return;
            }

            // verifies creation of 'new contact' for a NEW beneficiary
            var contacts = $(".new-contact").map(function () {
                return $(this);
            }).get();

            //PROCESS CONTACTS
            //Creates an array for storing the CONTACTS of a given BENEFICIARY
            var contact_array = [];

            // Loops through ALL beneficiaries in the SAME Family

            for (var i = 0; i < contacts.length; i++) {
                var contact = contacts[i].find('#contact' + contacts[i].attr('data-value')).val();
                var type = contacts[i].find('#type' + contacts[i].attr('data-value')).attr("data-value");
                var target = contacts[i].attr("data-target");
                contact_array[i] = {contact: contact, type: type, target: target};
            }

            // TODO ???
            var attributes = $(".agregadoItem").map(function () {
                return $(this);
            }).get();

            var attributes_array = [];

            for (var i = 0; i < attributes.length; i++) {
                var date = attributes[i].find('.dataNascimento').val();
                var gender = attributes[i].find('.selectpicker').val();
                var target = attributes[i].attr("data-target");
                attributes_array[i] = {date: date, gender: gender, target: target};
            }

            var formData = new FormData();
            var dataForm = $('#formRegisterBeneficiary').find('input, select, textarea');
            var data = {};
            for (var i = 0; i < dataForm.length; i++) {
                data[dataForm[i].name] = dataForm[i].value;
            }

            //TODO ???????
            data['contacts'] = contact_array;
            data['attributes'] = attributes_array;
            console.log(JSON.stringify(data));
            formData.append('data', JSON.stringify(data));


            //---------------------  AJAX ------------------------
            // generate HTTP Status Code --> 200, 404, 500, etc...
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
            }); // TODO : FIM AJAX


        });

        //
        $('.btn_editar').on('click', loadData);

        $('.btn_ver').on('click', loadData);


        function loadData(e) {
            e.preventDefault();
            cleanForm();
            if ($(this).hasClass("btn_editar")) {
                camposAlterar();
            } else if ($(this).hasClass("btn_ver")) {
                camposVer();
            }
            var clicked = $(this);
            $.ajax({
                url: $(this).attr("href"),
                type: "GET",
                statusCode: {
                    404: function (data) {
                        swal({
                                title: "info",
                                text: "Este beneficiário já não existe!",
                                timer: 2000
                            },
                            function () {
                                location.reload(true);
                            });
                    },
                    500: function (data) {
                        swal("Ups...", "Lamentavelmente neste momento não é possível atender o seu pedido, por favor tente de novo mais tarde", "error");
                    }
                }, success: function (response) {

                    console.log(response);

                    nomeCabecaFamilia.val(response.name);
                    restricoesTextArea.text(response.food_restrictions);
                    porta.val(response.porta);
                    horario.val(response.schedule);
                    formaDeEntrega.val(response.local_delivery === "true" ? 1 : 0);
                    observacoesTextArea.val(response.observations);
                    morada.val(response.rua.name);

                    disabled_nomeCabecaFamilia.val(response.name);
                    disabled_restricoesTextArea.text(response.food_restrictions);
                    console.log(response.food_restrictions);
                    disabled_porta.val(response.porta);
                    disabled_horario.val(response.schedule);
                    disabled_codPostal.val(response.cp.name);
                    disabled_morada.val(response.rua.name);
                    disabled_formaDeEntrega.val(response.local_delivery === "true" ? "Entrega ao Domicílio" : "Recolha no Núcleo");
                    disabled_observacoesTextArea.val(response.observations);

                    var op1 = $("<option></option>");
                    op1.val("" + response.cp.id);
                    op1.text(response.cp.name);
                    codPostal.empty().trigger("change");
                    codPostal.append(op1);
                    // select_cp.trigger("change");

                    var op2 = $("<option></option>");
                    op2.val("" + response.rua.id);
                    op2.text(response.rua.name);
                    morada.empty().trigger("change");
                    morada.append(op2);
                    morada.trigger("change");


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
                        }
                    }

                    var arri = [];
                    for (var keyi in response.attributes) {
                        if (response.attributes.hasOwnProperty(keyi)) {
                            arri.push(response.attributes[keyi]);
                        }
                    }
                    if (clicked.hasClass("btn_editar")) {
                        for (var i = 0; i < arri.length; i++) {

                            appendBeneficiary(arri[i], i);
                        }
                    } else if (clicked.hasClass("btn_ver")) {
                        for (var i = 0; i < arri.length; i++) {

                            appendBeneficiaryJustSee(arri[i], i);
                        }
                    }


                }
            })
        }

        // ADDS ERROR ROUTINES --> to beneficiary.html.twig
        //
        function appendError(message) {

            return '<div class="form-fonte alert alert-danger"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false"></span>' +
                '<span class="sr-only">Erro:</span>' +
                '<span class="msg">' + message + '</span></div>';
        }

        // VALIDATES each FORM FIELDS --> only non-automatic fields
        function validateForm() {

            var validated = true; // ALL Form values assumed CORRECT by Default. VERIFICATION OCCURS AFTER Ajax 'submit'.
            $('.has-error').removeClass('has-error'); // Re-initialize all routines where errors have ocurred
            mensagemErro.hide(); // DELETE any ERRORS from Client's viewport.
            mensagemErro.html("");


            //
            //    F O R M   I N P U T   V A L I D A T I O N
            //


            //    VERIFY / VALIDATE --> NAME OF 'HEAD OF FAMILY'
            //

            if (nomeCabecaFamilia.val() === '' || !(typeof nomeCabecaFamilia.val() === "string")) {
                nomeCabecaFamilia.closest("div").addClass("has-error");
                mensagemErro.append(appendError("  <b>Nome de Cabeça de Família é Campo de preenchimento Obrigatório." +
                    " </b></br>Todo" +
                    " o beneficiário está adstrito a um Cabeça de Família. </br><b>Por favor, introduza o nome do cabeça de família deste agregado familiar.</b>"));
                validated = false;
            }


            // VERIFY / VALIDATE --> 'RESTRIÇÕES ALIMENTARES' (Food Restrictions)
            if (restricoesTextArea.val() === '' || !(typeof restricoesTextArea.val() === "string")) {
                restricoesTextArea.closest("div").addClass("has-error");
                // mensagemErro.show();
                mensagemErro.append(appendError(" <b>Restrições Alimentares é Campo de preenchimento Obrigatório. </b></br> Ignorar as restrições e alergias alimentares pode provocar situações de <b>vida ou morte </b> entre os beneficiários : </br><b>por favor preencha este campo do formulário com a máxima ATENÇÃO.</b></br>No caso de não terem sido identificadas restrições alimentares entre os beneficiários escreva <b>'Não são conhecidas'</b>. </br>A Refood agradece-lhe."));
                validated = false;
            }

            // VERIFY / VALIDATE --> if 'Código Postal' not UNDEFINED then VALIDATE
            // CPs are imported from the DB --> thus needn't be checked for valid data format
            var selected = $('#codPostal option:selected').val();
            if (selected === null || selected === undefined) {
                $('#codPostal').closest(".form-group").addClass("has-error");
                mensagemErro.append(appendError(" <b>Código Postal é Campo de preenchimento Obrigatório. </b></br> por favor não se esqueça de introduzir um código postal verídico e válido "));
                validated = false;
            }

            // VERIFY / VALIDATE --> if 'Morada' not UNDEFINED then VALIDATE
            selected = $('#ruas option:selected').val();
            if (selected === null || selected === undefined || selected == 1) {
                $('#ruas').closest(".form-group").addClass("has-error");
                mensagemErro.append(appendError(" <b>Morada é Campo de preenchimento Obrigatório. </b></br>Seleccione a sua via ou arruamento da lista de moradas que lhe é apresentada "));
                validated = false;
            }


            // VERIFY / VALIDATE --> 'NÚMERO DA PORTA' (Door Nr.)
            if (porta.val() === '' || !(typeof porta.val() === "string")) {
                porta.closest("div").addClass("has-error");
                // mensagemErro.show();
                mensagemErro.append(appendError("  <b>Porta é Campo de preenchimento Obrigatório. </b></br>Preencha o número da porta, por favor. No caso de se tratar de um apartamento, fracção ou habitação, identifique sempre correctamente o andar <b>bem como </b>o apartamento.</br></br>Exemplos: n.º 63-A, 4.º piso esquerdo traseiras  //  n.º 4537, 12.º andar direito frente, apto. B  //  Lote 22, R/C traseiras, habitação D"));
                validated = false;
            }


            // VERIFY / VALIDATE --> 'HORÁRIO DE RECOLHAS / ENTREGAS
            if (!(/^([01]{1}?[0-9]{1}|2[0-3]{1}):[0-5]{1}[0-9]{1}$/.test(horario.val()))) {
                horario.closest("div").addClass("has-error");
                // mensagemErro.show();
                mensagemErro.append(appendError("  <b>Horário é Campo de preenchimento Obrigatório." +
                    " </b></br>Introduza o horário de recolha ou de entrega, por favor. Uma vez terminado, NÂO" +
                    " acrescente mais nenhum caracter"));
                validated = false;

            }


            if (!validated) {
                mensagemErro.show();
                $("html, body").animate({scrollTop: 0}, "slow");
            }

            return validated;

        }

        function appendContact(contact, contact_count) {

            contactgroup.append(
                '<div class="col-lg-12 dynamic_element new-contact pad-z" data-target="' + contact.contact_id + '" id="newcontact' + contact_count + '"  data-value="' + contact_count + '" data-target="0" style="margin-top:10px">' +
                '<div class="col-lg-6 pad-z"><input id="contact' + contact_count + '" name="contact' + contact_count + '"     value="' + contact.contact + '" type="text" value="938879854" disabled/> </div>' +

                '<div class="col-lg-5 w-100 pad-r-z"><input id="type' + contact_count + '" name="contact' + contact_count + '" class="" type="text" data-value="' + contact.type_id + '" value="' + contact.type + '" disabled /></div> ' +

                '<div class="col-lg-1"><button type="submit" class="no-border dynamic_element removecontact"><i class="glyphicon glyphicon-minus" style="color:white"></i></button></div>' +
                '</div>'
            );
        }

        function appendContactJustSee(contact, contact_count) {

            contactgroup.append(
                '<div class="col-lg-12 dynamic_element new-contact pad-z" data-target="' + contact.contact_id + '" id="newcontact' + contact_count + '"  data-value="' + contact_count + '" data-target="0" style="margin-top:10px">' +
                '<div class="col-lg-6 pad-z"><input id="contact' + contact_count + '" name="contact' + contact_count + '"     value="' + contact.contact + '" type="text" value="938879854" disabled/></div>' +

                '<div class="col-lg-6 w-100 pad-r-z"><input id="type' + contact_count + '" name="contact' + contact_count + '" class="" type="text" data-value="' + contact.type_id + '" value="' + contact.type + '" disabled /></div>'

            );
        }

        function appendBeneficiary(beneficiary) {
            agregadoGroup.append(
                //data-target="beneficiary.id1"
                '<div class="agregadoItem col-lg-12 dynamic_element pad-z" data-target="' + beneficiary.id + '" style="margin-top:10px">' +
                '<div class="col-lg-6 pad-z">' +
                '<div class="datepicker">' +
                '<input disabled id="dataNascimento" class="dataNascimento" name="dataNascimento" value="' +
                beneficiary.birthday +
                '"' +
                'type="text"/>' +
                '</div>' +
                '</div>' +
                '<div class="col-lg-5 w-100 pad-r-z">' +
                '<input id="gender" class="selectpicker" name="gender" disabled value="' +
                beneficiary.gender +
                '">' +
                '</div>' +
                '<div class="col-lg-1">' +
                '<button type="submit" class="removeItemAgregado no-border dynamic_element">' +
                '<i class="glyphicon glyphicon-minus" style="color:white"></i>' +
                '</button>' +
                '</div>' +
                '</div>'
            );
        }

        function appendBeneficiaryJustSee(beneficiary) {
            agregadoGroup.append(
                //data-target="beneficiary.id1"
                '<div class="agregadoItem col-lg-12 dynamic_element pad-z" data-target="' + beneficiary.id + '" style="margin-top:10px">' +
                '<div class="col-lg-6 pad-z">' +
                '<div class="datepicker">' +
                '<input disabled id="dataNascimento" class="dataNascimento" name="dataNascimento" value="' +
                beneficiary.birthday +
                '"' +
                'type="text"/>' +
                '</div>' +
                '</div>' +
                '<div class="col-lg-6 w-100 pad-r-z">' +
                '<input id="gender" class="selectpicker" name="gender" disabled value="' +
                beneficiary.gender +
                '">' +
                '</div>'
            );
        }
    })()
});
