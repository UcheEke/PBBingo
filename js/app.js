// Functions

// YoutubeEmbed
// Takes a youtube url and embeds it into the game
var youtubeEmbed = function(url) {
	// Youtube urls take two forms
	// 1. www.youtube.com/watch?v=VidCode <-- from the address bar
	// 2. youtu.be/VidCode <-- from the share section
	if (url.indexOf("youtube") === -1) || (url.indexOf("youtu.be") === -1) {
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
		"more money in real terms than any other party",
		"the dire situation we inherited",
		"Let me be absolutely open and honest",
		"At the end of the day",
		"Our message is very clear and very simple",
		"A whole range of proposals",
		"the fact of the matter is",
		"if I can just make this point",
		"the previous administration",
		"A comprehensive raft of measures",
		"There are no easy answers",
		"Black hole in our finances",
		"Our policy is taken from the bottom up",
		"No more top down organisation",
		"Out there in the real world",
		"puts Britain in the driving seat",
		"In any way, shape or form",
		"restore the nation's faith in politics",
		"get Britain working",
		"protect the middle class",
		"cost of living crisis",
		"the squeezed middle",
		"ahead of the curve",
		"enemies of enterprise",
		"alarm clock Britain",
		"feeling the pinch",
		"tough decisions",
		"tightening our belts",
		"we're all in it together",
		"British values",
		"change that will make a difference",
		"opened the floodgates",
		"everyone is proud",
		"those finding it hard to get by",
		"better opportunities",
		"And so I say this",
		"clean up the mess left by the last government",
		"EU referendum",
		"red lines"
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

// zeros
// Creates a list of zeros of length "size"
var zeros = function(size) {
	var zeroArray = [];
	for (var i = 0; i < size; i++) {
		zeroArray.push(0);
	}

	return zeroArray;
}

// range
// Creates a range from 0 to "size", in integers or strings based on "type"
var range = function(size, type) {
	range = [];
	for (var i = 0; i < size; i++) {
		range.push(num = (type === 'str') ? i.toString() : i);
	}
}


// hasLine
// Returns true if a line (row,column or main diagonals) is completed, false otherwise
var hasLine = function(list, size) {

	var result = false;
	// Ensure size is a number
	size = Number(size);

	// Check Rows and cols in the following lists
	var rowList = zeros(size);
	var colList = zeros(size);

	// Check diagonals:
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
		return true;
	}

	// Reset temporary arrays
	diag = [];

	// Check the anti-diagonal
	for (var i = 0, j = size - 1; i < size, j >= 0; i++, j--) {
		index = j.toString() + i.toString();
		if (list.indexOf(index) !== -1) {
			diag.push(index);
		}
	}
	if (diag.length === size) {
		return true;
	}

	list.forEach(function(element) {
		rowList[parseInt(element[0])] += 1;
		colList[parseInt(element[1])] += 1;
	});

	console.log("rowList: " + rowList);
	console.log("colList: " + colList);
	console.log("size: " + size);

	for (var i = 0; i < size; i++) {
		console.log(rowList[i], colList[i], size);
		if (rowList[i] === size) {
			return true;
		} else if (colList[i] === size) {
			return true;
		}
	}

	return false;
}

options.forEach(function(option) {
	$select.append("<option value='" + count + "'>" + option +
		"</option>");
	count++;
});

// Create two divs for game content
// 1. Controls
var $selector = $("#selector");

// Add this box to the selector div section
$selector.append($selectText);
$selector.append($select);

// 2. playGrid
// Create a div and fill it with divs of class='box'
var $playGrid = $("#playGrid");

// Use the select element's onChange method
$select.on("change", function() {
	// clear the attached playGrid
	$playGrid.empty();
	//isGrid = false;

	// Determine player's grid size selection
	var numberOfBoxes = ($select.val() > 2) ? $select.val() : 0;
	var cliches = randomPhrases(numberOfBoxes * numberOfBoxes);

	var $row, $box, $anchor; // Container row and child box variables

	// Create the grid based on the selection
	for (var row = 0; row < numberOfBoxes; row++) {
		// Create a container div for each row
		$row = $("<div class='gridRow'>");
		for (var col = 0; col < numberOfBoxes; col++) {
			// Create a box for each column
			$box = $("<div class='box' id='" + row + col + "'>");
			// Attach box to current row
			$row.append($box);
		}
		// Attach row to playGrid
		$playGrid.append($row);
	}

	$playGrid.on("click", function(e) {
		// Ensure that the event is a click
		if (e.type !== "click") return;

		var t = e.target;
		// DEBUG: console.log(e)
		if (t.className.indexOf("box") !== -1) {
			if (t.className.indexOf("clicked") === -1) {
				t.className += " clicked";
				t.innerHTML = (cliches.length > 0) ?
					cliches.pop() : "ERR";
				cSquares.push(t.id);
			} else {
				t.className = t.className.replace(
					"clicked", "").trim();
				t.innerHTML = "";
				cSquares.splice(cSquares.indexOf(t.id),
					1);
			}
			// Check if you have bingo
			if (isBingo(gameType, cSquares,
					numberOfBoxes)) {
				console.log("Bingo!! You've won!!");
			} else {
				console.log("cSquares array: " +
					cSquares);
				console.log("Bingo? Not yet!");
			}
		}
	});
});
};

$(document).ready(main);
