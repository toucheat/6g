var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
mapOption = { 
center: new daum.maps.LatLng(36.815105, 127.113886), // 지도의 중심좌표
level: 3 // 지도의 확대 레벨
};

var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new daum.maps.MapTypeControl();

var ps = new daum.maps.services.Places(map); 

// 지도 타입 컨트롤을 지도에 표시합니다
map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
var zoomControl = new daum.maps.ZoomControl();
map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);

function action(x, y) {
	map.setLevel(3);
	var moveLatLon = new daum.maps.LatLng(x, y);
	var markerPosition  = new daum.maps.LatLng(x, y);
    map.panTo(moveLatLon);
	var marker = new daum.maps.Marker({
    position: markerPosition
	});
	marker.setMap(map);
	searchPlaces();
}

function searchPlaces() {
    ps.categorySearch('SC4', placesSearchCB, {useMapBounds:true}); 
}


// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === daum.maps.services.Status.OK) {
		setHtml("school", data.length);
		setHtml("text", data.place_name);
	    } else if (status === daum.maps.services.Status.ZERO_RESULT) {
        alert("검색결과없음");
    } else if (status === daum.maps.services.Status.ERROR) {
        alert("오류");
    }
}

function setHtml(item_id, item_html)
{
	 obj = document.getElementById(item_id);
	 if (obj == null) {
		 alert(item_id + ' 찾기 오류');
		 return;
	 }
	 obj.innerHTML = item_html;
} // html 내용바꾸기