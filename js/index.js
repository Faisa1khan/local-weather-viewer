//skycons declaration
var skycons = new Skycons({"color": "#17bed2"});
var hits = 1; //toggle effect
skycons.play();

//geolocation api
if (navigator.geolocation) {
 
  function getCurrentLocation (position) {
    
   var  latitude = position.coords.latitude;
   var  longitude = position.coords.longitude;
    

    
    $.getJSON('https://fcc-weather-api.glitch.me/api/current?lat='+latitude+'&lon='+longitude, function(json) {
     //var rawJson = JSON.stringify(json);
    var description = json.weather[0].main;
      var temp = json.main.temp;
      
   document.getElementById("temp").innerHTML = temp+'°C';
      //farenheit conversion
     document.getElementById("temp").addEventListener("click", convertToF);
   function convertToF() {
    
  var fahrenheit;
     var celcius = json.main.temp;
  
   fahrenheit = (9/5 * celcius) + 32;
     if(hits%2==0){
       document.getElementById("temp").innerHTML = celcius+'°C';
     }
     else{
       document.getElementById("temp").innerHTML = Math.round(fahrenheit)+'°F';
     }
   
    hits++;
}
  document.getElementById("location").innerHTML = json.name + ', ' + json.sys.country;
   document.getElementById("desc").innerHTML = description;
      
      //skycons update
     if(description=="Fog"||description=="Smoke"){
      skycons.set("animated-icon", 
  Skycons.FOG);
      }
      else if(description=="Rain"){
        skycons.set("animated-icon", 
  Skycons.RAIN);
      }
      
      else {
        skycons.set("animated-icon", 
  Skycons.CLEAR_DAY);
      }
      
      
   
   });
    
   
    
    
  }
  
  
  
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
  
 }

else { 
	alert("Geolocation is not supported by your browser, download the latest Chrome or Firefox to use this app");
}