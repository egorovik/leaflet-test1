function addBeacon(map){
  var image = L.icon({
    iconUrl: 'markers/search.png',
    iconSize:     [38, 38],
    iconAnchor:   [22, 37],
    popupAnchor:  [-3, -37]
  });
  
  var beacon = L.marker([75.230667, -57.304688],{
    draggable: true,
    icon: image
  }).addTo(map);
  beacon.bindPopup(beacon.getLatLng().toString() + "<br/>" +
                   "rev: " + beacon.getLatLng().lng.toString() + ", " + beacon.getLatLng().lat.toString() + "<br/>" +
                   map.project(beacon.getLatLng(), map.getMaxZoom().toString()));
  beacon.openPopup();
  
  beacon.on('dragend', function(){
    beacon.getPopup().setContent(beacon.getLatLng().toString() + "<br/>" +
                                 "rev: " + beacon.getLatLng().lng.toString() + ", " + beacon.getLatLng().lat.toString() + "<br/>" +
                                 map.project(beacon.getLatLng(), map.getMaxZoom().toString()));
    beacon.openPopup();
  });
}

function pxPos(map, pos){
  return map.unproject(pos, map.getMaxZoom());
}

function onEachFeature(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties && feature.properties.name) {
    layer.bindPopup(feature.properties.name);
  }
  if (feature.properties && feature.properties.icon) {
    layer.setIcon(
      L.icon({
        iconUrl: feature.properties.icon,
        iconSize:     [38, 38],
        iconAnchor:   [22, 37],
        popupAnchor:  [-3, -37]
      })
    );
  }
}

function ready(){
  
  var mapSW = [0, 2816]; //2816 = 256 * 11
  var mapNE = [5888, 0]; //5888 = 256 * 23
  
  var map = L.map('map').setView([0, 0], 2);
  
  L.tileLayer('map/{z}-{x}-{y}.jpg',{
    minZoom: 0,
    maxZoom: 5,
    continuousWorld: false,
    noWrap: true,
    crs: L.CRS.Simple
  }).addTo(map);
  
  map.setMaxBounds(new L.LatLngBounds(
    map.unproject(mapSW, map.getMaxZoom()),
    map.unproject(mapNE, map.getMaxZoom())
  ));
  
  //addBeacon(map);
  
  L.geoJSON(geojsonFeature, {
    onEachFeature: onEachFeature
  }).addTo(map);
}

$(document).ready(ready);
