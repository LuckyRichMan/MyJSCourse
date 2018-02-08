function BookmarksModel($document) {
		this.url = '/workspace/app/bookmarks.php';
		this.items = [];
		this.$document = $document;
		this.getAll();
	}

BookmarksModel.prototype = {
	constructor: BookmarksModel,
	refresh: function(data) {
		var _this = this;
		this.items = [];
		data.bookmarks.forEach(function(item) {
			_this.items.push(item);
		});
		_this.$document.trigger('updated:bookmarks', [data]);
	},
	getAll: function() {
		var _this = this;
		$.get(this.url, function(data) {
			_this.refresh(data);
		}, 'json');
	},
	create: function(newItem) {
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
			alert('bm added'); 
		}, 'json');
	},
	edit: function(newItem, id) {
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
	},
	delete: function(id) {
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
}