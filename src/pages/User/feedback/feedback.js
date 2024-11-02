// Array of questions
const questions = [
    "What is JavaScript?",
    "What is a closure?",
    "Explain event bubbling.",
    "What is hoisting?",
    "What is the DOM?",
    "Explain promises in JavaScript.",
    "What is async/await?",
    "What are JavaScript modules?",
    "Explain arrow functions.",
    "What is destructuring?",
    // Add more questions as needed
];

let currentQuestionIndex = 0;

// Function to display the current question and update pagination
function displayQuestion() {
    const questionText = document.getElementById("question-text");
    questionText.textContent = questions[currentQuestionIndex];
    updatePagination();
    updateButtons();
}

// Function to update the pagination buttons
function updatePagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = ""; // Clear existing buttons

    questions.forEach((_, index) => {
        const button = document.createElement("button");
        button.classList.add("pagination-btn");
        button.textContent = index + 1;

        if (index === currentQuestionIndex) {
            button.classList.add("active");
        }

        button.onclick = () => goToQuestion(index);
        pagination.appendChild(button);
    });
}

// Function to go to the next question
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        submitForm();
    }
}

// Function to go to the previous question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

// Function to go to a specific question
function goToQuestion(index) {
    currentQuestionIndex = index;
    displayQuestion();
}

// Function to update "Previous" and "Next" (or "Submit") buttons
function updateButtons() {
    const previousBtn = document.getElementById("previous-btn");
    const nextBtn = document.getElementById("next-btn");

    // Hide "Previous" button on the first question
    previousBtn.style.display = currentQuestionIndex === 0 ? "none" : "inline-block";

    // Replace "Next" button with "Submit" on the last question
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.textContent = "Submit";
        nextBtn.onclick = submitForm;
    } else {
        nextBtn.textContent = "Next";
        nextBtn.onclick = nextQuestion;
    }
}

// Function to handle form submission
function submitForm() {
    alert("Form submitted!");
    // Add form submission logic here
}

// Initial display of the first question and buttons
displayQuestion();
