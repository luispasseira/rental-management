/**
 * Created by pbarreto on 06-06-2017.
 * Updated by lpasseira on 22-06-2017.
 */

// This file
// a) CACHES variables from the 'Add Beneficiaries' form and
// b) SENDS this DATA TO SERVER BY AJAX

// Run all JS code on Page Load // implementar JS ao carregar



// start JQuery ------------------------------------------------------
$(document).ready(function () {
    (function () {



        //**** ----- CACHE of DATA from FORM 'Add Refood Source'/'Adicionar Fonte' ) ----- **** //

            // --------- CACHE of SOURCE NAMES and AFFILIATIONS  -------- //
            //
        var empresaFonte = $('#empresaFonte'); // INPUT for Source Name
        var empresaMaeGroup = $('#empresaMae'); //DIV contains
        var empresaMaeSelect = $('#empresaMaeSelect'); // SELECT source's Umbrella Organization
        var btnAddEmpresaMae = $('#btnAddEmpresaMae'); // OnCLick Create New Umbrella Organization
        var inputNewEmpresaMae = $('#inputNewEmpresaMae'); //INPUT name for new Umbrella Organization
        var nomeRefood = $('#nomeRefood'); // if Normal User --> INHERITS Name of This Refood Delegation
                                           // if Admin User --> INPUTs Name of affiliated Refood Delegation


            // --------- CACHE of SOURCE'S CONTACTS   -------- //
            //
        var contactgroup = $('#contactgroup'); //Wrapper for the Source's Contacts
        var contactinput = $('#contactinput'); // INPUT contact VALUE
        var contactype = $('#contactype'); // SELECT type of Source's Contact (mobile || phone || e-mail)
        var newcontact = $('#newcontact'); // BUTTON --> ADD NEW source contact
        var codPostal = $('#codPostal'); // INPUT from DB --> Postal Code
        var ruas = $('#ruas'); // SELECT Street from DB --> if E/R model = 'ONE PostalCode to MANY Streets'
        var porta = $('#porta'); // INPUT Address Details (door/flat numbers, left/right, etc.)


            // -----------  CACHE of data from subFORM 'RECOLHAS' (i.e. 'food PICKUPS') ----------- //
            //
        var nomeResponsavel = $('#nomeResponsavel'); // INPUT name of Source's Liaison for THIS PickUp
        var newResponsavel = $('#newResponsavel'); // BUTTON --> ADD NEW Source's Liaison for SAME Source
        var horarioinicio = $('#horarioInicio'); // PLUGIN --> Clockpicker --> INPUT PickUpTime at Source
        var DailyPickupTime = $('#DailyPickupTime'); // CHECKBOX --> if PickUpTime is to be DAILY
        var seg = $('#seg'); // CHECKBOX --> PickUpTime is on a Monday OR
        var ter = $('#ter'); // CHECKBOX --> PickUpTime is on a Tuesday OR
        var qua = $('#qua'); // CHECKBOX --> PickUpTime is on a Wednesday OR
        var qui = $('#qui'); // CHECKBOX --> PickUpTime is on a Thursday OR
        var sex = $('#sex'); // CHECKBOX --> PickUpTime is on a Friday OR
        var sab = $('#sab'); // CHECKBOX --> PickUpTime is on a Saturday OR
        var dom = $('#dom'); // CHECKBOX --> PickUpTime is on a Sunday
        var saveAllButton = $('#saveAllButton'); // BUTTON --> SAVE ALL SOURCE DATA to DB


        // EVENT -- BUTTON --> 'ADD NEW EmpresaMae

        // var empresaMae           #empresaMae
        // var btnAddEmpresaMae     #btnAddEmpresaMae
        // var empresaMaeSelect     #empresaMaeSelect
        // var inputNewEmpresaMae   #inputNewEmpresaMae

        var newPickupSchedule = $('#newPickupSchedule'); // BUTTON --> ADD NEW Schedule at SAME Source


        var cancelButton = $('#cancelButton'); // BUTTON --> CANCEL ALL ACTIONS in the 'ADD SOURCE' FORM
        function ini() {

            // --- Select empresa Mae ---- //
            $('#empresaMaeSelect') //select data from EmpresaMae

            $('#btnAddEmpresaMae') // add functions to btnEmpresaMae

            $('#nomeRefood') // inherit Data from Refood module DB


           //TODO  $('#contactinput') --> a fazer pelo Ricardo Castro
            // Tudo neste grupo é feito com o plugIn Contacts.js do RCastro

            // $('contact')//




            // ---- Plugin HORÁRIO ---- // Insert PickUp Schedule

            $('#horarioInicio').clockpicker({
                placement: 'top',
                align: 'left',
                autoclose: true
            });
        }


            btnAddEmpresaMae.click(
                function (event) {
                    event.preventDefault();


                }


            );







        return {
            init: ini()
        }

    })($);
});