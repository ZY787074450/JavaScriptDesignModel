/**
 * JavaScript 代理模式
 * 代理模式(Proxy)：通过代理对象完成环境布置，当需要使用真实对象的时候才实例调用。
 * 
 * 代理是一个对象（proxy）用它来控制对目标对象的访问
 * 他要与目标对象实现相同的接口，但他不同于装饰者模式
 * 他对目标对象不进行任何修改
 * 他的目的在延缓复杂对象的初始化时间，这样可以在用到这个对象在初始化他（对于单例来讲很重要）
 * 
 */

(function(){
	
	//接口
	var BookShopDao = new Interface("BookShopDao",["addBook","findBook","loanBook","repayBook"]);
	
	//书
	var Book = function(bookId,bookName,bookPrice){
		this.bookId = bookId;
		this.bookName = bookName;
		this.bookPrice = bookPrice;
	}
	
	
	//目标类
	var BookShopImpl = function(){
		var _bookArry = new Array();

		this.addBook = function(book){
			_bookArry.push(book);
		}
		this.findBook = function(bookId){
			var book = null;
			for (var i = 0; i < _bookArry.length; i++) {
				if( _bookArry[i].bookId == bookId){
					book = _bookArry[i];
					break;
				}
			}
			return book;
		}
		this.loanBook = function(bookId){
			var book = null;
			for (var i = 0; i < _bookArry.length; i++) {
				if( _bookArry[i].bookId == bookId){
					book = _bookArry.splice(i, 1);
					break;
				}
			}
			return book;
		}
		this.repayBook = function(book){
			this.addBook(book);
		}
		//验证接口
		Interface.enSureImplements(this,BookShopDao);
		
	}
	
	//代理类,简单的普通代理类
	var ProxyBookShopImpl = function(){
        var _bookShopImpl = new new BookShopImpl();
		this.addBook = function(book){
			_bookShopImpl.addBook(book);
		}
		this.findBook = function(bookId){
			return _bookShopImpl.findBook(bookId);
		}
		this.loanBook = function(bookId){
			return _bookShopImpl.loanBook(bookId);
		}
		this.repayBook = function(book){
			_bookShopImpl.repayBook(book);
		}
		//验证接口
		Interface.enSureImplements(this,BookShopDao);
		
	}
	
	
	//测试
	var bookshopproxy = new ProxyBookShopImpl();
	bookshopproxy.addBook(new Book("0001", "js", 100));
	bookshopproxy.addBook(new Book("0002", "java", 200));
	alert(bookshopproxy.findBook("0001").bookName);
	
	
	
	

})()
