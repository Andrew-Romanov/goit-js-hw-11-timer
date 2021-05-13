// import './styles.css';

class CountdownTimer {
  refsEl = {};
  leftTimeComponents = {days: 0, hours: 0, mins: 0, secs: 0};

  constructor ({selector, targetDate}){
    this.refsEl.daysEl = document.querySelector(`${selector} .value[data-value="days"]`);
    this.refsEl.hoursEl = document.querySelector(`${selector} .value[data-value="hours"]`);
    this.refsEl.minsEl = document.querySelector(`${selector} .value[data-value="mins"]`);
    this.refsEl.secsEl = document.querySelector(`${selector} .value[data-value="secs"]`);
    this.targetDate = targetDate;
  }
  
  calculateLeftTimeComponents(leftTime) {
    this.leftTimeComponents.days = Math.floor(leftTime / (1000 * 60 * 60 * 24));
    this.leftTimeComponents.hours = Math.floor((leftTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.leftTimeComponents.mins = Math.floor((leftTime % (1000 * 60 * 60)) / (1000 * 60));
    this.leftTimeComponents.secs = Math.floor((leftTime % (1000 * 60)) / 1000);
  }

  addLeadingZeros(value) {
    return String(value).padStart(2, '0');
  }

  updateInterface() {
    this.refsEl.daysEl.textContent = this.addLeadingZeros(this.leftTimeComponents.days);
    this.refsEl.hoursEl.textContent = this.addLeadingZeros(this.leftTimeComponents.hours);
    this.refsEl.minsEl.textContent = this.addLeadingZeros(this.leftTimeComponents.mins);
    this.refsEl.secsEl.textContent = this.addLeadingZeros(this.leftTimeComponents.secs);
  }

  start() {
    setInterval(
      () => {
        this.calculateLeftTimeComponents(this.targetDate.getTime() - Date.now());
        this.updateInterface();
      }, 1000
    );
  }
};

const myTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Dec 31, 2021'),
});

myTimer.start();