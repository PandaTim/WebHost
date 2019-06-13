var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
  center: new daum.maps.LatLng(37.564728, 126.938154), //지도의 중심좌표.
  level: 4 //지도의 레벨(확대, 축소 정도)
};

var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴


// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new daum.maps.ZoomControl();
map.addControl(zoomControl, daum.maps.ControlPosition.BOTTOMRIGHT);

function wayBackHome() {
	console.log('move')
	// 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new daum.maps.LatLng(37.564728, 126.938154);
    
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.setLevel(4);
    map.panTo(moveLatLon);    
}


// 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomIn() {
    map.setLevel(map.getLevel() - 1);
}

// 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomOut() {
    map.setLevel(map.getLevel() + 1);
}
var restaurant_markers = [];
var printer_markers = [];
var cafe_markers = [];
var person_makers_map = {};

var marker_overlay_map = {};
var current_overlay = null;


// 지도를 클릭했을때 클릭한 위치에 마커를 추가하도록 지도에 클릭이벤트를 등록합니다
daum.maps.event.addListener(map, 'click', function(mouseEvent) {        
    // 클릭한 위치에 마커를 표시합니다 
    console.log(mouseEvent.latLng.jb.toFixed(6)+', '+mouseEvent.latLng.ib.toFixed(6));     
    // 클릭한 위치에 마커를 표시합니다 
    // addMarker(mouseEvent.latLng);         
});

var friend_positions = [
    {
        name:'이동제',
        latlng: new daum.maps.LatLng(37.567084, 126.937485)
    },
    {
        name: '최진혁',
        latlng: new daum.maps.LatLng(37.565076, 126.938307)
    },
    {
        name:'이연우',
        latlng: new daum.maps.LatLng(37.563227, 126.936175)
    }
];

// 마커를 표시할 위치와 title 객체 배열입니다 
// 식당 정보
var restaurant_positions = [
    {
        title: 'r1', 
        latlng: new daum.maps.LatLng(37.563334, 126.938297)
    },
    {
        title: 'r2', 
        latlng: new daum.maps.LatLng(37.566830, 126.937706)
    },
    {
        title: 'r3', 
        latlng: new daum.maps.LatLng(37.563172, 126.938342)
    },
    {
        title: 'r4',
        latlng: new daum.maps.LatLng(37.560864, 126.935560)
    },
    {
        title: 'r5',
        latlng: new daum.maps.LatLng(37.565496, 126.937254)
    }
];
// 프린터 정보
var printer_positions = [
    {
        title: 'printer1', 
        latlng: new daum.maps.LatLng(37.567071, 126.937722)
    },
    {
        title: 'printer2', 
        latlng: new daum.maps.LatLng(37.561989, 126.936414)
    },
    {
        title: 'printer3', 
        latlng: new daum.maps.LatLng(37.563558, 126.938495)
    },
    {
        title: 'printer4',
        latlng: new daum.maps.LatLng(37.563719, 126.936865)
    }
];
// 카페 정보
var cafe_positions = [
    {
        title: 'c1', 
        latlng: new daum.maps.LatLng(37.561748, 126.936352)
    },
    {
        title: 'c2', 
        latlng: new daum.maps.LatLng(37.563136, 126.937346)
    },
    {
        title: 'c3', 
        latlng: new daum.maps.LatLng(37.566776, 126.937660)
    },
    {
        title: 'c4',
        latlng: new daum.maps.LatLng(37.562468, 126.935536)
    },
    {
        title: 'c5',
        latlng: new daum.maps.LatLng(37.563928, 126.936123)
    }
];

// 마커 이미지의 이미지 주소입니다
var res_imageSrc = "img/res_marker.png"; 
var print_imageSrc = "img/print_marker.png"; 
var cafe_imageSrc = "img/cafe_marker.png"; 

//프린터 위치, 내용 등록
for (var i = 0; i < printer_positions.length; i ++) {
    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new daum.maps.Size(26, 40); 
    
    // 마커 이미지를 생성합니다    
    var markerImage = new daum.maps.MarkerImage(print_imageSrc, imageSize); 
    
    // 마커를 생성합니다
    var marker = new daum.maps.Marker({
        //map: map, // 마커를 표시할 지도
        position: printer_positions[i].latlng, // 마커를 표시할 위치
        title : printer_positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지 
    });
    printer_markers.push(marker);

    var content = '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
            '            카카오 스페이스닷원' + 
            '            <div class="close" onclick="closeOverlay(\''+marker.getTitle()+'\')" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="img">' +
            '                <img src="http://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
            '           </div>' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' + 
            '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' + 
            '                <div><a href="http://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>';
    // 마커 위에 커스텀오버레이를 표시합니다
	// 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
	var overlay = new daum.maps.CustomOverlay({
	    content: content,
	    //map: map,
	    position: marker.getPosition()       
	});

	marker_overlay_map[marker.getTitle()] = overlay

	// 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
	daum.maps.event.addListener(marker, 'click', function() {
	    clickMarker(this);
	});
}

