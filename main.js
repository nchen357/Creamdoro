const timeOnScreen = document.getElementById("time-left");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const minInput = document.getElementById("session-length");
const breakminInput = document.getElementById("break-length");
const timerLabel = document.getElementById("timer-label");

var seconds, remSeconds, minutes, breakSeconds, remBreakSeconds, breakMin;
var timer = false;

var audio = new Audio("578626main_sputnik-beep.mp3");

$(document).ready(function() {
  //once doc loaded
  //Separate helper func on first click to process session length
  function submit() {
    seconds = minInput.value * 60;
    breakSeconds = breakminInput.value * 60;
    currentCount();
  }
  function breakTimer() {
    if (breakSeconds > 0) {
      //only counts down if positive value seconds
      if (timer === true) {
        breakSeconds--;
        remBreakSeconds = breakSeconds % 60;
        breakMin = Math.floor(breakSeconds / 60);
        if (remBreakSeconds < 10) {
          remBreakSeconds = "0" + remBreakSeconds;
        }
        if (breakMin < 10) {
          breakMin = "0" + breakMin;
        }
        //Break session 
        timeOnScreen.innerHTML = breakMin + ":" + remBreakSeconds;
        timerLabel.innerHTML = "<h2>~lulu says take a break~</h2>";

        //when full session ends
        if (breakSeconds === 0) {
          startBtn.setAttribute("disabled", "false");
          var cfrm = confirm("Would you like to restart the timer?");
          cfrm;
          if (cfrm === true) {
            timer = false;
            redo();
          }
        }
      }
    }
  }
  function countdown() {
    if (seconds > 0) {
      //Counts down if postive values
      if (timer === true) {
        seconds--;
        remSeconds = seconds % 60;
        minutes = Math.floor(seconds / 60);
        if (remSeconds < 10) {
          remSeconds = "0" + remSeconds;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        //Play audio beep @ 0
        if (seconds === 0) {
          audio.loop = false;
          audio.play();
        }
        //COUNTDOWN DISPLAY
        timeOnScreen.innerHTML = minutes + ":" + remSeconds;
      }
    } else {
      breakTimer();
    }
  }
  function currentCount() {
    timer = true; //to allow running the countdown
    setInterval(countdown, 1000);
  }
  function stopCountdown() {
    startBtn.disabled = false; //re-enable the start btn
    timer = false; //STOP the countdown
  }
  //RESTART BUTTON FUNC
  function redo() {
    if (timer == false) {
      //can only click restart if the timer is paused
      seconds = minInput.value * 60;
      breakSeconds = breakminInput.value * 60;
      timer = true;
      startBtn.setAttribute("disabled", "true"); //disallows clicking start button at same time
      timerLabel.innerHTML = "<h1>session</h1>"; //when restarted session, timer label renamed to SESSION
    }
  }
  //first click submits input values
  let clicks = 0;
  $("#start").click(function() {
    if (clicks == 0) {
      //on first click
      submit();
      startBtn.setAttribute("disabled", "true");
    } else {
      //second click +
      timer = true;
      countdown();
      startBtn.setAttribute("disabled", "true");
    }
    ++clicks;
  });

  stopBtn.addEventListener("click", stopCountdown, false);
  resetBtn.addEventListener("click", redo, false);
  //PIC SLIDESHOW FUNC
  let pics = [
    "cat1.jpg",
    "cat2.jpg",
    "cat3.jfif",
    "cat4.jfif",
    "cat5.jpg",
    "cat6.jpg",
    "cat7.PNG",
    "cat8.PNG",
    "cat9.PNG",
    "cat10.PNG",
    "cat11.PNG",
    "cat12.PNG",
    "cat13.PNG",
    "cat14.PNG",
    "cat15.PNG",
    "cat16.PNG",
    "cat17.PNG",
    "cat18.PNG",
    "cat19.PNG",
    "cat20.PNG",
    "cat21.PNG",
    "cat22.PNG",
    "cat23.PNG",
    "cat24.PNG",
    "cat25.PNG",
    "cat26.PNG",
    "cat27.PNG",
    "cat28.PNG",
    "cat29.PNG",
    "cat30.PNG"
  ];

  function swapImg() {
    const image = document.getElementById("slide");
    image.src = "creamyPics/" + pics[Math.floor(Math.random() * pics.length)];
    setTimeout(swapImg, 15000);
  }
  swapImg();
}); 

const spans = document.querySelectorAll('.word span');

spans.forEach((span, idx) => {
	span.addEventListener('click', (e) => {
		e.target.classList.add('active');
	});
	span.addEventListener('animationend', (e) => {
		e.target.classList.remove('active');
	});
	
	// Initial animation
	setTimeout(() => {
		span.classList.add('active');
	}, 750 * (idx+1))
});

