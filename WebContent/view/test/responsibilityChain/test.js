/**
 * JavaScript 责任链模式
 * 1.消除发送者与接受者之间的耦合
 * 2.责任链的发送者知道链的入口是谁
 * 3.每个链传入和传输值是一样的
 */

(function(){
	
	/**
	 * 书店找书和增加书两个业务需求
	 * 用户可以输入：关键字搜索，书号、书名、作者
	 * 不同书架的管理员管理自己书架的增加书籍
	 */
	
	//在window上扩展一个函数
	window.SetChain = function(after,before){
		before.chain = after;
	}
	//图书馆接口
	var BookShopDao = new Interface("BookShopDao",["addBook","findBook","showBook"]);
	
	//书
	var Book = function(bookId,bookName,bookAuthor,bookType){
		this.bookId = bookId;
		this.bookName = bookName;
		this.bookAuthor = bookAuthor;
		this.bookType = bookType;
	}
	
	
	//书店实现类
	var BookShopImpl = (function(){
		//书架
		var jsBook = new Array();
		var cBook = new Array();
		var javaBook = new Array();
		
		//内部类1
		function AddJsBooks(book){
			if(book.bookType == "JS"){
				jsBook.push(book);
			}else{
				//责任链
				AddJsBooks.chain(book);
			}
		}
		
		//内部类2
		function AddCBooks(book){
			if(book.bookType == "C"){
				cBook.push(book);
			}else{
				//责任链
				AddCBooks.chain(book);
			}
		}
		
		//内部类3
		function AddJavaBooks(book){
			if(book.bookType == "JAVA"){
				javaBook.push(book);
			}
		}
		

		//查询书籍
		var _bookList = null;
		//根据书号查询
		function  FindByBookId(keyword){
			if(!_bookList){
				_bookList = jsBook.concat(cBook).concat(javaBook);
			}
			var books = new Array();
			books = _bookList.filter(function(book){
				if(book.bookId.indexOf(keyword) != -1){
					return true;
				}else{
					return false;
				}
			});
			//责任链接着查询
			return books.concat(FindByBookId.chain(keyword));
		}
		//根据书名查询
		function  FindByBookName(keyword){
			if(!_bookList){
				_bookList = jsBook.concat(cBook).concat(javaBook);
			}
			var books = new Array();
			books = _bookList.filter(function(book){
				if(book.bookName.indexOf(keyword) != -1){
					return true;
				}else{
					return false;
				}
			});
			//责任链接着查询
			return books.concat(FindByBookName.chain(keyword));
		}
		//根据书作者查询
		function  FindByBookAuthor(keyword){
			if(!_bookList){
				_bookList = jsBook.concat(cBook).concat(javaBook);
			}
			var books = new Array();
			books = _bookList.filter(function(book){
				if(book.bookAuthor.indexOf(keyword) != -1){
					return true;
				}else{
					return false;
				}
			});
			//责任链接着查询
			return books;
		}

		//设置链接结构
		SetChain(AddCBooks,AddJsBooks);
		SetChain(AddJavaBooks,AddCBooks);
		//设置链接结构
		SetChain(FindByBookName,FindByBookId);
		SetChain(FindByBookAuthor,FindByBookName);
		
		//真正的图书馆类
		return function(){
			this.addBook = function(book){
				if(book instanceof Book){
					//我知道链的入口
					AddJsBooks(book);
				}
			}
			this.findBook = function(keyword){
				return FindByBookId(keyword);
			},
			this.showBook = function(){
				//火狐有该方法，其它浏览器没有toSource
				document.write("JS 书籍"+jsBook.toSource()+"<br>");
				document.write("C 书籍"+cBook.toSource()+"<br>");
				document.write("Java 书籍"+javaBook.toSource()+"<br>");
				document.write("------------------<br>");
				
			}
			//验证接口
			Interface.enSureImplements(this,BookShopDao);
		}
	})();
	
	//测试
	var pshop = new BookShopImpl();
	pshop.addBook(new Book("01001", "ExtJs", "zhangsan", "JS"));
	pshop.addBook(new Book("01002", "javascript", "lishi", "JS"));
	pshop.addBook(new Book("02003", "c#", "wangwu", "C"));
	pshop.addBook(new Book("02004", "c++/c", "zhaoliu", "C"));
	pshop.addBook(new Book("03005", "JAVA", "zhangsan", "JAVA"));
	pshop.addBook(new Book("03006", "java 原理", "小刚", "JAVA"));
	
	pshop.showBook();
	document.write(pshop.findBook("zhangsan").toSource()+"<br>");

})()
