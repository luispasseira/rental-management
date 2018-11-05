$(document).ready(function () {
    (function () {

        let contactgroup = $('#contactgroup');
        let select_contactype = contactgroup.find('#contactype');
        let input_contact = contactgroup.find('#contactinput');
        let contact_form = contactgroup.find('#contact_form');
        let mensagemErro = $('#mensagemErro');

        let contact_count = 1;

        function init() {
            initializeSelect();
            select_contactype.trigger("change");
        }

        $('#newcontact').click(function (e) {
            e.preventDefault();
            let validated = true;
            mensagemErro.hide(); // DELETE any ERRORS from Client's viewport.
            mensagemErro.html("");

            switch (select_contactype.select2('data')[0]['text']) {
                case "Email":
                    if (!isEmail(input_contact.val())) {
                        appendError("  <b>Email</b>");


                        validated = false;
                    }
                    break;
                case "Telefone":
                    if (!isPhone(input_contact.val())) {
                        appendError("  <b>phone</b>");

                        validated = false;
                    }
                    break;
                case "Telemóvel":
                    if (!isCellPhone(input_contact.val())) {
                        appendError("  <b>cellphone</b>");

                        validated = false;
                    }
                    break;
                default:
            }

            if (validated) {
                appendContact();
                contact_form.removeClass("has-error");
            } else {
                contact_form.addClass("has-error")
            }
        });

        $(document).on('click', '.removecontact', function (e) {
            e.preventDefault();

            $(this).closest("div .new-contact").remove();
        });

        function appendContact() {

            contactgroup.append(' ' +
                '<div class="col-lg-12 dynamic_element new-contact pad-z" id="newcontact' + contact_count + '"  data-value="' + contact_count + '" data-target="0" style="margin-top:10px">' +
                '<div class="col-lg-6 pad-z"><input id="contact' + contact_count + '" name="contact' + contact_count + '"     value="' + input_contact.val() + '" type="text" value="938879854" disabled/> </div>' +

                '<div class="col-lg-5 w-100 pad-r-z" style="padding-left: 4px; padding-right: 11px;"><input id="type' + contact_count + '" name="contact' + contact_count + '" class="" type="text" data-value="' + select_contactype.val() + '" value="' + select_contactype.select2('data')[0]['text'] + '" disabled /></div> ' +

                '<div class="col-lg-1"><button type="submit" class="no-border dynamic_element removecontact"><i class="glyphicon glyphicon-minus" style="color:white"></i></button></div>' +
                '</div>'
            );
            contact_count++;
            input_contact.val("");
        }

        function isEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }

        function isPhone(phone) {
            let regex = /\(?2([0-9]{2})\)?([ ]?)([0-9]{3})\2([0-9]{3})/;
            return regex.test(phone);
        }

        function isCellPhone(cellPhone) {
            let regex = /\(?9([0-9]{2})\)?([ ]?)([0-9]{3})\2([0-9]{3})/;
            return regex.test(cellPhone);
        }

        function initializeSelect() {
            select_contactype.select2();
        }

        select_contactype.change(function () {
            switch (select_contactype.select2('data')[0]['text']) {
                case "Email":
                    input_contact.attr("placeholder", "example@domain.com");
                    break;
                case "Telefone":
                    input_contact.attr("placeholder", "2xx xxx xxx");

                    break;
                case "Telemóvel":

                    input_contact.attr("placeholder", "9xx xxx xxx");

                    break;
                default:
            }
        });

        function appendError(message) {

            mensagemErro.append('<div class="form-fonte alert alert-danger"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false"></span>' +
                '<span class="sr-only">Erro:</span>' +
                '<span class="msg">' + message + '</span></div>');
            mensagemErro.show();
            $("html, body").animate({scrollTop: 0}, "fast");
        }

        return {init: init()}
    })($)
});