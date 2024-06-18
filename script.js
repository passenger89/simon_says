import { audio } from "./audio.js";
const beep = new Audio(audio.beep);
const music = new Audio(audio.music);
const level_up = new Audio(audio.level_up);
const incorrect = new Audio(audio.incorrect);
const cheering = new Audio(audio.cheering);

$(document).ready(function () {
  music.loop = true;
  music.volume = 0.2;
  music.play();

  $(".btn_music").on("click", function () {
    $(".btn_music").toggleClass("hidden");  
  });
  $(".btn_music_off").on("click", function () {
    music.pause();
  })
  $(".btn_music_on").on("click", function () {
    music.play();
  })
});



const levels = {
  1: 4,
  2: 6,
  3: 8,
  4: 10,
  5: 12,
  6: 14,
  7: 16,
  8: 18,
};

let level = 1;

//! SECTION - ANIMATE OVERLAYS - START

function animateLevel(level) {
  $(".level_start_title").text(`Level ${level}!`);
  $(".level_start_overlay").css("display", "flex");
  setTimeout(() => {
    $(".level_start_overlay").css("display", "none");
  }, 2000);
}

function gameOver() {
  $(".game_over_overlay").css("display", "flex");
}

//! SECTION - ANIMATE OVERLAYS - END

//! SECTION - CELEBRATION ANIMATION - START

function celebrateWin() {
  music.pause();
  cheering.play();
  // Trigger the display of "YOU WIN!!!" overlay and animation
  $(".btn").each(function (index) {
    $(this).css({
      animation: "mergeAndZoom 4s forwards",
      animationDelay: `${index * 0.5}s`,
    });
  });

  // Display "YOU WIN!!!" overlay
  $(".celebration_title").text("YOU WIN!!!");
  $(".celebration_overlay").css("display", "flex");

  // Fade in the "YOU WIN!!!" title
  setTimeout(() => {
    $(".celebration_title").css({
      animation: "fadeIn 2s ease forwards",
    });
  }, 4000); // Adjust timing to match your mergeAndZoom animation duration

  // Trigger party popper animation
  setTimeout(() => {
    $('#popper1').css({
      animation: "popperExplosion 2s ease forwards"
    });
    $('#popper2').css({
      animation: "popperExplosion 2s ease forwards 0.5s"
    });
    $('#popper3').css({
      animation: "popperExplosion 2s ease forwards 1s"
    });
  }, 3000); // Start slightly before the fadeIn of the title

  // Trigger confetti effect
  setTimeout(() => {
    triggerConfetti();
  }, 2000); // Start confetti after the initial animations
}

function triggerConfetti() {
  var end = Date.now() + (5 * 1000); // 5 seconds of confetti

  // Start the confetti effect
  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
  
}

//! SECTION - CELEBRATION ANIMATION - END

//! SECTION - GENERATE SEQUENCE - START

let sequence = [];
let userSequenceCount = 0;

function getGameSequence(level) {
  const buttons = {
    1: "green",
    2: "red",
    3: "yellow",
    4: "blue",
  };

  let gameSequence = [];

  for (let i = 0; i < levels[level]; i++) {
    let buttonSelection = Math.floor(Math.random() * 4 + 1);
    gameSequence.push(buttons[buttonSelection]);
  }
  return gameSequence;
}

function displaySequence(gameSequence) {
  for (let i = 0; i < gameSequence.length; i++) {
    setTimeout(() => {
      $(`.${gameSequence[i]}`).addClass("active");
      beep.play();
      setTimeout(() => {
        $(`.${gameSequence[i]}`).removeClass("active");
      }, 500); //* Time the button stays active
    }, i * 1000); //* Delay between each button activation
  }
}

function startLevel(level) {
  sequence = getGameSequence(level);
  userSequenceCount = 0; //* Reset user sequence count at the start of each game
  displaySequence(sequence);
}

function nextRound(level) {
  animateLevel(level),
  level_up.play();
    setTimeout(() => {
      startLevel(level);
    }, 2500);
}

$(".btn_play").on("click", () => {
  $(".start_game_overlay").css("display", "none");
  animateLevel(1),
    setTimeout(() => {
      startLevel(1);
    }, 2500);
});

//! SECTION - GENERATE SEQUENCE - END

//! SECTION - PROCESS USER INPUT - START

$(".btn").on("click", function () {
  //* Handles the active class toggle on user click
  $(this).addClass("active");
  beep.play();

  setTimeout(() => {
    $(this).removeClass("active");
  }, 200);

  if ($(this).hasClass(sequence[userSequenceCount])) {
    userSequenceCount++;

    if (userSequenceCount >= sequence.length) {
      if (level < 8) {
        level += 1;
        nextRound(level);
      } else {
        // Trigger celebration animation for winning
        celebrateWin();

        // Optionally stop further gameplay or reset level here
        // For example:
        // level = 1;
        // startLevel(level);
      }
    }
  } else {
    incorrect.play()
    level = 1;
    gameOver();
  }
});

$(".game_over_button").on("click", function () {
  $(".game_over_overlay").css("display", "none");
  $(".start_game_overlay").css("display", "none");
  animateLevel(1),
    setTimeout(() => {
      startLevel(1);
    }, 2500);
});

//! SECTION - PROCESS USER INPUT - END