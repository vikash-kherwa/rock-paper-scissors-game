let userScore = 0;
let compScore = 0;
const msg = document.querySelector("#msg");
const choices = document.querySelectorAll(".choice");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const newgame = document.querySelector("#newgame")

if (localStorage.getItem("userScore")) {
    userScore = parseInt(localStorage.getItem("userScore"));
    userScorePara.innerText = userScore;
}

if (localStorage.getItem("compScore")) {
    compScore = parseInt(localStorage.getItem("compScore"));
    compScorePara.innerText = compScore;
}



newgame.onclick = () => {
    alert("New game started!");
    userScore = 0;
    compScore = 0;
     userScorePara.innerText = userScore;  
    compScorePara.innerText = compScore;  


    msg.innerText = "New Game Started! Play Your Move";
    msg.style.backgroundColor = "#143108";
    
    localStorage.removeItem("userScore");
    localStorage.removeItem("compScore");
};

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    // Rock Paper Scissors
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
}

const drawgame = () => {
    console.log("Game was draw");
    msg.innerText = "Game was draw.Play again";
    msg.style.backgroundColor = "#081b31";
}
const showWinner = (Userwin , userChoice,compChoice) => {
    if (Userwin) {
        userScore++;
        userScorePara.innerText=userScore;
        console.log(`You Won! ${userChoice} beats ${compChoice}`);
        msg.innerText = `You Won! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText=compScore;
        console.log(`You Lost! ${compChoice} beats ${userChoice}`);
        msg.innerText = `You Lost! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
    }


    
    localStorage.setItem("userScore", userScore);
    localStorage.setItem("compScore", compScore);
};




const playGame = (userChoice) => {
    console.log("User Choice :", userChoice);
    // Computer Choice
    const compChoice = genCompChoice();
    console.log("Computer Choice :", compChoice);

    if (userChoice === compChoice) {
        drawgame();
    }
    else {
        let Userwin = true;
        if (userChoice === "rock") {
            Userwin = compChoice === "paper" ? false : true;
        } else if (userChoice=== "paper") {
            Userwin = compChoice === "scissors" ? false : true;
        } else {

            Userwin = compChoice === "rock" ? false : true;
        }
        showWinner(Userwin , userChoice,compChoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    })
})