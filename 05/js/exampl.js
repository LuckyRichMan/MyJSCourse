$(document).ready(function(){
	/*
	1. Створіть змінні a = 17 і b = 10. Відніміть від a змінну b і результат 
	надайте змінної c. Потім створіть змінну d, надайте їй значення 7. 
	Складіть змінні c і d, а результат запишіть в змінну result. 
	Виведіть на екран значення змінної result.

	2. Створіть змінну str і надайте їй значення 'abcde'. 
	Звертаючись до окремих символів цього рядка виведіть на екран символ 'a', 
	символ 'c', символ 'e'.

	3. Напишіть скрипт, який рахує кількість секунд в годині, в добі, в місяці.
	*/

	//1
	var a = 17;
	var b = 10;
	var c = a - b;
	var d = 7;
	var result = c + d;
	alert(result);

	//2
	var str = 'abcde';
	alert(str[0]);
	alert(str[2]);
	alert(str[4]);

	//3
	var second = 1;
	var minute = second * 60;
	var hour = minute * 60;
	var day = hour * 24;
	var month = day * 31;

	alert(hour + " seconds in hour");
	alert(day + " seconds in day");
	alert(month + " seconds in month");


});