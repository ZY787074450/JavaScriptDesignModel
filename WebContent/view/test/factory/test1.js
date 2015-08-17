/**
 * 1.工厂的目的是在于判别接口，并用那个类来实例化
 * 2.产生实例的过程，不用new 关键字
 * 3.最终达到的效果是：多态和类与类之间的松耦合
 */

//定义一个宠物接口
var Pet =  new Interface("Pet",["eat","run","sing","register"]);

//定义一个宠物店
var PetShop = function(){};
PetShop.prototype = {
    sellPet : function(kind){
		var pet ;
		switch (kind){
			case "dog":
				pet = new Dog();
				break;
			case "pig":
				pet = new Pig();
				break;
		    default:
		    	pet = new Cat();
		};
	    //验证接口
		Interface.enSureImplements(pet,Pet);
		pet.register();
		return pet;
	}
};

//宠物基类
function BasePet(){
	this.eat = function(){
		document.writeln("宠物在吃饭...");
	}
	this.register = function(){
		document.writeln("宠物在注册...");
	}
}

//宠物狗
function Dog(){
	Dog.superClass.constructor.call(this);
	this.run = function(){
		document.writeln("小狗在跑...");
	}
	this.sing = function(){
		document.writeln("小狗在唱歌...");
	}
	
}
//宠物猫
function Cat(){
	Cat.superClass.constructor.call(this);
	this.run = function(){
		document.writeln("小猫在跑...");
	}
	this.sing = function(){
		document.writeln("小猫在唱歌...");
	}
}
//宠物鸟
function Pig(){
	Pig.superClass.constructor.call(this);
	this.run = function(){
		document.writeln("小猪在跑...");
	}
	this.sing = function(){
		document.writeln("小猪在唱歌...");
	}
}

//完成继承
Extends(BasePet,Pig);
Extends(BasePet,Cat);
Extends(BasePet,Dog);

//调用宠物商店
var petshop1 = new PetShop();
var dog = petshop1.sellPet("dog");
dog.run();

/**
 * 看起来很完美，但是如果有个新宠物就要修改原来的类
 * 
 */

