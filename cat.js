//sticky navbar
var navbar = document.getElementById("navbar");
var menu = document.getElementById("menu");

window.onscroll = function(){
    if(window.scrollY >= menu.offsetTop){
        navbar.classList.add("sticky");
    }
    else{
        navbar.classList.remove("sticky");
    }
} 

//lizard guessing game
const targetNumber = 23;
let attempts = 0;
const maxAttempts = 5;

function checkGuess() {
    const userGuess = parseInt(document.getElementById("guess").value);
    const messageElement = document.getElementById("message");

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 50) {
        setMessage("We've had somewhere between 1-50 sightings. How many lizards is too many lizards according to the health department?");
    } else {
        attempts++;

        if (userGuess === targetNumber) {
            setMessage(`Congratulations! You guessed it, 23 lizards. Which isn't even that many if you think about it. And that's 23 "reported incidents" so who's to say some of those weren't the same lizard.`);
            document.getElementById("guessButton").disabled = true;
        } else {
            if (attempts >= maxAttempts) {
                setMessage(`Sorry, you ran out of tries. The correct number was ${targetNumber} but who's counting?...Besides the health department...`);
                document.getElementById("guessButton").disabled = true;
            } else {
                setMessage(userGuess < targetNumber ? "Higher!" : "Lower!");
            }
        }
    }
}

function setMessage(message) {
    document.getElementById("message").textContent = message;
}


//cat match quiz
      const quizData = [
            {
                question: "Which best describes how much hair your cat should have?",
                options: ["Barely any", "None", "Jeff Bezos"],
                
            },
            {
                question: "Finish this sentence, 'Touching your pet should feel like...'",
                options: ["A tennis ball you found in a pond", "A potato that shakes", "If a bus seat needed lotion"],
                
            },
            {
                question: "Wrinkles?",
                options: ["Like a brain"],
                
            }
        ];

        let currentQuestion = 0;
        let score = 0;

        const questionElement = document.getElementById('question');
        const optionsElement = document.getElementById('options');
        const nextButton = document.getElementById('next-btn');
        const result = document.getElementById('result');
        const resultText = document.getElementById('result-text');

        function loadQuestion() {
            const currentQuizData = quizData[currentQuestion];
            questionElement.innerText = currentQuizData.question;
            optionsElement.innerHTML = "";
            currentQuizData.options.forEach((option) => {
                const button = document.createElement('button');
                button.innerText = option;
                button.addEventListener('click', checkAnswer);
                optionsElement.appendChild(button);
            });
        }

        function checkAnswer(event) {
            const selectedOption = event.target.innerText;
            const currentQuizData = quizData[currentQuestion];
            if (selectedOption === currentQuizData.correct) {
                score++;
            }
            currentQuestion++;
            if (currentQuestion < quizData.length) {
                loadQuestion();
            } else {
                showResult();
            }
        }

        function displayImage(imageUrl) {
            const img = document.getElementById("result-image");
            img.src = imageUrl;
            img.style.display = 'block';
        }

        function showResult() {
            questionElement.style.display = 'none';
            optionsElement.style.display = 'none';
            nextButton.style.display = 'none';

            result.style.display = 'block';
            resultText.innerText = `Congratulations! Here's your new baby boy!`;

            fetch('https://api.thecatapi.com/v1/images/search?breed_ids=dons')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    if (data && data.length > 0 && data[0].url) {
                        displayImage(data[0].url);
                    } else {
                        console.log("Image URL not found in the API response.");
                    }
                })
                .catch((error) => {
                    console.log("Error: " + error);
                });
        }

        nextButton.addEventListener('click', loadQuestion);

        loadQuestion();
  