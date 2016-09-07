// JavaScript Document

$(function(){
	var province = document.myform.province;  
	var city = document.myform.city; 
	var district = document.myform.district; 
	for(i = 0; i < Provinces.length; i++)
	{ 
	  if(i == 0) 
	  province.options[i] = new Option("请选择","00");   
	  else 
	  province.options[i] = new Option(Provinces[i - 1][1], Provinces[i - 1][0]); 
	} 
	city.options.length = 0; 
	city.options[0] = new Option("请选择","00");
	district.options.length = 0; 
	district.options[0] = new Option("请选择","00");
	$(".city").find("label").html("请选择");
	$(".district").find("label").html("请选择");
	provinceChange();	
		
})

function provinceChange(){
	
	var province = document.myform.province;
	var city = document.myform.city; 
	var district = document.myform.district;  
	province.onchange = function() {   
		var provinceCode = province.options[province.selectedIndex].value;  
		var provinceHtml = province.options[province.selectedIndex].text;
		city.options.length = 0; 
		city.options[0] = new Option("请选择","00");
		district.options.length = 0; 
		district.options[0] = new Option("请选择","00");
		$(".city").find("label").html("请选择");
		$(".district").find("label").html("请选择");
		var count = 1;  
		for(j = 0; j < Cities.length; j++) { 
			if(Cities[j][0].toString() == provinceCode.toString())
			{ 
				city.options[count] = new Option(Cities[j][2], Cities[j][1]);
				count ++; 
			} 
		} 
		
		$(".province").find("label").html(provinceHtml);
		$(".province").find("label").css("color","#333");
		cityChange();
		formInput();
		selectLabel();
	}	
}
function cityChange(){

	var city = document.myform.city; 
	var district = document.myform.district;  
	city.onchange = function() {
		var count = 1;
		var cityCode = city.options[city.selectedIndex].value;
		var cityHtml = city.options[city.selectedIndex].text;
		
		district.options.length = 0;  
		district.options[0] = new Option("请选择","00");
		$(".district").find("label").html("请选择");
		for(k = 0; k < District.length; k++) { 
			//alert(District[k][0]) 
			
			if(District[k][0].toString() == cityCode.toString())
			
			{ 
				district.options[count] = new Option(District[k][2], District[k][1]);
				count ++; 
			} 
			
		} 
		$(".city").find("label").html(cityHtml);
		$(".city").find("label").css("color","#333");
		districtChange();
		formInput();
		selectLabel();
	} 
}

function districtChange(){
	var district = document.myform.district;  
	district.onchange = function() {
		var districtCode = district.options[district.selectedIndex].value;
		var districtHtml = district.options[district.selectedIndex].text;
		$(".district").find("label").html(districtHtml);
		$(".district").find("label").css("color","#333");
		formInput();
		selectLabel();
	}
	
}

function selectLabel(){
	$("#add-address-list label").each(function(index, element) {
        if($(this).html() == "请选择"){
			$(this).css("color","#999");
		}
    });
}
