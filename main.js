function calculator(string) {

  const test = ['1 + 1', '1 + 2', '4 + 3', '10 + 10', '10 - 1', '5 - 4', '4 - 4', '1 - 10', '4 - 5', '10 * 10', '4 * 10', '5 * 1', '5 * 5', '10 / 1', '6 / 2', '5 / 4', '2 / 4', 'I + I', 'I + II', 'IV + III', 'X + X', 'X + IX', 'X - I', 'V - IV', 'IV - IV', 'I - X', 'IV - V', 'X * X', 'IV * X', 'V * I', 'V * V', 'X / I', 'VI / II', 'V / IV', 'II / IV', '', ' ', '     ', '4', '+', '++1', 'V', '3 % 4', '1 + 1 + 1', '11 + 1', '1 + 11', 'XI + I', 'I + XI', '1 + V', 'I + 1', '5 / 0', '0 + 1', '1 + 0'];
  let testCount = 0;
  let finalResult = 0;
  const operatorArr = ['+', '-', '*', '/'];
  const romanArray = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC', 'C'];
  const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  const arabArray = [1, 4, 5, 9, 10, 40, 50, 90, 100];

  console.log('Всего тестов - ', test.length);

  getArguments = () => {
    if (testCount === test.length) {
      return;
    }
    let tempString = test[testCount].replace(/[ ^-d]/g, '').toUpperCase();
    let arg1 = 0;
    let arg2 = 0;
    let operator = "";
    for (let i = 0; i < operatorArr.length; i++) {
      if (tempString.indexOf(operatorArr[i]) !== -1) {
        operator = operatorArr[i];
        arg1 = tempString.slice(0, tempString.indexOf(operatorArr[i]));
        arg2 = tempString.slice(tempString.indexOf(operatorArr[i]) + 1);
      }
    }
    testCount++;
    checkInput(arg1, arg2, operator);
  };

  checkInput = (arg1, arg2, operator) => {
    let romanState = 0;
    if (typeof (+arg1) === "number" && typeof (+arg2) === "number" && (+arg1) > 0 && (+arg1) <= 10 && (+arg2) > 0 && (+arg2) <= 10) {
      arg1 = +arg1;
      arg2 = +arg2;
    } else {
      try {
        if (romans.indexOf(arg1) === -1 || romans.indexOf(arg2) === -1) {
          throw +testCount + " Ошибка ввода: " + test[testCount - 1];
        }
      } catch (err) {
        console.error(err);
        getArguments();
        return;
      }
      arg1 = romanToArab(arg1);
      arg2 = romanToArab(arg2);
      romanState = 1;
    }
    calc(arg1, arg2, operator, romanState);
  };

  calc = (arg1, arg2, operator, romanState) => {
    let result = 0;
    switch (operator) {
      case operatorArr[0]:
        result = arg1 + arg2;
        break;
      case operatorArr[1]:
        result = arg1 - arg2;
        break;
      case operatorArr[2]:
        result = arg1 * arg2;
        break;
      case operatorArr[3]:
        result = arg1 / arg2;
        break;
    }
    result = Math.floor(result).toString();
    if (romanState === 1) {
      result = arabToRoman(result);
    }
    finalResult = result;
    console.log(testCount.toString(), 'Результат: ', test[testCount - 1], "=", finalResult);
    getArguments();
  };

  arabToRoman = (arab) => {
    if (arab === 0) {
      return "";
    }
    let result = "";
    let n = arabArray.length - 1;
    while (arab > 0) {
      if (arab >= arabArray[n]) {
        result += romanArray[n];
        arab -= arabArray[n];
      } else {
        n--;
      }
    }
    return result;
  };

  romanToArab = (roman) => {
    let result = 0;
    let position = 0;
    let n = arabArray.length - 1;
    while (n >= 0 && position < roman.length) {
      if (roman.substr(position, romanArray[n].length) === romanArray[n]) {
        result += arabArray[n];
        position += romanArray[n].length;
      } else {
        n--;
      }
    }
    return result;
  };
  getArguments();
}

calculate = function (string) {
  result = calculator(string);
  return result;
};

calculate();