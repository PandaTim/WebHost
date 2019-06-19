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

    $('#dismiss').on('click', function() {
        $('#sidebar').removeClass('active');
        current_overlay.setMap(null);
    });

    $('#dismiss_2').on('click', function() {
        $('#sidebar_2').removeClass('active');
    });
    $('#sidebarCollapse').on('click', function() {
        $('#sidebar').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    $("#commentInput").keydown(function(event) {
        console.log(event.keyCode);
        if(event.keyCode==13) {
          commentSubmit();
        }
    });

    $("#sidebar").mCustomScrollbar({
            theme: "minimal"
    });

    
    
});

