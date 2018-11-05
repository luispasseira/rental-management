/**
 * Created by helder on 23-06-2016.
 */

// IIFE created to avoid conflict with other variables or functions in GLOBAL SCOPE
;(function(global, $, Mustache){

    // Esta função permite que sempre que iniciamos a
    // biblioteca não tenhamos que escrever a keyword new
    var TaskCalendar = function(selector){
        // Function constructor
        return new TaskCalendar.init(selector);
    };

    /*  ************************************************
    *
    *   Funcoes e variaveis privadas são colocadas
    *   a partir daqui
    *
    *   ************************************************
    * */
    function printProcessos(processos){
        $("#vertical-timeline")
            .empty()
            .append(processos.pagina);
    }
    // Envia id associado a pessoa
    // Retorna um html associado a pessoa
    function sendVoluntario(){
        $voluntarios = $(".volunteers .fa-eye");


        $voluntarios.on("click", function(){
            var self = this;
            console.log(self.id);
            $.ajax({
                type: "POST",
                url: "../functions/funcoes_aux.php", // server path to send data
                dataType: "json",
                data: {functionname: 'getRotaDeVoluntario', arguments: [self.id]},
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.responseText);
                    alert(thrownError);
                },
                success: function (processos) {
                    printProcessos(processos);
                }
            });
        });

    }
    
    // Pinta os voluntarios correspondentes a cada rota selecionada
    function printVoluntarios(obj, id){
        var $rotaContentWrapper = $("#js-"+id);

        $rotaContentWrapper
            .append(obj.pagina)
            .find(".volunteers")
                .slideDown();

        $rotaContentWrapper
            .find(".collapse-link > i")
                .toggleClass("fa-chevron-down fa-chevron-up");

        sendVoluntario();
    }

    /*  *****************************************
     *   Usar esta função para pintar processos
     *   associados a cada rota.
     *   Uma vez que recebemos o html via ajax
     *   Não existe necessidade de utilizar esta
     *   função neste momento.
     *   Exemplo de JSON/OBJECTO:
     *   0 { process: processValue, time: timeValue }
     *   1 { process: processValue, time: timeValue }
     *   ***************************************** */

    /*function getRotas(rotas){
     var $targetHTML = $(".js-rota-content");

     $targetHTML.empty();

     $.get('../pages/route/rotasTempHTML.html', function(template){
     for(var i = 0; i <= rotas.length; i++) {
     if(rotas[i] !== undefined){
     var templateHTML = $(template).filter('#rota-details').html();
     $targetHTML.append(Mustache.render(templateHTML, rotas[i]));
     }
     }
     });
     }*/

    // Envia id sempre que o utilizador clica numa rota
    // e recebe um JSON com um template html dos processos associados dessa rota
    function sendId(id){
        $.ajax({
            type: "POST",
            url: "../functions/funcoes_aux.php", // server path to send data
            dataType: "json",
            data: {functionname: 'getRotas', arguments: [id]},
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.responseText);
                alert(thrownError);
            },
            success: function (obj) {
                printVoluntarios(obj, id);
            }
        });
    }


    // Validate selector wrapper
    // Return true if exists in the DOM
    function validateSelector(selector) {
        // Check if jQuery is loaded in page
        if(!$) {
            throw 'jQuery not loaded';
        }

        // Check if selector exists in the page
        if($(selector).length === 0){
            throw "That selector doesn't exist in the page";
        }

        return true;
    }


    /*  ************************************************
     *
     *   Metodos e propriedades que sejam publicas
     *   vao para o prototype do TaskCalendar
     *
     *   ************************************************
     * */
    TaskCalendar.prototype = {
        
        // Show current selector wrapper
        showSelector: function(){
            console.log(this.selector);
            return this.selector;
        },


        // Retorna as rotas atuais presentes no DOM
        // retorna falso se não tiver rotas
        retornaRotas: function(){
            var $rotasHasChild = $(this.selector).children();

            return ($rotasHasChild.length > 0) ? $rotasHasChild : (function(){ throw 'Não exsitem rotas' }());
        },

        // Remover rotas existentes no selector
        removerRotas: function(){
            if(this.retornaRotas()){
                $(this.selector).empty();
                return "Todas as rotas foram removidas com sucesso";
            }

        },

        // Retorna as rotas que estão na pagina
        guardaRotas: function(){

            if(validateSelector(this.selector)){
                var guardaRotas = {};

                // Selecionar todos os id's e nomes de cada rota associada ao dia do calendario
                // e guardar no objecto guardaRotas
                $(this.selector).find("h5").each(function(index){
                    guardaRotas["Rota" + (index + 1)] = {
                        id: $(this)
                                .next()
                                .find("a")
                                .attr("id"),
                        nome: $(this).text()};
                });

                return guardaRotas;
            }

            return false;
        },

        // Mostra primeira Rota do dia selecionado
        mostraRota1: function(){
            var $rota1 = this.guardaRotas();
            return $rota1.Rota1.nome;
        }
        

    };

    // O objecto e criado aqui
    TaskCalendar.init = function(selector){
        // Selector wrapper
        this.selector = selector;
        // Validate if the selector introduced exists in the DOM
        validateSelector(this.selector);

        $("#js-taskCalendar").on("click", ".collapse-link", function(event){
            var elementID = event.currentTarget.id, // Guardar em cache o id do elemento que foi clicado
                volunteersClass = ".volunteers" || null, // Guardar classe que contem os processos associados
                self = $(this); // Guardar o elemento que foi clicado

            // Mostrar e esconder voluntarios associados as rotas
            if($(volunteersClass).length !== 0){
                $(volunteersClass).slideUp(function(){ $(this).remove(); });
                self.children()
                    .toggleClass("fa-chevron-down fa-chevron-up");
            } else {
                sendId(3); // Alterar argumento para elementID quando quisermos que os valores sejam dinamicos
            }
        });

        


    };

    // Apontar o prototype do tipo objeto TaskCalendar para o proptotype do init
    TaskCalendar.init.prototype = TaskCalendar.prototype;


    // Associar o objecto TaskCalendar ao objecto global(Window)
    global.TaskCalendar = TaskCalendar;

}(window, $, Mustache));
