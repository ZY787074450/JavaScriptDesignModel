
/**
 * Define an interface.
 * This Class be used define Interface.
 * For Instance: 
 * var dogDao = new Interface("dogDao", ["run","eat","sing"]);
 * var catDao = new Interface("catDao", ["goto"]);
 * function Animal(){
 *	this.run = function(){
 *		alert("boo run!");
 *	};
 *	this.eat = function(){
 *  };
 *	this.sing = function(){
 *	};
 *	this.han = function(){
 *	};
 *	Interface.enSureImplements(this,dogDao,catDao);
 * }
 * var animal = new Animal();
 * animal.run();
 * animal implements dogDao,catDao two interface
 * 
 */
function Interface(name,methods){
	if(arguments.length <2) 
		throw new Error("Parameters must be more than one!");
	this.name = name;
	this.methods = [];
	for (var i = 0; i < methods.length; i++) {
		if(typeof methods[i] != "string")
			throw new Error("methods name is must String!");
		else
			this.methods.push(methods[i]);
	}
}


/**
 * Define an interface of static methods.
 * Used to verify an interface is interface type.
 * @param object   In general,in the find call this class.So,generally is this.
 * @param arguments You define interface, may be multiple.
 */
Interface.enSureImplements = function(object){
	if(arguments < 2)
		throw new Error("paramters must be more than one!");
	for (var i = 1; i < arguments.length; i++) {
		var interf = arguments[i];
		if(interf.constructor != Interface)
			throw new Error("Arguments object constructor must is Interface type!");
		for (var j = 0; j < interf.methods.length; j++) {
			var method = interf.methods[j];
			if(!object[method] || typeof object[method] != "function")
				throw new Error("InterfaceImpl is not implements all methods!");
		}
	}
}

/**
 *  Define extends 
 *  This is a complete inheritance, including ordinary attributes, methods,
 *  static attributes, methods, and prototype attributes,methods, 
 *  as well as the prototype chain all be inherited.
 *  It is important to note that unless it is absolutely will not change the attributes, methods, 
 *  and must not be registered on the prototype of the parent class.
 *  For Instance: F extends E
 *  function E(name){
 *		this.name = name;
 *	};
 *	E.prototype.run = function(){
 *		alert("run e !");
 *	};
 *	Extends(E, F);
 *	function F(name,size){
 *		F.superClass.constructor.call(this,name);
 *		this.size = size;
 *	};
 *	F.prototype.show = function(){
 *		alert("show f !");
 *	};
 * @param superClass
 * @param subClass
 */
function Extends(superClass,subClass){
	var  F = function(){};
	F.prototype = superClass.prototype;
	subClass.prototype =  new F();
	subClass.prototype.constructor = subClass;
	subClass.superClass = superClass.prototype;
	if(superClass.prototype.constructor == Object.prototype.constructor){
		superClass.prototype.constructor = superClass;
	}
};

/**
 * The prototype of the function extension
 * @param name
 * @param fn
 */
Function.prototype.method = function(name,fn){
	this.prototype[name] = fn;
	return this;
}

/**
 * Filter function for array extension
 */
if(!Array.prototype.filter){
	Array.method("filter",function(fn,thisObj){
		var scope = thisObj || window;
		var arry = [];
		for (var i = 0; i < this.length; i++) {
			if(fn.call(scope,this[i],i,this)){
				arry.push(this[i]);
			}
		}
		return arry;
	});
}


/*

uuid.js - Version 0.2
JavaScript Class to create a UUID like identifier

Copyright (C) 2006-2008, Erik Giberti (AF-Design), All rights reserved.

This program is free software; you can redistribute it and/or modify it under 
the terms of the GNU General Public License as published by the Free Software 
Foundation; either version 2 of the License, or (at your option) any later 
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY 
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A 
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with 
this program; if not, write to the Free Software Foundation, Inc., 59 Temple 
Place, Suite 330, Boston, MA 02111-1307 USA

The latest version of this file can be downloaded from
http://www.af-design.com/resources/javascript_uuid.php

HISTORY:
6/5/06 	- Initial Release
5/22/08 - Updated code to run faster, removed randrange(min,max) in favor of
          a simpler rand(max) function. Reduced overhead by using getTime() 
          method of date class (suggestion by James Hall).

KNOWN ISSUES:
- Still no way to get MAC address in JavaScript
- Research into other versions of UUID show promising possibilities 
  (more research needed)
- Documentation needs improvement

*/

