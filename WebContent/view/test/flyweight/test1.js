/**
 * JavaScript 享元模式
 */

(function(){
	
	/**
	 * 汽车类
	 * 属性：
	 * 制造者
	 * 品牌
	 * 生产日期
	 * 拥有者
	 * 车牌
	 * 最后一次检修时间
	 * 
	 */ 
	var Car = function(make,brand,makeDate,owner,idCard,lastServiceDate){
		this.make = make;
		this.brand = brand;
		this.makeDate = makeDate;
		this.owner = owner;
		this.idCard = idCard;
		this.lastServiceDate = lastServiceDate;
		this.getMake = function(){
			return this.make;
		}
	}
	
	
	
	//非享元模式
	var productCar = function(count){
		this.count = count;
		this.proCar = function(){
			var arr = new Array();
			for (var i = 0; i < this.count; i++) {
				arr.push(new Car("奇瑞", "QQ", "2015-08-21", "zhangsan", "苏D123456", "2015-08-22"));
			}
		}
	}
	
	
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
	
	new PublicTestTimeDecorator(new productCar(451000)).testTime("proCar");
	
	

})()
