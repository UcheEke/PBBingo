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
