// ================================
// MOBILE MENU
// ================================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");

    if (navMenu.classList.contains("show")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }
});


// Close mobile menu after clicking a link

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

        menuBtn.textContent = "☰";

    });

});


// ================================
// VIRTUAL HARMONIUM
// ================================

const keys = document.querySelectorAll(".key");
const currentNote = document.getElementById("currentNote");


// Audio context

let audioContext;

function playSound(frequency) {

    if (!audioContext) {
        audioContext = new (
            window.AudioContext ||
            window.webkitAudioContext
        )();
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(
        0.001,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.3,
        audioContext.currentTime + 0.02
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.7
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.7
    );
}


// Frequencies

const frequencies = {

    "C": 261.63,
    "C#": 277.18,
    "D": 293.66,
    "D#": 311.13,
    "E": 329.63,
    "F": 349.23,
    "F#": 369.99,
    "G": 392.00,
    "G#": 415.30,
    "A": 440.00,
    "A#": 466.16,
    "B": 493.88

};


// Play key

function playKey(key) {

    const note = key.dataset.note;

    playSound(frequencies[note]);

    currentNote.textContent = note;

    key.classList.add("active");

    setTimeout(() => {

        key.classList.remove("active");

    }, 150);

}


// Mouse / touch

keys.forEach(key => {

    key.addEventListener("click", () => {

        playKey(key);

    });

});


// Computer keyboard

document.addEventListener("keydown", event => {

    if (event.repeat) return;

    const pressedKey = event.key.toLowerCase();

    const key = document.querySelector(
        `.key[data-key="${pressedKey}"]`
    );

    if (key) {

        playKey(key);

    }

});


// ================================
// SCROLL ANIMATION
// ================================

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },

    {
        threshold: 0.15
    }

);


document
    .querySelectorAll(
        ".feature-card, .about-image, .about-content, .gallery-card"
    )
    .forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "0.7s ease";

        observer.observe(element);

    });


// Add visible class styling dynamically

const style = document.createElement("style");

style.innerHTML = `

.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

`;

document.head.appendChild(style);
