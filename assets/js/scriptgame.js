const bitcoins = [
  { name: "Bitcoin", value: 50, image:"file:///C:/wamp64/www/login/login%20system/assets/img/coin-1.svg" },
  { name: "Ethereum", value: 300, image: "file:///C:/wamp64/www/login/login%20system/assets/img/coin-2.svg" },
  { name: "Tether", value: 150, image: "file:///C:/wamp64/www/login/login%20system/assets/img/coin-3.svg" },
  { name: "BNB", value: 80, image: "file:///C:/wamp64/www/login/login%20system/assets/img/coin-4.svg"},
  { name: "Solana", value: 120, image: "file:///C:/wamp64/www/login/login%20system/assets/img/coin-5.svg" },
  { name: "XRP", value: 90, image: "file:///C:/wamp64/www/login/login%20system/assets/img/coin-6.svg" },
  { name: "Cardano", value: 250, image: "file:///C:/wamp64/www/login/login%20system/assets/img/coin-7.svg" },
  { name: "Avalanche", value: 30, image: "file:///C:/wamp64/www/login/login%20system/assets/img/coin-8.svg"},
  
];
let selectedBitcoin = null;
  let virtualCoins = 500; // Changed starting virtual coins to 500
  let timerInterval;
  let bets = [];
  let isTimerStarted = false; // New variable to track timer status
  
// ... (Previous JavaScript code remains unchanged)

// Function to display bitcoin information
function displayBitcoinInfo() {
  const bitcoinInfoDiv = document.getElementById("bitcoinInfo");
  bitcoinInfoDiv.innerHTML = "";

  bitcoins.forEach((bitcoin) => {
    const bitcoinButton = document.createElement("button");
    bitcoinButton.innerText = bitcoin.name + " ($" + bitcoin.value + ")";
    bitcoinButton.classList.add("bitcoinButton");
    bitcoinButton.onclick = function () {
      selectedBitcoin = bitcoin;
      displayBitcoinInfo();
      document.getElementById("betResult").innerText = "";
      document.getElementById("bitcoinStatus").innerText = ""; // Clear the previous result
    };
    bitcoinInfoDiv.appendChild(bitcoinButton);

    // Add an <img> element for the cryptocurrency image
    const bitcoinImage = document.createElement("img");
    bitcoinImage.src = bitcoin.image;
    bitcoinImage.alt = bitcoin.name + " Image";
    bitcoinInfoDiv.appendChild(bitcoinImage);
    
    bitcoinInfoDiv.appendChild(document.createElement("br"));
  });
}

// ... (Rest of the JavaScript code remains unchanged)

  // Function to place a bet
  function placeBet(direction) {
    if (!selectedBitcoin) {
      alert("Please select a bitcoin first.");
      return;
    }
  
    const betAmount = parseInt(document.getElementById("betAmount").value);
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > virtualCoins) {
      alert("Invalid bet amount.");
      return;
    }
  
    virtualCoins -= betAmount;
    document.getElementById("virtualCoins").innerText = virtualCoins;
  
    bets.push({ bitcoin: selectedBitcoin, amount: betAmount, direction });
  
    // Reset the selected bitcoin after placing the bet
    selectedBitcoin = null;
    displayBitcoinInfo();
  
    // Show all bets placed so far
    const betResultElement = document.getElementById("betResult");
    betResultElement.innerHTML = "Bets Placed:<br>";
    bets.forEach((bet) => {
      betResultElement.innerHTML +=
        `${bet.bitcoin.name} - Bet ${bet.amount} coins on ${bet.direction}<br>`;
    });
  }
  
  // Function to start the timer
  function startTimer(duration) {
    let timeLeft = duration;
    const timerElement = document.getElementById("timer");
  
    timerInterval = setInterval(function () {
      timeLeft--;
      timerElement.innerText = timeLeft + " seconds";
  
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        timerElement.innerText = "Time's up!";
        document.getElementById("betSection").style.display = "none";
  
        // Handle the end of the game here, determine results, and show notifications
        handleGameEnd();
      }
    }, 1000);
  }
  
  // ... (Previous JavaScript code remains unchanged)
  
  // Function to handle the end of the game
  function handleGameEnd() {
    const timerElement = document.getElementById("timer");
    timerElement.innerText = "Time's up!";
    document.getElementById("betSection").style.display = "none";
  
    // Display the final results after the timer ends
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = "<strong>Results:</strong><br>";
  
    bets.forEach((bet) => {
      const result = Math.random() < 0.5 ? "up" : "down";
      const coinChange = result === bet.direction ? bet.amount * 2 : 0;
      virtualCoins += coinChange;
  
      const outcome = result === bet.direction ? "won" : "lost";
      const resultText = `Bitcoin ${bet.bitcoin.name} - Bet ${bet.amount} coins on ${bet.direction}. You ${outcome} ${coinChange} virtual coins.`;
      resultElement.innerHTML += `${resultText}<br>`;
      
      // Display if the selected bitcoin went up or down
      if (bet.bitcoin === selectedBitcoin) {
        const bitcoinStatusElement = document.getElementById("bitcoinStatus");
        bitcoinStatusElement.innerText = `Bitcoin ${selectedBitcoin.name} went ${result}.`;
      }
    });
  
    // Clear the bets after displaying the results
    bets = [];
  
    document.getElementById("virtualCoins").innerText = virtualCoins;
  }
  
  // ... (Rest of the JavaScript code remains unchanged)
  
  
  // Call the initial function to display bitcoin information
  displayBitcoinInfo();
  
  // Start the timer when a bitcoin is selected
  document.getElementById("bitcoinInfo").addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      if (!isTimerStarted) { // Check if the timer is not already started
        document.getElementById("betSection").style.display = "block";
        startTimer(60); // Set the duration of the timer to 60 seconds
        isTimerStarted = true; // Set the flag to indicate the timer has started
      }
    }
  });
