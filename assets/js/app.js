var map, featureList, boroughSearch = [], parkSearch = [];

$(window).resize(function() {
  sizeLayerControl();
});

$(document).on("click", ".feature-row", function(e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt($(this).attr("id"), 10));
});

if ( !("ontouchstart" in window) ) {
  $(document).on("mouseover", ".feature-row", function(e) {
    highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
  });
}

$(document).on("mouseout", ".feature-row", clearHighlight);

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#contact-btn").click(function() {
  $("#contactModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#modalClose").click(function() {
  if (map.getZoom() > 13) {
	  map.setZoom(12);
  }
  $("#featureModal").modal("close");
  return false
});

$("#full-extent-btn").click(function() {
  map.fitBounds(boroughs.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function() {
  animateSidebar();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  animateSidebar();
  return false;
});

$("#sidebar-hide-btn").click(function() {
   document.getElementById("showPanelbar").style.display = "block";
  animateSidebar();
  return false;
});

$("#showPanelbar").click(function() {
  animateSidebar();
  return true;
});
$("#showPanelbar").click(function() {
  document.getElementById("showPanelbar").style.display = "none";
});
function animateSidebar() {
  $("#sidebar").animate({
    width: "toggle"
  }, 350, function() {
    map.invalidateSize();
  });
}

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}

function sidebarClick(id) {
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}
function syncSidebar() {
  /* Empty sidebar features */
  $("#feature-list tbody").empty();
   /* Loop through parks layer and add only features which are in the map bounds */
  // CHANGE: loop through all use layers
  picnics.eachLayer(function (layer) {
    if (map.hasLayer(picnicsLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  weddings.eachLayer(function (layer) {
    if (map.hasLayer(weddingsLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  parties.eachLayer(function (layer) {
    if (map.hasLayer(partiesLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  /* Update list.js featureList */
  featureList = new List("features", {
    valueNames: ["feature-name"]
  });
  featureList.sort("feature-name", {
    order: "asc"
  });
}

/* Basemap Layers */
  	
            
var streetmap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
					attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
				});
          var clarity = L.tileLayer('https://clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
var CartoDB_Voyager = L.tileLayer("https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png", {
	attribution: null,
	subdomains: "abcd",
	maxZoom: 20
});				
            
var cartoLight = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: null
});
var Stamen_Terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
});
// CHANGE: grouping the basemaps
let baseMapGroup={
    "OSM":streetmap,
    "CartoDB Voyage":CartoDB_Voyager,
    "Carto Light":cartoLight,
    "Stamen Terrain":Stamen_Terrain
 }

/* Overlay Layers */
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00FFFF",
  fillOpacity: 0.7,
  radius: 10
};

var boroughs = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "black",
      fill: false,
      opacity: 1,
      clickable: false
    };
  },
  onEachFeature: function (feature, layer) {
    boroughSearch.push({
      name: layer.feature.properties.BoroName,
      source: "Boroughs",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
  }
});
$.getJSON("https://raw.githubusercontent.com/brandonlprice/orangecountynature/main/gatheringspaces/data/boroughs.geojson", function (data) {
  boroughs.addData(data);
});

/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16
});
// slide images in popup
let slideIndex = 1;
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  if(slides.length>1){
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    slides[slideIndex-1].style.display = "block"; 
  }
}
// CHANGE: create a function to create a layer so it can used by multiple creation
function createLayer(){
  let created=L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {
        icon: L.icon({
          iconUrl: "assets/img/theater.png",
          iconSize: [24, 28],
          iconAnchor: [12, 28],
          popupAnchor: [0, -25]
        }),
        title: feature.properties.NAME,
        riseOnHover: true
      });
    },
    onEachFeature: function (feature, layer) {
      let photo_content = "</br>Not Available"
    if(feature.properties.photo1) { // null is Not Available
      // photo_content = '<img src="'+ feature.properties.photo1 +'" style="width:23em;height:22em;display: block;margin-left: auto;margin-right: auto;width: 80%;"></br><button onclick="myFunction()" id="nextPhoto" class="btn btn-light btn-sm btn-secondary" style="display: block;margin-left: auto;margin-right: auto;width: 50%;">Next</button>'
      let head="<div class='item'>",foot="</div>",
      p1="<div class='item active'><img src='"+feature.properties.photo1+"' style='width:23em;height:22em;margin-left: auto;margin-right: auto;width: 80%;'>"+foot,
      p2=head+"<img src='"+feature.properties.photo1+"' style='width:23em;height:22em;margin-left: auto;margin-right: auto;width: 80%;'>"+foot,
      p3=head+"<img src='"+feature.properties.photo1+"' style='width:23em;height:22em;margin-left: auto;margin-right: auto;width: 80%;'>"+foot,
      p4=head+"<img src='"+feature.properties.photo1+"' style='width:23em;height:22em;margin-left: auto;margin-right: auto;width: 80%;'>"+foot
      if(feature.properties.photo2)p2=head+"<img src='"+feature.properties.photo2+"' style='width:23em;height:22em;margin-left: auto;margin-right: auto;width: 80%;'>"+foot
      if(feature.properties.photo3)p3=head+"<img src='"+feature.properties.photo3+"' style='width:23em;height:22em;margin-left: auto;margin-right: auto;width: 80%;'>"+foot
      if(feature.properties.photo4)p4=head+"<img src='"+feature.properties.photo4+"' style='width:23em;height:22em;margin-left: auto;margin-right: auto;width: 80%;'>"+foot
      photo_content=
        "<div id='carousel-example-generic' class='carousel slide' data-ride='carousel' style='width:95%;height:22em;'>"+
          '<ol class="carousel-indicators">'+
            '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>'+
            '<li data-target="#carousel-example-generic" data-slide-to="1"></li>'+
            '<li data-target="#carousel-example-generic" data-slide-to="2"></li>'+
            '<li data-target="#carousel-example-generic" data-slide-to="3"></li>'+
          '</ol>'+  
          '<div class="carousel-inner" role="listbox">'+
            p1+p2+p3+p4+
          '</div>'+
          '<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">'+
            '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'+
            '<span class="sr-only">Previous</span>'+
          '</a>'+
          '<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">'+
            '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'+
            '<span class="sr-only">Next</span>'+
          '</a>'+
        "</div>"
    }
    if (feature.properties) {
        var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Address</th><td>" + feature.properties.ADDRESS1 + "</td><th>Ph.</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Use Type</th><td>" + feature.properties.TEL + "</td><th>Fee</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Reserve at</th><td  colspan='3'><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>"+ "<tr><th>Images</th><td colspan='3' style='line-height: .5em;'>" + photo_content + "</td></tr>" + "<table>";
        layer.on({
          click: function (e) {
            $("#feature-title").html(feature.properties.NAME);
            $("#feature-info").html(content);
            $("#featureModal").modal("show");
            showSlides(slideIndex);
            highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
          }
        });
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
        parkSearch.push({
          name: layer.feature.properties.NAME,
          address: layer.feature.properties.ADDRESS1,
          source: "Parks",
          id: L.stamp(layer),
          lat: layer.feature.geometry.coordinates[1],
          lng: layer.feature.geometry.coordinates[0]
        });
      }
    }
  });
  return created
}

