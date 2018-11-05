/**
 console.log(elements_array);

 * Created by rcastro on 05-06-2017.
 */

$(document).ready(function () {
    window.formValidator = (function () {

        var default_error_message = 'This is a required field'; // default error message
        var display_error_message = true;   // user can chose if it's to display or not error messages
        var field_individual_error_message = false; // if false show message in a box message at the top of the form
                                                    //if true show message near the field which has the error

        var init = function (form) {

            form.find('.div_error_block').remove();
            form.prepend('<div class="col-md-12 div_error_block" hidden></div>');
            form.find('.has-error').removeClass('has-error');
        };

        var bindEvents = function () {

        };

        var validateForm = function (form) {

            init(form);

            var elements_array = form.find('input, textarea, select');

            for (var i = 0; i < elements_array.length; i++) {
                if ($(elements_array[i]).attr('required')) {
                    if ($(elements_array[i]).is('input')) {
                        typeInputIdentification($(elements_array[i]));
                    }
                }
            }
        };

        var typeInputIdentification = function (inputElement) {

            switch (inputElement.attr('type')) {
                case "text":
                    if (inputElement.val() === '') {
                        errorOutput(inputElement);
                    }
                    break;
                case "number":
                    if (!$.isNumeric(inputElement.val())) {
                        errorOutput(inputElement);
                    }
                    break;
                case "tel":

                    break;
                case  'email':
                    if (!isEmail(inputElement.val())) {
                        errorOutput(inputElement);
                    }
                    break;
                case "time":
                    if (!isHour(inputElement.val())) {
                        errorOutput(inputElement);
                    }
                    break;
            }
        };

        var typeSelectIdentification = function (selectElement) {

        };

        /**
         * this function it's responsible to output the error message, in case it exists
         * the user has two possibilities to view the errors:
         *  - above the field where the plugin found the error
         *  - in a error block above the form with the field name and the output error
         */
        var errorOutput = function (element) {
            if (display_error_message) { //validate if it's to show error message

                if (!field_individual_error_message) {

                    var message = ' <b>' + findFieldName(element) + '</b><br>' + (element.attr('in-error') ? element.attr('in-error') : default_error_message);

                    $('.div_error_block')
                        .append('<div class="alert alert-danger"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="false"></span>' +
                            '<span class="sr-only">Error:</span>' +
                            '<span class="msg">' + message + '</span></div>')
                        .show();

                    element.parent('.form-group').addClass('has-error');
                }
            }
        };

        var findFieldName = function (element) {

            var title_label;

            if (title_label = $("label[for='" + element.attr("id") + "']")) {
                return title_label.text();
            }

            return element.attr("name");

        };


        /****               ******
         **** REGEX SECTION ******
         ****               ******/

        var isHour = function (value) {
            return (/^([01]?[0-9]|2[0-3]):([0-5][0-9])([ ][APap][mM]|$)$/.test(value));
        };

        var isEmail = function (email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        };

        function isPhone(phone) {
            var regex = /\(?2([0-9]{2})\)?([ ]?)([0-9]{3})\2([0-9]{3})/;
            return regex.test(phone);
        }


        return {validate: validateForm}

    })($);

    // formValidator.validate();

});
