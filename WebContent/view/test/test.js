/**
 * JS测试
 */
/***************************************JS 类 对象 start*******************/

/**
 * JavaScript 中利用函数定义类
 * 函数就是类
 * 用new 关键字来实例化类 变成对象
 */

//定义一个类 
function Computer(name,size){
	var type = "i5 4.9GHZ";  //私有属性
	var version = function(){ //私有方
		
	}
	this.name = name ; //公有属性
	this.size = size;  //公有属性
	this.run = function(){ //公有方法
		alert("computer is running");
	}
}

Computer.x = "1024"; //静态属性
Computer.show = function(){ //静态方法
	
}


//实例化一个对象
var computer = new  Computer("hongji","14*14");
computer.run();



var Mouse = {}; //定义一个单体{其实是一个对象}

/***************************************JS 类 对象 end*******************/


/***************************************JS 原型模式 start*******************/

/**
 * 1.原型是一个对象，其它的对象可以通过它 来实现属性的继承
 * 所有的对象默认情况的下都有一个原型，因为原型本身也是一个对象，所以一个类真正的原型是被类内部的[prototype]属性所持有
 * 
 * 2.什么是对象
 * 一个任何无序的键值对的集合  function  var o ={}
 * 如果它不是主数据类型（undefind , boolean, number ,String ,null）,其它的通通的叫对象
 * 
 */

/**
 * js 的原型（prototype）是函数（function）紧密相连的。
 * 
 * 问：var o = {} 他不是用function 它有原型吗
 * 答：必须有 是： __proto__ 属性
 * 
 * 并且每一个用new 关键字生成出来的对象都有一个 __proto__ 属性，这个属性保存了创建它的构造函数的prototype的原型的引用
 * 
 */

function Shop(){}; //定义一个空对象

Shop.prototype.name = "cat"; //原型属性
Shop.prototype.show = function (){ //原型方法
	alert(this.name);//this 代表调用该方法且被实例化的对象
}



var Sell = {}; //定义对象
//显式
Object.getPrototypeOf(Sell).name = "zhangsan";
Sell.__proto__.heigth= 100;

//隐式
Sell["size"] = "100";
Sell.show = function(){
	
}


//js 简单继承1-------------

function A(name){
	this.name = name ;
	this.show = function(){
		
	}
}
A.prototype.size ="10";

var B = {};
//只继承原型
B.__proto__ = A.prototype;

B.size;
//B.show();  只继承原型 不可调用




//js 简单继承2-------------
function C(name){
	this.name = name ;
	this.show = function(){
		
	}
}
C.prototype.size ="10";

var D = {};
//完全继承
D.__proto__ = new C("ss");
D.__proto__.constructor = D;


D.size;
D.show();




/***************************************JS 原型模式 end*******************/




/***************************************JS继承start*******************/
function Car(carName){
	this.carName = carName;
	this.runSpeed =function(){
		console.log(100);
	}
}

function Fcar(carMaster,carName){
	this.carMaster = carMaster;
	this.runFly = function(){
		console.log("fly");
	}
	Car.call(this, carName);
}

Fcar.prototype = new Car();
Fcar.prototype.constructor = Fcar;

var fcar = new Fcar("zhangsan", "qq");
fcar.runSpeed();
fcar.runFly();

var car = new Car("ss");


var ss  = {}
/***************************************JS继承end*******************/


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




/***************************************JS 命名规范方式封装 start*******************/

function Person(name,age,email){
	this._name;
	this._age;
	this.setName(name);
	this.setName(age);
	this.email = email;
}

Person.prototype = {
		setName : function(name){
			this._name = name;
		},
		setAge : function(age){
			if(age<0 || age >150)
				throw new Error("age must be 0-150!");
			else
				this._age = age;
		},
		getName : function(){
			return this._name || "name";
		},
		getAge : function(){
			return this._age || 0;
		}
}

var p = new Person("zhangsan", 10, "sss@aa.com")
//p.setAge(-1);

/***************************************JS 命名规范方式封装 end*******************/



/***************************************JS 闭包方式封装 start*******************/
function Teacher(name,age,email,sex){
	this.email = email;  //公有的属性
	
	this.getName = function(){
		return this.name;
	}
	
	this.getAge = function(){
		return this.age; 
	}
	
	//显示调用（隐含声明）
	this.setName = function(name){
		this.name = name;   //私有的属性
	}
	
	this.setAge = function(age){
		if(age < 0 || age > 150){
			throw new Error("age must be 0-150");
		}else{
			this.age = age;  //私有属性
		}
	}
	
	var _sex = "M"; //私有属性
	this.setSex = function(sex){
		_sex = sex;
	}
	this.getSex = function(){
		return _sex;
	}
	
	this.init = function(){
		this.setName(name);
		this.setAge(age);
		this.setSex(sex);
	}
	this.init();
}


