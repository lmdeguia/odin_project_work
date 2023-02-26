
let getComputerChoice = () => {
    let computerMapping = {0:'Rock', 1:'Paper', 2:'Scissors'};
    let randint = () => Math.floor(Math.random() * 3);
    return computerMapping[randint()];
};




let playRound = (playerSelection, computerSelection) => {
    let win_mapping = {'Rock':'Scissors', 'Scissors':'Paper', 'Paper':'Rock'};
    if (win_mapping[playerSelection] == undefined ){
        return [0, undefined];
    }else if (playerSelection === computerSelection){
        return [1, 'Nobody Wins! Everyone is a Loser! lol'];
    }else if (win_mapping[playerSelection] === computerSelection){
        return [2, `You Win! ${playerSelection} beats ${computerSelection}`];
    }else if (win_mapping[computerSelection] === playerSelection){
        return [3, `You Lose! ${computerSelection} beats ${playerSelection}`];
    }
};



function game(){
    var i = 0;
    var playerScore = 0;
    var computerScore = 0;
    var restarted = false;
    while (i < 5){
        let computerSelection = getComputerChoice();
        if (restarted === true){
            console.log(`**Rock Paper Scissors round ${i+1} restarted**`);
            restarted = false;
        }else{
            console.log(`Rock Paper Scissors round ${i+1} begin!`);
        }
        let rawPlayerSelection = prompt("Enter choice: ");
        let playerSelection = rawPlayerSelection.charAt(0).toUpperCase() + rawPlayerSelection.slice(1).toLowerCase();
        [winner, message] = playRound(playerSelection, computerSelection)
        if (message === undefined){
            console.log("Invalid Entry by Player");
            restarted = true;  
        }else{
            if (winner === 2){playerScore++;}
            else if (winner === 3){computerScore++;}
            console.log(message + ` (Player Score: ${playerScore}; Computer Score: ${computerScore})`);
            i++;
        }          
    }
    if (playerScore === computerScore){
        console.log(`(Player Score: ${playerScore}; Computer Score: ${computerScore})` + " Game is tied!");
    }else{
        let gameWinner = (playerScore > computerScore) ? 'Player':'Computer';
        console.log(`(Player Score: ${playerScore}; Computer Score: ${computerScore})` + ` ${gameWinner} wins the game!`);
    }  
}



game();















