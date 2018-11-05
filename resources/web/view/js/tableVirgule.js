/**
 * Created by rcastro on 16-05-2017.
 */
$(document).ready(function () {
    var table = (function () {

        var input_search = $('#input_search');

        var tableVirgule = $('.virgule');

        var filters_content = $('#filter-content');
        var search_by_container = $('#search-by');

        // var select_filter_table_option = $('.filter-table-option');

        var filterOptionName = [];

        var filterOptionItem = '<option value="{i}" data-value="{dt}">{t}</option>';

        //last values
        var input_filter_lastValue = '';

        var ini = function () {
            secureConditions();
            bindEvent();
        };

        var bindEvent = function () {
            input_search.click(renderFilterForm);
            $(document).on("keyup", ".filter-input-text", newFilter);
            $(document).on("click", ".remove_filter", removeFilter);
            $(document).on('keyup', '.text_filter_input', saveFilterText);
            $(document).on("click", ".text_filter", changeFilterText);
            $(document).on("click", ".column_order", orderByColumn);
        };

        var orderByColumn = function () {

            if ($(this).hasClass("order-by-desc")) {
                $(this).removeClass("order-by-desc").addClass("order-by-asc").find("i").removeClass("glyphicon-chevron-down").addClass('glyphicon-chevron-up');
            } else if ($(this).hasClass("order-by-asc")) {
                $(this).removeClass("order-by-asc").addClass("order-by-desc").find("i").removeClass("glyphicon-chevron-up").addClass('glyphicon-chevron-down');
            } else {
                $(this).addClass("order-by-asc").trigger("click");
            }

        };

        var changeFilterText = function (event) {
            event.preventDefault();

            $(this).hide();
            $(this).next('.text_filter_input').show();
            $(this).next('.text_filter_input').val($(this).text());
            input_filter_lastValue = $(this).text();
        };

        var saveFilterText = function (event) {
            event.preventDefault();
            if (event.which === 13) {
                $(this).hide();
                $(this).prev('.text_filter').show();
                $(this).prev('.text_filter').text($(this).val());
            } else if (event.which === 27) {
                $(this).hide();
                $(this).prev('.text_filter').show();
                $(this).prev('.text_filter').text(input_filter_lastValue);
            }

        };

        var secureConditions = function () {

            var is_secured = true;

            if (tableVirgule.length > 0) {
                detectTableHeader();
            } else {
                is_secured = false;
            }
            return is_secured;
        };

        var renderFilterForm = function () {

            input_search.hide();

            var select = '<select class="filter-table-option">';

            for (var i = 0; i < filterOptionName.length; i++) {
                select += filterOptionItem.replace('{t}', filterOptionName[i]).replace('{i}', i + '').replace('{dt}', filterOptionName[i].noAccents().toLowerCase().toSlug());
            }

            select += '</select>';

            search_by_container.append('<label class="badge filter-form">' + select + ': <input class="filter-input-text" type="text"> <a class="remove_filter"><i class="glyphicon glyphicon-remove"></i></a></label>');

            $('.filter-input-text').focus();

        };

        var removeFilter = function () {
            var label = $(this).closest('label');

            if (label.hasClass('filter-form')) {
                input_search.show();
            }
            label.remove();
        };

        /**
         * called when user hit the enter after write he's keyword
         * @param e
         */
        var newFilter = function (e) {
            e.preventDefault();

            if (e.which === 13) {

                var select_filter_table_option = $('.filter-table-option');

                if (select_filter_table_option.find(':selected').val() == -1) {
                    //TODO show missing argument
                    alert('add an option');
                } else {
                    if ($(this).val() !== '') {
                        filters_content.append('' +
                            '<label class="badge" data-value="' + select_filter_table_option.find(':selected').attr('data-value') + '">' +
                            '<span class="chosed_option_filter">' + select_filter_table_option.find(':selected').text() + '</span>: ' +
                            '<span class="text_filter">' + $(this).val() + '</span><input class="text_filter_input" type="text">' +
                            '<a class="remove_filter">' +
                            '<i class="glyphicon glyphicon-remove" ></i>' +
                            '</a>' +
                            '</label>');
                        $(this).val('');
                    }
                }

                input_search.show();
                $('.filter-form').remove();
            }
        };

        var detectTableHeader = function () {

            filterOptionName = [];

            var th = tableVirgule.find('th');

            if (th.length > 0) {
                for (var i = 0; i < th.length; i++) {

                    var a = $(th[i]).find('a');
                    a.removeAttr('href');
                    a.addClass('column_order');
                    var temp = $(th[i]).find('a').text();

                    if (temp !== undefined && temp !== "") {
                        createFilterOption(temp, i);
                    }
                }
            } else {
                console.log('Table virgule without th');
            }
        };

        var createFilterOption = function (text, i) {
            // select_filter_table_option.append(filterOptionItem.replace('{t}', text).replace('{i}', i));
            filterOptionName.push(text);
        };


        return {init: ini}

    })($);

    table.init();
});

