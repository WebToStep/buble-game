const startBtn = document.querySelector('#start'),
      screens = document.querySelectorAll('.screen'),
      timeList = document.querySelector('#time-list'),
      timeEl = document.querySelector('#time'),
      board = document.querySelector('#board'),
      restart = document.querySelector(".restart-btn"),
      whatsApp = document.querySelector(".whatsApp"),
      telegram = document.querySelector(".telegram"),
      facebook = document.querySelector(".facebook"),
      timelvl = document = document.querySelector("#timelvl"),
      totalScore = document.querySelector('#store'),
      music = new Audio('./music/music.mp3'),
      tap = new Audio('./music/tap.mp3'),
      klick = new Audio('./music/klick.mp3');
      

const colors = [
   '#F0F8FF',
   '#FAEBD7',
   '#00FFFF',
   '#7FFFD4',
   '#F0FFFF',
   '#F5F5DC',
   '#FFE4C4',
   '#000000',
   '#FFEBCD',
   '#0000FF',
   '#8A2BE2',
   '#A52A2A',
   '#DEB887',
   '#5F9EA0',
   '#7FFF00',
   '#D2691E',
   '#FF7F50',
   '#6495ED',
   '#FFF8DC',
   '#DC143C',
   '#00FFFF',
   '#00008B',
   '#008B8B',
   '#B8860B',
   '#A9A9A9',
   '#006400',
   '#BDB76B',
   '#8B008B',
   '#556B2F',
   '#FF8C00',
   '#9932CC',
   '#8B0000',
   '#E9967A',
   '#8FBC8F',
   '#483D8B',
   '#2F4F4F',
   '#00CED1',
   '#9400D3',
   '#FF1493',
   '#00BFFF',
   '#696969',
   '#1E90FF',
   '#B22222',
   '#FFFAF0',
   '#228B22',
   '#FF00FF',
   '#DCDCDC',
   '#F8F8FF',
   '#FFD700',
   '#DAA520',
   '#808080',
   '#008000',
   '#ADFF2F',
   '#F0FFF0',
   '#FF69B4',
   '#CD5C5C',
   '#4B0082',
   '#FFFFF0',
   '#F0E68C',
   '#E6E6FA',
   '#FFF0F5',
   '#7CFC00',
   '#FFFACD',
   '#ADD8E6',
   '#F08080',
   '#E0FFFF',
   '#FAFAD2',
   '#D3D3D3',
   '#90EE90',
   '#FFB6C1',
   '#FFA07A',
   '#20B2AA',
   '#87CEFA',
   '#778899',
   '#B0C4DE',
   '#FFFFE0',
   '#00FF00',
   '#32CD32',
   '#FAF0E6',
   '#FF00FF',
   '#800000',
   '#66CDAA',
   '#0000CD',
   '#BA55D3',
   '#9370DB',
   '#3CB371',
   '#7B68EE',
   '#00FA9A',
   '#48D1CC',
   '#C71585',
   '#191970',
   '#F5FFFA',
   '#FFE4E1',
   '#FFE4B5',
   '#FFDEAD',
   '#000080',
   '#FDF5E6',
   '#808000',
   '#6B8E23',
   '#FFA500',
   '#FF4500',
   '#DA70D6',
   '#EEE8AA',
   '#98FB98',
   '#AFEEEE',
   '#DB7093',
   '#FFEFD5',
   '#FFDAB9',
   '#CD853F',
   '#FFC0CB',
   '#DDA0DD',
   '#B0E0E6',
   '#800080',
   '#FF0000',
   '#BC8F8F',
   '#4169E1',
   '#8B4513',
   '#FA8072',
   '#F4A460',
   '#2E8B57',
   '#FFF5EE',
   '#A0522D',
   '#C0C0C0',
   '#87CEEB',
   '#6A5ACD',
   '#708090',
   '#FFFAFA',
   '#00FF7F',
   '#4682B4',
   '#D2B48C',
   '#008080',
   '#D8BFD8',
   '#FF6347',
   '#40E0D0',
   '#EE82EE',
   '#F5DEB3',
   '#FFFFFF',
   '#F5F5F5',
   '#FFFF00'
   ]

