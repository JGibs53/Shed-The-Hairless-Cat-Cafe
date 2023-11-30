//sticky navbar
var navbar = document.getElementById("navbar");
var menu = document.getElementById("menu");
var isStickyEnabled = true;

window.handleScroll = function(){
    if(window.scrollY >= menu.offsetTop){
        navbar.classList.add("sticky");
    }
    else{
        navbar.classList.remove("sticky");
    }
} 

window.addEventListener('scroll', function() {
    if (isStickyEnabled) {
        handleScroll();
    }
});


const mediaQuery = window.matchMedia('(max-width: 480px)');

function handleMediaQuery(event) {
    if (event.matches) {
        isStickyEnabled = false; 
        navbar.classList.remove("sticky"); 
    } else {
        isStickyEnabled = true; 
        handleScroll(); 
    }
}

mediaQuery.addListener(handleMediaQuery);
handleMediaQuery(mediaQuery); 

//lizard guessing game

const targetNumber = 23;
let attempts = 0;
const maxAttempts = 5;

function checkGuess() {
    const userGuess = parseInt(document.getElementById("guess").value);
    const messageElement = document.getElementById("message");
    const number = /^[1-9]|[1-4][0-9]|50$/;

  
        
        if (!number.test(userGuess)) {
            setMessage("Please enter a valid number between 1 and 50.");
        } else {
            const guessNumber = parseInt(userGuess);
            attempts++;
        
        if (userGuess > 50) {
            setMessage('Over 50 Lizards?! Who do you think we are, Golden Corral?! Your guess should be between 1-50 lizards')
            document.getElementById("guessButton").disabled = false;
        } else {

        if (userGuess === targetNumber) {
            setMessage(`Congratulations! You guessed it, 23 lizards. Which isn't even that many if you think about it. And that's 23 "reported incidents" so who's to say some of those weren't the same lizard.`);
            document.getElementById("guessButton").disabled = true;
        } else {
            if (attempts >= maxAttempts) {
                setMessage(`Sorry, you ran out of tries. It's best if you didn't know anyway.`);
                document.getElementById("guessButton").disabled = true;
            } else {
                setMessage(userGuess < targetNumber ? "Higher!" : "Lower!");
            }
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
                options: ["the carpet at a movie theater", "a tennis ball you found in a pond", "a potato wrapped in velour."],
                
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

      

        loadQuestion();
  