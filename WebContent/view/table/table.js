/**
 * 表格插件封装JS
 * @author：zhangYun
 * Time:2015-08-10
 */
/**
 * tableOp.js 
 * 设计思路：
 * 针对一个标准数据页面的增删改查，导出，打印的封装JS
 * 一、页面布局设计，引用bootstrap v2.31 的栅格系统，引用其基础CSS效果
 * 页面的分区布局，系统提供几套模板供选用，但原则上页面还需要开发者自己编辑，提供的模板需要结合项目的实际情况来做小幅度的修改 
 * 主要分为五个区：
 * 1.queryArea  条件查询编辑区
 * 2.fnArea     功能区
 * 3.dataArea   数据操作区
 * 4.pageArea   分页区
 * 5.windowView 弹出窗口区
 * 
 * 1.queryArea 条件查询编辑区
 * 主要功能：主要针对查询条件控制
 * 分为两个区块： -1 queryCondition   查询条件配置，主要是一些表单组件，例如：文本输入框，下拉选择框，单选框，多选框，多行文本框
 *           -2 queryButton      查询按钮的配置，例如：【查询】，【重置】
 * 
 * 
 * 2.fnArea     功能区
 * 主要功能：主要针对一些表格功能的配置，尤其是新增功能
 * 一个区块： -1.fn    每个元素是一个对象，例如新增
 * 
 * 
 * 3.dataArea   数据操作区
 * 主要功能：对数据操作区的控制，例如表头的控制，数据区的功能
 * 两个区块：-1.tableTitle 表头的配置
 *        -2.ParseData  数据解析事件的注册，例如：单元格绘制事件
 *        
 * 4.pageArea   分页区       
 * 主要功能：数据区的分页，上一页，下一页，首页，尾页的跳转，每页记录数的设置
 * -1.pageSize    每页的记录数
 * -2.pageIndex   第几页
 * -3.loadData    加载数据的回调函数
 * 
 * 
 * 5.windowView    弹出框视图编辑区
 * 主要功能：功能区的新增按钮以及数据操作区的修改的弹出框页面在此配置
 * 数组每个元素对应一个弹出框
 * 页面需要自己开发者自己绘制，并配置好相应属性，系统完成弹出效果，数据携带，表单验证，数据收集，开发者只需要与后台交互数据即可
 * 
 */

