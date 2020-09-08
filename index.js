
window.onload = function load() {

    let array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,' '];

    function random(arr) {
    arr.pop()
    array = arr.sort(function(){
        return Math.random() - 0.5;
      });
    array.push(' ');
   document.body.removeChild(document.body.children[2]);

    draw()
    go()
    }

    function buttons () {
        let start = document.createElement('div');
        start.classList.add('start');
        start.innerHTML = 'Перемешать'
        document.body.prepend(start)
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

    function congratulated () {
        let arrayCell = document.querySelectorAll('.hole');
        let count = true;
        for (let i = 0; i < arrayCell.length; i++) {
            if (+arrayCell[i].textContent !== 1 + i && i !== arrayCell.length - 1) {
                count = false
            }
        }
        if (count) {
            alert('Поздравляем! Вы победили')
        }
    }
    

    function go() {
    let cell = document.querySelectorAll('.hole');
    cell.forEach((div, index) => div.addEventListener('click',
     function () {

         if (cell[index + 1] !== undefined  && cell[index + 1].textContent == ' ') {
                if(index !== 11 && index !== 3 && index !== 7) {
            cell[index + 1].textContent = cell[index].textContent;
            cell[index].textContent = ' ' ;
                } 
         }

         if (cell[index + 4] !== undefined && cell[index + 4].textContent == ' ') {
            cell[index + 4].textContent = cell[index].textContent;
            cell[index].textContent = ' ';  
         }

         if (cell[index - 1] !== undefined && cell[index - 1].textContent == ' ') {
            if(index !== 4 && index !== 8 && index !== 12) {
                cell[index - 1].textContent = cell[index].textContent;
                cell[index].textContent = ' ';
            }  
         }
         
         if (cell[index - 4] !== undefined && cell[index - 4].textContent == ' ') {
            cell[index - 4].textContent = cell[index].textContent;
            cell[index].textContent = ' ';  
         }
         
         congratulated ()
        }))
    }
}




