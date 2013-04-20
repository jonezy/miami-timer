window.onload = function() {
  var startTimer = document.getElementById('start-timer'),
      stopTimer = document.getElementById('stop-timer'),
      countdown = document.getElementById('countdown'),
      currentInterval,
      debug = false;

  var init = function() {
    startTimer.addEventListener('click', beginTimer, false);
    stopTimer.addEventListener('click', pauseTimer, false);
    resetWorkTime();
  };

  // work for 20 mins
  var resetWorkTime = function() {
    workTimeout = debug ? 5000 : 1200000;
    currentCount = 0;
    minsToGo = debug ? 0 : 19;
    secsToGo = debug ? 5 : 59;
    startTime = debug ? "00:05" : "20:00";
    timeType = "WORK";
  };

  // break for 10
  var resetBreakTime = function() {
    breakTimeout = 600000;
    currentCount = 0;
    minsToGo = 9;
    secsToGo = 59;
    startTime = "10:00";
    timeType = "BREAK";
  };

  var beginTimer = function() {
    hide(startTimer);
    show(stopTimer);

    var existingTime = countdown.innerText === '' ? startTime : countdown.innerText;
    updateTime(existingTime);

    currentInterval = window.setInterval(incrementTimer, 1000);
  };

  var pauseTimer = function() {
    window.clearInterval(currentInterval);
    switch(timeType) {
      case 'WORK':
        show(startTimer);
        hide(stopTimer);
        break;
      case 'BREAK':
        hide(startTimer);
        show(stopTimer);
        break;
    }
  };

  var incrementTimer = function() {
    currentCount = currentCount+1000;
    secsToGo--;

    var secondsDisplay = secsToGo < 10 ? "0" + secsToGo : secsToGo,
        minsDisplay = minsToGo;

    if(secsToGo < 1) {
      secsToGo = 59;
      minsToGo--;

      minsDisplay = minsToGo < 1 ? "00" : minsToGo;
    }

    updateTime(minsDisplay + ':' + secondsDisplay);

    switch(timeType) {
      case 'WORK':
        if(currentCount >= workTimeout) {
          window.clearInterval(currentInterval);
          resetBreakTime();
          timesUp();
        }
        break;
      case 'BREAK':
        if(currentCount >= breakTimeout) {
          window.clearInterval(currentInterval);
          resetWorkTime();
          timesUp();
        }
        break;
    }
  };
  
  var timesUp = function() {
    yeah(function() {
      currentInterval = window.setInterval(incrementTimer, 1000);
      updateTime(startTime);
    });
  };

  var yeah = function(done) {
    var audio = document.getElementById('audio'),
        href = audio.children[0].href,
       newAudio = new Audio();

   newAudio.src = href;
   audio.appendChild(newAudio);
   newAudio.play();

   if(done)
     newAudio.addEventListener('ended', done, false);
  };

  var updateTime = function(newTime) {
    countdown.innerText = newTime;
    document.title = newTime;
  };
  
  var hide = function(el) {
   el.style.display = 'none'; 
  };

  var show = function(el) {
    el.style.display = 'inline-block';
  };

  init();
};
