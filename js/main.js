// Code for family feud game

// code to hold answers and populate cards
var burgers = ['Big Mac', 'Quarter Pounder', 'Whopper', 'Filet O Fish', 'Cheeseburger', 'Super Burger'];
var raptors = ['Derozan', 'Lowry', 'Biyombo', 'Carroll', 'Joseph', 'Patterson', 'Gabagoo', 'Mama'];
var bikes = ['Specialized', 'Cannondale', 'Canyon', 'Cervelo', 'Ridley'];

function getTarget(e) {
	return e.target || e.srcElement;
}

// pick the array to display
function roundSwitcher(e) {
	var target = getTarget(e);
	var linkText = target.textContent;
	var roundHolder;
	if (linkText === 'Round1') {
		roundHolder = populateBoard(burgers);
	} else if (linkText == 'Round2') {
		roundHolder = populateBoard(bikes);
	} else {
		roundHolder = populateBoard(raptors);
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




