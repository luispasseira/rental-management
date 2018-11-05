// Anonymous function constructor will return a calendar object
var Calendar = function() {
    var selector, label,
        months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    // Initializer function
    // selector = element that will wrap entire calendar
    function init(newSelector) {
        // The default selector will be #calendar-wrapper if no argument as been passed
        selector = $(newSelector || "#calendar-wrapper");
        label = selector.find("#js-month");

        // Print current month and year when pages loads
        switchMonth(null, new Date().getMonth(), new Date().getFullYear());

        // Print current month substitutions
        printSubst(new Date().getMonth(), new Date().getFullYear());

        // Send current year, month and day via AJAX
        getDay(new Date().getDate());

        /* *********************************************
            # Bind events to the prev and next buttons
            # switchMonth will be used to define if we want to go to the next or prev calendar frame
                # false = go previous
                # true = go next
         ********************************************* */
        selector.find("#js-prev").bind("click", function(){ switchMonth(false); });
        selector.find("#js-next").bind("click", function(){ switchMonth(true); });
        

        selector.delegate(".cell > a", "click", function(event){ getDay(event); selectDay(event) });
        label.bind("click", function() {
            switchMonth(null, // true, false or null
                new Date().getMonth(), // number of month 0-11
                new Date().getFullYear()); // year - 2016
        });

    }

    function switchMonth(next, month, year) {
        var current = label.text().trim().split(" "), // get the current month and year on the calendar
            calendar,
            tempYear = parseInt(current[1], 10); // convert string year into a decimal number

        // Verificar mês
        if(month){ }
        else {
            switch(next){
                case true: // Go forward in calendar
                    if(current[0] === "Dezembro"){
                        month = 0; // If current month is Dezembro set month 0 (january)
                    } else {
                        month = (months.indexOf(current[0]) + 1); // If not increment 1 and set month
                    }
                    break;
                case false: // Go backward in calendar
                    if(current[0] === "Janeiro"){
                        month = 11; // If current month is Janeiro set month to Dezembro
                    } else {
                        month = (months.indexOf(current[0]) - 1); // If not decrement 1 and set month
                    }
                    break;
            }
        }

        // Check for year
        year = year || ((next && month === 0) ? tempYear + 1 : (!next && month === 11) ? tempYear - 1 : tempYear);

        printSubst(month, year);

        // create calendar object
        // Access method calendar and label property of the calendar object created in createCal function
        calendar = createCal(year, month);

        $("#cal-days-wrapper", selector)
            .find(".current")
                .removeClass("current")
                .hide()
                .addClass("temporary")
            .end()
            .append(calendar.createCalendar())// invoke createCalendar method of calendar object and print $calendar
            .find(".temporary").remove();

        label.text(calendar.label); // display current month and year on calendar's header
    }

    function createCal(year, month){
        var day = 1, i, j, haveDays = true,
            startDay = new Date(year, month, day).getDay(), // retorna o numero do dia da semana onde o mes começa ex: (2016, 5, 1) = 3 = Wednesday
            febNumDays = (((year%4===0) && (year%100!==0)) || (year%400===0)) ? 29 : 28, // test if the current year is leap or not return num of days in feb month
            daysInMonths = [31, febNumDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            calendar = []; // calendar matriz


        // If already exits the year and the month return object cache with that calendar
        if(createCal.cache[year]){
            if(createCal.cache[year][month]){
                return createCal.cache[year][month];
            }
        } else {
            createCal.cache[year] = {};
        }

        // Matriz com os dias do calendário
        i = 0;
        while(haveDays) {
            calendar[i] = [];

            // dias semana 0 = Sunday, 1 = Monday, etc...
            for(j = 0; j < 7; j++){
                // Verificar se estamos na primeira semana do mes
                if(i === 0){
                    // Verificar em que dia da semana começa o primeiro dia do mes
                    // e começa a pintar na matriz assim que j === primeiro dia semana onde o mes começa
                    if(j === startDay){
                        calendar[i][j] = day++;
                        startDay++;
                    }
                    // Se já não estivermos na primeira semana
                } else if( day <= daysInMonths[month]){ // Se ainda houver dias por preencher no mes
                    calendar[i][j] = day++;
                } else { // Se day for maior que daysInMonths
                    haveDays = false;
                }
            }
            i++;
        }

        // Add a string for all the days for every row in calendar
        for(i = 0; i < calendar.length; i++){
            calendar[i] = "<div class='row'><div class='cell'><a>" + calendar[i].join("</a></div><div class='cell'><a>") + "</a></div></div>";
        }

        // Create a jQuery object with the table and all the days
        calendar = $("<div>" + calendar.join("") + "</div>").addClass("current");

        // Remove empty <a> elements from the calendar grid
        calendar.find("div > a:empty").remove();

        // Add spaces to the empty cells (fix height of the row)
        calendar.find("div.cell:empty").html("&nbsp");

        // Highlight current day
        if(month === new Date().getMonth()){
            // Add .today class to the current day
            $("a", calendar).filter(function() {
                return $(this).text() === new Date().getDate().toString();
            }).wrapInner("<strong></strong>");
        }

        // Create a new object cache for every new month and year created by user
        createCal.cache[year][month] = {
            createCalendar:  function(){
                // create a copy of the object calendar every time createCalendar() method is invoked
                return calendar.clone();
            },
            label: months[month] + " " + year
        };
        // Send a clone of the calendar object and the current label
        return createCal.cache[year][month];
    }


    // Send day, month and year via ajax to the server
    function sendData(year, month, day) {
        $.ajax({
            type: "POST",
            url: "../functions/funcoes_aux.php", // server path to send data
            dataType: "json",
            data: {functionname: 'getEvent', arguments: [month, year, day]},

            success: function (obj) {
                getRotas(obj);
            }
        });

    }


    // Get selected day and send data to sendData function
    // if day null the function will return only month and year
    function getDay(day){
        if(day){
            if(typeof day === 'object'){
                var selectedDay = parseInt(day.target.textContent);
            } else {
                selectedDay = day;
            }

        } else {
            selectedDay = null;
        }
        var monthYear = label.text().trim().split(" ");

        // Send current year, month and day
        sendData(monthYear[1], months.indexOf(monthYear[0]), selectedDay);
    }

    // Seleciona substituições no calendário
    function printSubst(month, year){
        $.ajax({
            type: "POST",
            url: "../functions/funcoes_aux.php", // server path to send data
            dataType: "json",
            data: {functionname: 'getEvent', arguments: [month, year]},

            success: function (data) {
                // printSubst(obj);
                // // Se for passado dia enviar rotas
                // if(day !== null){
                //     getRotas(obj);
                // }
                data.forEach(function(value){
                    // eq is 0 based
                    // need to decrement 1 to the value
                    selector.find(".current .cell > a").eq(value-1).addClass("substituicao");
                });
            }
        });
    }

    // Seleciona o dia e coloca um marker no dia que queremos ver
    function selectDay(event){
        var $selected = $(".selected");
        // Verfica se ja existe class
            // true :
                // remove a classe selected presente no DOM
                // adiciona a classe selected no elemento atual
            // false: adiciona classe ao elemento atual
        if($selected[0]) {
            $selected.removeClass("selected");
            $(event.target).addClass("selected");
        } else {
            $(event.target).addClass("selected");
        }
    }

    // Cria todas as rotas associadas ao dia selecionado
    // E desenha as rotas no DOM
    function getRotas(rotas){
        // Atualiza o nome da rota de hoje
        rotaHoje(rotas[0].nomeRota);

        var $targetHTML = $("#js-taskCalendar");

        $targetHTML.empty();

        $.get('../pages/route/rotasTempHTML2.html', function(template){
            for(var i = 0; i <= rotas.length; i++) {
                if(rotas[i] !== undefined){
                var templateHTML = $(template).filter('#rotaTemplate').html();
                    $targetHTML.append(Mustache.render(templateHTML, rotas[i]));
                }
            }
        });
    }

    // Atualizar o nome da secção rota(s) hoje
    function rotaHoje(rota){
        $(".route-hoje > h3")
            .empty()
            .append(rota);
    }

    // create cache object
    createCal.cache = {};

    // Pass the methods that we want here
    return {
        init: init
    };
};