//식당 위치, 내용 등록
for (var i = 0; i < restaurant_positions.length; i ++) {
    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new daum.maps.Size(26, 40); 
    
    // 마커 이미지를 생성합니다    
    var markerImage = new daum.maps.MarkerImage(res_imageSrc, imageSize); 
    
    // 마커를 생성합니다
    var marker = new daum.maps.Marker({
        //map: map, // 마커를 표시할 지도
        position: restaurant_positions[i].latlng, // 마커를 표시할 위치
        title : restaurant_positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지 
    });
    restaurant_markers.push(marker);

    var content = '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
            '            고를샘' + 
            '            <div class="close" onclick="closeOverlay(\''+marker.getTitle()+'\')" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="img">' +
            '                <img src="img/res1.jpeg" width="73" height="70">' +
            '           </div>' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">서울 서대문구 연세로 50</div>' + 
            '                <div class="jibun ellipsis">(우) 03722(지번) 신촌동 134</div>' + 
            '                <div><a class="link">02-2123-6932 상세보기</a></div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>';
    // 마커 위에 커스텀오버레이를 표시합니다
	// 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
	var overlay = new daum.maps.CustomOverlay({
	    content: content,
	    //map: map,
	    position: marker.getPosition()       
	});

	marker_overlay_map[marker.getTitle()] = overlay

	// 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
	daum.maps.event.addListener(marker, 'click', function() {
	    clickMarker(this);
	});
}

//카페 위치, 내용 등록
for (var i = 0; i < cafe_positions.length; i ++) {
    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new daum.maps.Size(26, 40); 
    
    // 마커 이미지를 생성합니다    
    var markerImage = new daum.maps.MarkerImage(cafe_imageSrc, imageSize); 
    
    // 마커를 생성합니다
    var marker = new daum.maps.Marker({
        //map: map, // 마커를 표시할 지도
        position: cafe_positions[i].latlng, // 마커를 표시할 위치
        title : cafe_positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지 
    });
    cafe_markers.push(marker);

    var content = '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
            '            카카오 스페이스닷원' + 
            '            <div class="close" onclick="closeOverlay(\''+marker.getTitle()+'\')" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="img">' +
            '                <img src="http://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
            '           </div>' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' + 
            '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' + 
            '                <div><a href="http://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>';
    // 마커 위에 커스텀오버레이를 표시합니다
	// 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
	var overlay = new daum.maps.CustomOverlay({
	    content: content,
	    //map: map,
	    position: marker.getPosition()       
	});

	marker_overlay_map[marker.getTitle()] = overlay

	// 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
	daum.maps.event.addListener(marker, 'click', function() {
	    clickMarker(this);
	});
}


//사람 위치, 내용 등록
for (var i = 0; i < friend_positions.length; i ++) {
    if(i == 0) {
        var imgSrc = "img/me_marker.png";     
        var imageSize = new daum.maps.Size(30, 30); 
    } else {
        var imgSrc = "img/friend_marker.png"; 
        var imageSize = new daum.maps.Size(30, 46); 
    }
    
    // 마커 이미지를 생성합니다    
    var markerImage = new daum.maps.MarkerImage(imgSrc, imageSize); 
    
    // 마커를 생성합니다
    var marker = new daum.maps.Marker({
        //map: map, // 마커를 표시할 지도
        position: friend_positions[i].latlng, // 마커를 표시할 위치
        title : friend_positions[i].name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지 
    });

    person_makers_map[marker.getTitle()] = marker;
}

//프린터 마커 켜기
function printers_turnon(){
	for (var i = 0; i < printer_markers.length; i ++) {
		printer_markers[i].setMap(map);
	}
}

//프린터 마커 끄기
function printers_turnoff(){
	for (var i = 0; i < printer_markers.length; i ++) {
		printer_markers[i].setMap(null);
	}
}

//식당 마커 켜기
function restaurants_turnon(){
	for (var i = 0; i < restaurant_markers.length; i ++) {
		restaurant_markers[i].setMap(map);
	}	
}

//식당 마커 끄기
function restaurants_turnoff(){
	for (var i = 0; i < restaurant_markers.length; i ++) {
		restaurant_markers[i].setMap(null);
	}	
}

//카페 마커 켜기
function cafes_turnon(){
	for (var i = 0; i < cafe_markers.length; i ++) {
		cafe_markers[i].setMap(map);
	}
}

//카페 마커 끄기
function cafes_turnoff(){
	for (var i = 0; i < cafe_markers.length; i ++) {
		cafe_markers[i].setMap(null);
	}
}

// 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
function closeOverlay(title) {
    marker_overlay_map[title].setMap(null); 
    $('#sidebar').removeClass('active');    
}

function clickMarker(marker) {
	if(current_overlay != null) {
		current_overlay.setMap(null);
	}
	current_overlay = marker_overlay_map[marker.getTitle()];

	marker_overlay_map[marker.getTitle()].setMap(map);
	$('#sidebar').addClass('active');
	$('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
}

// 마커를 생성하고 지도위에 표시하는 함수입니다
function addMarker(position) {
    
    // 마커를 생성합니다
    var marker = new daum.maps.Marker({
        position: position,
        map:map
    });   
}

var current_marker = null;
function addMarkerMove(name){
    if(current_marker != null) {
        current_marker.setMap(null);
    }
    var marker = person_makers_map[name];
    marker.setMap(map);
    current_marker = marker;

    map.setLevel(3);
    map.panTo(marker.getPosition());   
}

function addMarkerMoveForce(name){
    var marker = person_makers_map[name];
    marker.setMap(map);

    map.setLevel(3);
    map.panTo(marker.getPosition());   
}

function loginComplete() {
    html = '<li class = "login_user"><i class = "fas fa-user-circle fa-lg"></i>&nbsp;이동제</li>';
    html += '<li class = "login_myposi"><a class = "btn btn-default" id = "myposi">내위치보기</a></li>';
    html += '<li class = "login_userlist"><a id = "userlist" class = "btn btn-default">친구목록</a></li>';
    $("#login").html(html);

    $("#userlist").click(function(){
        $('#sidebar_2').addClass('active');
    });

    $("#myposi").click(function(){
        addMarkerMoveForce('이동제');
    });
}

