/**
 * JavaScript 代理模式
 * 简单模仿ExtJS
 * 关于call与apply方法的区别
 * foo.call(this, arg1,arg2,arg3) == foo.apply(this, arguments)==this.foo(arg1, arg2, arg3)
 * 当参数明确时可用call, 当参数不明确时可用apply给合arguments
 */
(function(){
	
	//定义命名空间
	var Ext = Ext||{};
	Ext.data = Ext.data||{};
	
	//建立model
	Ext.data.Model = function(fields){
		this.fields = fields;
	}

    //建立Store
	/**
	 * model 模型
	 * proxy 代理
	 */
	Ext.data.Store = function(model,proxy){
		//数据载体
		var data = [];
		this.model = model;
		this.proxy = proxy;
		
		//加载数据
		this.load = function(){
			var _data = this.proxy.request();
			for (var i = 0; i < _data.length; i++) {
				var _o = {};
				for (var j = 0; j < this.model.fields.length; j++) {
					_o[this.model.fields[j]["name"]] = _data[i][this.model.fields[j]["name"]];
				}
				data.push(_o);
			}
		}
		//根据索引得到model
		this.getAt = function(index){
			return data[index];
		}
		//得到model的数量
		this.getCount = function(){
			return data.length;
		}
		//清除所有的数据
		this.removeAll = function(){
			data = [];
		}
		//遍历
		this.each = function(fn,scope){
			for (var i = 0; i < data.length; i++) {
				if(scope){
					fn.call(scope,data[i]);
				}else{
					fn.call(this,data[i]);
				}
			}
		}
	}
	
	//定义Ajax的本体
	Ext.Ajax = Ext.Ajax||function(){};
	Ext.Ajax.prototype.request = function(type,extraParams,method,url){
		//1.得到跨浏览器的XHR对象
		//2.验证请求的状态等复杂的操作
		//3.那么我们认为这个本体是一个大型复杂的对象
		//4.应该在这里使用惰性代理
		return [{id:"0001",name:"ExtJs"},{id:"0002",name:"Java"}];
	}
	
	//代理类
	Ext.Ajax.proxy = function(){
		var _ajax = null;
		//构造函数
		var _init = function(){
            if(!_ajax){
            	_ajax = new Ext.Ajax();
			}
		}
		
		this.request = function(type,extraParams,method,url){
			_init();
			return _ajax.request(type,extraParams,method,url);
		}
	}
	
	//测试
	var person = new Ext.data.Model([{name:"name"},{name:"id"}]);
	var personStore = new Ext.data.Store(person,new Ext.Ajax.proxy());
	personStore.load();
	alert(personStore.getCount());
	personStore.each(function(model){
		document.write(model.name+"<br>");
		
	})
})()
