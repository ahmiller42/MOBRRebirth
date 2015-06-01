

/* this is a dummy implementation to create poi-data, which are passed over to JS / Wikitude SDK on first location update */
function onLocationUpdated(position, reports) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var altitude = position.coords.altitude;
    var placesAmount = 10;
    var poiData = [];

     //alert(position);
     //alert(observationReports);

    //obsReports[i]
    //Status
    //Name
    //Description
    //Severity
    //Type

    var dataSource = window.APP.models.observation_reports.ds;
    dataSource.fetch().then(function () {
        
        var data = dataSource._data;

        // creates dummy poi-data around given lat/lon
        for (var i = 0; i < data.length; i++) {
            
            poiData.push({
                'id': (i + 1),
                'longitude': longitude + 0.001 * (5 - getRandomInt(1, 10)),
                'latitude': latitude + 0.001 * (5 - getRandomInt(1, 10)),
                'description': data[i].Description,
                'altitude': 100.0,
                'name': data[i].Name,
               	'obrtype': data[i].Type
            });

        }
        
        // inject POI data in JSON-format to JS
        //World.loadPoisFromJsonData(poiData)
        app.wikitudePlugin.callJavaScript("World.loadPoisFromJsonData(" + JSON.stringify(poiData) + ");")
        .then(function() {
                alert("Out of this world!");
        });
        
	});
}

function onLocationError(error) {
    alert("Not able to fetch location.");
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

