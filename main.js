function calculator(string) {
  let finalResult = 0;
  const operatorArr = ['+', '-', '*', '/'];
  const romanArray = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC', 'C'];
  const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  const arabArray = [1, 4, 5, 9, 10, 40, 50, 90, 100];
  const tempString = string.replace(/[ ^-d]/g, '').toUpperCase();

  getArguments = () => {
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
    checkInput(arg1, arg2, operator);
  };

  checkInput = (arg1, arg2, operator) => {
    let romanState = 0;
    if (typeof (+arg1) === "number" && typeof (+arg2) === "number" && (+arg1) > 0 && (+arg1) <= 10 && (+arg2) > 0 && (+arg2) <= 10) {
      arg1 = +arg1;
      arg2 = +arg2;
      try {
        if (arg1 <= 0 || arg2 <= 0 || arg1 > 10 || arg2 > 10) {
          throw "Вы ввели некорректные данные";
        }
      } catch (err) {
        console.error(err);
        return;
      }
    } else {
      try {
        if (romans.indexOf(arg1) === -1 || romans.indexOf(arg2) === -1) {
          throw "Вы ввели некорректные данные";
        }
      } catch (err) {
        console.error(err);
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
    return finalResult;
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
  return finalResult;
}

calculate = function (string) {
  result = calculator(string);
  return result;
};

console.log(calculate('I-X'));