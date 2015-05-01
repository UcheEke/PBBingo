// Globals
// Game data is an object that pulls the data from the form
var GameData = {
    "YouTubeVideo": "", // Default: demo
    "gridSize":	'',	    // 3x3 grid by default
    "gameType":	'',     // Line by default
    "lines" : []        // winning lines in line game
};


// --- FUNCTIONS ---
// hasYouTube
// Takes a youtube url and embeds it into the game
var hasYouTube = function(url) {
	// Youtube urls take two forms
	// 1. www.youtube.com/watch?v=VidCode <-- from the address bar
	// 2. youtu.be/VidCode <-- from the share section
	if (url.indexOf("youtube") !== -1 || url.indexOf("youtu.be") !== -1) {
		var urlElements = url.split("/");
		// Take the last element
		var keyElement = urlElements.pop();
		// Extract the VidCode
		if (keyElement.indexOf("watch?v=") !== -1) {
			keyElement = keyElement.replace("watch?v=", "");
		}
		GameData.YouTubeVideo = keyElement;
		return true;
	}
	return false;
}

// Random phrases
// Selects 16 unique phrases from the phrases list and returns a new list
var randomPhrases = function(size) {
	var phrases = [
		"Let me be absolutely clear",
		"There is no instant solution",
		"It's going to take time",
		"Hard working families",
        "Cut our spending",
		"Up and down the country",
		"Long term economic plans",
		"Economic mess",
		"The Great British People",
		"What we've said is",
		"The real question is this",
		"Lower taxes",
		"Raise taxes",
		"Wide range of options right across the board",
		"More money in real terms",
		"The dire situation we inherited",
		"Let me be absolutely open and honest",
        "Back to basics",
        "Moving forward",
        "Return to growth",
        "Jobs engine",
        "The envy of the world",
        "Sink or swim",
		"At the end of the day",
		"Our message is very clear and very simple",
		"A whole range of proposals",
		"The fact of the matter is",
        "The politics of fear",
		"If I can just make this point",
		"The previous administration",
        "We'll turn the tide",
        "A wasted vote",
		"Comprehensive raft of measures",
		"There are no easy answers",
		"Black hole in our finances",
		"Get off their hobby horses",
		"No more top down re-organisation",
		"Out there in the real world",
		"Puts Britain in the driving seat",
		"In any way, shape or form",
		"Restore the nation's faith in politics",
		"Get Britain working",
        "Party in complete disarray",
		"Protect the middle class",
		"Cost of living crisis",
		"The squeezed middle",
		"Ahead of the curve",
		"Enemies of enterprise",
		"Alarm clock Britain",
		"Feeling the pinch",
		"Tough decisions",
		"Tightening our belts",
		"Job creators",
		"Uphold British values",
		"Change that will make a difference",
		"Opened the floodgates",
		"Everyone is proud",
		"Those finding it hard to get by",
		"Better opportunities",
		"And so I say this",
		"The mess left by the last government",
		"EU referendum",
		"Our red lines"
	];

	var chosenPhrases = [];
	for (var i = 0; i < size; i++) {
		// Extract a phrase from the phraselist at random
		var index = Math.floor(Math.random() * phrases.length);
		chosenPhrases.push(phrases[index]);
        // To ensure unique choices, we remove the last chosen phrase from phrases
		phrases.splice(index, 1);
	}
	return chosenPhrases;
};

// isBingo
// Returns true if Bingo condition has been achieved based upon the game type
var isBingo = function(gameType, list, size) {
    switch (gameType) {
		case '0': // Line Game
			return hasLine(list, size);
			break;
		case '1': // Full House Game
			return (list.length === size * size);
			break;
		default:
			return false;
	}
};

