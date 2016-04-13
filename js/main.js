// {
// 	"round1": [ "Boonen", "Cancellera", "Vanmarcke", "Stybar", "Terpstra", "Boom" ],
// 	"round2": [ "Lowry", "Derozen", "Valaciunas", "Biyombo", "Joseph" ],
// 	"round3": [ "Jordan", "Pippen", "Rodman", "Grant", "Jackson" ]
// }


var xhr = new XMLHttpRequest(); // Create XMLHttp Object

xhr.onload = function () { // when ready state changes
		responseObject = JSON.parse(xhr.responseText);
		var rounds = responseObject.rounds; 
		roundsLength = rounds.length;
		// for (var i = 0; i < roundsLength; i++) {
		// 	console.log(rounds[i]);
		// }
		// console.log(roundsLength);
		// var round1Collected = responseObject.round1;
		// var round2Collected = responseObject.round2;
		// var round3Collected = responseObject.round3;
		
	function getTarget(e) {
		return e.target || e.srcElement;
	}

	// Load Round 1 by default
	// populateBoard(round1Collected);

	// load the links to control round display
	function buildRounds() {
		// count the number of parent items in array
		for (var i = 0; i < roundsLength; i++) {
			var stepUp = i + 1;
			// build links for each element in array
			var listItem = document.createElement('li');
			var elem = document.createElement('a');
			listItem.appendChild(elem);
			var link = elem.setAttribute('href', '#');
			var countId = elem.setAttribute('id', [i]);
			var newText = document.createTextNode('Round' + stepUp);
			elem.appendChild(newText);
			var position = document.getElementById('rounds-control');
			position.appendChild(listItem);
		}
	}

	buildRounds();

	// pick the array to display
	function roundSwitcher(e) {
		// get the selected link
		var target = getTarget(e);
		// get the text of selected link
		var countId = target.getAttribute('id'); 
		console.log(countId);
		var roundHolder;
		// 
		if (countId === '0') {
			roundHolder = populateBoard(rounds[0]);
			// console.log('round 1 clicked');
		} else if (countId === '1') {
			roundHolder = populateBoard(rounds[1]);
			// console.log('round 2 clicked');
		} else {
			roundHolder = populateBoard(rounds[2]);
		}
	}

	// display the array
	function populateBoard(answers) {
		var totalAnswers = answers.length;
		var splitAnswers = totalAnswers/2;
		var listStatusOne = document.getElementById('posted-1');
		var listStatusTwo = document.getElementById('posted-2');

		function splitArray() {
			for (i = 0; i < answers.length; i++) {
				var elem = document.createElement('a');
				var newText = document.createTextNode(answers[i]);
				elem.appendChild(newText);
				var pos = answers.indexOf(answers[i]);
				if (pos < splitAnswers) {
					var position = document.getElementById('posted-1');
					position.appendChild(elem);
				} else {
					var position = document.getElementById('posted-2');
					position.appendChild(elem);
				}
			}
		}

		// test to see if a round has been loaded
		if (listStatusOne.children.length > 0) {
			// if a round is already loaded, delete the child elements from the two columns
			clearAll(listStatusOne);
			clearAll(listStatusTwo);
			// load the requested round
			splitArray();
		} else {
			// if no round is loaded, load the requested round
			splitArray();
		}

		// code to reveal cards
		var elements = document.querySelectorAll('.list-wrapper a');

		for (var i=0; i<elements.length; i++) {
		  elements[i].addEventListener('click', function(e) {
		    this.className = 'show';
		  });
		}

		// reveal all cards
		var showAll = document.getElementById('show-all');
		showAll.addEventListener('click', function(e) {
			for (var i=0; i<elements.length; i++) {
				elements[i].className = 'show';
			}
		})

		// hide all cards
		var hideAll = document.getElementById('hide-all');
		hideAll.addEventListener('click', function(e) {
			for (var i=0; i<elements.length; i++) {
				elements[i].className = 'hide';
			}
		})

		// clear all cards
		var clearCards = document.getElementById('clear-all');
		clearCards.addEventListener('click', function(e) {
			clearAll(listStatusOne);
			clearAll(listStatusTwo);
		})

		// clear cards function
		function clearAll(el) {
			el.innerHTML = '';
		}
	}

	// bind event listener to #rounds-control list 
	var switchTrigger = document.getElementById('rounds-control');
	switchTrigger.addEventListener('click', function(e) {
		roundSwitcher(e);
	}, false);
}

xhr.open('GET', 'js/rounds.json', true); // prepare the request
xhr.send(null); // send the request