var t = new Teacher("zhangsan", 10, "qq@dsd.com", "W");

/***************************************JS 闭包方式封装 end*******************/





/***************************************JS 静态方法 start*******************/

/**
 * 普通属性和函数是作用在对象上的
 * 静态属性和函数是作用在类上的
 */
function Student(name,age){
	this.name = name;  //普通属性
	this.age = age ;   //普通属性
	this.say = function(){  //普通函数
		console.log("hei nihao");
	}
}

Student.type = "person"; //静态函数

Student.add = function(x,y){  //静态函数
	return x+y;
}



alert(Student.add(10,5) + ">--" + Student.type);

/**
 * 用类中类的方式完成每一个对象全拥有相同的属性和函数
 */

var School = (function(){
	
	var ADRESS = "CHANGZHOUSHI";
	var teach = function(){
		return "dsd";
	}
	
	return function(){
		this.ADRESS = ADRESS;
		this.teach = function(){
			return teach();
		}
	}
	
})();

alert(new School().ADRESS+">--"+new School().teach());

/***************************************JS 静态方法 end*******************/



/***************************************JS 单体模式 start*******************/

//普通单体 ，用来区分命名空间
var Single = {
		name: "zhangsan",
		size: 100,
		show: function(){
			
		}
}

//具有局部变量的强大的单体

function Ajax(){}
Ajax.request = function(url,fn){
	if(true){
		fn("aa","bb");
	}
}
 var UserInfo = (function(){
	 //闭包 私有变量
	 var name = "";
	 var sex = "";
	 //获得数据
	 Ajax.request("url",function(n,s){
		 name = n;
		 sex = s;
	 });
	 
	 return {
		 name :name,
		 sex:sex
	 }
	 
 })();

 alert(UserInfo);
//惰性单体
 
 
 
 
 function Ajax2(){}
 Ajax2.request = function(url,fn){
 	if(true){
 		fn("aa","bb");
 	}
 }
  var UserInfo2 = (function(){
	 var userinfo = "";
	 function init(){
		//闭包 私有变量
	 	 var name = "";
	 	 var sex = "";
	 	 //获得数据
	 	 Ajax2.request("url",function(n,s){
	 		 name = n;
	 		 sex = s;
	 	 });
	 	 
	 	 return {
	 		 name :name,
	 		 sex:sex
	 	 }
	 }
 	 
	 return {
		 getInstance : function(){
			 if(userinfo){
				 return userinfo;
			 }else{
				 userinfo = init();
				 return userinfo;
			 }
		 }
	 }
 	 
  })();

  alert(UserInfo2.getInstance.name);

//分支单体

var screenWidth = window.screen.width;
var screenHeigth = window.screen.heigth;

var pinfo = (function(){
	var $1024768 ="122";
	var $1428976 ="123";
	if(screenHeigth==1024){
		return $1024768;
	}else{
		return $1428976;
	}
})();

alert(pinfo);

/***************************************JS 单体模式 end*******************/

/**
 * function 关键字定义
 * 
 * function A(){};
 * A.add = function(){};  //静态
 * A.prototype.show = function(){};   //注入到原型
 * 
 * 
 * 函数的静态方法和属性在没有实例化对象就可以调用，有且只有一份，即只被实例化一次，在A.add = function(){};被js解释时实例化 
 * 
 * 调用方式 ： A.add();   这样是调不到的 :new A().add();
 * 
 * 
 * 函数的原型方法和属性只有函数在实例化以后才能被调用，有且只有一份，只被实例化一次，
 * 在每实例化一次（new A()）时只不过是多了一个指针指向了自己的引用而已，并没有在重新实例化，
 * 在A.prototype.show = function(){};被js解释时实例化
 * 
 * 调用方式 ： new A().show()    这样是调不到的 :A.show();
 * 
 * 
 * 单例定义
 * 
 * var B = {size:"100"};  //静态或者叫普通
 * 
 * B.__proto__.show = function(){};  //注入到原型
 * Object.getPrototypeOf(B).name = "zhangsan"; //注入到原型
 * 
 * B.add = function(){}; //静态
 * B['run'] = function(){}; //静态
 * 
 * 由于是单例模式，var B = {size:"100"}; 已经被实例化了，在调用方式上，无区别，因为定义和实例化，一次性解释完成
 * 
 * 
 * 并且由于js是解释性语言，对象定义后静态完全是假静态，可以完全在任何地方对象被重构，不像其它高级语言一旦定义，不能被对象重构
 * 
 * 
 */






