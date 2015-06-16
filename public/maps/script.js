function loadMarker(map, opt) {
	var latLng = new google.maps.LatLng(opt.latitude, opt.longitude);
	var Marker = new google.maps.Marker({
      position: latLng,
      map: map,
      icon: image
  });
};

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(initialize);
	} else {
		console.log("Geolocation is not supported by this browser.");
	}
}

function initialize(position) {
	var mapOptions = {
		//center: new google.maps.LatLng(-34.397, 150.644),
		center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
}
