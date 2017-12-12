$(document).ready(function(){
	/*
	1. Напишіть функцію, що повертає куб числа.

	2. Напишіть функцію, що додає перше число до другого 
	і ділить результат на третє число.

	3. Напишіть функцію, що приймає число від 1 до 7 
	і повертає відповідну назву дня (англійською).

	4. Перепишіть третє завдання, використавши функціональний вираз

	5. Реалізуйте функцію знаходження факторіала
	*/

	//1
	function pow3(num) {
		return num**3;
	}

	//2
	function calc2(a, b, c) {
		return (a + b) / c;
	}

	//3
	function showDayOfWeekVariant1(numDay) {
		switch(numDay) {
			case 1:
			alert('Monday');
			break;
			case 2:
			alert('Tuesday');
			break;
			case 3:
			alert('Wednesday');
			break;
			case 4:
			alert('Thursday');
			break;
			case 5:
			alert('Friday');
			break;
			case 6:
			alert('Saturday');
			break;
			case 7:
			alert('Sunday');
			break;
			default:
			alert('need num from 1 to 7');
		}
	}

	//4
	var showDayOfWeekVariant2 = function(numDay) {
		switch(numDay) {
			case 1:
			alert('Monday');
			break;
			case 2:
			alert('Tuesday');
			break;
			case 3:
			alert('Wednesday');
			break;
			case 4:
			alert('Thursday');
			break;
			case 5:
			alert('Friday');
			break;
			case 6:
			alert('Saturday');
			break;
			case 7:
			alert('Sunday');
			break;
			default:
			alert('need num from 1 to 7');
		}
	}

	//5
	function factorial(n) {
  		return (n != 1) ? n * factorial(n - 1) : 1;
	}

});