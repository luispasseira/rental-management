/**
 * Created by rcastro on 24-03-2017.
 */
$(document).ready(function () {
    (function () {

        var url = $('#url').attr("value");
        var url_ruas = $('#url2').attr("value");
        var url_localidades = $('#url3').attr("value");
        var input_localidade = $('#localidade');
        var select_ruas = $('#ruas');
        var select_cps = $('#codPostal');

        function init() {
            initializeSelect();
            // select_cps.trigger('change');
        }


        function initializeSelect() {

            select_ruas.select2();

            select_cps.select2({
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

        select_cps.change(function () {

            if (select_cps.val()) {

                $.ajax({
                    url: url_ruas + "/" + select_cps.val(),
                    dataType: 'json'
                }).done(function (data) {

                    select_ruas.html('').select2();

                    var $option;

                    if (data.length > 1) {
                        $option = $("<option></option>");
                        $option.val("");
                        $option.text("");
                        select_ruas.append($option);
                    }

                    for (var i = 0; i < data.length; i++) {
                        $option = $("<option></option>");
                        $option.val("" + data[i].id);
                        $option.text(data[i].rua);
                        select_ruas.append($option);
                    }
                    select_ruas.trigger("change");
                });
            }
        });

        select_ruas.change(function () {

            if (select_cps.val()) {
                $.ajax({
                    url: url_localidades + "/" + select_cps.val(),
                    dataType: 'json'
                }).done(function (data) {
                    if (data.length > 0)
                        input_localidade.val(data[0].name);
                    else
                        input_localidade.val("");
                });
            }
        });

        return {init: init()}
    })($)
});