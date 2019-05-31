var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
mapOption = { 
center: new daum.maps.LatLng(36.815105, 127.113886), // 지도의 중심좌표
level: 3 // 지도의 확대 레벨
};

var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new daum.maps.MapTypeControl();

var ps = new daum.maps.services.Places(map); 

var category = new Array("MT1", "CS2", "PS3", "SC4", "SW8", "PO3", "FD6"); //카테고리 코드
var categoryCount = 0; // 카테고리 카운트
var mart, conv, kids, school, station, public, rest;

// 지도 타입 컨트롤을 지도에 표시합니다
map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
var zoomControl = new daum.maps.ZoomControl();
map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);

var marker = new daum.maps.Marker({ 
    // 지도 중심좌표에 마커를 생성합니다 
    position: map.getCenter() 
});
// 지도에 마커를 표시합니다
marker.setMap(map);

// 지도에 클릭 이벤트를 등록합니다
// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
daum.maps.event.addListener(map, 'click', function(mouseEvent) {        
    
    // 클릭한 위도, 경도 정보를 가져옵니다 
    var latlng = mouseEvent.latLng; 
    
    // 마커 위치를 클릭한 위치로 옮깁니다
    marker.setPosition(latlng);
    
    action(latlng.getLat(), latlng.getLng());
});

function action(x, y) {
	map.setLevel(3);
	var moveLatLon = new daum.maps.LatLng(x, y);
	var markerPosition  = new daum.maps.LatLng(x, y);
    map.panTo(moveLatLon);
	var marker = new daum.maps.Marker({
    position: markerPosition
	});
	marker.setMap(map);
	placeSearch();
}

function placeSearch(){
	ps.categorySearch(category[categoryCount], placesSearchCB, {useMapBounds:true});
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === daum.maps.services.Status.OK) {
		if(categoryCount < category.length){
			if(categoryCount === 0){
				mart = data;
				setHtml(category[categoryCount], data.length + "개 <a href=\"javascript:void(0);\" onclick=\"detailView(\'mart\');\">상세보기</a>");
			}
			else if(categoryCount === 1){
				conv = data;
				setHtml(category[categoryCount], data.length + "개 <a href=\"javascript:void(0);\" onclick=\"detailView(\'conv\');\">상세보기</a>");
			}
			else if(categoryCount === 2){
				kids = data;
				setHtml(category[categoryCount], data.length + "개 <a href=\"javascript:void(0);\" onclick=\"detailView(\'kids\');\">상세보기</a>");
			}
			else if(categoryCount === 3){
				school = data;
				setHtml(category[categoryCount], data.length + "개 <a href=\"javascript:void(0);\" onclick=\"detailView(\'school\');\">상세보기</a>");
			}
			else if(categoryCount === 4){
				station = data;
				setHtml(category[categoryCount], data.length + "개 <a href=\"javascript:void(0);\" onclick=\"detailView(\'station\');\">상세보기</a>");
			}
			else if(categoryCount === 5){
				public = data;
				setHtml(category[categoryCount], data.length + "개 <a href=\"javascript:void(0);\" onclick=\"detailView(\'public\');\">상세보기</a>");
			}
			else if(categoryCount === 6){
				rest = data;
				setHtml(category[categoryCount], data.length + "개 <a href=\"javascript:void(0);\" onclick=\"detailView(\'rest\');\">상세보기</a>");
			}
			categoryCount++;
			if(categoryCount === category.length){
				categoryCount = 0;
				return;
			}
			else{
				placeSearch();
			}
			}
		} else if (status === daum.maps.services.Status.ZERO_RESULT) {
			if(categoryCount <= category.length){
				setHtml(category[categoryCount], "검색결과 없음");
				categoryCount++;
				if(categoryCount === category.length){
					categoryCount = 0;
					return;
				}
				else{
					placeSearch();
				}
				}
    } else if (status === daum.maps.services.Status.ERROR) {
        alert("오류");
    }
}

function setHtml(item_id, item_html, place)
{
	 obj = document.getElementById(item_id);
	 if (obj == null) {
		 alert(item_id + ' 찾기 오류');
		 return;
	 }
	 obj.innerHTML = item_html;
} // html 내용바꾸기

function detailView(cname){
	var detail = document.getElementById("text");
	detail.innerHTML = "";
	 if (detail == null) {
		alert("text" + ' 찾기 오류'); 
		return;
	 }
	if(cname === "mart"){
		for(var i=0; i<mart.length; i++){
			newP = document.createElement('p');
			detail.appendChild(newP);
			newP.innerHTML = mart[i].place_name;
		}
	}
	else if(cname === "conv"){
		for(var i=0; i<conv.length; i++){
			newP = document.createElement('p');
			detail.appendChild(newP);
			newP.innerHTML = conv[i].place_name;
		}
	}
	else if(cname === "kids"){
		for(var i=0; i<kids.length; i++){
			newP = document.createElement('p');
			detail.appendChild(newP);
			newP.innerHTML = kids[i].place_name;
		}
	}
	else if(cname === "school"){
		for(var i=0; i<school.length; i++){
			newP = document.createElement('p');
			detail.appendChild(newP);
			newP.innerHTML = school[i].place_name;
		}
	}
	else if(cname === "station"){
		for(var i=0; i<station.length; i++){
			newP = document.createElement('p');
			detail.appendChild(newP);
			newP.innerHTML = station[i].place_name;
		}
	}
	else if(cname === "public"){
		for(var i=0; i<public.length; i++){
			newP = document.createElement('p');
			detail.appendChild(newP);
			newP.innerHTML = public[i].place_name;
		}
	}
	else if(cname === "rest"){
		for(var i=0; i<rest.length; i++){
			newP = document.createElement('p');
			detail.appendChild(newP);
			newP.innerHTML = rest[i].place_name;
		}
	}
} // 상세정보 보기 구현