/**
 * JavaScript 装饰者模式
 * 不仅可以用在类上，还可以用在函数上
 */

(function(){
	
	//写一个装饰者函数，函数的目的在于将目标函数的返回值转成大写
	function upperCaseDecorator(fn){
		return function(){
			return fn().toUpperCase();
		}
	}
	
	//被封装的函数
	function getDate(){
		return new Date().toString();
	}
	
	//执行装饰函数
	getDateCase = upperCaseDecorator(getDate);
	document.write(getDate()+"<br>");
	document.write(getDateCase()+"<br>");
	
	
	
	/**
	 * 如果原有的功能不再适合你的项目，
	 * 你需要大量的扩充原有的功能，
	 * 然而并不想改变原有的接口，那你用装饰者模式
	 * 
	 */
})()
