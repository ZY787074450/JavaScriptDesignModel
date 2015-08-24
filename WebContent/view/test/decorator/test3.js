/**
 * JavaScript 装饰者模式
 * 不仅可以用在类上，还可以用在函数上
 */

(function(){
	
	//被测试者函数
	function PrintEach(count){
		this.count = count;
		this.print = function(){
			for (var i = 0; i < this.count; i++) {
				document.write(i+"<br>");
			}
		}

	}
	
	//写一个装饰者函数，函数的目的在于测试目标函数的性能，针对某一个函数写的
	function simperDecorator(obj){
		this.obj = obj ;
		this.testTime = function(){
			var stime = new Date().getTime();
			this.obj.print();
			var etime = new Date().getTime();
			alert(etime-stime);
		}
	}
	
	//测试
	var pe = new PrintEach(1000);
//	new simperDecorator(pe).testTime();
	
	
	//写一个装饰者函数，函数的目的在于测试目标函数的性能，针对所有函数写的
	var PublicTestTimeDecorator = function(obj){
		this.obj = obj;
		this.testTime = function(methodName){
			var self = this;
			var method = obj[methodName];
			//如果是函数，就进行装饰
			if(typeof method == "function"){
				var stime = new Date().getTime();
				method.apply(self.obj,arguments);
				var etime = new Date().getTime();
				alert(etime-stime);
			}
		}
	}
	
	//测试
	new PublicTestTimeDecorator(pe).testTime("print");
	
	/**
	 * apply类似java的反射和内省
	 * call 也有此功效
	 */

})()