// hasLine(list, size)
// Takes in a list of checked grid squares and the full grid side length, size.
// Returns an array "result". result[0] is true if a line is found, result[1:]
// contain arrays of the indices of checked grid squares that comprise each
// winning line
var hasLine = function(list, size) {
	var result = [false];
	// Ensure size is a number
	size = Number(size);
    
	// Check the main diagonal:
	var index = "",
		diag = [];
	for (var i = 0; i < size; i++) {
		index = i.toString() + i.toString();
		if (list.indexOf(index) !== -1) {
			diag.push(index);
		}
	}
    if (diag.length === size) {
        result.push(diag);
        result[0] = true;
    } else {
        result.push([]);
    }

    // Check the anti-diagonal:
    aDiag = [];
	for (var i = 0, j = size - 1; i < size, j >= 0; i++, j--) {
		index = j.toString() + i.toString();
		if (list.indexOf(index) !== -1) {
			aDiag.push(index);
		}
	}
    if (aDiag.length === size) {
        result.push(aDiag);
        result[0] = true;
    } else {
        result.push([]);
    }

    // Check the rows and cols
    var rowList = [0,0,0,0];
    var colList = [0,0,0,0];
    list.forEach(function(element){
        rowList[parseInt(element.charAt(0))] += 1;
        colList[parseInt(element.charAt(1))] += 1;
    });
    
    var row = [];
    for (var i = 0; i < size; i++){
        if (rowList[i] === size) {
            result[0]  = true;
            for (var j = 0; j < size; j++){
                row.push(i.toString() + j.toString());
            }
        }
    }
    result.push(row);
    
    var col = [];
    for (var i = 0; i < size; i++){
        if (colList[i] === size) {
            result[0]  = true;
            for (var j = 0; j < size; j++){
                col.push(j.toString() + i.toString());
            }
        }
    }
    result.push(col);
    
    if (result[0] === true){
        GameData.lines = result.slice(1);
        return true;
    } else {
        GameData.lines = [];
        return false;
    }
};

// initialPage: Creates form in DOM for the various user defined game parameters
var initialPage = function () {
    var $main = $("main");
    $main.empty();
    var finished = false;
	var $container = $("<div class='container'>");

    // Create the container form
    var $form = $('<form>');
    $form.attr("id","page1Form");

	//  YouTube Video input
    // Input field for youtube video
    var $inputYT = $("<input>");
    // Set the attributes
    $inputYT.attr({
        'type' : "text",
        'id' : "inputYT",
        'placeholder' : "Insert link to YouTube video",
		'class': 'formField',
        'required' : true
    });
    var $lblInputYT = $("<p>");
    $lblInputYT.attr({
        'id' : "lblInputYT",
        'class': "formText"
    });
    $lblInputYT.text("YouTube Video:");

    var $formLine = $("<div class='formLine'>");
    $formLine.append($lblInputYT);
    $formLine.append($inputYT);
    $form.append($formLine);

	//  Game Type selection box
    var $selGameType = $("<select>");
	var $lblGameType = $("<p>")
    // Set the attributes
	$selGameType.attr({
		'id' : 'selGameType',
		'class': 'formField',
		'form':'page1Form'
	});

	$lblGameType.attr({
		'id' : "lblGameType",
		'class': "formText"
	});
	$lblGameType.text("Game Type:")
	var options = ["","Line", "Full House"];
	var count = -1;
	options.forEach(function(option){
		$selGameType.append($("<option class='selOptions' value='"+ count +
		"'>"+ option +"</option>"));
		count++;
	});

	$formLine = $("<div class='formLine'>");
	$formLine.append($lblGameType);
	$formLine.append($selGameType);
	$form.append($formLine);

	//  Grid size selection box
    var $selGridSize = $("<select>");
	var $lblGridSize = $("<p>")
    // Set the attributes
	$selGridSize.attr({
		'id': 'selGridSize',
		'class':'formField',
		'form':'page1Form'
	});

	$lblGridSize.attr({
		'id' : "lblGridSize",
		'class': "formText"
	});
	$lblGridSize.text("Grid Size:")
	options = ["","3x3", "4x4"];
	count = 2;
	options.forEach(function(option){
		$selGridSize.append($("<option class='selOptions' value='"+ count +
		"'>"+ option +"</option>"));
		count++;
	});

	$formLine = $("<div class='formLine'>");
	$formLine.append($lblGridSize);
	$formLine.append($selGridSize);
	$form.append($formLine);

	// Submit button
	var $btnSubmit = $("<input>");
	$btnSubmit.attr({
		'id'   : 'btnSubmit',
		'type' : 'button',
		'class': 'formButton',
		'type' : 'submit',
		'value': 'Play Game'
	});

	$formLine = $("<div class='formLine'>");
	$formLine.append($btnSubmit);
	$form.append($formLine);

    $main.append($container.append($form));

	$btnSubmit.click(function(evt){
		if (hasYouTube($('#inputYT').val())) {
			evt.preventDefault();
			GameData.gameType = ($selGameType.val() > '-1') ? $selGameType.val() : '0';
			GameData.gridSize = ($selGridSize.val() > '2') ? $selGridSize.val() : '3';
            $main.hide();
            setupGame();
		} else {
			$inputYT.css("border-color","red");
			$lblInputYT.text("Please enter YouTube Video link:");
			$lblInputYT.css("font-size", "1.2em");
			return false;
		}
	});
};