map = L.map("map", {
  zoom: 10,
  center: [40.702222, -73.979378],
  layers: [cartoLight, boroughs, markerClusters, highlight],
  zoomControl: false,
  attributionControl: false
});
// CHANGE2: extract each use from parks.geojson as their own layer
// $.getJSON('assets/data/parks.geojson',(parks_new_data)=>{})
  let newParksDataGroup={'picnics':{
        "type":"FeatureCollection","features":[]
      },'parties':{
        "type":"FeatureCollection","features":[]
      },'weddings':{
        "type":"FeatureCollection","features":[]
      }},
      picnics=createLayer(),parties=createLayer(),weddings=createLayer(),
      picnicsLayer=L.geoJson(),partiesLayer=L.geoJson(),weddingsLayer=L.geoJson()

  let parks_new_data=parks_data
  parks_new_data.features.forEach(element=>{
    let pr=element.properties
    if(pr.USE1) newParksDataGroup[pr.USE1]['features'].push(element)
    if(pr.USE2) newParksDataGroup[pr.USE2]['features'].push(element)
    if(pr.USE3) newParksDataGroup[pr.USE3]['features'].push(element)
  })
// CHANGE2: Adding the data
  picnics.addData(newParksDataGroup['picnics'])
  weddings.addData(newParksDataGroup['weddings'])
  parties.addData(newParksDataGroup['parties'])
