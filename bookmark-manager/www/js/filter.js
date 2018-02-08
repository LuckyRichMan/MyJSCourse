function Filter($chosenItem) {
	this.$chosenItem = $chosenItem;
	this.idCategory = undefined;
}

Filter.prototype = {
	constructor: Filter,
	showBookmarks: function() {
		$('.bookmark-box').fadeIn(0);
	},
	hideBookmarks: function() {
		var _this = this;
		$('.bookmark-box').each(function() {
			var $item = $(this);
			var itemId = $item.find('.link').data('categoryid');

			if(itemId !== _this.idCategory) {
				$item.fadeOut(0);
			}
		});
		if(this.idCategory === 0) {
			$('.bookmark-box').fadeIn(0);
		}
	},
	highlightCategory: function(idCategory) {
		var _this = this;
		$('#side-menu a').removeClass('active');
		$('#side-menu a').each(function() {
			var $item = $(this);
			var itemId = +$item.data('id');
			if(itemId === _this.idCategory) {
				$item.addClass('active');
			}
		});
		this.$chosenItem.addClass('active');
	},
	set: function($chosenItem) {
		if($chosenItem) {
			this.$chosenItem = $chosenItem;
			this.idCategory = +this.$chosenItem.data('id');
		}
		if(!this.idCategory) {
			this.$chosenItem = $('.categories .category:first');
			this.idCategory = +this.$chosenItem.data('id');
		}
		this.highlightCategory();
		this.showBookmarks();
		this.hideBookmarks();
		
	}
}