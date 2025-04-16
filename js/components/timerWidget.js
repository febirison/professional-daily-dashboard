export class TimerWidget {
  constructor() {
    this.container = document.getElementById('focusTimer');
    this.isTimerRunning = false;
    this.timerDuration = 25 * 60; // 25 minutes in seconds
    this.remainingTime = this.timerDuration;
    this.timerInterval = null;
  }

  init() {
    if (!this.container) {
      console.error("TimerWidget: Container '#focusTimer' not found.");
      return;
    }
    
    console.log("TimerWidget: Container found, initializing...");
    this.render();
    this.attachEventListeners();
  }

  render() {
    this.container.innerHTML = `
      <h2>Focus Timer</h2>
      <div class="timer-display">
        <span class="timer-value">25:00</span>
      </div>
      <div class="timer-controls">
        <button id="startTimerBtn" class="timer-btn start-btn">Start</button>
        <button id="resetTimerBtn" class="timer-btn reset-btn">Reset</button>
      </div>
      <div class="timer-options">
        <button class="time-option selected" data-time="25">25m</button>
        <button class="time-option" data-time="15">15m</button>
        <button class="time-option" data-time="5">5m</button>
      </div>
    `;
  }

  attachEventListeners() {
    const startBtn = this.container.querySelector('.start-btn');
    const resetBtn = this.container.querySelector('.reset-btn');
    const timeOptions = this.container.querySelectorAll('.time-option');
    
    startBtn.addEventListener('click', () => this.toggleTimer());
    resetBtn.addEventListener('click', () => this.resetTimer());
    
    timeOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        timeOptions.forEach(opt => opt.classList.remove('selected'));
        e.target.classList.add('selected');
        const minutes = parseInt(e.target.dataset.time);
        this.timerDuration = minutes * 60;
        this.resetTimer();
      });
    });
  }

  toggleTimer() {
    const startBtn = this.container.querySelector('.start-btn');
    
    if (this.isTimerRunning) {
      clearInterval(this.timerInterval);
      this.isTimerRunning = false;
      startBtn.textContent = 'Start';
    } else {
      this.isTimerRunning = true;
      startBtn.textContent = 'Pause';
      
      this.timerInterval = setInterval(() => {
        this.remainingTime--;
        this.updateTimerDisplay();
        
        if (this.remainingTime <= 0) {
          this.finishTimer();
        }
      }, 1000);
    }
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const timerValue = this.container.querySelector('.timer-value');
    timerValue.textContent = formattedTime;
  }

  resetTimer() {
    clearInterval(this.timerInterval);
    this.isTimerRunning = false;
    this.remainingTime = this.timerDuration;
    this.updateTimerDisplay();
    
    const startBtn = this.container.querySelector('.start-btn');
    startBtn.textContent = 'Start';
  }

  finishTimer() {
    clearInterval(this.timerInterval);
    this.isTimerRunning = false;
    
    this.container.querySelector('.timer-display').classList.add('completed');
    setTimeout(() => {
      this.container.querySelector('.timer-display').classList.remove('completed');
    }, 3000);
    
    const startBtn = this.container.querySelector('.start-btn');
    startBtn.textContent = 'Start';
  }
}