/**
 * javaScript 观察者模式
 * 分为两个角色
 * 1.观察者 2.被观察者
 * 观察者模式的目的对程序的内部变化进行观察，当其有变化的时候，
 * 你可以得知，并且可以做出相应的反应
 * 
 */

/**
 * 需求：
 * 模拟订阅者（观察者）和报社之间的关系
 * 实际的操作分为推送模式和拿模式
 * 推送 --》长连接
 * 拿去 --》定时去后台取得
 * 
 */

//报社
function NewspaperOffice(name){
	this.name = name;
	//订阅者的集合
	this.subscribers = new Array();
}

//报社发送方法（推送模式）
NewspaperOffice.prototype.delive = function(news){
	var self = this;
	//给每个订阅者发送新闻
	this.subscribers.forEach(function(fn){
		//调用接收者（观察者）处理信息的函数,传入新闻和报社的作用域（对象）
		fn(news,self);
	});
	
}

//扩展报社订阅方法
Function.prototype.subscribe = function(publisher){
	var that = this;
	//是否已经订阅
	var alreadExists = publisher.subscribers.some(function(el){
		//处理重复订阅
		if(el == that){
			return;
		}
	});
	//没有订阅的话，你就可以订阅
	if(!alreadExists){
		publisher.subscribers.push(that);
	}
	return this;
}

//扩展报社取消订阅方法
Function.prototype.unSubscribe = function(publisher){
	var that = this;
	publisher.subscribers = publisher.subscribers.filter(function(subscriber){
		if(subscriber == that){
			return false;
		}else{
			return true;
		}
	});
	return this;
}


//创建报社
var NewsCCTV = new NewspaperOffice("CCTV");
var NewsGFB = new NewspaperOffice("国防部报社");

//发布
//门面模式注册事件
function addEventFacade(el,type,fn){
	if(window.addEventListener){
		//fireFox
		el.addEventListener(type, fn, false);
	}else if(window.attachEvent){
		el.attachEvent("on"+type, fn);
	}else{
		el["on"+type] = fn;
	}
}

//主应用函数
var init = function(){
	var oberserver = function(news){
		document.getElementById("info").value = "我发现了："+"["+arguments[1].name+"] 发来的信息 ==》"+news;
	}
	//订阅
	oberserver.subscribe(NewsCCTV).subscribe(NewsGFB);
	addEventFacade(document.getElementById("cctv"),"click",function(){
		//NewsCCTV报社发消息了
		NewsCCTV.delive(document.getElementById("cctvText").value);
	});
	addEventFacade(document.getElementById("gfb"),"click",function(){
		//NewsGFB报社发消息了
		NewsGFB.delive(document.getElementById("gfbText").value);
	});
}

init();












