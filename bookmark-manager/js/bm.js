$(document).ready(function(){

	var bookmarkProps = {
		name: undefined,
		url: undefined
	}

	function showAddEditMenu() {
		$('#add-edit-menu').removeClass('no-active').addClass('active');
	}

	function hideAddEditMenu() {
		$('#add-edit-menu').removeClass('active').addClass('no-active');
	}

	function changeBookmark(newItemName, newItemUrl) {
		$('.link').each(function(){
			var bookmark = $(this);
			var targetLink = bookmark.attr('href');
			if(targetLink === bookmarkProps.url) {
				bookmark.attr('href', newItemUrl);
				bookmark.text(newItemName);
			}
		});
	}

	function createBookmark(newItemName, newItemUrl) {
		var bookmarkHTML = '<div class="bookmark-box">' + 
        					  '<a class="edit js-del"><span class="icon-bin"></span></a>' +
        	                  '<a class="edit js-edit"><span class="icon-pencil"></a>' +
        					  '<a class="link" href="' + newItemUrl + '">' + 
        					  newItemName + '</a>' +
      						'</div>';
      	$('#bookmarks .bookmark-box:last').before(bookmarkHTML);
	}

	function setFilter(nameCategory) {
		showBookmarks();
		if(nameCategory !== 'all') { //чтобы не скрывались все закладки по клику на all
			hideBookmarks(nameCategory);
		}
	}

	function showBookmarks() {
		$('.bookmark-box').fadeIn(0);
	}

	function hideBookmarks(nameCategory) {
		$('.bookmark-box:not(:last)').each(function() {//все кроме последнего
			var item = $(this);
			var itemCategory = item.data('category');

			if(itemCategory !== nameCategory) {
				item.fadeOut(0);
			}
		});
	}

	function highlightCategory(choosedItem) {
		$('#side-menu a').removeClass('active');
		choosedItem.addClass('active');
	}

	function checkEnteredText(newItemName, newItemUrl) {
		if(!newItemName || !newItemUrl) {
			alert('Please, fill in form all fields and press «Save»');
		}
	}

	$(document).on('click', '#side-menu a', function() {
		var choosedItem = $(this);
		var nameCategory = choosedItem.text().toLowerCase();

		highlightCategory(choosedItem);
		setFilter(nameCategory);
	});

	$(document).on('click', '.js-edit, .js-add', function() {
		var choosedItem = $(this);
		var itemName = choosedItem.siblings('.link').text();
		var itemLink = choosedItem.siblings('.link').attr('href');
		/*у кнопки add нет соседей, поэтому itemName будет пустой,
		а itemLink undefined. это сильно костыльненько?*/
		
		showAddEditMenu();

		$('#edit-bookmark-name').val(itemName);
		$('#edit-bookmark-url').val(itemLink);
		bookmarkProps.name = itemName;
		bookmarkProps.url = itemLink;
	});

	$(document).on('click', '#save-btn', function() {
		var newItemName = $('#edit-bookmark-name').val();
		var newItemUrl = $('#edit-bookmark-url').val();

		checkEnteredText(newItemName, newItemUrl);
		//надо остановить скрипт если эта ф-я возвращает false

		if(bookmarkProps.name && bookmarkProps.url) {
			changeBookmark(newItemName, newItemUrl);
		} else {
			createBookmark(newItemName, newItemUrl);
		}

		hideAddEditMenu();
	});

	$(document).on('click', '#cancel-btn', function() {
		bookmarkProps.name = undefined;
		bookmarkProps.url = undefined;
		hideAddEditMenu();
	});

	$(document).on('click', '.js-del', function() {
		var bookmark = $(this).parents('.bookmark-box');
		bookmark.remove();
	});
	
});

	/*
	1. как правильно записать всё в один обработчик?
	2. строка 39, обход фильтра по категории "все". такой категории нет 
	у элементов (иначе сказать, она есть у всех элементов). сделал вот так кароч
	3. строка 98 (но этот вопрос уже после рассмотрения всего кода)
	4. надо доделать инпут с категорией и при создании новой категории это учитывать
	если категории еще нет в списке категорий - добавлять новую в конец.
	наверное, буду реализовывать после того, как буду получать данные с сервака
	и отрисовывать категории по ним уже. 
	*/