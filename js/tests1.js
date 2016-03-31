// get the last list item and change the class
(function(){
	var el = document.getElementsByClassName('grabber');
	var total = el.length; 
	var estLast = total - 1;
	var lastEl = el[estLast];
	lastEl.className = 'small';
}());


// Remove list items
// Function to get the item clicked
function getTarget(e) {
	return e.target || e.srcElement;
}
//function to remove item clicked
function removeItem(e) {
	var target, elParent, elGrandParent;
	target = getTarget(e); // get the list item clicked
	elParent = target.parentNode; // get the parent of the list item
	elGrandParent = target.parentNode.parentNode;
	var itemRemoved = 'Item removed ';
	itemRemoved += target;
	console.log(itemRemoved);
	elGrandParent.removeChild(elParent);
	e.preventDefault();
}

// get the element to trigger the listener
var removeTrigger = document.getElementById('testList');
// bind the listener to the trigger
removeTrigger.addEventListener('click', function(e){
	removeItem(e);
}, false);