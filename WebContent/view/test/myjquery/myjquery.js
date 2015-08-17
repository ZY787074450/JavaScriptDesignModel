/**
 * 函数的链式调用
 */

function A() {
	this.name =  "zhangsan";
	this.sex = "m";
	this.setName = function(name){
		this.name = name;
		return this;
	};
	
	this.getName = function(){
		return this.name;
	};
	
	this.setSex = function(sex){
		this.sex = sex;
		return this;
	};
	
	this.getSex = function(){
		return this.sex;
	};
	
}

var a = new A();
alert(a.setName("lishi").setSex("w").getName());





