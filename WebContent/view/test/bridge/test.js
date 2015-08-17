/**
 * JavaScript  桥梁模式
 */


/**
 * 桥梁模式的作用在于：
 * 实现API和客户端的松耦合
 * 将抽象与实现隔离开来，以便两者独立变化,类似于MVC
 */

//公共方法，API
function printName(name){
	console.log(this.name);
};

//业务方法，客户端
function printBusinessName(name){
	//业务操作
	console.log("business start ...");
	//桥梁方法
	printNameBridge(name);
	//业务操作
	console.log("business end...");
};

//桥梁
function printNameBridge(name){
	printName(name);
}


//***********************************************桥梁模式的特权函数*****************

var p = function(){
	var add = function(x,y){
		//复杂的数学操作....
	}
	
	//建立一个特权函数，是指调用方便，全封闭的类，它内部进行复杂的操作
	this.bridge = function(){
		return {
			bridgeAdd:function(){
				//复杂的数学操作....
				add();
				//复杂的数学操作....
			}
		}
	}
}

//**********************************************桥梁可以多个类的进行桥接（链接）***********

function class1(a,b){
	this.a = a;
	this.b = b;
}

function class2(c){
	this.c = c;
}

function bridgeClass(a,b,c){
	this.one = new class1(a,b);
	this.two = new class2(c);
}

//目的是class1和class2可以独立修改，不是门面模式，目的不同
