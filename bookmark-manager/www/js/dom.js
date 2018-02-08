function Dom(models) {
	this.models = {
		categories: models.categories,
		bookmarks: models.bookmarks
	};
}

Dom.prototype = {
	constructor: Dom,
	addBookmark: function(bookmark) {
		var bookmarkHTML = '<div class="bookmark-box">' + 
        		'<a class="edit js-del"><span class="icon-bin"></span></a>' +
        	   	'<a class="edit js-edit-bm"><span class="icon-pencil"></a>' +
        		'<a class="link" href="' + bookmark.link + '"' +
        		' data-id="' + bookmark.id + 
        		'" data-categoryid="' + bookmark.categoryid + '">' + 
        		bookmark.name + '</a>' +
      		'</div>';
      	$('#bookmarks .add-bookmark-box').before(bookmarkHTML);
	},
	refreshCategories: function(data) {
		var $categories = $('#side-menu .categories');
		$categories.html('');
		var overallCategory = '<li><a class="category" data-id="0">All</a>' + 
		'</li>';
		var editBtn = '<div class="btn-box">' +
				'<a class="edit-category-btn js-del-cat"><span class="icon-bin"></span></a>' +
				'<a class="edit-category-btn js-edit-cat"><span class="icon-pencil"></span></a>' +
				'<a class="edit-category-btn js-add-cat"><span class="icon-plus"></span></a>' +
			'</div>';

		$categories.append(overallCategory); 

		data.categories.forEach(function(category) {
			var categoryHTML = '<li><a class="category" data-id="' + 
			category.id + '">' + category.name + '</a></li>';
			$categories.append(categoryHTML);
		});

		$categories.append(editBtn);
	},
	refreshCategoriesSelects: function() {
		$('.select-categories option').remove();
		this.models.categories.items.forEach(function(item) {
			var newOptionHTML = '<option value="' + item.id + '">' + item.name + '</option>';
			$('.select-categories').append(newOptionHTML);
		});
	},
	refreshBookmarks: function(data) {
		var _this = this;
		$('#bookmarks .bookmark-box').remove(); //del all bookmarks
		data.bookmarks.forEach(function(bookmark) { //add all bookmarks from serv
			_this.addBookmark(bookmark);
		});
	}
}