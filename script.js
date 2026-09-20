/* =========================
MIDNIGHT PUBLIC LOGIN SYSTEM
========================= */

const midnightLoginForm = document.getElementById("midnightLoginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

function showPassword() {
    const email = loginEmail.value.trim().toLowerCase();
    
    if (email === "") {
        alert("Please enter your email first!");
        return;
    }

    // Check karein ke kya is email ke liye pehle se koi password saved hai
    let users = JSON.parse(localStorage.getItem("midnightUsers") || "{}");
    const passwordStepBtn = document.querySelector("#passwordStep button[type='submit']");
    
    if (users[email]) {
        if (passwordStepBtn) passwordStepBtn.textContent = "LOGIN";
    } else {
        if (passwordStepBtn) passwordStepBtn.textContent = "SIGN UP & LOGIN";
    }

    document.getElementById("emailStep").style.display = "none";
    document.getElementById("passwordStep").style.display = "block";
}

function showEmail() {
    document.getElementById("passwordStep").style.display = "none";
    document.getElementById("emailStep").style.display = "block";
}

if (midnightLoginForm) {
    midnightLoginForm.addEventListener("submit", function(event) {
        event.preventDefault(); 

        const email = loginEmail.value.trim().toLowerCase();
        const password = loginPassword ? loginPassword.value.trim() : "";

        if (email === "" || password === "") {
            alert("Please fill in both email and password!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("midnightUsers") || "{}");

        if (users[email]) {
            // Agar email pehle se hai, toh password match hona chahiye
            if (users[email] !== password) {
                alert("Incorrect password for this email!");
                return;
            }
            alert("Welcome back to MIDNIGHT!");
        } else {
            // Naya user hai toh uska account save kar lo
            users[email] = password;
            localStorage.setItem("midnightUsers", JSON.stringify(users));
            alert("Account created & Welcome to MIDNIGHT!");
        }
        
        // Login successful hone par screen band ho jayegi
        closeScreen('loginScreen');
    });
}



/* =========================================================
   FEATURE 09 - DECISION WHEEL LOGIC
========================================================= */

let wheelOptions = ["Pizza", "Burger", "Biryani", "Pasta"];

function renderWheelTags() {
    const container = document.getElementById("wheelTags");
    if (!container) return;
    
    container.innerHTML = "";
    
    if (wheelOptions.length === 0) {
        container.innerHTML = `<span style="color:var(--muted); margin:auto; font-size:13px;">No options added yet. Add some above!</span>`;
        return;
    }
    
    wheelOptions.forEach((opt, index) => {
        const tag = document.createElement("div");
        tag.className = "wheel-tag";
        tag.innerHTML = `${opt} <span onclick="removeWheelOption(${index})">&times;</span>`;
        container.appendChild(tag);
    });
}

function addWheelOption() {
    const input = document.getElementById("wheelInput");
    const val = input.value.trim();
    
    if (val !== "") {
        wheelOptions.push(val);
        input.value = "";
        renderWheelTags();
    }
}

function removeWheelOption(index) {
    wheelOptions.splice(index, 1);
    renderWheelTags();
}

function spinWheel() {
    if (wheelOptions.length === 0) {
        alert("Please add at least one option first!");
        return;
    }
    
    const display = document.getElementById("wheelDisplay");
    let counter = 0;
    display.style.transform = "scale(1.05)";
    
    // Shuffling animation effect
    let spinInterval = setInterval(() => {
        let randomOpt = wheelOptions[Math.floor(Math.random() * wheelOptions.length)];
        display.textContent = randomOpt;
        counter++;
        
        if (counter > 15) {
            clearInterval(spinInterval);
            let winner = wheelOptions[Math.floor(Math.random() * wheelOptions.length)];
            display.textContent = winner;
            display.style.transform = "scale(1.1)";
            setTimeout(() => {
                display.style.transform = "scale(1)";
            }, 200);
        }
    }, 100);
}

// Initial render load
renderWheelTags();

// Enter key press support for adding options
document.addEventListener("DOMContentLoaded", () => {
    const wheelInput = document.getElementById("wheelInput");
    if (wheelInput) {
        wheelInput.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                addWheelOption();
            }
        });
    }
});


