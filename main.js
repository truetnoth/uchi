'use strict';

window.onload = function() {
    userInput.value = ''; // чистим ввод при перезагрузке страницы
    console.log('👱🏼 Трусевич Валерий')
};

let augend = document.getElementById('augend').innerHTML; // сбор значений из исходного задания для 1 слагаемого
let addend = document.getElementById('addend').innerHTML; // сбор значений из исходного задания для 2 слагаемого
let summary = document.getElementById('summary');
let summaryNum = String(Number(augend) + Number(addend));

let userInput = document.querySelector('input');
let correctAugend = document.createElement('span');
let correctAddend = document.createElement('span');
let solved = document.createElement('span');
let addendInput = document.createElement('div');
let augendInput = document.createElement('input');
let solvingInput = document.createElement('input');
let solving = document.querySelector('.solving');

document.querySelector('input').onkeypress = function(e) {
    if (e.charCode === 0 || e.charCode === 13) {
        let firstNum = this.value;
        if (firstNum !== augend) {
            this.style.color = 'red';
            document.getElementById('augend').style.backgroundColor = 'orange';
        } else {
            this.style.color = '';
            userInput.remove();
            document.querySelector('.arrow_augend').appendChild(correctAugend).innerHTML = firstNum;
            document.querySelector('.number_line').appendChild(addendInput).classList.add('arrow_addend');
            document.querySelector('.arrow_addend').appendChild(augendInput).classList.add('augendInput');
            document.querySelector('.augendInput').setAttribute('maxlength', '1');
            document.getElementById('augend').style.backgroundColor = '';

            document.querySelector('.augendInput').onkeypress = function(e) {
                if (e.charCode === 0 || e.charCode === 13) {
                    let secondNum = this.value;
                    if (secondNum !== addend) {
                        this.style.color = 'red';
                        document.getElementById('addend').style.backgroundColor = 'orange';
                    } else {
                        this.style.color = '';
                        augendInput.remove();
                        document.querySelector('.arrow_addend').appendChild(correctAddend).innerHTML = secondNum;
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
                                    document.querySelector('.solving').appendChild(solved).innerHTML = summaryNum;
                                }
                            } else return;
                        }
                    }
                    
                } else return;
            }

        }
    } else return;
};
