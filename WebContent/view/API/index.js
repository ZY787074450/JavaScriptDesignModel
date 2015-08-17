/**
 * tableOp.js 
 */
$(function(){
	
	
	
});


function showView(e){
    $(".api_right").empty();
    var obj = $("#"+e).clone(true);
    $(".api_right").append(obj);
}