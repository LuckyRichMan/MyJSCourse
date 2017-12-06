$(document).ready(function(){
	/*
	1) виведе вміст тегу head в alert.
	2) зробить напис Users напівжирним шрифтом.
	3) змінить ім’я Peter на James
	4) змінить колір тексту елементів списку на сірий (#555)
	*/

	var a = document.head.innerHTML;
	alert(a);

	var listHeader = document.getElementById('list-header');
	listHeader.style.fontWeight = 'bold';

	var names = document.getElementsByTagName('li');
	names[1].innerHTML = 'James';

	for (var i = 0; i < names.length; i++) {
		names[i].style.color = '#555';
	}
});