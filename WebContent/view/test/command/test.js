/**
 * javaScript 命令模式
 * 用于消除调用者和接受者之间的直接的耦合模式
 * 并且可以对调用这个过程进行留痕操作
 * 《使用注意事项》
 * 请勿乱用这个模式，因为他会使你简单的调用方法变得复杂，并且难以理解，一般的程序员难以驾驭
 * 《应用场景》
 * 当你的业务出现（回退操作）（重做操作）时，请务必考虑该模式
 * 
 */

/**
 * 需求：
 * 1.有一个添加新流程按钮，点击时，就会添加一个新的文本描述
 * 2.有"返回"和"重做"按钮
 */

//主应用程序
function Manager(){
	this.addFlow = function(id,text){
		var div = document.getElementById("div01");
		var newflow = document.createElement("div");
		newflow.setAttribute("id",id); 
		newflow.innerHTML = text;
		div.appendChild(newflow);
	}
	this.reBack = function(div){
		var all = div.childNodes;
		div.removeChild(all[all.length-1]);
	}
}

//为对象建立命令访问库
Manager.prototype.extcute = (function(){
	/**
	 * command 命令对象
	 */
	return function(command){
		return this[command.dome](command.id,command.value);
	}
})();

//为对象建立命令访问库
Manager.prototype.extcuteBack = (function(){
	return function(div){
		return this["reBack"](div);
	}
})();

//初始化主应用程序
var manager = new Manager();
//建立储存命令对象的集合
var commands = new Array();
//集合的游标（索引）
var index = commands.length;

//定义客户端
var API = function(){
	//新增流程
	this.addFlow = function(){
		//封装命令
		var command = {
				id:new UUID().createUUID(),
				value:document.getElementById("flow").value,
				dome:"addFlow"
		};
		//保存命令
		commands.push(command);
		//重新定位游标
		index = commands.length;
		//调用
		manager.extcute(command);
	}
	
	//回退
	this.reBack = function(){
		if(index-1 < 0){
			alert("Is Last ,can not back!");
		}else{
			var div = document.getElementById("div01");
			//调用
			manager.extcuteBack(div);
			//重新定位游标
			index = index-1;
		}
	}
	
	//重做
	this.again = function(){
		if(index+1 > commands.length){
			alert("Is First ,can not redo!");
		}else{
			//调用
			manager.extcute(commands[index]);
			//重新定位游标
			index = index+1;
		}
	}
}

var api = new API();

key("d",function(){
	api.reBack();
});

key("b",function(){
	api.again();
});