// CHANGE2: enable a group layer control
var groupedOverlays = {
  "Parks": {
    "&nbsp;&nbsp;<span>Picnics</span><img src='assets/img/theater.png' width='24' height='28'>": picnicsLayer,
    "&nbsp;&nbsp;<span>Weddings</span><img src='assets/img/theater.png' width='24' height='28'>": weddingsLayer,
    "&nbsp;&nbsp;<span>Parties</span><img src='assets/img/theater.png' width='24' height='28'>": partiesLayer,
  }
};
var layerControl = new L.Control.GroupedLayers(baseMapGroup, groupedOverlays, {
  collapsed: isCollapsed,
})
layerControl.addTo(map);
/* Layer control listeners that allow for a single markerClusters layer */

// CHANGE2: add other use layer remove and add layer to the markercluster
map.on("overlayadd", function(e) {
  if (e.layer === picnicsLayer) {
    markerClusters.addLayer(picnics);
    syncSidebar();
  }
  if (e.layer === weddingsLayer) {
    markerClusters.addLayer(weddings);
    syncSidebar();
  }
  if (e.layer === partiesLayer) {
    markerClusters.addLayer(parties);
    syncSidebar();
  }
});

map.on("overlayremove", function(e) {
  if (e.layer === picnicsLayer) {
    markerClusters.removeLayer(picnics);
    syncSidebar();
  }
  if (e.layer === weddingsLayer) {
    markerClusters.removeLayer(weddings);
    syncSidebar();
  }
  if (e.layer === partiesLayer) {
    markerClusters.removeLayer(parties);
    syncSidebar();
  }
});
/* Filter sidebar feature list to only show features in current map bounds */
map.on("moveend", function (e) {
  syncSidebar();
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  highlight.clearLayers();
});

/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span>© OpenStreetMap contributors, © CartoDB</span> | <a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
  return div;
};
map.addControl(attributionControl);


L.Control.zoomHome = L.Control.extend({
    options: {
        position: 'topleft',
        zoomInText: '+',
        zoomInTitle: 'Zoom in',
        zoomOutText: '-',
        zoomOutTitle: 'Zoom out',
        zoomHomeText: '<i class="fa fa-home" style="line-height:1.65;"></i>',
        zoomHomeTitle: 'Zoom home'
    },

    onAdd: function (map) {
        var controlName = 'gin-control-zoom',
            container = L.DomUtil.create('div', controlName + ' leaflet-bar'),
            options = this.options;

        this._zoomInButton = this._createButton(options.zoomInText, options.zoomInTitle,
        controlName + '-in', container, this._zoomIn);
        this._zoomHomeButton = this._createButton(options.zoomHomeText, options.zoomHomeTitle,
        controlName + '-home', container, this._zoomHome);
        this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
        controlName + '-out', container, this._zoomOut);

        this._updateDisabled();
        map.on('zoomend zoomlevelschange', this._updateDisabled, this);

        return container;
    },

    onRemove: function (map) {
        map.off('zoomend zoomlevelschange', this._updateDisabled, this);
    },

    _zoomIn: function (e) {
        this._map.zoomIn(e.shiftKey ? 3 : 1);
    },

    _zoomOut: function (e) {
        this._map.zoomOut(e.shiftKey ? 3 : 1);
    },

    _zoomHome: function (e) {
        map.setView([33.681852, -117.744326], 10);
    },

    _createButton: function (html, title, className, container, fn) {
        var link = L.DomUtil.create('a', className, container);
        link.innerHTML = html;
        link.href = '#';
        link.title = title;

        L.DomEvent.on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
            .on(link, 'click', L.DomEvent.stop)
            .on(link, 'click', fn, this)
            .on(link, 'click', this._refocusOnMap, this);

        return link;
    },

    _updateDisabled: function () {
        var map = this._map,
            className = 'leaflet-disabled';

        L.DomUtil.removeClass(this._zoomInButton, className);
        L.DomUtil.removeClass(this._zoomOutButton, className);

        if (map._zoom === map.getMinZoom()) {
            L.DomUtil.addClass(this._zoomOutButton, className);
        }
        if (map._zoom === map.getMaxZoom()) {
            L.DomUtil.addClass(this._zoomInButton, className);
        }
    }
});
// add the new control to the map
var zoomHome = new L.Control.zoomHome();
zoomHome.addTo(map);


