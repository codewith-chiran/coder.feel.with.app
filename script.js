const apps = [
    {
        name: "VS Code",
        imageUrl: "https://raw.githubusercontent.com/codewith-chiran/coder.feel.with.app/main/vs%20code.png",
        backgroundColor: "#0078d4" // VS Code blue
    },
    {
        name: "Android Studio",
        imageUrl: "https://raw.githubusercontent.com/codewith-chiran/coder.feel.with.app/main/Android_Studio_icon.png",
        backgroundColor: "#3ddc84" // Android green
    },
    {
        name: "Spotify",
        imageUrl: "https://raw.githubusercontent.com/codewith-chiran/coder.feel.with.app/main/spotify.png",
        backgroundColor: "#1db954" // Spotify green
    },
    {
        name: "ChatGPT",
        imageUrl: "https://raw.githubusercontent.com/codewith-chiran/coder.feel.with.app/main/ChatGPT-Logo.png",
        backgroundColor: "#74aa9c" // ChatGPT teal/green
    },
    {
        name: "DeepSeek",
        imageUrl: "https://raw.githubusercontent.com/codewith-chiran/coder.feel.with.app/main/DeepSeek-icon.svg.png",
        backgroundColor: "#6366f1" // DeepSeek purple/blue
    },
    {
        name: "GitHub",
        imageUrl: "https://raw.githubusercontent.com/codewith-chiran/coder.feel.with.app/main/github.webp",
        backgroundColor: "#333333" // GitHub dark gray
    }
];

const appIcon = document.getElementById('appIcon');
const appName = document.getElementById('appName');
const cookie = document.querySelector('.cookie');
const squareBox = document.querySelector('.square-box');

let currentIndex = 0;

function preloadImages() {
    apps.forEach(app => {
        const img = new Image();
        img.src = app.imageUrl;
    });
}

async function showApp(index) {
    const app = apps[index];

    // Hide cookie and prepare for next app
    cookie.classList.remove('show');

    // Change box background color to app's brand color
    squareBox.style.background = app.backgroundColor;

    // Fade out current content
    appIcon.classList.add('fade-out');
    appName.classList.add('fade-out');

    // Wait for fade out to complete
    await new Promise(resolve => setTimeout(resolve, 500));

    // Update content
    appIcon.src = app.imageUrl;
    appName.textContent = app.name;

    // Fade in new content
    appIcon.classList.remove('fade-out');
    appName.classList.remove('fade-out');

    // Wait for image to load and show cookie
    await new Promise(resolve => {
        if (appIcon.complete) {
            resolve();
        } else {
            appIcon.onload = resolve;
            appIcon.onerror = resolve;
        }
    });

    // Show cookie with smooth animation
    setTimeout(() => {
        cookie.classList.add('show');
    }, 300);
}

function nextApp() {
    currentIndex = (currentIndex + 1) % apps.length;
    showApp(currentIndex);
}

// Initialize
appIcon.onerror = function() {
    console.log('Error loading image:', this.src);
    // Set a fallback background color for broken images
    this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkFwcCBJY29uPC90ZXh0Pjwvc3ZnPg==';
}

// Preload images and start animation
preloadImages();
showApp(currentIndex);

// Change app every 3 seconds for better viewing
setInterval(nextApp, 3000);
