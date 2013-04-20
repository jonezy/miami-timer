var app = window.app ||  {};

window.onload = function() {
  app.startTimer = document.getElementById('start-timer');
  app.stopTimer = document.getElementById('stop-timer');
  app.countdown = document.getElementById('countdown');
  app.currentInterval;

  app.init = function() {
    app.startTimer.addEventListener('click', app.beginTimer, false);
    app.stopTimer.addEventListener('click', app.pauseTimer, false);
    app.resetWorkTime();
  };

  // work for 20 mins
  app.resetWorkTime = function() {
    app.workTimeout = 1200000;
    app.currentCount = 0;
    app.minsToGo = 19;
    app.secsToGo = 59;
    app.startTime = "20:00";
    app.timeType = "WORK";
  };

  // break for 10
  app.resetBreakTime = function() {
    app.breakTimeout = 600000;
    app.currentCount = 0;
    app.minsToGo = 9;
    app.secsToGo = 59;
    app.startTime = "10:00";
    app.timeType = "BREAK";
  };

  app.beginTimer = function() {
    hide(app.startTimer);
    show(app.stopTimer);

    var existingTime = countdown.innerText === '' ? '20:00' : countdown.innerText;
    updateTime(existingTime);

    app.currentInterval = window.setInterval(app.incrementTimer, 1000);
  };

  app.pauseTimer = function() {
    window.clearInterval(app.currentInterval);
    switch(app.timeType) {
      case 'WORK':
        show(app.startTimer);
        hide(app.stopTimer);
        break;
      case 'BREAK':
        hide(app.startTimer);
        show(app.stopTimer);
        break;
    }
  };

  app.incrementTimer = function() {
    app.currentCount = app.currentCount+1000;
    app.secsToGo--;

    var secondsDisplay = app.secsToGo < 10 ? "0" + app.secsToGo : app.secsToGo;
    var minsDisplay = app.minsToGo;
    if(app.secsToGo < 1) {
      app.secsToGo = 59;
      app.minsToGo--;

      minsDisplay = app.minsToGo < 1 ? "00" : app.minsToGo;
    }

    updateTime(minsDisplay + ':' + secondsDisplay);

    switch(app.timeType) {
      case 'WORK':
        if(app.currentCount >= app.workTimeout) {
          window.clearInterval(app.currentInterval);
          app.resetBreakTime();
          app.timesUp();
        }
        break;
      case 'BREAK':
        if(app.currentCount >= app.breakTimeout) {
          window.clearInterval(app.currentInterval);
          app.resetWorkTime();
          app.timesUp();
        }
        break;
    }
  };
  
  app.timesUp = function() {
    app.yeah(function() {
      app.currentInterval = window.setInterval(app.incrementTimer, 1000);
      alert('it worked, yeaaaahhhhhhhhh!');
    });
    updateTime(app.startTime);
  };

  app.yeah = function(done) {
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
    document.title = newTime 
  };
  
  var hide = function(el) {
   el.style.display = 'none'; 
  };

  var show = function(el) {
    el.style.display = 'inline-block';
  };

  app.init();
};
