/***************************************JS注释接口start*******************/
/**
 * 注释接口
 * interface Map(){
 *      function put(key);
 *      function remove(key);
 *      function get(key);
 * } 
 */

//注释实现  interface Map
/**
 * HashMap implements Map;
 */
var HashMap = function(){}

HashMap.prototype.put = function(key){
	//TODO
}
HashMap.prototype.remove = function(key){
	//TODO
};
HashMap.prototype.get = function (key){
	//TODO
};


/***************************************JS注释接口end*******************/


/***************************************JS属性检验接口start*******************/
/**
 * 属性检验接口
 * interface List(){
 *      function add(key);
 *      function remove(key);
 *      function get(key);
 * } 
 */

/**
 * HashMap implements Map;
 */
var ArrayList = function(){
	this.interfaceImplements = ["List"];
};

ArrayList.prototype.put = function(key){
	//TODO
};
ArrayList.prototype.remove = function(key){
	//TODO
};
ArrayList.prototype.get = function (key){
	//TODO
};

/**
 * 属性检验方法
 * 实现返回true
 */
function Impl(object){
	for (var i = 1; i < arguments.length; i++) {
		var implName = arguments[i],implement = false;
		for (var j = 0; j < object.interfaceImplements.length; j++) {
			if(implName == object.interfaceImplements[j]){
				implement = true;
				break;
			}
		}
		if(implement){
			return true;
		}
	}
	return false;
}

/**
 * 方法检验
 * @param key
 */
function addKey(key){
	var List = new ArrayList();
	if(Impl(List,"List")) 
		List.put(key);
	else
		throw new Error("ArrayList没有实现List");
}
//调用
addKey("sss");

/***************************************JS属性检验接口 end*******************/



/***************************************JS鸭式变形法接口start*******************/

/**
 * Define an interface.
 * This Class be used define Interface.
 * For Instance: 
 * var dogDao = new Interface("dogDao", ["run","eat","sing"]);
 * var catDao = new Interface("catDao", ["goto"]);
 * function Animal(){
 *	this.run = function(){
 *		alert("boo run!");
 *	};
 *	this.eat = function(){
 *	    //TODO
 *    };
 *	this.sing = function(){
 *		//TODO
 *	};
 *	this.han = function(){
 *		//TODO
 *	};
 *	//校验
 *	Interface.enSureImplements(this,dogDao,catDao);
 * }
 * var animal = new Animal();
 * animal.run();
 * animal implements dogDao,catDao two interface
 * 
 */
var Interface = function(name,methods){
	if(arguments.length <2) 
		throw new Error("Parameters must be more than one!");
	this.name = name;
	this.methods = [];
	for (var i = 0; i < methods.length; i++) {
		if(typeof methods[i] != "string")
			throw new Error("methods name is must String!");
		else
			this.methods.push(methods[i]);
	}
}


/**
 * Define an interface of static methods.
 * Used to verify an interface is interface type.
 * @param object   In general,in the find call this class.So,generally is this.
 * @param arguments You define interface, may be multiple.
 */
Interface.enSureImplements = function(object){
	if(arguments < 2)
		throw new Error("paramters must be more than one!");
	for (var i = 1; i < arguments.length; i++) {
		var interf = arguments[i];
		if(interf.constructor != Interface)
			throw new Error("Arguments object constructor must is Interface type!");
		for (var j = 0; j < interf.methods.length; j++) {
			var method = interf.methods[j];
			if(!object[method] || typeof object[method] != "function")
				throw new Error("InterfaceImpl is not implements all methods!");
		}
	}
}

//应用

var dogDao = new Interface("dogDao", ["run","eat","sing"]);
var catDao = new Interface("catDao", ["han"]);

function Animal(){
	
	this.run = function(){
		alert("I am runing!");
	};
	this.eat = function(){
			
    };
	this.sing = function(){
		
	};
	this.han = function(){
		
	};
	//校验
	Interface.enSureImplements(this,dogDao,catDao);
}

var animal = new Animal();
animal.run();
/***************************************JS鸭式变形法接口end*******************/
