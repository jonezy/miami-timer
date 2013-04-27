window.onload = function() {
  var startTimer = document.getElementById('start-timer'),
      stopTimer = document.getElementById('stop-timer'),
      countdown = document.getElementById('countdown'),
      horatio = document.getElementById('horatio'),
      startDateTime, currentInterval, debug = true;

  var init = function() {
    startTimer.addEventListener('click', beginTimer, false);
    stopTimer.addEventListener('click', pauseTimer, false);
    resetWorkTime();
  };

  // work time.
  var resetWorkTime = function() {
    duration = debug ? 1 : 25;
    minsToGo = debug ? 0 : 24;
    secsToGo = 60;
    startTime = debug ? "01:00" : "25:00";
    timeType = "WORK";
    startDateTime = new Date();
  };

  // break time.
  var resetBreakTime = function() {
    duration = debug ? 2 : 5;
    minsToGo = debug ? 1 : 4;
    secsToGo = 60;
    startTime = debug ? "02:00" : "5:00";
    timeType = "BREAK";
    startDateTime = new Date();
  };

  var beginTimer = function() {
    hide(startTimer);
    show(stopTimer);

    startDateTime = new Date();

    updateTime(countdown.innerText === '' ? startTime : countdown.innerText);

    currentInterval = window.setInterval(incrementTimer, 1000);
  };

  var pauseTimer = function() {
    window.clearInterval(currentInterval);
    if(timeType === 'WORK') {
      show(startTimer);
      hide(stopTimer);
    } else {
      hide(startTimer);
      show(stopTimer);
    }
  };

  var incrementTimer = function() {
    var currentDate = new Date(),
        minsDisplay, secondsDisplay,
        diff = TimeDiff(startDateTime, currentDate);

    minsDisplay = minsToGo-diff.minutes;
    secondsDisplay = secsToGo-diff.seconds;

    if(parseInt(diff.minutes) === duration && diff.seconds === 0) {
      window.clearInterval(currentInterval);
      updateTime("00:00");
      timesUp();
    } else {
      if(minsDisplay === 0) minsDisplay = "00";
      if(minsDisplay.toString.length === 1) minsDisplay = ("0" + minsDisplay).toString();
      if(secondsDisplay.toString().length === 1) {
        secondsDisplay = ("0" + secondsDisplay).toString();
      }
      updateTime(minsDisplay + ':' + secondsDisplay);
    }
  };

  var timesUp = function() {
    show(horatio);
    // this is where we actually restart :)
    yeah(function() {
      hide(horatio);
      if(timeType == 'WORK') resetBreakTime();
      else resetWorkTime();
      currentInterval = window.setInterval(incrementTimer, 1000);
      updateTime(startTime);
    });
  };

  var yeah = function(done) {
    var audio = document.getElementById('audio'),
    href = audio.children[0].href,
    newAudio = new Audio();

    if(done)
      newAudio.addEventListener('ended', done, false);

    newAudio.src = href;
    audio.appendChild(newAudio);
    newAudio.play();
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

  var TimeDiff = function(earlierDate,laterDate) {
    var nTotalDiff = laterDate.getTime() - earlierDate.getTime();
    var oDiff = new Object();

    oDiff.minutes = Math.floor(nTotalDiff/1000/60);
    nTotalDiff -= oDiff.minutes*1000*60;
    oDiff.seconds = Math.floor(nTotalDiff/1000);

    return oDiff;
  };

  init();
};
