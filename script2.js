function manageCalls() {
  let idx = 0;
  const intervalId = setInterval(function() {
    if (++idx === origin1.length) {
      return clearInterval(intervalId);
    }
    let nextSite = [];
    nextSite.push(origin1[idx]);
    initMap(nextSite, 'DRIVING');
    //console.log(nextSite);
  }, 200);
}

let durationData = [];
//*** Work the date line then run it!
function initMap(startPoint, modus) {
  let serviceObj = new google.maps.DistanceMatrixService();
  serviceObj.getDistanceMatrix({
    origins: startPoint,
    travelMode: modus,
    drivingOptions: {
      departureTime: new Date(),
      trafficModel: 'pessimistic'
    },
    destinations: [{
      lat: 37.7876,
      lng: -122.4424
    }],
    unitSystem: google.maps.UnitSystem.Imperial,
  }, writeData);
}

function writeData(response, status) {
  if (status == 'OK') {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;

    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      for (var j = 0; j < results.length; j++) {
        var element = results[j];
        var distance = element.distance.value;
        var duration = element.duration.value;
        var from = origins[i];
        var to = destinations[j];
        //console.log("distance:  " + distance);
        console.log("duration:  " + duration);
        durationData.push(duration);
      }
    }
  }
}
console.log(durationData);
function theSum(numbers){
  return numbers.reduce(function(a, b) {
    return a + b;
  }, 0);
}

function theMean(someData){
  return theSum(someData) / someData.length;
}

function theMedian(someData){
  let dataCopy = someData;
  if (dataCopy.length === 0){
    return 0;
  }
  dataCopy.sort(function(a, b){
    return a-b;
  });
  if (dataCopy.length % 2 === 0){
    let preMid = dataCopy[(dataCopy.length) / 2 - 1];
    let postMid = dataCopy[(dataCopy.length) / 2];
    return theMean([preMid, postMid]);
  }else{
    return dataCopy[(dataCopy.length - 1) / 2];
  }
}

function secondsToMinutes(duration){
  return duration / 60;
}
function getMedianMinutes(data){
  return secondsToMinutes(theMedian(data));
}
