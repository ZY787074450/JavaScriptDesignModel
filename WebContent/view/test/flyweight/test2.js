/**
 * JavaScript 享元模式
 * 享元模式（FlyWeight）：享元模式以共享的方式高效地支持大量的细粒度对象，享元模式能做到共享的关键是内蕴状态和外蕴状态。
 * 有效减少空间复杂度，以时间换空间(内存)
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
	
	
	//**********************享元模式**********************start********************************
	//汽车的内在属性
	var Car = function(make,brand,makeDate){
		this.make = make;
		this.brand = brand;
		this.makeDate = makeDate;
	}
	
	
	//工厂
	var CarFactory = function(){
		this.creatCar = function(make,brand,makeDate){
			var _car = {};
			if(_car[make+brand+makeDate]){
				return _car[make+brand+makeDate];
			}else{
				var _ca = new Car(make, brand, makeDate);
				_car[make+brand+makeDate] = _ca;
				return _ca;
			}
		}
	}
	
	
	//汽车包装函数，包装外在属性
	var CarInfo = function(){
		var _factory = new CarFactory();
		this.createCar = function(make,brand,makeDate ,owner,idCard,lastServiceDate){
			var _car = _factory.creatCar(make,brand,makeDate);
			_car["owner"] = owner;
			_car["idCard"] = idCard;
			_car["lastServiceDate"] = lastServiceDate;
			_car["getMake"] =  function(){
				return _car["make"];
			}
			return _car;
		}
	}
	//**********************享元模式**********************end********************************
	
	
	
	//循环产生汽车
	var productCar = function(count){
		this.count = count;
		this.proCar = function(){
			var arr = new Array();
			var carinfo = new CarInfo();
			for (var i = 0; i < this.count; i++) {
				arr.push(carinfo.createCar("奇瑞", "QQ", "2015-08-21", "zhangsan", "苏D123456", "2015-08-22"));
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
	
	//测试
	new PublicTestTimeDecorator(new productCar(451000)).testTime("proCar");
	
	

})()
