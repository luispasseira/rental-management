/**
 * Created by lpasseira on 29-05-2017.
 */
var listjs = (function () {

//Modal remover beneficiário.

    $('.remove_beneficiary').click(function (evento) {

        evento.preventDefault();

        var clicked_element = $(this);

        swal({
                title: "Eliminar?",
                text: "Tem a certeza que pretende eliminar? \n Esta ação será irreversível.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#dd6b55",
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
                        swal("Sucesso!", result.message, "success");
                        clicked_element.closest('tr').fadeOut();
                    },
                    error: function (xhr, status, error) {
                        swal({
                            title: "Não é possível eliminar esta família de beneficiários!",
                            text: "Tente novamente mais tarde.",
                            type: "error",
                            confirmButtonColor: "#aedef4",
                            confirmButtonText: "Ok!",
                            closeOnConfirm: true
                        })
                    }
                });

            });
    });


})();
