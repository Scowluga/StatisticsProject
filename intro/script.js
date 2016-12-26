
if (typeof rounds === 'undefined') {
    var rounds = 1; 
}

function setup() {
    rounds = 1; 
}

function show() {
    window.alert(rounds); 
}

function increment() {
    rounds +=  1; 
}


function begingame() { 
	window.location.href="../first/index.html"
}

function buyTicket() {
	var element1 = document.getElementById("buybutton").style.display='none'; 
	var element2 = document.getElementById("description");
	unfade(element2);
}

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}
