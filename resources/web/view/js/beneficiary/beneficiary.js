// This file
// a) CACHES variables from the 'Add Beneficiaries' FORM and
// b) SENDS this DATA TO SERVER by AJAX


// *** --- Run code immediately after loading page (DOC is 'ready') --- *** /
$(document).ready(function () {
    (function () {

        // ---------------------------- FORM CACHE --> 'Agregado' Group ---------------------------- //
        //
        var nomeCabecaFamilia = $('#nomeCabecaFamilia');
        var agregadoGroup = $('#agregadoGroup'); // Wrapper for Family/Beneficiaries Contacts
        var addDataNascimento = $('#addDataNascimento'); // Date of Birth --> for EACH Beneficiary
        var MascFemSelect = $('#MascFemSelect'); // Gender selector --> for EACH Beneficiary
        var addFamilyMemberButton = $('#addFamilyMemberButton'); // ADD NEW Beneficiary to SAME Family
        var restricoesTextArea = $('#restricoesTextArea'); // INPUT Food Restrictions
        var codPostal = $('#codPostal'); // INPUT postal code (xxxx-yyy format)
        var ruas = $('#ruas'); // Address (ie. NAME (of street, lane, square, avenue...) ONLY.
        var porta = $('#porta'); // INPUT Address Details (door/flat numbers, left/right, etc.)
        var contactinput = $('#contactinput'); // 'head of family' contacts (mobile/phone/e-mail)
        var horarioInicio = $('#horarioInicio'); // schedule Refood PICKUPS at SOURCES ('i.e. Recolhas')
        var formaDeEntrega = $('#formaDeEntrega'); // (at a Refood delegation OR at his home.
        var observacoesTextArea = $('#observacoesTextArea'); // All kinds but FOOD RESTRICTIONS

        var cancelButton = $('#cancelButton'); // BUTTON --> CANCEL ALL ACTIONS in 'ADD Beneficiary' FORM
        var saveAllButton = $('#saveAllButton'); // BUTTON --> SAVE ALL SOURCE DATA to DB

        // -------------------------------------  PLUGINS  ------------------------------------- //


        function ini() {

            // Plugin - Horário
            $('#horarioInicio').clockpicker({
                placement: 'top',
                align: 'left',
                autoclose: true
            });

            // AutoSize of all TextAreas in module 'Beneficiários'
            autosize($('textarea'));


            // Plugin - DatePicker
            $('.dataNascimento').datepicker({format: 'dd-mm-yyyy', autoclose: true});
        }




        //  EVENT --> ADD NEW Beneficiary //
        // --> BUTTON 'Mais' generates New 'Datepicker' and 'Gender' selector -------  //

        addFamilyMemberButton.click(function (event) {
            event.preventDefault();


            // if DatePicker Not Empty --> Process DataPicker Data appending HTML code
            if (addDataNascimento.val() !== "") {
                agregadoGroup.append(
                    //data-target="beneficiary.id1"
                    '<div class="agregadoItem col-lg-12 dynamic_element pad-z" data-target="0" style="margin-top:10px">' +
                    '<div class="col-lg-6 pad-z">' +
                    '<div class="datepicker">' +
                    '<input disabled id="dataNascimento" class="dataNascimento" name="dataNascimento" value="' +
                    addDataNascimento.val() +
                    '"' +
                    'type="text"/>' +
                    '</div>' +
                    '</div>' +
                    '<div class="col-lg-5 w-100 pad-r-z">' +
                    '<input id="gender" class="selectpicker" name="gender" disabled value="' +
                    MascFemSelect.find(':selected').text() +
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
            // Reset Datapicker Value to Blank
            addDataNascimento.val("");
        });


        // EVENT -- REMOVE Beneficiary and its DATA from 'new beneficary'FORM INPUT
        $(document).on("click", ".removeItemAgregado", function () {
            $(this).closest('.agregadoItem').remove();
        });











        return {init: ini()}

    }) ($);
});


