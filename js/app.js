// Functions

// YoutubeEmbed
// Takes a youtube url and embeds it into the game
var youtubeEmbed = function(url) {
	// Youtube urls take two forms
	// 1. www.youtube.com/watch?v=VidCode <-- from the address bar
	// 2. youtu.be/VidCode <-- from the share section
	if (url.indexOf("youtube") === -1 || url.indexOf("youtu.be") === -1) {
		throw "Only Youtube video sources are allowed at the moment";
	} else {
		var urlElements = url.split("/");
		// Take the last element
		var keyElement = urlElements.pop();
		// Extract the VidCode
		if (keyElement.indexOf("watch?v=") !== -1) {
			keyElement = keyElement.replace("watch?v=", "");
		}
		// Concatenate the embed url with the vidCode and apply to the src attribute of the iframe
		keyElement = "https://www.youtube.com/embed/" + keyElement;
		var $iframe = $("#videoPlayer iframe");
		$iframe.src = keyElement;
	}
}

// Random phrases
// Selects 16 unique phrases from the phrases list and returns a new list
var randomPhrases = function(size) {

	var phrases = [
		"Let me be clear",
		"There is no instant solution",
		"It's going to take time",
		"Hard working families",
		"Up and down the country",
		"Long term economic plans",
		"Economic mess",
		"The Great British People",
		"What we've said is",
		"The real question is this",
		"Lower taxes",
		"Raise taxes",
		"A wide range of options right across the board",
		"More money in real terms than any other party",
		"The dire situation we inherited",
		"Let me be absolutely open and honest",
		"At the end of the day",
		"Our message is very clear and very simple",
		"A whole range of proposals",
		"The fact of the matter is",
		"If I can just make this point",
		"The previous administration",
		"A comprehensive raft of measures",
		"There are no easy answers",
		"Black hole in our finances",
		"Our policy is taken from the bottom up",
		"No more top down organisation",
		"Out there in the real world",
		"Puts Britain in the driving seat",
		"In any way, shape or form",
		"Restore the nation's faith in politics",
		"Get Britain working",
		"Protect the middle class",
		"Cost of living crisis",
		"The squeezed middle",
		"Ahead of the curve",
		"Enemies of enterprise",
		"Alarm clock Britain",
		"Feeling the pinch",
		"Tough decisions",
		"Tightening our belts",
		"We're all in it together",
		"British values",
		"Change that will make a difference",
		"Opened the floodgates",
		"Everyone is proud",
		"Those finding it hard to get by",
		"Better opportunities",
		"And so I say this",
		"Clean up the mess left by the last government",
		"EU referendum",
		"Our red lines"
	];
    
	var chosenPhrases = [];
	for (var i = 0; i < size; i++) {
		// Extract a phrase from the phraselist at random
		var index = Math.floor(Math.random() * phrases.length);
		chosenPhrases.push(phrases[index]);
		phrases.splice(index, 1);
	}
	return chosenPhrases;
}

// isBingo
// Returns true if Bingo condition has been achieved based upon the game type
var isBingo = function(gameType, list, size) {
	switch (gameType) {
		case 0: // Full House Game
			return (list.length === size * size);
			break;
		case 1: // Simple Line Game
			return hasLine(list, size);
			break;
		default:
			return false;
	}
}

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
	result.push(diag = (diag.length === size) ? diag : []);
    if (diag) result[0] = true;
    
	// Check the anti-diagonal:
    aDiag = [];
	for (var i = 0, j = size - 1; i < size, j >= 0; i++, j--) {
		index = j.toString() + i.toString();
		if (list.indexOf(index) !== -1) {
			aDiag.push(index);
		}
	}
    result.push(aDiag = (aDiag.length === size) ? aDiag : []);
    if (aDiag) result[0] = true;

    // Check the rows
    var row = [];
    // Scan the matrix
    for (var i=0;i < size; i++) {
        for (var j=0; j < size; j++) {
            index = i.toString() + j.toString();
            if (list.indexOf(index) !== -1) {
                row.push(index);
            }
        }
        result.push(row = (row.length === size) ? row : []);
        if (row) {
            result[0] = true;
            break;
        }
    }

    // Check the columns
    var col = [];
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            index = j.toString() + i.toString();
            if (list.indexOf(index) !== -1) {
                col.push(index);
            }
        }
        result.push(col = (col.length === size) ? col : []);
        if (col){
            result[0] = true;
            break;
        }
    }

    return result;
}

// firstPage: Creates form in DOM for the various user defined game parameters
var firstPage = function () {
    var $main = $("<main>");
    $main.empty();
    
    // Create the container form
    var $form = $('<form>');
    $form.attr("id","page1Form");
    
    // Input field for youtube video
    var $inputYT = $("<input>");
    // Set the attributes
    $inputYT.attr({
        'type' : "text",
        'id' : "inputYT",
        'placeholder' : "Insert link to YouTube video",
        'required' : true
    });
    var $inputYTtext = $("<p>");
    $inputYTtext.attr({
        'id' : "inputYTtext",
        'class': "formText"
    });
    $inputYTtext.text("YouTube Video:");
    
    var $formLine = $("<div class='formLine'>");
    $formLine.append($inputYTtext);
    $formLine.append($inputYT);
    $form.append($formLine);
    
    $main.append($form);  
};

//
// --- MAIN FUNCTION --- 
//
var main = function() {
	"use strict";

	console.log("hello world from app.js!");
    
	var $selectText = $("<p id='selectText'>");
    $("<main>").append($selectText);
     
}

$(document).ready(main);
