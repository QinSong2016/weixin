// JavaScript Document
$(function(){
	$(".product-buy .color span").click(function(){
		var src = $(this).attr("big");
		$(".product-img img").attr("src",src);
		$(this).addClass("on");
		$(this).siblings().removeClass("on");
	});
	if($('div.product-buy').hasClass('promotions-buy')){
		time=setInterval(autoplay,1000);
	};
	
	$(".confirmation-btn").click(function(){
		if($(this).hasClass('confirmation-btn-on')){
			$(this).removeClass("confirmation-btn-on");
			$(".submit-order .submit").removeClass("submit-on");	
			$(".submit-order .submit").attr("onClick","javascript:;");
			
		}else{
			$(this).addClass("confirmation-btn-on");
			$(".submit-order .submit").attr("onClick","submitOrder()");
			$(".submit-order .submit").addClass("submit-on");
		}
	});
	
	$("#address-select li").click(function(){
		$(this).addClass("on");
		$(this).siblings().removeClass("on");	
	});
	
})
var num;
function amountAdd(obj){
	var input = $(obj).parent().parent().find("input");
	var price = parseFloat($(obj).parents().find(".price").html());
	var totalPrice = $(obj).parents().find(".total-price");
	num=$(input).val();
	num++;
	if(num==10000){
		return;	
	}
	$(input).val(num);
	$(totalPrice).html((num*price).toFixed(2))
}
function amountLess(obj){
	var input = $(obj).parent().parent().find("input");
	var price = parseFloat($(obj).parents().find(".price").html());
	var totalPrice = $(obj).parents().find(".total-price");
	num=$(input).val();
	num--;
	if(num==0){
		return;	
	}
	$(input).val(num);
	$(totalPrice).html((num*price).toFixed(2))
}
function amountChang(obj){
	var nubmer = parseInt($(obj).val());
	var price = parseFloat($(obj).parents().find(".price").html());
	var totalPrice = $(obj).parents().find(".total-price");
	if(isNaN(nubmer)||nubmer<=0||!(/^\d+$/.test(nubmer))){
		alert("只能输入正整数！");
		$(obj).val("1");
		return;
	}else if(nubmer > 10000){
		alert("最多输入四位数！");
		$(obj).val("9999");
		return;
	}
	$(totalPrice).html((nubmer*price).toFixed(2))
}

//促销倒计时
var interval = 1000;
var time;
function ShowCountDown(year, month, day, hh, mm ,ss , divname) {
    var now = new Date();
    var endDate = new Date(year, month - 1, day, hh, mm ,ss );
    var leftTime = endDate.getTime() - now.getTime();
    var leftsecond = parseInt(leftTime / 1000);
    //var day1=parseInt(leftsecond/(24*60*60*6)); 
    var day1 = Math.floor(leftsecond / (60 * 60 * 24));

    var hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);

    var minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
    var second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
    var divHtml = document.getElementById(divname);
	if(now < endDate){
		divHtml.innerHTML = "剩余：" + day1 + "天" + hour + "小时" + minute + "分" + second + "秒";
	}else{
		clearInterval(time);
	}
}
function autoplay(){
	 ShowCountDown(2016, 6, 1, 16,40,0 , 'countdown');
}

function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

function submitOrder(){
	var addressTel = trim($(".addressee-tel").text());
	if(addressTel==''){
		alert("请先添加收件人手机号");
		return;
	}
	var address = trim($(".addressee-address").text());
	if(address==''){
		alert("请先添加收件人地址");
		return;
	}
}

function delAddress(){
	if(confirm("确定要删除吗？")){
		
		$("#address-select li").each(function(){ 
			if($(this).hasClass("on")){
				$(this).remove();	
			}
		}); 
	}	
}

function delOrderHistory(obj){
	if(confirm("确定要删除吗？")){
		$(obj).parent().parent().remove();
	}	
}

function formInput(){
	if($(".add-name").val() == "" || $(".add-phone").val() == "" || $(".province label").html() == "请选择" || $(".city label").html() == "请选择" || $(".district label").html() == "请选择" || $(".add-danyan").val() == "" ){
		$(".form-btn").removeClass("form-btn-on");
		$(".form-btn a").attr("href","javascript:;");
	}else{
		$(".form-btn").addClass("form-btn-on");
		$(".form-btn a").attr("href","javascript:formSubmit()");
			
	}
}

function formSubmit(){
	var username = $(".add-name").val();
	var phone = $(".add-phone").val();
	var addressee = $(".add-danyan").val();	
	if(username.length > 12 || username.length < 1  || (/[\d]/g.test(username))){
		alert("只能输入1-12个汉字或字母。");
		$(".add-name").focus();
		return;
	}
	if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){ 
		alert("手机号码有误，请重新输入。");  
		$(".add-phone").focus();
		return; 
	} 
	if(addressee.length<2 || addressee.length>30){
		alert("地址只能输入2-30个汉字、字母或数字");
		$(".add-danyan").focus();
		return;
	}
	alert("ok");
}