var setupGame = function () {
    var $main = $("main");
	$main.empty();
    
    // Create two divs for game content
	// 1. Video view
    var $controls = $("<div id='controls'>");
    var $videoPlayer = $("<div id='videoPlayer'>");
    var $iframe = $("<iframe>");
    $iframe.attr({
        "width": (GameData.gridSize === '4') ? "288" : "384" ,
        "height":(GameData.gridSize === '4') ? "162" : "216" ,
        "src" : "https://www.youtube.com/embed/" + GameData.YouTubeVideo,
        "frameborder":'0'
    });
    
    var $gameContainer = $("<div id='gameContainer'>");
    $videoPlayer.append($("<p class='controlText'>Play as you watch this video:</p>"));
    $videoPlayer.append($iframe);
    $controls.append($videoPlayer);
    $gameContainer.append($controls);
    
    // 2. playGrid: where the game takes place
    var $playGrid = $("<div id='playGrid'>");
    
    // Determine player's grid size selection
    var gridSize = GameData.gridSize;
    var cliches = randomPhrases(gridSize * gridSize);
    var $row, $box; // Container row and child box variables
    // Create the grid based on the selection
    for (var row = 0; row < gridSize; row++) {
        // Create a container div for each row
        $row = $("<div class='gridRow'>");
        for (var col = 0; col < gridSize; col++) {
            // Create a box for each column
            $box = $("<div class='box' id='" + row + col + "'>");
            // Add a cliche to each one
            $box.text(cliches.pop());
            // Attach box to current row
            $row.append($box);
        }
        // Attach row to playGrid
        $playGrid.append($row);
    }
    
    $gameContainer.append($playGrid);
    $main.append($gameContainer);
    $main.show();
    startGame();
};

var startGame = function () {
    var $playGrid = $("#playGrid");
    var cSquares = [];
    var gameType = GameData.gameType;
    var gridSize = GameData.gridSize;
    var gameOver = false;
    
    $playGrid.on("click", function(e) {
        // Ensure that the event is a click
        if (e.type !== "click") return;
        
        var t = e.target;
        if (t.className.indexOf("box") !== -1) {
            if (t.className.indexOf("clicked") === -1) {
                t.className += " clicked";
                cSquares.push(t.id);
            } else {
                t.className = t.className.replace(
                    "clicked", "").trim();
                cSquares.splice(cSquares.indexOf(t.id),1);
            }
            // Check if you have bingo
            if (isBingo(gameType, cSquares,gridSize)) {
                var $controls = $("#controls");
                var $boxes, $box;
                $controls.append("<p class='bigMsg'>BINGO!</p>");
                $controls.append("<p class='smallMsg'>You have won! :)</p>");
                switch (GameData.gameType) {
                    case '0':
                        var line;
                        for (arr in GameData.lines) {
                            if (GameData.lines[arr] && GameData.lines[arr].length) {
                                line = GameData.lines[arr];
                                var unflashLine = function(line){
                                    for (index in line){
                                        var $box = $("#" + line[index]);
                                        $box.removeClass("clicked");
                                        $box.addClass("endGame")
                                    }
                                }
 
                                var flashLine = function(line){
                                    for (index in line){
                                        $box = $("#" + line[index]);
                                        $box.addClass("bingo")
                                        setTimeout(unflashLine(line),2000);
                                    }
                                }
                                setTimeout(flashLine(line),2000);
                            }
                        }
                        break;
                    case '1':
                        $boxes = $(".box");
                        $boxes.addClass("bingo");
                        break;
                }
                // HACK: Set gridSize outside the range of possible results.
                gridSize *= 5;
            } 
        }
    });
}


//
// --- MAIN FUNCTION ---
//
var main = function() {
	"use strict";
	console.log("app.js: Ready");
    initialPage();
};

$(document).ready(main);
