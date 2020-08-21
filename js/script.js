'use strict';

const input = document.querySelector('.input'), // input/output button
  numbers = document.querySelectorAll('.numbers div'), // number buttons
  operators = document.querySelectorAll('.operators div'), // operator buttons
  result = document.querySelector('#result'), // equal button
  clear = document.querySelector('#clear'); // clear button

let resultDisplayed = false; // flag to keep an eye on what output is displayed
let numberOperatorsArray = [];
let operatorArray =['/','*','+','-']
let equalPressed = false;

numbers.forEach(function (number) {
  number.addEventListener('click', function () {
    if(equalPressed) {
        if(operatorArray.includes(numberOperatorsArray[numberOperatorsArray.length-1])){
        input.innerHTML += this.innerHTML;
        numberOperatorsArray = [...numberOperatorsArray, this.innerHTML];
        equalPressed = false
    }}
    else{
      input.innerHTML += this.innerHTML;
      numberOperatorsArray = [...numberOperatorsArray, this.innerHTML];
    }
  });
});

operators.forEach(function (operator) {
  operator.addEventListener('click', function () {
    if (!operatorArray.includes(numberOperatorsArray[numberOperatorsArray.length-1])){
      input.innerHTML += this.innerHTML;
      numberOperatorsArray = [...numberOperatorsArray, this.innerHTML];
    }
  });
});

// on click of 'equal' button
result.addEventListener('click', function () {
  // do maths here...
  let numbersStringHolder = '';
  let resultArray = [];

  for (let char of numberOperatorsArray) {
    const numReg = /\d/;
    if (numReg.test(char) || char === '.') {
      numbersStringHolder += char;
    } else {
      resultArray = [...resultArray, Number(numbersStringHolder), char];
      numbersStringHolder = '';
    }
  }
  resultArray = [...resultArray, Number(numbersStringHolder)];

  let multiply = resultArray.indexOf('*');
  while (multiply !== -1) {resultArray.splice(multiply - 1, 3,resultArray[multiply - 1] * resultArray[multiply + 1]);
    multiply = resultArray.indexOf('*');
  }

  let divide = resultArray.indexOf('/');
  while (divide !== -1) {
    resultArray.splice(divide - 1,3,resultArray[divide - 1] / resultArray[divide + 1]);
    divide = resultArray.indexOf('/');
  }

  let add = resultArray.indexOf('+');
  while (add !== -1) {
    resultArray.splice(add - 1, 3, resultArray[add - 1] + resultArray[add + 1]);
    add = resultArray.indexOf('+');
  }

  let subtract = resultArray.indexOf('-');
  while (subtract !== -1) {
    resultArray.splice(subtract - 1,3,resultArray[subtract - 1] - resultArray[subtract + 1]);
    subtract = resultArray.indexOf('-');
  }

  numberOperatorsArray = [...resultArray];
  input.innerHTML = numberOperatorsArray[0];
  equalPressed = true

  console.log('Numbers and operators', numberOperatorsArray);
});

// clearing the input on press of clear
clear.addEventListener('click', function () {
  numberOperatorsArray = [];
  input.innerHTML = '';
  equalPressed = false;
});
