import './styles.css';

const targetDate = new Date('Dec 17, 2020');

const refs = {
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
  startBtn: document.querySelector('button[data-action-start]'),
  stopBtn: document.querySelector('button[data-action-stop]'),
  dateCalendar: document.querySelector('[data-calendar]'),
};

const timer = {
  idTimer: null,
  targetDate: new Date(),
  start() {
    this.targetDate = new Date(refs.dateCalendar.value);
    if (new Date() > this.targetDate) {
      alert('Установленная дата меньше текущей');
      return;
    }

    refs.startBtn.disabled = true;

    //обновим показания таймера, чтобы не ждать 1 сек
    setTimer();

    this.idTimer = setInterval(() => {
      setTimer();
    }, 1000);
  },
  stop() {
    refs.startBtn.disabled = false;
    clearInterval(this.idTimer);
    this.idTimer = null;
  },
};

refs.startBtn.addEventListener('click', timer.start.bind(timer));
refs.stopBtn.addEventListener('click', timer.stop.bind(timer));

function setTimer() {
  const time = timer.targetDate - Date.now();

  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((time % (1000 * 60)) / 1000);

  refs.days.textContent = String(days).padStart(2, '0');
  refs.hours.textContent = String(hours).padStart(2, '0');
  refs.mins.textContent = String(mins).padStart(2, '0');
  refs.secs.textContent = String(secs).padStart(2, '0');
}

function getEndDay() {
  const date = new Date();
  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  return `${year}-${month}-${dayOfMonth}T23:59`;
}

refs.dateCalendar.value = getEndDay();
