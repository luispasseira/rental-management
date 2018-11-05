/**
 * Created by rcastro on 28-03-2017.
 */
var listjs = (function () {


    // input_search.keyup(function () {
    //     search_text = (input_search.val());
    //
    //     if (search_text.length > 3) {
    //         $.ajax({
    //             type: "POST",
    //             url: $('#url5').attr("value"),
    //             data: formData,
    //             processData: false,
    //             contentType: false,
    //             success: function (result) {
    //                 if (result[1] === "success") {
    //                     window.location.href = $('#url4').attr('value');
    //                 } else {
    //                     alert("something when wrong");
    //                 }
    //             },
    //             error: function (xhr, status, error) {
    //                 alert(error.toString());
    //             }
    //         });
    //     }
    // });

    $('.remove_site').click(function (e) {

        e.preventDefault();

        var clicked_element = $(this);

        swal({
                title: "Eliminar?",
                text: "Tem a certeza que pretende eliminar?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, eliminar!",
                cancelButtonText: "Cancelar",
                closeOnConfirm: true,
                showLoaderOnConfirm: true
            },
            function () {

                $.ajax({
                    type: "POST",
                    url: clicked_element.attr('href'),
                    processData: false,
                    contentType: false,
                    success: function (result) {
                        console.log(result);
                        swal("Sucesso!", result.message, "success");
                        $('#count').text(result.content[0].total);
                        clicked_element.closest('tr').fadeOut();
                    },
                    error: function (xhr, status, error) {
                        swal({
                                title: "Não é possível eliminar esta Refood!",
                                text: "Por favor, associe os voluntários a outra refood.",
                                type: "error",
                                showCancelButton: true,
                                confirmButtonColor: "#aedef4",
                                confirmButtonText: "Migrar voluntários!",
                                cancelButtonText: "Ok!",
                                closeOnConfirm: true,
                                closeOnCancel: true
                            },
                            function (isConfirm) {
                                if (isConfirm) {
                                    window.location.href = (data_urls["voluntarylist"]);
                                }
                            })
                    }
                });

            });
    });


})();