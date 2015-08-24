
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
 *  };
 *	this.sing = function(){
 *	};
 *	this.han = function(){
 *	};
 *	Interface.enSureImplements(this,dogDao,catDao);
 * }
 * var animal = new Animal();
 * animal.run();
 * animal implements dogDao,catDao two interface
 * 
 */
function Interface(name,methods){
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

/**
 *  Define extends 
 *  This is a complete inheritance, including ordinary attributes, methods,
 *  static attributes, methods, and prototype attributes,methods, 
 *  as well as the prototype chain all be inherited.
 *  It is important to note that unless it is absolutely will not change the attributes, methods, 
 *  and must not be registered on the prototype of the parent class.
 *  For Instance: F extends E
 *  function E(name){
 *		this.name = name;
 *	};
 *	E.prototype.run = function(){
 *		alert("run e !");
 *	};
 *	Extends(E, F);
 *	function F(name,size){
 *		F.superClass.constructor.call(this,name);
 *		this.size = size;
 *	};
 *	F.prototype.show = function(){
 *		alert("show f !");
 *	};
 * @param superClass
 * @param subClass
 */
function Extends(superClass,subClass){
	var  F = function(){};
	F.prototype = superClass.prototype;
	subClass.prototype =  new F();
	subClass.prototype.constructor = subClass;
	subClass.superClass = superClass.prototype;
	if(superClass.prototype.constructor == Object.prototype.constructor){
		superClass.prototype.constructor = superClass;
	}
};

/**
 * The prototype of the function extension
 * @param name
 * @param fn
 */
Function.prototype.method = function(name,fn){
	this.prototype[name] = fn;
	return this;
}

/**
 * Filter function for array extension
 */
if(!Array.prototype.filter){
	Array.method("filter",function(fn,thisObj){
		var scope = thisObj || window;
		var arry = [];
		for (var i = 0; i < this.length; i++) {
			if(fn.call(scope,this[i],i,this)){
				arry.push(this[i]);
			}
		}
		return arry;
	});
	
}



