document.addEventListener("DOMContentLoaded", function() {
    // Check if the script should run based on the current page
    if (window.location.pathname.includes('index.html')) {
        // Typing animation for the loading screen
        const terminal = document.querySelector('.terminal');
        const startText = "Start";
        const launchText = "Launching";
        const helpHint = "";
        let lineCount = 0;
        let typingStarted = false;

        // Function to start the animation
        function startAnimation() {
            let newText = launchText;
            for (let i = 0; i < 6; i++) {
                setTimeout(() => {
                    newText += '.';
                    terminal.textContent = newText;
                }, 50 * (i + 1)); // Faster typing animation
            }

            // Add a delay before generating random lines
            setTimeout(() => {
                generateRandomLines(40); // Generate 40 lines
            }, 2000); // Adjust delay as needed
        }

        // Function to handle user input
        function handleUserInput(event) {
            if (event.key === "Enter") {
                const userInput = event.target.value.trim();
                if (userInput.toLowerCase() === startText.toLowerCase()) {
                    // Start animation if user types "Start" and hits Enter
                    if (!typingStarted) {
                        typingStarted = true;
                        terminal.textContent = ""; // Clear the terminal
                        startAnimation();
                    }
                } else if (userInput.toLowerCase() === "s") {
                    // Skip animation if user types "SS" and hits Enter
                    terminal.textContent = ""; // Clear the terminal
                    loadWebsite(); // Load the website immediately
                }
            }
        }

        // Create input area for the user to type "Start"
        const inputArea = document.createElement('input');
        inputArea.type = 'text';
        inputArea.placeholder = 'Type "Start" and hit Enter';
        inputArea.style.background = 'none';
        inputArea.style.border = 'none';
        inputArea.style.outline = 'none';
        inputArea.style.color = 'inherit';
        inputArea.style.fontFamily = 'inherit';
        inputArea.style.fontSize = 'inherit';
        inputArea.style.width = '100%';
        inputArea.addEventListener('keydown', handleUserInput);

        // Create hint for more info
        const hint = document.createElement('p');
        hint.textContent = helpHint;
        hint.style.color = '#888'; // Grey color for hint
        hint.style.fontSize = '0.8em'; // Smaller font size
        hint.style.marginBottom = '5px'; // Add some space below the hint

        // Add hint and input area to terminal
        terminal.appendChild(hint);
        terminal.appendChild(inputArea);
        inputArea.focus();

        // Function to print text to the terminal
        function printText(text) {
            const newLine = document.createElement('p');
            newLine.textContent = text;
            terminal.appendChild(newLine);
            terminal.scrollTop = terminal.scrollHeight; // Auto-scroll to bottom
        }

        // Function to generate random lines
        function generateRandomLines(lineCount) {
            const lines = [];
            for (let i = 0; i < lineCount; i++) {
                const randomLength = Math.floor(Math.random() * 80) + 1; // Random length from 1 to 80 characters
                let randomLine = '';
                for (let j = 0; j < randomLength; j++) {
                    const char = Math.random().toString(36).charAt(2);
                    randomLine += char;
                }
                lines.push(randomLine);
            }
        
            // Print lines with random delays and 5% of characters in each line being red
            lines.forEach((line, index) => {
                const randomDelay = Math.random() * 15 + 100; // Random delay between 100ms and 150ms
                setTimeout(() => {
                    printTextWithRedCharacters(line);
                    if (index === lines.length - 1) { // Show the initialized screen after printing all lines
                        showInitializedScreen();
                    }
                }, index * randomDelay);
            });
        }

        // Function to print text with red characters
        function printTextWithRedCharacters(text) {
            const container = document.querySelector('.terminal');
            const line = document.createElement('div');
            const redCharacterProbability = 0.05; // Adjust this value to change the percentage

            line.classList.add('line');
            line.style.whiteSpace = 'nowrap'; // Ensure text doesn't wrap and uses full width if needed
            let styledText = '';
            for (let i = 0; i < text.length; i++) {
                if (Math.random() < redCharacterProbability) { // Use custom probability variable
                    styledText += `<span class="red-char" style="color: red;">${text[i]}</span>`;
                } else {
                    styledText += text[i];
                }
            }
            line.innerHTML = styledText;
            container.appendChild(line);
        }

        // Function to update red characters
        function updateRedCharacters() {
            const redChars = document.querySelectorAll('.red-char');
            redChars.forEach(char => {
                const randomChar = Math.random().toString(36).charAt(2);
                char.textContent = randomChar;
            });
        }

        // Update red characters every 50ms for a glitch effect
        setInterval(updateRedCharacters, 75);

        // Function to show initialized screen
        function showInitializedScreen() {
            // Create a centered animated pop-up with "LOADING" text
            const popup = document.createElement('div');
            popup.style.position = 'fixed';
            popup.style.top = '50%';
            popup.style.left = '50%';
            popup.style.transform = 'translate(-50%, -50%)';
            popup.style.padding = '5px 10px';
            popup.style.backgroundColor = 'red';
            popup.style.color = 'black';
            popup.style.fontSize = '1em';
            popup.style.fontFamily = 'Consolas, monospace';
            popup.style.zIndex = '10000';
            popup.style.textAlign = 'center';
            popup.textContent = 'LOADING';
            popup.style.opacity = '0';
            popup.style.transition = 'opacity 1s ease-in-out';

            document.body.appendChild(popup);
            // Trigger animation by changing opacity
            setTimeout(() => {
                popup.style.opacity = '1';
                // Fade out animation text
                document.querySelector('.loading-screen').style.opacity = '0';
                // Wait for animation text to fade out, then fade out popup and load website
                setTimeout(() => {
                    popup.style.opacity = '0';
                    setTimeout(() => {
                        popup.remove();
                        loadWebsite();
                    }, 1000); // Remove the pop-up after 1 second
                }, 1000); // Wait 1 second before fading out popup
            }, 100); // Adjust delay as needed
        }
    // Function to load website
    function loadWebsite() {
        document.querySelector('.loading-screen').style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
            // Show main content
            document.querySelectorAll('.navbar, .hero, .projects, .footer').forEach(el => {
                el.style.display = 'block';
            });
        }
    }

    // If it's not the index page, simply load the website
    else {
        loadWebsite();
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Function to style ASCII art with random red characters
    function styleAsciiArt() {
        const asciiArtContainer = document.getElementById('ascii-art');
        const text = asciiArtContainer.textContent.trim().split('\n'); // Split text into lines

        // Clear the container before adding styled elements
        asciiArtContainer.innerHTML = '';

        for (let line of text) {
            const lineContainer = document.createElement('div'); // Create a container for each line
            lineContainer.classList.add('ascii-line');
            let styledLine = '';

            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                const charElement = document.createElement('span'); // Create a span for each character
                charElement.textContent = char;

                if (char !== ' ' && Math.random() < 0.02) { // 5% chance of character being red
                    charElement.classList.add('red-char');
                }

                if (char === 'Y') { // Add a class to misaligned 'Y' characters
                    charElement.classList.add('misaligned-y');
                }

                lineContainer.appendChild(charElement);
            }
            
            asciiArtContainer.appendChild(lineContainer);
        }
    }
    
    // Call the function to style ASCII art
    styleAsciiArt();
});
