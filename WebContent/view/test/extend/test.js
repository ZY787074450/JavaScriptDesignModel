
/**
 * JavaScript  继承
 */

//定义一个类 


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

/***************************************JS继承end*******************/

/**
 * 实现完全继承
 */
function Extends(superClass,subClass){
	
	//定义一个中间类用来转换父子类之间的关系
	var  F = function(){};
	
	//建立f与父类的关系
	F.prototype = superClass.prototype;
	
	//建立f与子类的关系
	subClass.prototype =  new F();
	subClass.prototype.constructor = subClass;
	
	//为子类增加一个属性，用来存储父类的原型。为了不要在B中再写这样的语句   A.call(this,name);  
	//在B中就可以这样写  B.superClass.constructor.call(this.name); 
	subClass.superClass = superClass.prototype;
	
	//增加一个保险，用来降低父类的构造函数级别
	if(superClass.prototype.constructor == Object.prototype.constructor){
		superClass.prototype.constructor = superClass;
	}
};


function E(name){
	this.name = name;
};
E.prototype.run = function(){
	alert("run e !");
};


Extends(E, F);

function F(name,size){
	F.superClass.constructor.call(this,name); //调用父类的构造方法，以继承父类的普通属性和传参数
	this.size = size;
	
};

F.prototype.show = function(){
	alert("show f !");
};


