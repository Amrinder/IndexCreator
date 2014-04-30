function IndexCreator (config) {
  this.data = config.data;
  this.index = {};
  this.contentBox = null;
}

IndexCreator.prototype = {
  getIndex: function () {
    var data = this.data,
        length = data.length,
        i;
    
    for (i = 0; i < length; i++) {
      this._createIndex(data[i], i + 1);
    }
    
    return this.index;
  },
  
  getIndexHTML: function () {
    var index = this.index,
        indexHTML = '',
        keys = [],
        table,
		length, i;
		
    this.getIndex();
    keys = this._sortIndexKeys();
    length = keys.length;
    table = document.createElement('TABLE');
    
    for (i = 0; i < length; i++) {
        row = document.createElement("TR"),
        document.createElement("TR");
		var cell = row.insertCell(0);
		cell.innerHTML = keys[i];
		var cell1 = row.insertCell(1);
		cell1.innerHTML = index[keys[i]];
		table.appendChild(row);
    }
    return table;
  },
  
  _sortIndexKeys: function () {
    var keys = [],
      sorted_obj = {};
    
    for(var key in this.index){
        if(this.index.hasOwnProperty(key)){
            keys.push(key);
        }
    }
    return keys.sort();
  },
  
  _createIndex: function (data, pageNo) {
    var index = this.index,
        length, i;
    
    if (data.constructor === Array) {
      length = data.length;
      for (i = 0; i < length; i++) {
        this._createIndex(data[i], pageNo);
      }
      
    } else if (data.constructor === String) {
      var split = data.toLowerCase().split(' '),
        splitLength = split.length;
      
      for (i = 0; i < splitLength; i++) {
        if (!index.hasOwnProperty(split[i])) {
          index[split[i]] = [pageNo];
        } else {
          index[split[i]].push(pageNo);
        }
      }
    }
  }
};
