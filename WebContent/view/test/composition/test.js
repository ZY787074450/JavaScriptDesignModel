/**
 * JavaScript 组合模式
 */

(function(){
	
	
	//定义接口
	var CompositeDao = new Interface("CompositeDao",["getChildByName","add"]);
	var StudentDao = new Interface("StudentDao",["goToClass","finishClass"]);
	
	//定义组合实现类,同时实现两个接口
	var CompositeImpl = function(name){
		this.name = name;
		this.type = "composite"; //默认是组合类
		var childs = new Array();
		//根据name获取自己的所有的子叶节点
		this.getChildByName = function(name){
			var reChilds  = new Array();
			if(name){ //有名字
				if(this.name == name){ //是自己
					for (var i = 0; i < childs.length; i++) {//遍历子节点
						if(childs[i].type == "composite"){ //是组合节点
							reChilds = reChilds.concat(childs[i].getChildByName());//已经是自己，接着去递归
						}else if(childs[i].type == "student"){ //子叶节点
							reChilds = reChilds.concat(childs[i]);
						}
					}
				}else{ //不是自己
					for (var i = 0; i < childs.length; i++) {
						if(childs[i].type == "composite"){//是组合节点
							childs[i].getChildByName(name);//不是是自己，接着去递归
						}else if(childs[i].type == "student"){//子叶节点
							if(childs[i].name == name){
								reChilds = reChilds.concat(childs[i]);
								break;
							}
						}
					}
				}
			}else{ //已经是自己的递归
				for (var i = 0; i < childs.length; i++) {
					if(childs[i].type == "composite"){ //是组合节点
						reChilds = reChilds.concat(childs[i].getChildByName());//已经是自己，接着去递归
					}else if(childs[i].type == "student"){ //子叶节点
						reChilds = reChilds.concat(childs[i]);
					}
				}
			}
			return reChilds;
		}
		this.add = function(child){
			childs.push(child);
			return this;
		}
		this.goToClass = function(){
			var clds = this.getChildByName(this.name);
			for (var i = 0; i < clds.length; i++) {
				clds[i].goToClass();
			}
			
		}
		this.finishClass = function(){
			var clds = this.getChildByName(this.name);
			for (var i = 0; i < clds.length; i++) {
				clds[i].finishClass();
			}
		}
		//校验接口
		Interface.enSureImplements(this,CompositeDao,StudentDao);
	}
	
	//定义子叶实现类,同时实现两个接口
	var StudentImpl = function(name){
		this.name = name;
		this.type = "student"; //默认是子叶
		this.getChildByName = function(name){
			if(this.name == name){
				return this;
			}
		}
		this.add = function(child){
			throw Error("Cotyledon node cannot be initialized!");
		}
		this.goToClass = function(){
			document.write(this.name+"去上课<br>");
		}
		this.finishClass = function(){
			document.write(this.name+"下课<br>");
		}
		//校验接口
		Interface.enSureImplements(this,CompositeDao,StudentDao);
	}
	
	
	//测试
	
	var a,b,c,d,e,f,g,h;
	var arr = ['a','b','c','d','e','f','g','h'];
	for (var i = 0; i < arr.length; i++) {
		eval(arr[i]+" = new  StudentImpl('"+arr[i]+"')");
	}
	
	var one = new CompositeImpl("一班");
	var one1g = new CompositeImpl("一班一组");
	var one2g = new CompositeImpl("一班一组");
	one1g.add(a).add(b);
	one2g.add(c).add(d);
	one.add(one1g).add(one2g);
	
	var two = new CompositeImpl("二班");
	var two1g = new CompositeImpl("二班一组");
	var two2g = new CompositeImpl("二班一组");
	
	two1g.add(e).add(f);
	two2g.add(g).add(h);
	two.add(two1g).add(two2g);
	
	one.goToClass();

})()
