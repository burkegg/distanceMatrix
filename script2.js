console.log(DATA);
console.log(my_key);
function manageCalls() {
  let idx = 0;
  const intervalId = setInterval(function() {
    if (++idx === DATA.length) {
      return clearInterval(intervalId);
    }
    let nextSite = [];
    nextSite.push(DATA[idx]);
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

function theSum(numbers) {
  return numbers.reduce(function(a, b) {
    return a + b;
  }, 0);
}

function theMean(someData) {
  return theSum(someData) / someData.length;
}

function theMedian(someData) {
  let dataCopy = someData;
  if (dataCopy.length === 0) {
    return 0;
  }
  dataCopy.sort(function(a, b) {
    return a - b;
  });
  if (dataCopy.length % 2 === 0) {
    let preMid = dataCopy[(dataCopy.length) / 2 - 1];
    let postMid = dataCopy[(dataCopy.length) / 2];
    return theMean([preMid, postMid]);
  } else {
    return dataCopy[(dataCopy.length - 1) / 2];
  }
}

function secondsToMinutes(duration) {
  return duration / 60;
}

function getMedianMinutes(data) {
  return secondsToMinutes(theMedian(data));
}



function percentiles(data, numOfBins){
  let dataCopy = data;
  let dataOut = [];
  if (numOfBins < 1){
    console.log("did you forget the bins parameter?");
    return;
  }
  dataCopy.sort(function(a,b){
    return a-b;
  });
  // length / num of bins = size of numOfBins
  for (let i = 0; i < numOfBins; i++){
    let idx = Math.floor(i * data.length / numOfBins);
    console.log("bin " + i + ":  " + data[idx]);
    dataOut.push(data[idx]);
  }
  return dataOut;
}