/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "fa fa-location-arrow",
  metric: false,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}
/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Prevent hitting enter from refreshing the page */
$("#searchbox").keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
  }
});

$("#featureModal").on("hidden.bs.modal", function (e) {
  $(document).on("mouseout", ".feature-row", clearHighlight);
});


//  map.setView([L.latLng(map.getCenter()), L.latLng(map.getCenter())], 10);


/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  sizeLayerControl();
  /* Fit map to boroughs bounds */
  map.fitBounds(boroughs.getBounds());
  featureList = new List("features", {valueNames: ["feature-name"]});
  featureList.sort("feature-name", {order:"asc"});

  var boroughsBH = new Bloodhound({
    name: "Boroughs",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: boroughSearch,
    limit: 10
  });

 
  var parksBH = new Bloodhound({
    name: "Parks",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: parkSearch,
    limit: 10
  });


  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
      filter: function (data) {
        return $.map(data.geonames, function (result) {
          return {
            name: result.name + ", " + result.adminCode1,
            lat: result.lat,
            lng: result.lng,
            source: "GeoNames"
          };
        });
      },
      ajax: {
        beforeSend: function (jqXhr, settings) {
          settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
          $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 10
  });
  boroughsBH.initialize();
  geonamesBH.initialize();
  parksBH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "Boroughs",
    displayKey: "name",
    source: boroughsBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Boroughs</h4>"
    }
  }, {
    name: "Parks",
    displayKey: "name",
    source: parksBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;Parks</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  },{
    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;GeoNames</h4>"
    }
  }).on("typeahead:selected", function (obj, datum) {
    if (datum.source === "Boroughs") {
      map.fitBounds(datum.bounds);
    }
    parkLayersGroup.forEach(element => {
      if (datum.source === element.layer) {
        if (!map.hasLayer(element.layerData)) {
          map.addLayer(element.layerData);
        }
        map.setView([datum.lat, datum.lng], 17);
        if (map._layers[datum.id]) {
          map._layers[datum.id].fire("click");
        }
      }
    });
	if (datum.source === "Parks") {
      if (!map.hasLayer(parkLayer)) {
        map.addLayer(parkLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
    }
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
  }).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});

// Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
  L.DomEvent
  .disableClickPropagation(container)
  .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}

// CHANGE2: Create a function to check the selected radio for filters
// Filter checking
function filterLayer(){
  let radio_opt=document.querySelectorAll('input[name="parks-radio"]')
  let lyr_opt=document.getElementsByClassName('leaflet-control-layers-selector')
  console.log(lyr_opt)
  radio_opt.forEach(btn => {
    if(btn.checked){
      let layerName= btn.value
      $("#feature-list tbody").empty();
      if (layerName === 'picnics') {
        markerClusters.clearLayers()
        markerClusters.addLayer(picnics)
        picnics.eachLayer(function (layer) {
            if (map.getBounds().contains(layer.getLatLng())) {
              $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
            }
        });
      if(!lyr_opt[4].checked)lyr_opt[4].checked=true
        lyr_opt[5].checked=false
        lyr_opt[6].checked=false
      }else if(layerName === 'weddings') {
        markerClusters.clearLayers()
        markerClusters.addLayer(weddings)
        weddings.eachLayer(function (layer) {
            if (map.getBounds().contains(layer.getLatLng())) {
              $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
            }
        });
        if(!lyr_opt[5].checked)lyr_opt[5].checked=true
        lyr_opt[4].checked=false
        lyr_opt[6].checked=false
      }else if(layerName === 'parties') {
        markerClusters.clearLayers()
        markerClusters.addLayer(parties)
        parties.eachLayer(function (layer) {
          if (map.getBounds().contains(layer.getLatLng())) {
            $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
          }
        });
        if(!lyr_opt[6].checked)lyr_opt[6].checked=true
        lyr_opt[4].checked=false
        lyr_opt[5].checked=false
      }else{
        markerClusters.removeLayer(picnics,weddings,parties);
        markerClusters.addLayer(picnicsLayer,weddingsLayer,partiesLayer);
        syncSidebar()
        lyr_opt[4].checked=true
        lyr_opt[5].checked=true
        lyr_opt[6].checked=true
      }
      featureList = new List("features", {
        valueNames: ["feature-name"]
      });
      featureList.sort("feature-name", {
        order: "asc"
      });
    }
  });
  
}