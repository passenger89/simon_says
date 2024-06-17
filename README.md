# Simon Says Game

A modern twist on the classic "Simon Says" game, built with HTML, CSS, and JavaScript. This project includes interactive gameplay, level progression, celebration animations, and a confetti effect for winning.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Contributing](#contributing)

## Demo

You can play the game [here](https://simonsaysapp.netlify.app). (Replace with actual link)

## Features

- Interactive gameplay with increasing difficulty levels.
- Visual and sound feedback for user interactions. <=== TODO
- Celebration animation and confetti effect when the player wins.
- Retry option when the player fails.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/simon-says-game.git
    ```

2. Navigate to the project directory:
    ```bash
    cd simon-says-game
    ```

3. Open `index.html` in your web browser to start the game.

## Usage

- **Start the Game:** Click on the "Play!" button to begin.
- **Follow the Sequence:** Watch the sequence of button flashes and repeat them in the same order.
- **Level Up:** Successfully complete the sequence to advance to the next level, which increases the length of the sequence.
- **Game Over:** If you press the wrong button, the game will display a "Retry?" button to restart from level 1.
- **Win the Game:** Complete all levels to trigger the celebration animation and confetti effect.

## File Structure

```plaintext
simon-says-game/
│
├── animation.css        # CSS file for custom animations
├── index.html           # Main HTML file
├── reset.css            # CSS reset file
├── script.js            # Main JavaScript file for game logic
├── simulateWin.js       # JavaScript file for simulating a win (for testing)
├── style.css            # Main CSS file for styling the game
└── README.md            # This README file