/* =========================================================
   FEATURE 10 - JOKES & QUOTES LOGIC
========================================================= */

let currentJqType = 'quote';

const massiveQuotes = [
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt" },
    { text: "If you look at what you have in life, you'll always have more.", author: "Oprah Winfrey" },
    { text: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.", author: "James Cameron" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa" },
    { text: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt" },
    { text: "Always remember that you are absolutely unique. Just like everyone else.", author: "Margaret Mead" },
    { text: "Don't judge each day by the harvest you reap but by the seeds that you plant.", author: "Robert Louis Stevenson" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin" },
    { text: "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.", author: "Helen Keller" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
    { text: "You will face many defeats in life, but never let yourself be defeated.", author: "Maya Angelou" },
    { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
    { text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
    { text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" }
];

const massiveJokes = [
    { setup: "Why don't scientists trust atoms?", punchline: "Because they make up everything!" },
    { setup: "Why did the scarecrow win an award?", punchline: "Because he was outstanding in his field!" },
    { setup: "I'm reading a book on anti-gravity.", punchline: "I just can't put it down!" },
    { setup: "Did you hear about the mathematician who's afraid of negative numbers?", punchline: "He'll stop at nothing to avoid them." },
    { setup: "Why do programmers wear glasses?", punchline: "Because they don't C#!" },
    { setup: "Parallel lines have so much in common.", punchline: "It’s a shame they’ll never meet." },
    { setup: "Why did the private school student eat his homework?", punchline: "Because his teacher told him it was a piece of cake!" },
    { setup: "What do you call a fake noodle?", punchline: "An impasta!" },
    { setup: "How does a penguin build its house?", punchline: "Igloos it together!" },
    { setup: "Why did the bicycle fall over?", punchline: "Because it was two tired!" },
    { setup: "What do you call cheese that isn't yours?", punchline: "Nacho cheese!" },
    { setup: "Why can't Elsa from Frozen have a balloon?", punchline: "Because she will 'let it go'!" },
    { setup: "What do you call a bear with no teeth?", punchline: "A gummy bear!" },
    { setup: "Why did the math book look sad?", punchline: "Because it had too many problems." },
    { setup: "What musical instrument is found in the bathroom?", punchline: "A tuba toothpaste!" }

];

function switchJqTab(type) {
    currentJqType = type;
    document.getElementById("quoteTabBtn").classList.toggle("active", type === 'quote');
    document.getElementById("jokeTabBtn").classList.toggle("active", type === 'joke');
    nextJokeQuote();
}

function nextJokeQuote() {
    const textBox = document.getElementById("jqText");
    const authorBox = document.getElementById("jqAuthor");

    if (currentJqType === 'quote') {
        const randomQ = massiveQuotes[Math.floor(Math.random() * massiveQuotes.length)];
        textBox.textContent = `"${randomQ.text}"`;
        authorBox.textContent = `- ${randomQ.author}`;
    } else {
        const randomJ = massiveJokes[Math.floor(Math.random() * massiveJokes.length)];
        textBox.textContent = `${randomJ.setup}`;
        authorBox.textContent = `- 😂 ${randomJ.punchline}`;
    }
}

function copyJqText() {
    const text = document.getElementById("jqText").textContent;
    const author = document.getElementById("jqAuthor").textContent;
    navigator.clipboard.writeText(`${text} ${author}`);
    alert("Copied to clipboard!");
}


/* =========================================================
   MIDNIGHT SCREEN CONTROL
========================================================= */

function openScreen(screenId) {
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.style.setProperty('display', 'flex', 'important');
        document.body.style.overflow = "hidden";
    }
}

function closeScreen(screenId) {
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.style.setProperty('display', 'none', 'important');
        document.body.style.overflow = "auto";
    }
}


/* =========================================================
   AUTO SHOW LOGIN ON PAGE LOAD
========================================================= */

window.addEventListener("DOMContentLoaded", function() {
    openScreen('loginScreen');
});