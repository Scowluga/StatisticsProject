
// Variables 
var ticketCost = getTicketCost(); 
var rounds = 1; // default to first round 
var money = 0;  // default to no change in money

const numberRounds = 20; // Controls the math portion. Doesn't control html (aka "x / 20 rounds"); 

// Functions: Organized generally in order of call  
function getTicketCost() { // get ticket cost. Changes to test rounds lasted
    return (Math.round(Math.random() * 4) + 1) * 5; // 5, 10, 15, 20, 25 
} 

function createTicket() { // Setting the proper fields with the ticketCost
	document.getElementById("ticketCost").innerHTML = ticketCost.toString(); 
	document.getElementById("ticketCost2").innerHTML = ticketCost.toString(); 

}

function buyTicket() { // Choosing to buy the ticket, shows next block of text 
	if (confirm("Are you sure you want to buy the $" + ticketCost + " ticket? That's a lot of money!")) {
		var element1 = document.getElementById("buybutton").style.display='none'; 
		var element2 = document.getElementById("description");
		unfade(element2);
	}
}

function begingame() { // begins the game. Sets the first section as visible, hides introduction
	document.getElementById("introsection").style.display="none";
	document.getElementById("firstsection").style.display="block"; 
}

function proceed() { // Proceed to play the game. 
	document.getElementById("hiddenobj").style.opacity=0; // Hides the display of results
	document.getElementById("secondsection").style.display="block"; // Shows second section
	document.getElementById("buttonsdisplay").style.display="none"; // Hides the buttons to proceed / back out
	rng(); // Creates RNG timers
	setTimeout(unfadeElem, 2750); // After the timer
}

function endgame(lastRound) { // Ends the game. 
	if (lastRound || confirm("Are you sure you want to back out? You will waste $" + ticketCost + ". That's a lot of money!")) {
		// Set what must be seen / not seen 
		document.getElementById("firstsection").style.display="none"; 
		document.getElementById("secondsection").style.display="none"; 
		// Since rounds is the current round, they lasted rounds - 1 rounds total. 
		rounds -= 1; 
		document.getElementById("lasted").innerHTML = (rounds).toString(); 
		document.getElementById("cost").innerHTML = (ticketCost).toString(); 
		unfade(document.getElementById("lastsection")); 

		// Link to pre populated google form 
		document.getElementById("formLink").href="https://docs.google.com/forms/d/e/1FAIpQLSdPvo9OQP_-neUyDhT4FV4PJCSItr-jy9lDGsvdtL5Nutn1Og/viewform?entry.1278106006=" + rounds + "&entry.147890848=$" + ticketCost;
		// Displayed is the final number of rounds they lasted, or how many times they clicked the 'proceed / play' button. 
	}
}


function rng() { // Sets timers
	var lessThan = 3000; 
	var multiply = 1.2;
	for (i = 1; i < lessThan; i *= multiply) {
		setTimeout(setRandom, i); // Set a timer for a function 
	};
}

function setRandom() { // Set a random number to a section on the screen
	document.getElementById("rng").innerHTML = Math.round(Math.random()* 10); // 0-10 inclusive
}

function unfadeElem() { // After the timer. 
	if (rounds < numberRounds) { // Normal round 
		var elem = document.getElementById("hiddenobj");
		unfade(elem); // Unfade the result of the rng

		var amount = Number(document.getElementById("rng").innerHTML); // Find the final amount
		if (amount % 2 === 0) { // even - lose 
			money = money - amount; 
			document.getElementById("roundDescription").innerHTML = "The result was even, so you lose $" + amount.toString(); 
		} else { // odd - win
			money = money + amount; 
			document.getElementById("roundDescription").innerHTML = "The result was odd, so you win $" + amount.toString(); 
		}
		reset(); // Reset the trial number and money change
	} else { // rounds === numberRounds. Implies it's the final round possible. 
		var elem = document.getElementById("hiddenobj");
		unfade(elem); // Unfade the result of the rng

		// Unfade the back out and continue buttons, fade in the "finish" button
		document.getElementById("buttonDivNormal").style.display="none"; 
		document.getElementById("buttonDivEnd").style.display="block";

		// Continue as regular
		var amount = Number(document.getElementById("rng").innerHTML); // Find the final amount
		if (amount % 2 === 0) { // even - lose 
			money = money - amount; 
			document.getElementById("roundDescription").innerHTML = "The result was even, so you lose $" + amount.toString(); 
		} else { // odd - win
			money = money + amount; 
			document.getElementById("roundDescription").innerHTML = "The result was odd, so you win $" + amount.toString(); 
		}
		rounds -= 1; // So that instead of setting trial as 21/20, stays at 20/20
		reset(); // Reset the trial number and money change
		rounds += 1; // So set back to 21. 
	}
}

function reset() { // Update information 
	document.getElementById("moneychange").innerHTML = money.toString();
	rounds += 1; // Successfully passed a round
	document.getElementById("trialnumber").innerHTML = rounds.toString(); 
}

function unfade(element) { // For flow. Unfades an element 
    var op = 0.1;  // initial opacity
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}
