$(document).ready(function(){

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
		categoriesModel.categories.forEach(function(category) {
			var categoryHTML = '<option value="' + category.id +
			'">' + category.name + '</option>';
			$('.select-categories').append(categoryHTML);
		});
	}

	function addBookmarksOnPage(data) {
		data.bookmarks.forEach(function(bookmark) {
			addBookmarkOnPage(bookmark);
		});
	}

	function addCategoryOnPage(category) {
		var categoryHTML = '<li>' +
				'<a class="category" data-id="' + category.id + '">' + 
				category.name + '</a>' +
			'</li>';
		$('#side-menu .btn-box').before(categoryHTML);
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
		categoriesModel.categories.forEach(function(item) {
			var newOptionHTML = '<option value="' + item.id + '">' + item.name + '</option>';
			$('.select-categories').append(newOptionHTML);
		});
	}

	function editCategoryOnPage(category) {
		refreshCategoryList(category);
		refreshSelects();
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

	function delBookmarksOnPage(categoryId) {
		$('#bookmarks .bookmark-box').each(function() {
			var $bookmark = $(this);
			var bookmarkCategoryId = +$bookmark.find('.link').data('categoryid');

			if(categoryId === bookmarkCategoryId) {
				$bookmark.remove();
			}
		});
	}

	function delCategory(categoryId) {
		categoriesModel.delete(categoryId);
		delCategoryOnPage(categoryId);
		delBookmarksOnPage(categoryId);
	}

	function refreshBookmarkOnPage(newItem, bookmarkId) {
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
		if(+idCategory) { 
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

	function deleteBookmark($choosedItem) {
		var $bookmark = $choosedItem.parents('.bookmark-box');
		var choosedBookmarkId = $choosedItem.siblings('.link').data('id');
		var delConfirm = confirm('do you want to delete the bookmark?');
			
		if(delConfirm) {
			bookmarksModel.delete(choosedBookmarkId);
			$bookmark.remove();//del on page
		} else {
			alert('bm is not delete');
		}
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
				categoriesModel.edit(newItem);
			} else {
				categoriesModel.create(newItem);
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
			categoriesModel.categories.find(function(item) {
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

	function EditBookmarkForm($form) {
		this.$form = $form;
		this.bookmarkId = undefined;
		this.show = function($choosedItem) {
			var _this = this;
			var choosedBookmarkData;
			this.bookmarkId = $choosedItem.siblings('.link').data('id');

			if(this.bookmarkId) {
				choosedBookmarkData = bookmarksModel.bookmarks
					.find(function(item) {
						return +item.id === +_this.bookmarkId;
					});
			}

			if(choosedBookmarkData) {
				addFieldsToEditBm(choosedBookmarkData)
			} else {
				clearFields();
			}

			this.$form.removeClass('no-active').addClass('active');
		};
		this.hide = function() {
			this.$form.removeClass('active').addClass('no-active');
		};
		this.save = function() {
			var newItem = {
				name: $('#edit-bookmark-name').val(),
				link: $('#edit-bookmark-url').val(),
				description: $('#edit-bookmark-description').val(),
				categoryid: +$('#add-edit-bm-menu .select-categories').val()
			}

			if( bmHasEmptyFields(newItem) ) {
				return;
			}

			if(this.bookmarkId) {
				bookmarksModel.edit(newItem, this.bookmarkId);
			} else {
				bookmarksModel.create(newItem);
				//createBookmark(newItem);
			}
			this.hide();
		};
	}

	function CategoriesModel() {
		this.url = '/workspace/app/categories.php';
		this.categories = [];
		this.getAll();
	}

	CategoriesModel.prototype.getAll = function() {
		var _this = this;
		$.get(this.url, function(data) {
			_this.refresh(data);
			addCategoriesOnPage(data);
			addSelectCategories();
		}, 'json');
	}

	CategoriesModel.prototype.refresh = function(data) {
		var _this = this;
		this.categories = [];
		data.categories.forEach(function(item) {
			_this.categories.push(item);
		});
	}

	CategoriesModel.prototype.create = function(newItem) {
		var _this = this;
		var data = {
			action: 'add',
			name: newItem.name,
			description: newItem.description
			}
		$.post(this.url, data, function(res){
			_this.refresh(res);
			var category = res.categories[res.categories.length - 1];
			//берем последний добавленный элемент на сервере
			addCategoryOnPage(category);
			refreshSelects(category);
		}, 'json');
	}

	CategoriesModel.prototype.edit = function(newItem) {
		var _this = this;
		var data = {
			action: 'edit',
			id: newItem.id,
			name: newItem.name,
			description: newItem.description
		}
		$.post(this.url, data, function(res){
			_this.refresh(res);
			var category = res.categories[res.categories.length - 1];
			editCategoryOnPage(category);
		}, 'json');
	}

	CategoriesModel.prototype.delete = function(id) {
		var _this = this;
		var data = {
			action: 'delete',
			id: id
		}
		$.post(this.url, data, function(res){
			_this.refresh(res);
			alert('category deleted');
			refreshSelects();
		}, 'json');
	}

	function BookmarksModel() {
		this.url = '/workspace/app/bookmarks.php';
		this.bookmarks = []
		this.getAll();
	}

	BookmarksModel.prototype.refresh = function(data) {
		var _this = this;
		this.bookmarks = [];
		data.bookmarks.forEach(function(item) {
			_this.bookmarks.push(item);
		});
	}

	BookmarksModel.prototype.getAll = function() {
		var _this = this;
		$.get(this.url, function(data) {
			_this.refresh(data);
			addBookmarksOnPage(data);
		}, 'json');
	}

	BookmarksModel.prototype.create = function(newItem) {
		var _this = this;
		var data = {
			action: 'add',
			name: newItem.name,
			link: newItem.link,
			description: newItem.description,
			categoryid: newItem.categoryid
		}
		$.post(this.url, data, function(res){
			_this.refresh(res);
			var bookmark = res.bookmarks[res.bookmarks.length - 1];
			//берем последний добавленный элемент на сервере
			alert('bm added'); 
			addBookmarkOnPage(bookmark);
		}, 'json');
	}

	BookmarksModel.prototype.edit = function(newItem, id) {
		var _this = this;
		var data = {
			action: 'edit',
			id: id,
			name: newItem.name,
			link: newItem.link,
			description: newItem.description,
			categoryid: newItem.categoryid
		}
		
		$.post(this.url, data, function(res){
			_this.refresh(res);
			alert('bm edited'); 
		}, 'json');

		refreshBookmarkOnPage(newItem, id);
	}

	BookmarksModel.prototype.delete = function(id) {
		var _this = this;
		var data = {
			action: 'delete',
			id: id
		}
		$.post(this.url, data, function(res){
			alert('bm deleted');
			_this.refresh(res);
		}, 'json');
	}


	var editCategoryForm = new EditCategoryForm( $('#add-edit-cat-menu') );
	var delCategoryForm = new DelCategoryForm( $('#del-cat-menu') );
	var editBookmarkForm = new EditBookmarkForm( $('#add-edit-bm-menu') );
	var categoriesModel = new CategoriesModel();
	var bookmarksModel = new BookmarksModel();

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
			editBookmarkForm.show($choosedItem);
		})
		.on('click', '#save-bm-btn', function() {
			editBookmarkForm.save();
		})
		.on('click', '#cancel-bm-btn', function() {
			editBookmarkForm.hide();
		})
		.on('click', '.js-del', function() {
			var $choosedItem = $(this);
			deleteBookmark($choosedItem);
		});
	
});
