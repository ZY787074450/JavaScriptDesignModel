/**
 * JavaScript 适配器模式
 */

(function(){
	
	
	//定义接口
	var Adapter = new Interface("Adapter",["add"]);
	
	
	//类库一
	var Lib1Dao = new Interface("Adapter",["add"]);
	
	var Lib1Impl = function(){
		this.add = function(x,y){
			return x+y;
		}
		//校验接口
		Interface.enSureImplements(this,Lib1Dao);
	}
	
	//类库二
	var Lib2Dao = new Interface("Adapter",["add"]);
	
	var Lib2Impl = function(){
		this.add = function(arr){
			return eval(arr.join("+"));
		}
		//校验接口
		Interface.enSureImplements(this,Lib2Dao);
	}
	
	var a = new Lib1Impl();
	alert(a.add(10,2));
	
	var adapter = function(){
		this.add = function(x,y){
			var arr = new Array();
			arr.push(x);
			arr.push(y);
			return new Lib2Impl().add(arr);
		}
		//校验接口
		Interface.enSureImplements(this,Adapter);
	}
	
	var ad = new adapter();
	alert(ad.add(10,3));

})()