let interval;
// store
let lvlSeconds = 0
let record = {
   lvl10:0,
   lvl20:0,
   lvl30:0
}
let time = 0;
let score = 0;

// setTimeout(fonMuz, 2000);
// переход на экран 2
startBtn.addEventListener('click', (event)=>{
   event.preventDefault()
   screens[0].classList.add('up')
   klick.restartMusik()
   music.volume = 0.6
   music.restartMusik()
   music.loop = true
})

// экран 2 выбор времени
timeList.addEventListener('click', event => {
  if(event.target.classList.contains('time-btn')){
   //  преобразовываем строку в число и записываем в переменную времени
   // мой метод
   time = parseInt(event.target.dataset.time);
   lvlSeconds = parseInt(event.target.dataset.time);
   // выводим экран 3
   screens[1].classList.add('up')
   startGame();
   klick.restartMusik();
  }
})


// получаем баллы
board.addEventListener('click', event => {
   if(event.target.classList.contains('circle')){
      // event.target.style.backgroundColor = 'red !important'
      score++
      event.target.remove()
      createRandomCircle()
      tap.restartMusik()   
   }
})

Audio.prototype.restartMusik= function() {
   this.pause();
   this.currentTime = 0;
   this.play();
};

restart.addEventListener('click', restartGame)


// начало игры экран 3 
function startGame(){
   timeEl.parentNode.classList.remove('hide')
   board.innerHTML = ''
   // отрисовываем оставшееся время
   interval = setInterval(decreaseTime, 1000)
   createRandomCircle()
   setTime(time)
}

// стоп игра
function finishGame(){
   timeEl.parentNode.classList.add('hide')
   screens[2].classList.add('up')
   totalScore.innerHTML = score
   timelvl.innerHTML = lvlSeconds
   
   whatsApp.href=`https://api.whatsapp.com/send?text= Побей мой рекорд - ${score} очков за ${lvlSeconds} секунд. В мегаигре на реакцию https%3A%2F%2Fwebstep.kz%2Ftest%2F1`
   telegram.href=`https://t.me/share/url?url=https%3A%2F%2Fwebstep.kz%2Ftest%2F1&text=Побей мой рекорд - ${score} очков за ${lvlSeconds} секунд. В мегаигре на реакцию https%3A%2F%2Fwebstep.kz%2Ftest%2F1`
   facebook.href=`https://www.facebook.com/sharer.php?src=sp&u=https%3A%2F%2Fwebstep.kz%2Ftest%2F1%2F&title=Побей мой рекорд - ${score} очков за ${lvlSeconds} секунд. В мегаигре на реакцию https%3A%2F%2Fwebstep.kz%2Ftest%2F1`

}
function restartGame(){
   timeEl.parentNode.classList.remove('hide')
   screens[2].classList.remove('up')
   screens[1].classList.remove('up')
   time = 0;
   score = 0;
   klick.play();
   music.restartMusik()
}


// таймер обратного отчета
function decreaseTime(){
   if (time === 0){
      clearInterval(interval)
      finishGame();
   }else{
      let b = --time;
      if (b < 10) {
         b = `0${b}`  
      }
      setTime(b)
   }
}

// отрисовка таймера обратного отчета
function setTime(value){
   timeEl.innerHTML = `00:${value}`;
}

// создаем обьект круга на игровой доске
function createRandomCircle(){
   const circle = document.createElement('div');
   const size = getRandomNumber(18, 150);
   const color = colors[getRandomNumber(0, colors.length)]
   const {width, height} = board.getBoundingClientRect()
   const x = getRandomNumber(1, width - size);
   const y = getRandomNumber(1, height - size);
    

   circle.classList.add('circle');
   circle.style.width = size + 'px';
   circle.style.height = size+ 'px';
   circle.style.top = y + 'px';
   circle.style.left = x + 'px';
   circle.style.background = color
   circle.style.boxShadow = `0 0 10px ${color}`

   board.append(circle);
}

// случайный номер размера круга
function getRandomNumber(min, max){
   return Math.round(Math.random() * (max - min) + min)
}

// функция поделиться
// https://wa.me/?text=Меня%20интересует%20объявление%20о%20квартире