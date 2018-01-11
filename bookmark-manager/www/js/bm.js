$(document).ready(function(){

	var categoriesData = [];
	var bookmarksData = [];

	function getCategoriesData(data) {
		categoriesData = [];
		data.categories.forEach(function(item) {
			categoriesData.push(item);
		});
	}

	function addCategoriesOnPage(data) {
		var $category = $('#side-menu .categories');
		var overallCategory = '<li><a class="category active" data-id="0">All</a>' + 
		'</li>';
		var editBtn = '<div class="btn-box">' +
				'<a class="edit-category-btn js-del-cat"><span class="icon-bin"></span></a>' +
				'<a class="edit-category-btn js-edit-cat"><span class="icon-pencil"></span></a>' +
				'<a class="edit-category-btn js-add-cat"><span class="icon-plus"></span></a>' +
			'</div>';

		$category.append(overallCategory); 

		data.categories.forEach(function(category) {
			var categoryHTML = '<li><a class="category" data-id="' + 
			category.id + '">' + category.name + '</a></li>';
			$category.append(categoryHTML);
		});

		$category.append(editBtn);

	}

	function addSelectCategories() {
		categoriesData.forEach(function(category) {
			var categoryHTML = '<option value="' + category.id +
			'">' + category.name + '</option>';
			$('.select-categories').append(categoryHTML);
		});
	}

	function getCategories() {
		$.get('/workspace/app/categories.php', function(data) {
			getCategoriesData(data);
			addCategoriesOnPage(data);
			addSelectCategories();
		}, 'json');
	}

	function getBookmarksData(data) {
		bookmarksData = [];
		data.bookmarks.forEach(function(item) {
			bookmarksData.push(item);
		});
	}

	function addBookmarksOnPage(data) {
		data.bookmarks.forEach(function(bookmark) {
			addBookmarkOnPage(bookmark);
		});
	}

	function getBookmarks() {
		$.get('/workspace/app/bookmarks.php', function(data) {
			getBookmarksData(data);
			addBookmarksOnPage(data);
		}, 'json');
	}

	function showEditMenu(selector) {
		$(selector).removeClass('no-active').addClass('active');
	}

	function hideEditMenu(selector) {
		$(selector).removeClass('active').addClass('no-active');
	}

	function addCategoryOnPage(category) {
		var categoryHTML = '<li>' +
				'<a class="category" data-id="' + category.id + '">' + 
				category.name + '</a>' +
			'</li>';
		$('#side-menu .btn-box').before(categoryHTML);
	}

	function createCategory(newItem) {
		var data = {
			action: 'add',
			name: newItem.name,
			description: newItem.description
		}
		$.post('/workspace/app/categories.php', data, function(res){
			var category = res.categories[res.categories.length - 1];
			getCategoriesData(res);
			addCategoryOnPage(category);
			refreshSelects(category);
			//берем последний добавленный элемент на сервере
		}, 'json');
	}

	function refreshCategoryList(category) {
		$('#side-menu .category').each(function() {
			var $category = $(this).parent();
			var categoryIdOnPage = $(this).data('id');
			var editedCategoryHTML = '<li>' +
					'<a class="category" data-id="' + +category.id + '">' + 
					category.name + '</a>' +
				'</li>'
			if(+category.id === +categoryIdOnPage) {
				$category.replaceWith(editedCategoryHTML);
			}
		});
	}

	function refreshSelects() {
		$('.select-categories option').remove();
		categoriesData.forEach(function(item) {
			var newOptionHTML = '<option value="' + item.id + '">' + item.name + '</option>';
			$('.select-categories').append(newOptionHTML);
		});
	}

	function editCategoryOnPage(category) {
		refreshCategoryList(category);
		refreshSelects();
	}

	function editCategory(newItem) {
		var data = {
			action: 'edit',
			id: newItem.id,
			name: newItem.name,
			description: newItem.description
		}

		$.post('/workspace/app/categories.php', data, function(res){
			var category = res.categories[res.categories.length - 1];
			getCategoriesData(res);
			editCategoryOnPage(category);
		}, 'json');
	}

	function delCategoryOnServer(categoryId) {
		var data = {
			action: 'delete',
			id: categoryId
		}

		$.post('/workspace/app/categories.php', data, function(res){
			getCategoriesData(res);
			alert('cat deleted');
			refreshSelects();
		}, 'json');
	}

	function delCategoryOnPage(categoryId) {
		$('#side-menu .category').each(function() {
			var $category = $(this).parent();
			var categoryIdOnPage = +$(this).data('id');
			if(categoryId === categoryIdOnPage) {
				$category.remove();
			}
		});
	}

	function delCategory(categoryId) {
		delCategoryOnServer(categoryId);
		delCategoryOnPage(categoryId);
	}

	function updateLinkOnPage(newItem, bookmarkId) {
		$('.link').each(function() {
			var $bookmark = $(this);
			var targetLink = $bookmark.data('id');
			var editedBookmarkHTML = '<a class="link" href="' + newItem.link + 
				'" data-id="' + bookmarkId + '" data-categoryid="' + 
				newItem.categoryid + '">' + newItem.name + '</a>'
			
			if(targetLink === bookmarkId) {
				$bookmark.replaceWith(editedBookmarkHTML);
			}
		});
	}

	function changeBookmark(newItem, bookmarkId) {
		var data = {
			action: 'edit',
			id: bookmarkId,
			name: newItem.name,
			link: newItem.link,
			description: newItem.description,
			categoryid: newItem.categoryid
		}

		$.post('/workspace/app/bookmarks.php', data, function(res){
			alert('bm edited'); //тут проверка на добавление закладки на серв
		}, 'json');

		updateLinkOnPage(newItem, bookmarkId);
	}

	function addBookmarkOnPage(bookmark) {
		var bookmarkHTML = '<div class="bookmark-box">' + 
        		'<a class="edit js-del"><span class="icon-bin"></span></a>' +
        	   	'<a class="edit js-edit-bm"><span class="icon-pencil"></a>' +
        		'<a class="link" href="' + bookmark.link + '"' +
        		' data-id="' + bookmark.id + 
        		'" data-categoryid="' + bookmark.categoryid + '">' + 
        		bookmark.name + '</a>' +
      		'</div>';
      	$('#bookmarks .bookmark-box:last').before(bookmarkHTML);
	}

	function createBookmark(newItem) {
		var data = {
			action: 'add',
			name: newItem.name,
			link: newItem.link,
			description: newItem.description,
			categoryid: newItem.categoryid
		}
		$.post('/workspace/app/bookmarks.php', data, function(res){
			getBookmarksData(res);
			var bookmark = res.bookmarks[res.bookmarks.length - 1];
			//берем последний добавленный элемент на сервере
			alert('bm added'); //тут проверка на добавление закладки на серв
			
			addBookmarkOnPage(bookmark);
		}, 'json');

	}

	function showBookmarks() {
		$('.bookmark-box').fadeIn(0);
	}

	function hideBookmarks(idCategory) {
		$('.bookmark-box:not(:last)').each(function() {//все кроме последнего
			var $item = $(this);
			var itemCategory = $item.find('.link').data('categoryid');

			if(idCategory !== itemCategory) {
				$item.fadeOut(0);
			}
		});
	}

	function setFilter(idCategory) {
		showBookmarks();
		if(+idCategory) { //чтобы не скрывались все закладки по клику на all
			hideBookmarks(idCategory);
		}
	}

	function highlightCategory($choosedItem) {
		$('#side-menu a').removeClass('active');
		$choosedItem.addClass('active');
	}

	function bmHasEmptyFields(newItem) {
		if(!newItem.name || !newItem.link || !newItem.description || !newItem.categoryid) {
			alert('Please, fill in form all fields and press «Save»');
			return true;
		} 
	}

	function catHasEmptyFields(newItem) {
		if(!newItem.name || !newItem.description) {
			alert('Please, fill in form all fields and press «Save»');
			return true;
		}
	}

	function addFieldsToEditBm(choosedBookmarkData) {
		$('#edit-bookmark-name').val(choosedBookmarkData.name);
		$('#edit-bookmark-url').val(choosedBookmarkData.link);
		$('#edit-bookmark-description').val(choosedBookmarkData.description);
		$('#add-edit-bm-menu .select-categories').val(choosedBookmarkData.categoryid);
	}

	function clearFields() {
		$('#edit-bookmark-name').val('');
		$('#edit-bookmark-url').val('');
		$('#edit-bookmark-description').val('');
		$('#add-edit-bm-menu .select-categories').val(0);
	}

	function delBookmark(choosedBookmarkId) {
		var data = {
			action: 'delete',
			id: choosedBookmarkId
		}

		$.post('/workspace/app/bookmarks.php', data, function(res){
			alert('bm deleted'); //тут проверка на удаление закладки на сервере
			getBookmarksData(res);
		}, 'json');
	}

	function EditCategoryForm($form) {
		this.$form = $form;
		this.categoryId = undefined;
		this.$categorySelect = this.$form.find('.select-categories');
		this.$categoryName = $('#edit-cat-name');
		this.$categoryDescription = $('#edit-cat-description');
		this.resetForm = function() {
			this.categoryId = undefined;
			this.$categorySelect.val(0);
			this.$categoryName.val('');
			this.$categoryDescription.val('');
		}
		this.show = function(isEdit){
			this.resetForm();
			this.$form.removeClass('no-active').addClass('active');
			if(isEdit) {
				this.$categorySelect.removeClass('no-active').addClass('active');
			} else {
				this.$categorySelect.removeClass('active').addClass('no-active');
			}
		};
		this.hide = function(){
			this.$form.removeClass('active').addClass('no-active');
		};
		this.save = function(){
			var newItem = {
				name: this.$categoryName.val(),
				description: this.$categoryDescription.val()
			}
			if(catHasEmptyFields(newItem)) {
				return;
			}
			if(this.categoryId) {
				newItem.id = this.categoryId;
				editCategory(newItem);
			} else {
				createCategory(newItem);
			}
			this.hide();
		};
		this.selectCategory = function(){
			this.categoryId = this.$categorySelect.val();
			var _this = this;
			if(!+this.categoryId) {
				this.resetForm();
				return;
			}
			categoriesData.find(function(item) {
				if(+_this.categoryId === +item.id) {
					_this.$categoryName.val(item.name);
					_this.$categoryDescription.val(item.description);
					return true;
				} 
			});
		};
	}

	function DelCategoryForm($form) {
		this.$form = $form;
		this.categoryId = undefined;
		this.categorySelect = this.$form.find('.select-categories');
		this.show = function(){
			this.$form.removeClass('no-active').addClass('active');
		};
		this.hide = function(){
			this.$form.removeClass('active').addClass('no-active');
		};
		this.delete = function(){
			var delConfirm = confirm('do you want to delete the category?');
			this.categoryId = this.categorySelect.val(); //string
			
			if(delConfirm) {
				delCategory(+this.categoryId);
			} else {			 
				alert('category is not delete');
			}
		};

	}

	var editCategoryForm = new EditCategoryForm( $('#add-edit-cat-menu') );
	var delCategoryForm = new DelCategoryForm( $('#del-cat-menu') );
	getCategories();
	getBookmarks();

	$(document)
		//*******CATEGORIES*******
		.on('click', '#side-menu .category', function() {
			var $choosedItem = $(this);
			var idCategory = $choosedItem.data('id');

			highlightCategory($choosedItem);
			setFilter(idCategory);
		})
		.on('click', '#side-menu .js-add-cat', function() {
			delCategoryForm.hide();
			editCategoryForm.show();
		})
		.on('click', '#side-menu .js-edit-cat', function() {
			delCategoryForm.hide();
			editCategoryForm.show(true);
		})
		.on('change', '#add-edit-cat-menu .select-categories', function() {
			editCategoryForm.selectCategory();
		})
		.on('click', '#side-menu .js-del-cat', function() {
			editCategoryForm.hide();
			delCategoryForm.show();
		})
		.on('click', '#save-cat-btn', function() {
			editCategoryForm.save();
			editCategoryForm.hide();
		})
		.on('click', '#del-cat-btn', function() {
			delCategoryForm.delete();
			delCategoryForm.hide();
		})
		.on('click', '#side-menu .cancel-cat-btn', function() {
			editCategoryForm.hide();
			delCategoryForm.hide();
		})
		//*******BOOKMARKS*******
		.on('click', '.js-edit-bm, .js-add-bm', function() {
			var $choosedItem = $(this);
			var choosedBookmarkId = $choosedItem.siblings('.link').data('id');
			var selector = '#add-edit-bm-menu';

			if(choosedBookmarkId) {
				var choosedBookmarkData = bookmarksData.find(function(item) {
					return +item.id === +choosedBookmarkId;
				});
			}
			
			showEditMenu(selector);

			if(choosedBookmarkData) {
				$('form').data('id', choosedBookmarkId);
				addFieldsToEditBm(choosedBookmarkData)
			} else {
				$('form').removeData('id');
				clearFields();
			}
		})
		.on('click', '#save-bm-btn', function() {
			var newItemName = $('#edit-bookmark-name').val();
			var newItemLink = $('#edit-bookmark-url').val();
			var newItemDescription = $('#edit-bookmark-description').val();
			var selector = '#add-edit-bm-menu';

			var newItem = {
				name: newItemName,
				link: newItemLink,
				description: newItemDescription,
				categoryid: +$('#add-edit-bm-menu .select-categories').val()
			}

			var bookmarkId = $('form').data('id');

			if(bmHasEmptyFields(newItem)) {
				return;
			}

			if(bookmarkId) {
				changeBookmark(newItem, bookmarkId);
			} else {
				createBookmark(newItem);
			}

			hideEditMenu(selector);
		})
		.on('click', '#cancel-bm-btn', function() {
			var selector = '#add-edit-bm-menu';
			hideEditMenu(selector);
		})
		.on('click', '.js-del', function() {
			var $choosedItem = $(this);
			var $bookmark = $choosedItem.parents('.bookmark-box');
			var choosedBookmarkId = $choosedItem.siblings('.link').data('id');
			var delConfirm = confirm('do you want to delete the bookmark?');
			
			if(delConfirm) {
				delBookmark(choosedBookmarkId);//del on server
				$bookmark.remove();//del on page
			} else {
				alert('bm is not delete');
			}
		});
	
});
