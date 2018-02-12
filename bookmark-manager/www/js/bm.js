$(document).ready(function(){

	var $document = $(document);

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

	function addFieldsToEditBm(chosenBookmarkData) {
		$('#edit-bookmark-name').val(chosenBookmarkData.name);
		$('#edit-bookmark-url').val(chosenBookmarkData.link);
		$('#edit-bookmark-description').val(chosenBookmarkData.description);
		$('#add-edit-bm-menu .select-categories').val(chosenBookmarkData.categoryid);
	}

	function clearFields() {
		$('#edit-bookmark-name').val('');
		$('#edit-bookmark-url').val('');
		$('#edit-bookmark-description').val('');
		$('#add-edit-bm-menu .select-categories').val(0);
	}

	function deleteBookmark($chosenItem) {
		var chosenBookmarkId = $chosenItem.siblings('.link').data('id');
		var delConfirm = confirm('do you want to delete the bookmark?');
			
		if(delConfirm) {
			bookmarksModel.delete(chosenBookmarkId);
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
	}

	EditCategoryForm.prototype = {
		constructor: EditCategoryForm,
		resetForm: function() {
			this.categoryId = undefined;
			this.$categorySelect.val(0);
			this.$categoryName.val('');
			this.$categoryDescription.val('');
		},
		show: function(isEdit){
			this.resetForm();
			this.$form.removeClass('no-active').addClass('active');
			if(isEdit) {
				this.$categorySelect.removeClass('no-active').addClass('active');
			} else {
				this.$categorySelect.removeClass('active').addClass('no-active');
			}
		},
		hide: function(){
			this.$form.removeClass('active').addClass('no-active');
		},
		save: function(){
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
		},
		selectCategory: function(){
			this.categoryId = this.$categorySelect.val();
			var _this = this;
			if(!+this.categoryId) {
				this.resetForm();
				return;
			}
			categoriesModel.items.find(function(item) {
				if(+_this.categoryId === +item.id) {
					_this.$categoryName.val(item.name);
					_this.$categoryDescription.val(item.description);
					return true;
				} 
			});
		}
	};

	function DelCategoryForm($form) {
		this.$form = $form;
		this.categoryId = undefined;
		this.categorySelect = this.$form.find('.select-categories');
	}

	DelCategoryForm.prototype = {
		constructor: DelCategoryForm,
		show: function() {
			this.$form.removeClass('no-active').addClass('active');
		},
		hide: function() {
			this.$form.removeClass('active').addClass('no-active');
		},
		delete: function(){
			var delConfirm = confirm('do you want to delete the category?');
			this.categoryId = this.categorySelect.val(); //string
			
			if(delConfirm) {
				categoriesModel.delete(+this.categoryId);
			} else {			 
				alert('category is not delete');
			}
		}
	}

	function EditBookmarkForm($form) {
		this.$form = $form;
		this.bookmarkId = undefined;
	}

	EditBookmarkForm.prototype = {
		constructor: EditBookmarkForm,
		show: function($chosenItem) {
			var _this = this;
			var chosenBookmarkData;
			this.bookmarkId = $chosenItem.siblings('.link').data('id');

			if(this.bookmarkId) {
				chosenBookmarkData = bookmarksModel.items
					.find(function(item) {
						return +item.id === +_this.bookmarkId;
					});
			}

			if(chosenBookmarkData) {
				addFieldsToEditBm(chosenBookmarkData)
			} else {
				clearFields();
			}

			this.$form.removeClass('no-active').addClass('active');
		},
		hide: function() {
			this.$form.removeClass('active').addClass('no-active');
		},
		save: function() {
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
			}
			this.hide();
		}
	}

	
	var editCategoryForm = new EditCategoryForm( $('#add-edit-cat-menu') );
	var delCategoryForm = new DelCategoryForm( $('#del-cat-menu') );
	var editBookmarkForm = new EditBookmarkForm( $('#add-edit-bm-menu') );
	var categoriesModel = new CategoriesModel($document);
	var bookmarksModel = new BookmarksModel($document);
	var models = {
		categories: categoriesModel,
		bookmarks: bookmarksModel
	};
	var dom = new Dom(models);
	var filter = new Filter();

	$document
		.on('updated:categories', function(e, data) {
			dom.refreshCategories(data);
			dom.refreshCategoriesSelects();
			filter.set();
		})
		.on('updated:bookmarks', function(e, data) {
			dom.refreshBookmarks(data);
			filter.set();
		})
		.on('deleted:categories', function(e, data) {
			bookmarksModel.getAll();

		});

	$document
		//*******CATEGORIES*******
		.on('click', '#side-menu .category', function() {
			var $chosenItem = $(this);
			filter.set($chosenItem);
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
			var $chosenItem = $(this);
			editBookmarkForm.show($chosenItem);
		})
		.on('click', '#save-bm-btn', function() {
			editBookmarkForm.save();
		})
		.on('click', '#cancel-bm-btn', function() {
			editBookmarkForm.hide();
		})
		.on('click', '.js-del', function() {
			var $chosenItem = $(this);
			deleteBookmark($chosenItem);
		});
	
});

