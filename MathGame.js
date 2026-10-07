// Code by Gavin and Orlando
const prompt = require('prompt-sync')();

let highScoreMS = 0;
let highScoreTO = 0;
main()

function main() {
    // Variables
    let gameMode = 1;
    let difficulty = 1;
    let question = 1;
    let score = 0;
    let skips = 3;
    let nums = [0, 0, 0, "operator"];

    // Game mode selection
    console.log("Welcome to Math Game! Please select which game mode you'd like to play.\nMax Score = 1\nThree Out = 2\nExit Program = 3");
    gameMode = prompt("Select game mode: ");
    while (isNaN(gameMode) || gameMode < 1 || gameMode > 3) {
        console.log("Error: Invalid selection.")
        gameMode = prompt("Select game mode: ");
    }

    // Quit Program
    if (gameMode == 3) {
        console.log("Ending program.")
        return;
    }

    // Difficulty selection
    console.log(`Game mode ${gameMode} selected. Please select which difficulty you'd like to play at.\nEasy = 1\nMedium = 2\nHard = 3`)
    difficulty = prompt("Choose your difficulty: ");
    while (isNaN(difficulty) || difficulty < 1 || difficulty > 3) {
        console.log("Error: Invalid selection.")
        difficulty = prompt("Choose your difficulty: ");
    }

    if (gameMode == 1) {
        maxScore()
        console.log(`You finished!\nYou got a score of ${score} out of 200!\nYou used ${3 - skips} skips.`);
        if (highScoreMS < score) {
            highScoreMS = score;
            console.log("New high score!");
        }
    } else {
        threeOut()
        console.log(`Game over! You got a score of ${score}.`)
        if (highScoreTO < score) {
            highScoreTO = score;
            console.log("New high score!");
        }
    }
    main();

    // Max Score game mode
    function maxScore() {
        for (i = 1; i <= 20; i++) {

            makeEquation()

            let quest = prompt(`Question ${question}: What is ${nums[0]} ${nums[3]} ${nums[1]} = `)

            if (quest == "skip" && skips > 0) {
                skips--
                console.log(`Question skipped, Total points: [${score}] \n Total skips remaining: [${skips}]`)
                question++
            } else if (quest == "skip" && skips < 0) {
                console.log("Sorry, out of skips...")
            }
            else {
                let wow = Number(quest)

                if (wow == nums[2]) {
                    score = score + 10
                    console.log(`Correct! + 10 points, Total points: [${score}]`)
                    question++
                } else {
                    score = score - 5
                    console.log(`Incorrect response... - 5 points, Total points [${score}]`)
                    console.log("bro")
                    question++
                }
                if (question > 20) {
                    setTimeout(() => {
                        return
                    }, 3000)
                }
            }
        }
    }

    // Three Out game mode
    function threeOut() {
        question = 0
        let lives = 3;
        while (lives > 0) {
            makeEquation()
            question++;
            let answer = prompt(`Question ${question}: ${nums[0]} ${nums[3]} ${nums[1]} = `)
            if (Number(answer) == nums[2]) {
                console.log("Correct!")
                score += 10
            } else {
                lives--;
                console.log(`Incorrect! -1 life, ${lives} remain(s).`)
            }
        }
    }

    function makeEquation() {
        if (difficulty == 1) {
            let operator = Math.random() * 2
            if (operator < 1) return addition();
            else return subtraction();
        } else {
            let operator = Math.random() * 4
            if (operator < 1) return addition()
            else if (operator < 2) return subtraction();
            else if (operator < 3) return multiplication();
            else return division();
        }
        function addition() {
            if (difficulty == 1) {
                nums[0] = Math.floor(Math.random() * 10);
                nums[1] = Math.floor(Math.random() * 10);
            } else if (difficulty == 2) {
                nums[0] = Math.floor(Math.random() * 100);
                nums[1] = Math.floor(Math.random() * 100);
            } else {
                nums[0] = Math.floor(Math.random() * 1000);
                nums[1] = Math.floor(Math.random() * 1000);
            }
            nums[2] = nums[0] + nums[1];
            nums[3] = "+";
        }
        function subtraction() {
            if (difficulty == 1) {
                nums[0] = Math.floor(Math.random() * 10);
                nums[1] = Math.floor(Math.random() * 10);
            } else if (difficulty == 2) {
                nums[0] = Math.floor(Math.random() * 100);
                nums[1] = Math.floor(Math.random() * 100);
            } else {
                nums[0] = Math.floor(Math.random() * 1000);
                nums[1] = Math.floor(Math.random() * 1000);
            }
            nums[2] = nums[0] - nums[1];
            nums[3] = "-";
        }
        function multiplication() {
            nums[0] = Math.floor(Math.random() * 10);
            if (difficulty < 3) nums[0] = Math.floor(Math.random() * 10);
            else nums[1] = Math.floor(Math.random() * 100);
            nums[2] = nums[0] * nums[1];
            nums[3] = "*";
        }
        function division() {
            nums[0] = Math.floor(Math.random() * 10);
            if (difficulty < 3) {
                nums[0] = Math.floor(Math.random() * 10);
                let divisors = [];
                for (let i = 1; i < 10; i++) {
                    if (Number.isInteger(nums[0] / i)) {
                        divisors.push(nums[0] / i)
                    }
                }
                nums[1] = divisors[Math.floor(Math.random() * divisors.length)]
            }
            else {
                nums[0] = Math.floor(Math.random() * 100);
                let divisors = [];
                for (let i = 1; i < 10; i++) {
                    if (Number.isInteger(nums[0] / i)) divisors.push(nums[0] / i)
                }
                nums[1] = divisors[Math.floor(Math.random() * divisors.length)]
            }
            nums[2] = nums[0] / nums[1];
            nums[3] = "/";
        }
    }
}