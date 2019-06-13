// 이벤트
$(document).ready(function(){
    $("#res_check").change(function(){
        if($("#res_check").is(":checked")){
            restaurants_turnon();
        }else{
            restaurants_turnoff();
        }
    });

    $("#cafe_check").change(function(){
        if($("#cafe_check").is(":checked")){
            cafes_turnon();
        }else{
            cafes_turnoff();
        }
    });

    $("#printer_check").change(function(){
        if($("#printer_check").is(":checked")){
            printers_turnon();
        }else{
            printers_turnoff();
        }
    });

    $("#home").on('click',function() {
        wayBackHome();
    });

    $("#friend1").on('click',function() {
        addMarkerMove('이연우');
    });    
    $("#friend2").on('click',function() {
        addMarkerMove('최진혁');
    });  

    $(".modal-body button").click(function(e){
        loginComplete();
    }) ;

});