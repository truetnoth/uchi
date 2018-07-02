'use strict';

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};

const drawCanvas = () => { // отрисовка канваса с линейкой и первой стрелкой
    let ctx = document.getElementById('canvas').getContext('2d');
    let img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 200-83);
        ctx.beginPath();
        ctx.strokeStyle = '#ff5fac';
        ctx.fillStyle = '#ff5fac';
        ctx.lineWidth = 3;
        ctx.moveTo(35, 130);
        ctx.quadraticCurveTo(((augend * 40) + 30 + 35)/2, 10, (augend * 40) + 28, 130);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc((augend * 40) + 28, 130, 4, 0,2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    };
    img.src = 'assets/sprite.png';
}

const drawSecond = () => { // отрисовка второй стрелки
    let ctx = document.getElementById('canvas').getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = '#ff5fac';
    ctx.fillStyle = '#ff5fac';
    ctx.lineWidth = 3;
    ctx.moveTo((augend * 40) + 30, 130);
    ctx.quadraticCurveTo(((augend * 40) + 28 + (addend * 40) + 25 + (augend * 40))/2, 10, (addend * 40) + 25 + (augend * 40), 130);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc((addend * 40) + 25 + (augend * 40), 130, 4, 0,2 * Math.PI);
    ctx.stroke();
    ctx.fill();
};

window.onload = function() {
    userInput.style.left = augendMedian - 10 + 'px';
    userInput.value = ''; // чистим ввод при перезагрузке страницы
    console.log('👱🏼 Трусевич Валерий');
    drawCanvas();
};

document.getElementById('augend').innerHTML = getRandom(6, 9);

switch (Number(document.getElementById('augend').innerHTML)) {
    case 6:
        document.getElementById('addend').innerHTML = getRandom(5,8);
        break;
    case 7:
        document.getElementById('addend').innerHTML = getRandom(4,7);
        break;
    case 8:
        document.getElementById('addend').innerHTML = getRandom(3,6);
        break;
    case 9:
        document.getElementById('addend').innerHTML = getRandom(2,5);
        break;
};

let augend = document.getElementById('augend').innerHTML;
let addend = document.getElementById('addend').innerHTML;

let augendMedian = ((augend * 40) + 30 + 35)/2;
let addendMedian = ((augend * 40) + 30 + (addend * 40) + 25 + (augend * 40))/2;

let summary = document.getElementById('summary');
let summaryNum = String(Number(augend) + Number(addend)); // получаем ответ задания из входных данных

let userInput = document.querySelector('input');
let correctAugend = document.createElement('span');
let correctAddend = document.createElement('span');
let solved = document.createElement('span');
let solvingInput = document.createElement('input');
let solving = document.querySelector('.solving');

document.querySelector('input').onkeypress = function(e) {
    if (e.charCode === 0 || e.charCode === 13) { // проверяем клавишу Enter в поле на нажатие
        let firstNum = this.value; // берем введенное значение
        if (firstNum !== augend) { // сравниваем его с 1 слагаемым
            this.style.color = 'red'; // ошибка 
            document.getElementById('augend').style.backgroundColor = 'orange'; // подсветка ошибки
        } else {
            this.style.color = ''; 
            userInput.remove(); // убираем форму для замены на правильный ответ
            document.querySelector('.number_line').insertAdjacentHTML('beforeend', '<span class = "augendSpan"></span>');
            document.querySelector('.augendSpan').innerHTML = firstNum;
            document.querySelector('.augendSpan').style.left = augendMedian - 10 + 'px';
            document.querySelector('.number_line').insertAdjacentHTML('beforeend', '<input class = "addendInput" maxlength = "1"></input>');
            document.querySelector('.addendInput').style.left = addendMedian - 13 + 'px';
            drawSecond();
            document.getElementById('augend').style.backgroundColor = '';

            document.querySelector('.addendInput').onkeypress = function(e) {
                if (e.charCode === 0 || e.charCode === 13) {
                    let secondNum = this.value;
                    if (secondNum !== addend) { 
                        this.style.color = 'red';
                        document.getElementById('addend').style.backgroundColor = 'orange';
                    } else {
                        this.style.color = '';
                        document.querySelector('.addendInput').remove();
                        document.querySelector('.number_line').insertAdjacentHTML('beforeend', '<span class = "addendSpan"></span>');
                        document.querySelector('.addendSpan').innerHTML = secondNum;
                        document.querySelector('.addendSpan').style.left = addendMedian - 13 + 'px';
                        summary.remove();
                        solving.appendChild(solvingInput).classList.add('solving_input');
                        document.querySelector('.solving_input').setAttribute('maxlength', '2');
                        document.getElementById('addend').style.backgroundColor = '';

                        document.querySelector('.solving_input').onkeypress = function(e) {
                            if (e.charCode === 0 || e.charCode === 13) {
                                let result = this.value;
                                if (result !== summaryNum) {
                                    this.style.color = 'red';
                                } else {
                                    this.remove();
                                    solving.appendChild(solved).innerHTML = summaryNum;
                                    document.querySelector('.checked').style.display = 'inline-block';
                                }
                            } else return;
                        }
                    }
                    
                } else return;
            }
        }
    } else return;
};
