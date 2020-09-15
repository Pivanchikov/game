
window.onload = function load() {

    let array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,' '];
    let timeout;
    let counter = 0;
    let side = 4;

    function random(arr) {
    arr.pop()
    array = arr.sort(function(){
        return Math.random() - 0.5;
      });
    array.push(' ');

    redraw()
    }

    function redraw() {
        document.body.removeChild(document.body.children[3]);
        document.querySelector('.step').textContent = '0';
        document.querySelector('.timer').textContent = '00:00:00'
         clearInterval(timeout);
         draw()
         go()
    }

    function timer() {
        let hour = '00';
        let minutes = '00';
        let counter = 0;
        timeout = setInterval (function () {
            counter++
            let timer = document.querySelector('.timer');

            if (counter === 60 && +minutes < 9) {
                minutes = +minutes + 1;
                minutes = '0' + minutes;
                counter = 0;
            } else if (counter === 60 && minutes >= 9) {
                minutes = +minutes + 1;
                counter = 0;
            }

            if (minutes === 60 && +hour < 9) {
                hour = +hour + 1;
                hour = '0' + hour;
                minutes = 0;
            } else if (minutes === 60 && hour >= 9) {
                hour = +hour + 1;
                minutes = 0;
            }

            if (counter < 10 ) {
                timer.textContent = `${hour}:${minutes}:0${counter} `;
            } else {
            timer.textContent = `${hour}:${minutes}:${counter} `;
            }

        }, 1000)
    }

    function buttons () {
        let buttons = document.createElement('div');
        buttons.classList.add('buttons')
        document.body.prepend(buttons)

        let random = document.createElement('div');
        random.classList.add('start');
        random.innerHTML = 'Перемешать'
        buttons.prepend(random)

        let time = document.createElement('div');
        time.classList.add('start');
        time.classList.add('timer');
        time.innerHTML = '00:00:00'
        buttons.append(time)

        let start = document.createElement('div');
        start.classList.add('start');
        start.classList.add('started');
        start.innerHTML = 'Игра на время'
        buttons.append(start)

        let step = document.createElement('div');
        step.classList.add('start');
        step.classList.add('step');
        step.textContent = '0'
        buttons.append(step)

        let boxSize =  document.createElement('div');
        boxSize.classList.add('boxSize');
        document.querySelector('.box').before(boxSize)

        for (let i = 0; i < 6; i++) {
        let size =  document.createElement('div');
        size.classList.add('size');
        size.innerHTML = ` ${i+3} x ${i+3}`
        boxSize.append(size)
        }
    }

    

    function draw() {
        let box = document.createElement('div');
        box.classList.add('box');
        box.style.width = side * 50 + 25 + 'px'
        document.body.append(box);

        for ( let i = 0 ; i < side*side - 1; i++) {
        let hole =  document.createElement('div');
        hole.classList.add('hole');
        hole.innerHTML = array[i]
        box.append(hole)
        }

        let hole =  document.createElement('div');
        hole.classList.add('hole');
        hole.classList.add('holes');
        hole.innerHTML = ' '
        box.append(hole)
    }

    draw()
    buttons()
    go()
    

    let changeSize = document.querySelectorAll('.size');
    changeSize.forEach((item) => item.addEventListener('click',
    function () {
        side = parseInt(item.textContent)
        array = []
        for (let i = 1 ; i < side*side; i++){
            array.push(i)
        }
        array.push(' ')
     redraw()
 }))

     let start = document.querySelector('.start')
    start.addEventListener('click', function() {
        random(array) 
    })

    let started = document.querySelector('.started')
    started.addEventListener('click', function() {
        random(array)
        timer()
    })

    function congratulated () {
        let arrayCell = document.querySelectorAll('.hole');
        let count = true;
        for (let i = 0; i < arrayCell.length; i++) {
            if (+arrayCell[i].textContent !== 1 + i && i !== arrayCell.length - 1) {
                count = false
            }
        }
        if (count) {
            let timer = document.querySelector('.timer').textContent;
            
            if (timer !== '00:00:00'){
            clearInterval(timeout);
            alert(  `Ура! Вы победили за ${timer} и  ${counter} ходов`)
             counter = 0;
            } else {
                alert(  `Ура! Вы победили за ${counter} ходов`);
                counter = 0;
            }
        }
    }
    
    function go() {
        
    let step = document.querySelector('.step');
    let cell = document.querySelectorAll('.hole');
    cell.forEach((div, index) => div.addEventListener('click',
     function () {

         if (cell[index + 1] !== undefined  && cell[index + 1].textContent == ' ') {
                if((index+1)%side) {
            cell[index + 1].textContent = cell[index].textContent;
            cell[index + 1].classList.remove('holes')
            cell[index].textContent = ' ' ;
            cell[index].classList.add('holes')
            counter++
                } 
         }

         if (cell[index + side] !== undefined && cell[index + side].textContent == ' ') {
            cell[index + side].textContent = cell[index].textContent;
            cell[index + side].classList.remove('holes')
            cell[index].textContent = ' ';  
            cell[index].classList.add('holes')
            counter++
         }

         if (cell[index - 1] !== undefined && cell[index - 1].textContent == ' ') {
            if(index%side) {
                cell[index - 1].textContent = cell[index].textContent;
                cell[index - 1].classList.remove('holes')
                cell[index].textContent = ' ';
                cell[index].classList.add('holes')
                counter++
            }  
         }
         
         if (cell[index - side] !== undefined && cell[index - side].textContent == ' ') {
            cell[index - side].textContent = cell[index].textContent;
            cell[index - side].classList.remove('holes')
            cell[index].textContent = ' '; 
            cell[index].classList.add('holes')
            counter++ 
         }
         
         step.textContent = counter;
         if (counter) {congratulated()}
        }))
    }
}