/*配置对象*/
var setings = {
		//查询区
		queryArea:{
		},
		
		//功能展示区,对于表格功能在此配置
		fnArea:{
		},
		//数据操作区的配置
		dataArea:{
			//表头配置
			tableTitle:[
			            {
			            	name:"序号",//表头设置
			            	type:"sequence",//[sequence,dataView,operate]【序列，数据视图，操作区】
			            	kind:"",//[number,image]【数字，图片】可扩展
			            	css:{//配置CSS相关，支持内部配置，外部关联
				        		attribute:{ //配置注入属性，供外部JS,CSS控制
				        			"class":"text1",
				        			"nihao":"dsds"
				        		},
				        	    style:{//内部样式，JS注入，优先级最高（除!important）
				        	    	color:"red",
				        	    	heigth:"10px"
				        	    }
				        	}
			            	
			            },
			            {
			            	name:"姓名",
			            	type:"dataView",//[sequence,dataView,operate]【序列，数据视图，操作区】
			            	key:"name",//数据的key值
			            	css:{//配置CSS相关，支持内部配置，外部关联
				        		attribute:{ //配置注入属性，供外部JS,CSS控制
				        			"class":"text1",
				        			"nihao":"dsds"
				        		},
				        	    style:{//内部样式，JS注入，优先级最高（除!important）
				        	    	color:"red",
				        	    	heigth:"10px"
				        	    }
				        	}
			            	
			            }, 
			            {
			            	name:"操作",
			            	type:"operate",//[sequence,dataView,operate]【序列，数据视图，操作区】
			            	css:{//配置CSS相关，支持内部配置，外部关联
				        		attribute:{ //配置注入属性，供外部JS,CSS控制
				        			"class":"text1",
				        			"nihao":"dsds"
				        		},
				        	    style:{//内部样式，JS注入，优先级最高（除!important）
				        	    	color:"red",
				        	    	heigth:"10px"
				        	    }
				        	},
				        	operate:[ //操作按钮
				        	         {
				        	        	 type:"text",//[text,image]【文本，图片】
				        	        	 value:"修改",//操作按钮显示文本
				        	        	 kind:"update",//[update,view]【修改弹出框，显示弹出框】
				        	        	 id:"upid",//弹出框的id,关联windowView的配置，数据携带
				        	        	 css:{//配置CSS相关，支持内部配置，外部关联
								        		attribute:{ //配置注入属性，供外部JS,CSS控制
								        			"class":"text1",
								        			"nihao":"dsds"
								        		},
								        	    style:{//内部样式，JS注入，优先级最高（除!important）
								        	    	color:"red",
								        	    	heigth:"10px"
								        	    }
								         },
								         callback:{
						                        click:function(){ //配置点击事件
								        			
								        		}
								         },
				        	         },
				        	         {
				        	        	 type:"image",//[text,image]【文本，图片】
				        	        	 title:"删除",//操作按钮提示文本
				        	        	 src:"localhost:8080/view/images/button.jpg",//图片的全路径
				        	        	 css:{//配置CSS相关，支持内部配置，外部关联
								        		attribute:{ //配置注入属性，供外部JS,CSS控制
								        			"class":"text1",
								        			"nihao":"dsds"
								        		},
								        	    style:{//内部样式，JS注入，优先级最高（除!important）
								        	    	color:"red",
								        	    	heigth:"10px"
								        	    }
								         },
								         callback:{
						                        click:function(){ //配置点击事件
								        			
								        		}
								         },
				        	         }
				            ]
			            }
			],
			//解析 数据配置
			ParseData:{
				callback:{//回调函数
					celldraw:function(){//单元格编辑事件
						
					}
				}
			}	
		},
		
		//分页区
		pageArea:{
			pageSize:10,//每页记录数
			pageIndex:1,//第几页
			loadData:function(pageSize,pageIndex){//加载数据的回调函数，传入pageSize,pageIndex两个参数
				var obj = {
						count:0,
						data:[{"name":"zhangsan"},{"name":"lishi"},{"name":"wangwu"}],
						pageSize:10,
						pageIndex:2
				};
				
				//你的操作
				
				return obj;
			}
			
		},
		
		//弹出框的配置，结合fnArea的新增弹出框，和修改的弹出框
		windowView:[
		        {
		        	type:"update",//[update,add,view]【修改弹出框，新增弹出框，视图弹出框】
		        	id:"upid",//修改的弹出框的id
		        	form:[ //表单对象元素
		        	     //组件1
					        {
					        	type:"text", //该查询条件的输入类型配置,[text,select,radio,checkBox,textArea]【文本输入框，下拉选择框，单选框，多选框，多行文本框】
					        	id:"key1", //配置该组件的id属性
					        	source_id:"name",//指的是表格数据对象的对应该字段的字段名，这样JS可以将对应的数据带过来
					        	callback:{ //配置该组件的回调事件函数
					        		click:function(){  //配置点击事件
					        			
					        		},
					        		change:function(){ //配置值改变事件
					        			
					        		},
					        		blur:function(){ //元素失去焦点事件
					        			
					        		},
					        		focus:function(){ //元素得到焦点事件
					        			
					        		},
					        		keydown:function(){ //按键被按下事件
					        			
					        		}
					        	},
					        	css:{//配置CSS相关，支持内部配置，外部关联
					        		attribute:{ //配置注入属性，供外部JS,CSS控制
					        			"class":"text1",
					        			"nihao":"dsds"
					        		},
					        	    style:{//内部样式，JS注入，优先级最高（除!important）
					        	    	color:"red",
					        	    	heigth:"10px"
					        	    }
					        	}
					        },
					        //组件2
					        {
					        	type:"textarea",//文本域
					        	id:"key2",//id属性
					        	rows:10, //textArea的行数
			        			cols:2, //textArea的列数
			        			source_id:"name",//指的是表格数据对象的对应该字段的字段名，这样JS可以将对应的数据带过来
					        	callback:{
		                            click:function(){  //配置点击事件
					        			
					        		},
					        		change:function(){ //配置值改变事件
					        			
					        		},
					        		blur:function(){ //元素失去焦点事件
					        			
					        		},
					        		focus:function(){ //元素得到焦点事件
					        			
					        		},
					        		keydown:function(){ //按键被按下事件
					        			
					        		}
					        	},
					        	css:{//配置CSS相关，支持内部配置，外部关联
					        		attribute:{ //配置注入属性，供外部JS,CSS控制
					        			"class":"text1",
					        			"nihao":"dsds",
					        		},
					        	    style:{//内部样式，JS注入，优先级最高（除!important）
					        	    	color:"red",
					        	    	heigth:"10px"
					        	    }
					        	}
					        }
		        	],
		        	//功能按钮，例如保存，关闭
		            button:[
						{
							type:"button",//功能的类型[button,image]【按钮，图片】
							value:"保存",//按钮显示的文字
							id:"key3",//id属性
							callback:{
						        click:function(){ //配置点击事件
									
								}
							},
							css:{//配置CSS相关，支持内部配置，外部关联
								attribute:{ //配置注入属性，供外部JS,CSS控制
									"class":"text1",
									"nihao":"dsds"
								},
							    style:{//内部样式，JS注入，优先级最高（除!important）
							    	color:"red",
							    	heigth:"10px"
							    }
							}
						},
						{
							type:"image",//功能的类型[button,image]【按钮，图片】
							src:"localhost:8080/view/images/button.jpg",//图片的全路径
							id:"key3",//id属性
							callback:{
						        click:function(){ //配置点击事件
									
								}
							},
							css:{//配置CSS相关，支持内部配置，外部关联
								attribute:{ //配置注入属性，供外部JS,CSS控制
									"class":"text1",
									"nihao":"dsds"
								},
							    style:{//内部样式，JS注入，优先级最高（除!important）
							    	color:"red",
							    	heigth:"10px"
							    }
							}
						}
		            ]
		        },
		        {
		        	type:"add",//[update,add,view]【修改弹出框，新增弹出框，视图弹出框】
		        	id:"addid",//修改的弹出框的id
		        	form:[ //表单对象元素
		        	     //组件1
					        {
					        	type:"text", //该查询条件的输入类型配置,[text,select,radio,checkBox,textArea]【文本输入框，下拉选择框，单选框，多选框，多行文本框】
					        	id:"key1", //配置该组件的id属性
					        	source_id:"name",//指的是表格数据对象的对应该字段的字段名，这样JS可以将对应的数据带过来
					        	callback:{ //配置该组件的回调事件函数
					        		click:function(){  //配置点击事件
					        			
					        		},
					        		change:function(){ //配置值改变事件
					        			
					        		},
					        		blur:function(){ //元素失去焦点事件
					        			
					        		},
					        		focus:function(){ //元素得到焦点事件
					        			
					        		},
					        		keydown:function(){ //按键被按下事件
					        			
					        		}
					        	},
					        	css:{//配置CSS相关，支持内部配置，外部关联
					        		attribute:{ //配置注入属性，供外部JS,CSS控制
					        			"class":"text1",
					        			"nihao":"dsds"
					        		},
					        	    style:{//内部样式，JS注入，优先级最高（除!important）
					        	    	color:"red",
					        	    	heigth:"10px"
					        	    }
					        	}
					        },
					        //组件2
					        {
					        	type:"textarea",//文本域
					        	id:"key2",//id属性
					        	rows:10, //textArea的行数
			        			cols:2, //textArea的列数
			        			source_id:"name",//指的是表格数据对象的对应该字段的字段名，这样JS可以将对应的数据带过来
					        	callback:{
		                            click:function(){  //配置点击事件
					        			
					        		},
					        		change:function(){ //配置值改变事件
					        			
					        		},
					        		blur:function(){ //元素失去焦点事件
					        			
					        		},
					        		focus:function(){ //元素得到焦点事件
					        			
					        		},
					        		keydown:function(){ //按键被按下事件
					        			
					        		}
					        	},
					        	css:{//配置CSS相关，支持内部配置，外部关联
					        		attribute:{ //配置注入属性，供外部JS,CSS控制
					        			"class":"text1",
					        			"nihao":"dsds",
					        		},
					        	    style:{//内部样式，JS注入，优先级最高（除!important）
					        	    	color:"red",
					        	    	heigth:"10px"
					        	    }
					        	}
					        }
		        	],
		        	//功能按钮，例如保存，关闭
		            button:[
						{
							type:"button",//功能的类型[button,image]【按钮，图片】
							value:"保存",//按钮显示的文字
							id:"key3",//id属性
							callback:{
						        click:function(){ //配置点击事件
									
								}
							},
							css:{//配置CSS相关，支持内部配置，外部关联
								attribute:{ //配置注入属性，供外部JS,CSS控制
									"class":"text1",
									"nihao":"dsds"
								},
							    style:{//内部样式，JS注入，优先级最高（除!important）
							    	color:"red",
							    	heigth:"10px"
							    }
							}
						},
						{
							type:"image",//功能的类型[button,image]【按钮，图片】
							src:"localhost:8080/view/images/button.jpg",//图片的全路径
							id:"key3",//id属性
							callback:{
						        click:function(){ //配置点击事件
									
								}
							},
							css:{//配置CSS相关，支持内部配置，外部关联
								attribute:{ //配置注入属性，供外部JS,CSS控制
									"class":"text1",
									"nihao":"dsds"
								},
							    style:{//内部样式，JS注入，优先级最高（除!important）
							    	color:"red",
							    	heigth:"10px"
							    }
							}
						}
		            ]
		        }, 
		        {
		        	type:"view",//[update,add,view]【修改弹出框，新增弹出框，视图弹出框】
		        	id:"addid",//修改的弹出框的id
		        }
		            
		]
}

$(function(){
	
});

//wolf-dataGrid
//页面加载完成后，寻找wolf开头的类标签



function find(){
	
	$("body").filter("[class*='wolf-']")

	
	
	
}






