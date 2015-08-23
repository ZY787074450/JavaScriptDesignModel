/**
 * JavaScript 装饰者模式
 */

(function(){
	
	//定义接口
	var CarShopDao = new Interface("CarShopDao",["getPrice","assemble"]);
	
	var CarShopImpl  = function(){
		
		var price = 15000;
		this.getPrice = function(){
			return price;
		}
		
		this.assemble = function(){
			document.write("组装....<br>");
		}
		//校验接口
		Interface.enSureImplements(this,CarShopDao);
	}
	
	//装饰音响K
	var K = function(carShop){
		this.getPrice = function(){
			return carShop.getPrice()+1000;
		}
		this.assemble = function(){
			carShop.assemble();
			document.write("组装装饰音响K....<br>");
		}
		//校验接口
		Interface.enSureImplements(this,CarShopDao);
		
	}
	
	//装饰真皮沙发M
	var M = function(carShop){
		this.getPrice = function(){
			return carShop.getPrice()+3000;
		}
		this.assemble = function(){
			carShop.assemble();
			document.write("组装装饰真皮沙发M....<br>");
		}
		//校验接口
		Interface.enSureImplements(this,CarShopDao);
		
	}
	
	//装饰保险杠N
	var N = function(carShop){
		this.getPrice = function(){
			return carShop.getPrice()+2000;
		}
		this.assemble = function(){
			carShop.assemble();
			document.write("组装装饰保险杠N....<br>");
		}
		//校验接口
		Interface.enSureImplements(this,CarShopDao);
		
	}
	
	
	var car = new K(new M(new N(new CarShopImpl())));
	alert(car.getPrice());
	car.assemble();

})()
