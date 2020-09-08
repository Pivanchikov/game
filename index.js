
window.onload = function load() {

    let array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,' '];
    let timeout;
    function random(arr) {
    arr.pop()
    array = arr.sort(function(){
        return Math.random() - 0.5;
      });
    array.push(' ');
   document.body.removeChild(document.body.children[2]);
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
                timer.textContent = `${hour} : ${minutes} : 0${counter} `;
            } else {
            timer.textContent = `${hour} : ${minutes} : ${counter} `;
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
        time.innerHTML = 'Ваше время'
        buttons.append(time)

        let start = document.createElement('div');
        start.classList.add('start');
        start.classList.add('started');
        start.innerHTML = 'Игра на время'
        buttons.append(start)

        let step = document.createElement('div');
        step.classList.add('start');
        step.classList.add('step');
        step.textContent = 'Кол-во шагов'
        buttons.append(step)
    }

    function draw() {
        let box = document.createElement('div');
        box.classList.add('box');
        document.body.append(box)

        for ( let i = 0 ; i < 16; i++) {
        let hole =  document.createElement('div');
        hole.classList.add('hole');
        hole.innerHTML = array[i]
        box.append(hole)
        }

    }

    draw()
    buttons()
    go()
    
    let button = document.querySelector('.start')
    button.addEventListener('click', function() {
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
            clearInterval(timeout);
            alert('Поздравляем! Вы победили')
        }
    }
    
    function go() {
        let counter = 0;
        let step = document.querySelector('.step');
    let cell = document.querySelectorAll('.hole');
    cell.forEach((div, index) => div.addEventListener('click',
     function () {

         if (cell[index + 1] !== undefined  && cell[index + 1].textContent == ' ') {
                if(index !== 11 && index !== 3 && index !== 7) {
            cell[index + 1].textContent = cell[index].textContent;
            cell[index].textContent = ' ' ;
            counter++
                } 
         }

         if (cell[index + 4] !== undefined && cell[index + 4].textContent == ' ') {
            cell[index + 4].textContent = cell[index].textContent;
            cell[index].textContent = ' ';  
            counter++
         }

         if (cell[index - 1] !== undefined && cell[index - 1].textContent == ' ') {
            if(index !== 4 && index !== 8 && index !== 12) {
                cell[index - 1].textContent = cell[index].textContent;
                cell[index].textContent = ' ';
                counter++
            }  
         }
         
         if (cell[index - 4] !== undefined && cell[index - 4].textContent == ' ') {
            cell[index - 4].textContent = cell[index].textContent;
            cell[index].textContent = ' '; 
            counter++ 
         }
         
         step.textContent = counter;
         congratulated ()
        }))
    }
}




