// --- CONFIGURATION ---
const WORDS_TO_REVEAL = ["HAPPY", "BIRTHDAY", "TO", "YOU"];
const COUNTDOWN_DELAY_MS = 1500; // 1.5 seconds delay between countdown numbers

// --- DOM ELEMENTS ---
const countdownNumberEl = document.getElementById('countdown-number');
const revealTextEl = document.getElementById('reveal-text');
const countdownSection = document.getElementById('countdown-section');
const giftSection = document.getElementById('gift-section');
const messageCard = document.getElementById('message-card');
const music = document.getElementById('background-music');

let countdownValue = 3; // Starting number for the countdown

// --- HELPER: MATRIX BACKGROUND GENERATION ---
function generateMatrixBackground() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*()';
    const columns = Math.floor(window.innerWidth / 20);
    const container = document.body;

    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = `${i * 20}px`;
        
        // Create a long string of random characters for the column
        column.textContent = Array(Math.ceil(window.innerHeight / 20) + 1).fill().map(() => chars[Math.floor(Math.random() * chars.length)]).join('\n');
        
        // Add a random delay so columns start falling at different times
        column.style.animationDelay = `-${Math.random() * 5}s`; 
        container.appendChild(column);
    }
}


// --- STEP 1: START SEQUENCE (Main entry point after page load) ---
function startSequence() {
    generateMatrixBackground();
    
    // Attempt to play music (must be user-initiated on some browsers)
    music.play().catch(e => console.log("Music auto-play blocked:", e));

    countdownNumberEl.innerHTML = countdownValue;
    
    const interval = setInterval(() => {
        countdownValue -= 1;
        
        if (countdownValue >= 1) {
            countdownNumberEl.innerHTML = countdownValue;
        } else if (countdownValue === 0) {
            countdownNumberEl.innerHTML = 'GO!'; 
            clearInterval(interval);
            setTimeout(revealGreeting, 500); // Wait 0.5s before revealing text
        }
    }, COUNTDOWN_DELAY_MS);
}


// --- STEP 2: REVEAL GREETING TEXT ---
function revealGreeting() {
    countdownNumberEl.classList.add('hidden');
    
    let wordIndex = 0;
    revealTextEl.innerHTML = '';
    
    const revealInterval = setInterval(() => {
        if (wordIndex < WORDS_TO_REVEAL.length) {
            // Append the next word with an animation style
            revealTextEl.innerHTML += `<span style="opacity:0; animation: fadeInWord 0.5s forwards ${wordIndex * 0.5}s;">${WORDS_TO_REVEAL[wordIndex]}</span>`;
            wordIndex++;
        } else {
            clearInterval(revealInterval);
            // Move to the next section (the animated cats/gift)
            setTimeout(() => {
                countdownSection.classList.add('hidden');
                giftSection.classList.remove('hidden');
            }, 2000); 
        }
    }, 800); 
}

// --- STEP 3: OPEN GIFT BUTTON ACTION (triggered by button click) ---
function openGift() {
    document.getElementById('open-gift-button').classList.add('hidden');
    // Reveal the hidden card with your handwritten message image
    messageCard.classList.remove('hidden'); 
}

// --- INITIALIZE ---
document.addEventListener('DOMContentLoaded', startSequence);
