function CategoriesModel($document) {
		this.url = '/workspace/app/categories.php';
		this.items = [];
		this.$document = $document;
		this.getAll();
	}

CategoriesModel.prototype = {
	constuctor: CategoriesModel,
	getAll: function() {
		var _this = this;
		$.get(this.url, function(data) {
			_this.refresh(data);
		}, 'json');
	},
	refresh: function(data) {
		var _this = this;
		this.items = [];
		data.categories.forEach(function(item) {
			_this.items.push(item);
		});
		_this.$document.trigger('updated:categories', [data]);
	},
	create: function(newItem) {
		var _this = this;
		var data = {
			action: 'add',
			name: newItem.name,
			description: newItem.description
			}
		$.post(this.url, data, function(res){
			_this.refresh(res);
		}, 'json');
	},
	edit: function(newItem) {
		var _this = this;
		var data = {
			action: 'edit',
			id: newItem.id,
			name: newItem.name,
			description: newItem.description
		}
		$.post(this.url, data, function(res){
			_this.refresh(res);
		}, 'json');
	},
	delete: function(id) {
		var _this = this;
		var data = {
			action: 'delete',
			id: id
		}
		$.post(this.url, data, function(res){
			_this.refresh(res);
			alert('category deleted');
			_this.$document.trigger('deleted:categories');

		}, 'json');
	}
}