// let selectedBitcoin = null;
// let virtualCoins = 500; // Changed starting virtual coins to 500
// let timerInterval;
// let bets = [];
// let isTimerStarted = false; // New variable to track timer status

// // ... (Previous JavaScript code remains unchanged)

// // Function to display bitcoin information
// function displayBitcoinInfo() {
// const bitcoinInfoDiv = document.getElementById("bitcoinInfo");
// bitcoinInfoDiv.innerHTML = "";

// bitcoins.forEach((bitcoin) => {
//   const bitcoinButton = document.createElement("button");
//   bitcoinButton.innerText = bitcoin.name + " ($" + bitcoin.value + ")";
//   bitcoinButton.classList.add("bitcoinButton");
//   bitcoinButton.onclick = function () {
//     selectedBitcoin = bitcoin;
//     displayBitcoinInfo();
//     document.getElementById("betResult").innerText = "";
//     document.getElementById("bitcoinStatus").innerText = ""; // Clear the previous result
//   };
//   bitcoinInfoDiv.appendChild(bitcoinButton);

//   // Add an <img> element for the cryptocurrency image
//   const bitcoinImage = document.createElement("img");
//   bitcoinImage.src = bitcoin.image;
//   bitcoinImage.alt = bitcoin.name + " Image";
//   bitcoinInfoDiv.appendChild(bitcoinImage);
  
//   // Add a line break after each set of buttons
//   bitcoinInfoDiv.appendChild(document.createElement("br"));
// });
// }

// // ... (Rest of the JavaScript code remains unchanged)

// // Function to place a bet
// function placeBet(direction) {
//   if (!selectedBitcoin) {
//     alert("Please select a bitcoin first.");
//     return;
//   }

//   const betAmount = parseInt(document.getElementById("betAmount").value);
//   if (isNaN(betAmount) || betAmount <= 0 || betAmount > virtualCoins) {
//     alert("Invalid bet amount.");
//     return;
//   }

//   virtualCoins -= betAmount;
//   document.getElementById("virtualCoins").innerText = virtualCoins;

//   bets.push({ bitcoin: selectedBitcoin, amount: betAmount, direction });

//   // Reset the selected bitcoin after placing the bet
//   selectedBitcoin = null;
//   displayBitcoinInfo();

//   // Show all bets placed so far
//   const betResultElement = document.getElementById("betResult");
//   betResultElement.innerHTML = "Bets Placed:<br>";
//   bets.forEach((bet) => {
//     betResultElement.innerHTML +=
//       `${bet.bitcoin.name} - Bet ${bet.amount} coins on ${bet.direction}<br>`;
//   });
// }

// // Function to start the timer
// function startTimer(duration) {
//   let timeLeft = duration;
//   const timerElement = document.getElementById("timer");

//   timerInterval = setInterval(function () {
//     timeLeft--;
//     timerElement.innerText = timeLeft + " seconds";

//     if (timeLeft === 0) {
//       clearInterval(timerInterval);
//       timerElement.innerText = "Time's up!";
//       document.getElementById("betSection").style.display = "none";

//       // Handle the end of the game here, determine results, and show notifications
//       handleGameEnd();
//     }
//   }, 1000);
// }

// // ... (Previous JavaScript code remains unchanged)

// // Function to handle the end of the game
// function handleGameEnd() {
//   const timerElement = document.getElementById("timer");
//   timerElement.innerText = "Time's up!";
//   document.getElementById("betSection").style.display = "none";

//   // Display the final results after the timer ends
//   const resultElement = document.getElementById("result");
//   resultElement.innerHTML = "<strong>Results:</strong><br>";

//   bets.forEach((bet) => {
//     const result = Math.random() < 0.5 ? "up" : "down";
//     const coinChange = result === bet.direction ? bet.amount * 2 : 0;
//     virtualCoins += coinChange;

//     const outcome = result === bet.direction ? "won" : "lost";
//     const resultText = `Bitcoin ${bet.bitcoin.name} - Bet ${bet.amount} coins on ${bet.direction}. You ${outcome} ${coinChange} virtual coins.`;
//     resultElement.innerHTML += `${resultText}<br>`;
    
//     // Display if the selected bitcoin went up or down
//     if (bet.bitcoin === selectedBitcoin) {
//       const bitcoinStatusElement = document.getElementById("bitcoinStatus");
//       bitcoinStatusElement.innerText = `Bitcoin ${selectedBitcoin.name} went ${result}.`;
//     }
//   });

//   // Clear the bets after displaying the results
//   bets = [];

//   document.getElementById("virtualCoins").innerText = virtualCoins;
// }

// // ... (Rest of the JavaScript code remains unchanged)


// // Call the initial function to display bitcoin information
// displayBitcoinInfo();

// // Start the timer when a bitcoin is selected
// document.getElementById("bitcoinInfo").addEventListener("click", function (event) {
//   if (event.target.tagName === "BUTTON") {
//     if (!isTimerStarted) { // Check if the timer is not already started
//       document.getElementById("betSection").style.display = "block";
//       startTimer(60); // Set the duration of the timer to 60 seconds
//       isTimerStarted = true; // Set the flag to indicate the timer has started
//     }
//   }
// });