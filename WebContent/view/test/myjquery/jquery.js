/**
 * 
 * 模仿jQuery,利用链式调用
 * 
 * 
 */

//在function上原型注入函数method ，用来给函数原型上注入函数,并且可以进行链式调用
Function.prototype.method = function(fnName,fn){
	this.prototype[fnName] = fn;
	return this;
};

var _$ = function(els){};

_$.onready = function(obj,fn){
	if(obj){
		//注册到obj
		obj.$ = function(){
			return new _$(arguments);
		};
	}else{
		//注册到window
		window.$ = function(){
			return new _$(arguments);
		};
	}
	fn();
}

//注册函数
_$.method("addEvent",function(type,fn){
	fn();
}).method("getEvent",function(name,fn){
	fn();
});

//使用
var com = {};
_$.onready(com,function(){
	com.$("").addEvent("click",function(){
		alert("已经绑定事件");
	});
	
	
});

