Immobilien.Merkliste = (function() {
	var that = {},
        list = new Array, 
        sortArray,
        contains = 0,  

	init = function() {
        sortImmo ($("#select-immo-sort").val());
        

        var merklisteHeadTemplate = _.template($("#merkliste-head-tpl").html());
        $("#content").html(merklisteHeadTemplate);
        sortImmo($("#select-immo-sort").val());
        drawList(); 


        $("#gesuche-button").attr('class', 'btn btn-default');
        $("#anbieten-button").attr('class', 'btn btn-default');
        $("#merkliste-button").attr('class', 'btn btn-primary');


        $("#gesuche-button").click(function() {
        	if (Immobilien.Results.getFirstSearch() === false) {
        		Immobilien.Startscreen.init();
        	} else {
        		Immobilien.Startscreen.reloadStartscreen(); 
        	}
        });

        $("#anbieten-button").click(function() {
            Immobilien.MainController.startBiete(); 
        });

        $( ".Property" ).mouseenter(function() {
                $(this).addClass("hover");
                $(this).css("cursor", "pointer");

        });

        $( ".Property" ).mouseleave(function() {
                $(this).removeClass("hover");
        });

        

        $('#select-immo-sort').change(function() {
                sortImmo ($(this).val());
                drawList();
        });

        $(".delete-immo").on("click", function(e){
                deleteOneElement(event.target.id);
                sortImmo($("#select-immo-sort").val());
                drawList(); 
                e.stopImmediatePropagation();
        });
	},

    drawList = function() {
        var merklisteBotTemplate = _.template($("#merkliste-result-tpl").html());
        var resultingHtml = merklisteBotTemplate({Properties : sortArray});
        $("#results").html(resultingHtml);

        $(".delete-immo").on("click", function(e){
            deleteOneElement(event.target.id);
            sortImmo($("#select-immo-sort").val());
            drawList(); 
            e.stopImmediatePropagation();
        });
    },

    sortImmo = function (sortType) {
        sortArray = new Array(); 
        switch(sortType) {
            case "Preis aufsteigend":
                sortPreisAufsteigend(); 
                break;
            case "Preis absteigend":
                sortPreisAbsteigend(); 
                break;
            case "Fläche aufsteigend":
                sortFlächeAufsteigend();
                break;
            case "Fläche absteigend":
                sortFlächeAbsteigend();
                break;
            case "Zimmeranzahl aufsteigend":
                sortZimmerAufsteigend();
                break;
            case "Zimmeranzahl absteigend":
                sortZimmerAbsteigend(); 
                break;
        }
    },

    sortPreisAufsteigend = function () {
        var priceList = new Array(); 
        for (var i = 0; i < contains; i++) {
            priceList[i] = list[i].price;
        }
        priceList.sort(function(a, b){return a-b});

        for (var i = 0; i < contains; i++) {
            for (var j = 0; j < contains; j++) {
                if (priceList[i] == list[j].price) {
                    sortArray[i] = list[j];
                }
            }
        }
    },

    sortPreisAbsteigend = function () {
        var priceList = new Array(); 
        for (var i = 0; i < contains; i++) {
                priceList[i] = list[i].price;
        }
        priceList.sort(function(a, b){return b-a});

        for (var i = 0; i < contains; i++) {
            for (var j = 0; j < contains; j++) {
                if (priceList[i] == list[j].price) {
                    sortArray[i] = list[j];
                }
            }
        } 
    },

    sortFlächeAufsteigend = function () {
        var sizeList = new Array(); 
        for (var i = 0; i < contains; i++) {
            sizeList[i] = list[i].size;
        }

        sizeList.sort(function(a, b){return a-b});

        for (var i = 0; i < contains; i++) {
            for (var j = 0; j < contains; j++) {
                if (sizeList[i] == list[j].size) {
                    sortArray[i] = list[j];
                }
            }
        }
    },

    sortFlächeAbsteigend = function () {
        var sizeList = new Array(); 
        for (var i = 0; i < contains; i++) {
            sizeList[i] = list[i].size;
        }
        sizeList.sort(function(a, b){return b-a});

        for (var i = 0; i < contains; i++) {
            for (var j = 0; j < contains; j++) {
                if (sizeList[i] == list[j].size) {
                    sortArray[i] = list[j];
                }
            }
        }
    },

    sortZimmerAufsteigend = function () {
        var roomList = new Array(); 
        for (var i = 0; i < contains; i++) {
            roomList[i] = list[i].rooms;
        }
        roomList.sort(function(a, b){return a-b});

        for (var i = 0; i < contains; i++) {
            for (var j = 0; j < contains; j++) {
                if (roomList[i] == list[j].rooms) {
                    sortArray[i] = list[j];
                }
            }
        }
    },

    sortZimmerAbsteigend = function () {
        var roomList = new Array(); 
        for (var i = 0; i < contains; i++) {
            if (list[i].rooms != null){
                roomList[i] = list[i].rooms;      
            }
                    
        }

        roomList.sort(function(a, b){return b-a});

        for (var i = 0; i < contains; i++) {
            for (var j = 0; j < contains; j++) {
                if (roomList[i] == list[j].rooms) {
                    sortArray[i] = list[j];
                }
            }
        }
    },

    deleteOneElement = function (id) {
        contains--;
        for (var i = 0; i < contains; i++) {
            if (list[i].id === id) {
                list.splice(i,1);
            }
        }
    },

    addToMerkliste = function (informations) {
        list[contains] = informations; 
        contains++;
    };


	that.init = init;
    that.addToMerkliste = addToMerkliste; 

	return that;
}());