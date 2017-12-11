$(document).ready(function(){
	/*
	1) виведе вміст тегу head в alert.
	2) зробить напис Users напівжирним шрифтом.
	3) змінить ім’я Peter на James
	4) змінить колір тексту елементів списку на сірий (#555)
	*/

	var head = $('head').html();
	alert(head);

	var listHeader = $('#list-header');
	listHeader.css('font-weight', 'bold');

	var secondName = $('ul > li:eq(1)');
	secondName.text('James');

	var listItems = $('li');
	listItems.css('color', '#555');

});