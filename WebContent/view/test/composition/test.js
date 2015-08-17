
/**
 * JavaScript 门面模式
 */

/**
 * 门面模式的作用在于：
 * 简化类的接口
 * 消除类和使用本类的客户端的代码耦合
 * 把负载变得简单
 */
//*****************每个浏览器的对dom树的注册事件都是不同的，各个浏览器就是一个子系统************
function addEventFacade(el,type,fn){
	
	if(window.addEventListener){//火狐
		el.addEventListener(type,fn,false);
	}else if(window.attachEvent){ //IE
		el.attachEvent("on"+type,fn);
	}else {
		el["on"+type]=fn;
	}
}
document.write('<a href="#" id="ss">click</a>');
var el = document.getElementById("ss");
addEventFacade(el,"click",function(){
	alert("ok");
});


/**
 * 
 * 门面模式就是将各个复杂多个子系统组合成一个有固定功能的门面
 * 例如：应用在有多个接口上的
 * 
 */

//子系统1，接口1
var PersonDao = new Interface("PersonDao",["getInfo","leran","marry"]);
//子系统2，接口2
var DogDao = new Interface("DogDao",["getInfo","run"]);

function Person(name,sex){
	this.name = name;
	this.sex = sex;
    this.getInfo = function(){
    	return "<br>姓名:"+this.name+"<br>性别:"+this.sex;
    }	
	this.leran = function(){
		document.write(this.name+"在学习");
	}
	this.marry = function(){
		document.write(this.name+"在结婚")
	}
	Interface.enSureImplements(this,PersonDao);
}

function Dog(name){
	this.name = name;
	this.getInfo = function(){
		return "<br>狗狗的名字："+this.name;
	}
	this.run = function(){
		document.write(this.name+"在跑");
    }
	Interface.enSureImplements(this,DogDao);
}

//门面
function getDogFacade(p,d){
	var s = p.getInfo()+d.getInfo();
	this.str = s;
}
getDogFacade.prototype.action = function(){
	return this.str;
}


document.write(new getDogFacade(new Person("zhangsan", "man"),new Dog("wangcai")).action());