// On creation of a UUID object, set it's initial value
function UUID(){
	this.id = this.createUUID();
}

// When asked what this Object is, lie and return it's value
UUID.prototype.valueOf = function(){ return this.id; }
UUID.prototype.toString = function(){ return this.id; }

//
// INSTANCE SPECIFIC METHODS
//

UUID.prototype.createUUID = function(){
	//
	// Loose interpretation of the specification DCE 1.1: Remote Procedure Call
	// described at http://www.opengroup.org/onlinepubs/009629399/apdxa.htm#tagtcjh_37
	// since JavaScript doesn't allow access to internal systems, the last 48 bits 
	// of the node section is made up using a series of random numbers (6 octets long).
	//  
	var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
	var dc = new Date();
	var t = dc.getTime() - dg.getTime();
	var h = '-';
	var tl = UUID.getIntegerBits(t,0,31);
	var tm = UUID.getIntegerBits(t,32,47);
	var thv = UUID.getIntegerBits(t,48,59) + '1'; // version 1, security version is 2
	var csar = UUID.getIntegerBits(UUID.rand(4095),0,7);
	var csl = UUID.getIntegerBits(UUID.rand(4095),0,7);

	// since detection of anything about the machine/browser is far to buggy, 
	// include some more random numbers here
	// if NIC or an IP can be obtained reliably, that should be put in
	// here instead.
	var n = UUID.getIntegerBits(UUID.rand(8191),0,7) + 
			UUID.getIntegerBits(UUID.rand(8191),8,15) + 
			UUID.getIntegerBits(UUID.rand(8191),0,7) + 
			UUID.getIntegerBits(UUID.rand(8191),8,15) + 
			UUID.getIntegerBits(UUID.rand(8191),0,15); // this last number is two octets long
	return tl + h + tm + h + thv + h + csar + csl + h + n; 
}


//
// GENERAL METHODS (Not instance specific)
//


// Pull out only certain bits from a very large integer, used to get the time
// code information for the first part of a UUID. Will return zero's if there 
// aren't enough bits to shift where it needs to.
UUID.getIntegerBits = function(val,start,end){
	var base16 = UUID.returnBase(val,16);
	var quadArray = new Array();
	var quadString = '';
	var i = 0;
	for(i=0;i<base16.length;i++){
		quadArray.push(base16.substring(i,i+1));	
	}
	for(i=Math.floor(start/4);i<=Math.floor(end/4);i++){
		if(!quadArray[i] || quadArray[i] == '') quadString += '0';
		else quadString += quadArray[i];
	}
	return quadString;
}

// Numeric Base Conversion algorithm from irt.org
// In base 16: 0=0, 5=5, 10=A, 15=F
UUID.returnBase = function(number, base){
	//
	// Copyright 1996-2006 irt.org, All Rights Reserved.	
	//
	// Downloaded from: http://www.irt.org/script/146.htm	
	// modified to work in this class by Erik Giberti
	var convert = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    if (number < base) var output = convert[number];
    else {
        var MSD = '' + Math.floor(number / base);
        var LSD = number - MSD*base;
        if (MSD >= base) var output = this.returnBase(MSD,base) + convert[LSD];
        else var output = convert[MSD] + convert[LSD];
    }
    return output;
}

// pick a random number within a range of numbers
// int b rand(int a); where 0 <= b <= a
UUID.rand = function(max){
	return Math.floor(Math.random() * max);
}

// end of UUID class file



