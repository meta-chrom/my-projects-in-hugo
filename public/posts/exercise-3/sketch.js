//Weather API
// https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=ef457a6548ee4bd03b74648e458ac2a9

//Geocoding API
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

//Air Pollution
//http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API key}

let urlRoot = "https://api.openweathermap.org/";
//let apiWeather = "data/2.5/weather?q=";
let apiGeo = "geo/1.0/direct?q=";
let apiPoll = "data/2.5/air_pollution?";
let cityName; 
let apiKey = "&appid=ef457a6548ee4bd03b74648e458ac2a9";
let units = "&units=metric";
let lat, lon;
let so2, co, nh3, no, no2, o3, pm2_5, pm10;
let smokeCount = 50
let myFont;
let airQualityMessage = ""


let input;

function preload() {
  myFont = loadFont('Basalte-Fond.ttf');
}

function setup() {
  createCanvas(1200, 900, WEBGL);
  textFont(myFont);
  
  let button = select("#submit");
  input = select("#ciudad");
  cityName = input.value();
  button.mousePressed(geoAsk);
  frameRate(12);

  

  
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);

  

  // Zylinder 1 / SO2
  push(); 
  translate(-300, 200, 0); 
  fill(193, 176, 152);
  cylinder(50, 200); 
  pop(); 
  
  for (let i = 0; i < smokeCount; i++) {
    let x = random(-300 - 50, -300 + 50); // Zufällige x-Position rund um den Zylinder
    let y = random(220 - 500, 220 - 100); // Zufällige y-Position direkt über dem Zylinder
    let size = random(10, 30); 
    let opacity;

    
    if(so2 >= 0 && so2 <= 200){
      opacity = map(so2, 0, 200, 50, 150); 
    } else if (so2 >= 201 && so2 <= 350) {
      opacity = map(so2, 201, 350, 150, 250); 
    } else if (so2 >= 351 && so2 <= 1250) {
      opacity = map(so2, 351, 1250, 250, 350); E
    }
    
    fill(194, 173, 153, opacity); 
    noStroke(); 
    ellipse(x, y, size); 
  }

  push();
  translate(-300, 330, 0); 
  fill(0); 
  textSize(15); 
  text("SO2", 0, 0); 
  translate(0, 20, 0); 
  textSize(8); 
  text("Sulfur Dioxide comes from car exhaust, factories, and burning coal. It can make breathing difficult and cause throat and lung pain. ", -50, -5, 100, 70);
  pop();

  // Zylinder 2/NO2
  push(); 
  translate(-150, 200, 0); 
  fill (192, 124, 223);
  cylinder(50, 200); 
  pop(); 
  
  for (let i = 0; i < smokeCount; i++) {
    let x = random(-150 - 50, -150 + 50); 
    let y = random(220 - 500, 220 - 100); 
    let size = random(10, 30); 
    let opacity;

    // Transparenz basierend auf no2
    if(no2 >= 0 && no2 <= 90){
      opacity = map(no2, 0, 90, 50, 150); 
    } else if (no2 >= 91 && no2<= 120){
      opacity = map(no2, 91, 120, 150, 250); 
    } else if (no2 >= 121 && no2<= 1000){
      opacity = map(no2, 121, 1000, 250, 350); 
    }

    fill(215, 173, 235, opacity); 
    noStroke(); 
    ellipse(x, y, size); 
  }

  push();
  translate(-150, 330, 0); 
  fill(0); 
  textSize(15); 
  text("NO2", 0, 0);
  translate(0, 20, 0); 
  textSize(8); 
  text("Nitrogen Dioxide is from car and truck exhaust, and factories. It can cause coughing, lung pain, and make it harder to breathe. ", -50, -5, 100, 70);
  pop();

  // Zylinder 3 / O3
  push();
  translate(0, 200, 0);
  fill(155, 155, 147);
  cylinder(50, 200); 
  pop();

  for (let i = 0; i < smokeCount; i++) {
    let x = random(0 - 50, 0 + 50); 
    let y = random(220 - 500, 220 - 100); 
    let size = random(10, 30); 
    let opacity;

    // Transparenz basierend auf o3
    if(o3 >= 0 && o3 <= 100){
      opacity = map(o3, 0, 100, 50, 150); 
    } else if (o3 >= 101 && o3 <= 130){
      opacity = map(o3, 101, 130, 150, 250); 
    } else if (o3 >= 131 && o3 <= 800){
      opacity = map(o3, 131, 800, 250, 350); 
    }

    fill(226, 226, 223, opacity); 
    noStroke(); 
    ellipse(x, y, size); 
  

  push();
  translate(0, 330, 0); 
  fill(0); 
  textSize(15); 
  text("O3", 0, 0); 
  translate(0, 20, 0); 
  textSize(8); 
  text("Ozone is created by car exhaust and sunlight. It can hurt your chest and make breathing harder, especially for people with asthma. ", -50, -5, 100, 70);
  pop();

  }

  // Zylinder 4 / PM2.5
  push();
  translate(150, 200, 0); 
  fill(57, 57, 58);
  cylinder(50, 200); 
  pop();

  for (let i = 0; i < smokeCount; i++) {
    let x = random(150 - 50, 150 + 50); 
    let y = random(220 - 500, 220 - 100); 
    let size = random(10, 30); 
    let opacity;

    // Transparenz basierend auf pm2_5
    if(pm2_5 >= 0 && pm2_5 <= 20){
      opacity = map(pm2_5, 0, 20, 50, 150); 
    } else if (pm2_5 >= 21 && pm2_5 <= 25){
      opacity = map(pm2_5, 21, 25, 150, 250); 
    } else if (pm2_5 >= 26 && pm2_5 <= 800){
      opacity = map(pm2_5, 26, 800, 250, 350); 
    }

    fill(121, 121, 124, opacity); 
    noStroke(); 
    ellipse(x, y, size); 
  }

  push(); 
  translate(150, 330, 0); 
  fill(0); 
  textSize(15); 
  text("PM2.5", 0, 0); 
  translate(0, 20, 0); 
  textSize(8); 
  text("Particulate Matter 2.5 comes from car exhaust, factories, and fires. These tiny particles can make it hard to breathe and cause lung problems.", -50, -5, 100, 70);
  pop();

  // Zylinder 5 / PM10
  push();
  translate(300, 200, 0); 
  fill(245, 255, 144);
  cylinder(50, 200); 
  pop();

  for (let i = 0; i < smokeCount; i++) {
    let x = random(300 - 50, 300 + 50); 
    let y = random(220 - 500, 220 - 100); 
    let size = random(10, 30); 
    let opacity;

    // Transparenz basierend auf pm10
    if(pm10 >= 0 && pm10 <= 40){
      opacity = map(pm10, 0, 40, 50, 150); 
    } else if (pm10 >= 41 && pm10 <= 50){
      opacity = map(pm10, 41, 50, 150, 250); 
    } else if (pm10 >= 51 && pm10 <= 1200){
      opacity = map(pm10, 51, 1200, 250, 350); 
    }

    fill(248, 255, 173, opacity); 
    noStroke(); 
    ellipse(x, y, size); 
  }

  push(); 
  translate(300, 330, 0); 
  fill(0); 
  textSize(15); 
  text("PM10", 0, 0); 
  translate(0, 20, 0); 
  textSize(8); 
  text("Particulate Matter 10 comes from dirt, cars, and factories. It can irritate your eyes, nose, and throat, and make it hard to breathe.", -50, -5, 100, 70); // Text anzeigen, mit Bereichsbegrenzung
  pop();


// **Nase mit Nasenlöchern hinzufügen**
 
  
  fill(215, 190, 130);
  ellipse (-200, -320, 240, 240);

  fill(215, 190, 130);
  ellipse (200, -320, 240, 240);
  
  fill(215, 190, 130);  // Hautfarbe der Nase
  triangle(-240, -250, 0, -700, 240, -250)

  fill(226, 207, 162);
  ellipse(-0, -370, 260, 210);

  //Air Quality Message

  push();
  translate(-100, -500, 50); 
  fill(0);
  textSize(15); 
  text(airQualityMessage, 0, 0, 200, 300); 
  pop();

  

 
 







}

  


//function weatherAsk(){
// loadJSON(urlRoot + apiWeather + cityName + units + apiKey, gotData);
//}



//function updateCity(){
 // cityName = input.value();

//}


function geoAsk(){
  cityName=input.value();
  loadJSON(urlRoot + apiGeo + cityName + apiKey, gotGeoData);


}

function gotGeoData(data){
  lat = "lat=" + data[0].lat;
  lon = "&lon=" + data[0].lon;
  console.log(data[0].lat);
  console.log(data[0].lon);
  pollAsk();
}

function pollAsk(){
  loadJSON(urlRoot + apiPoll + lat + lon + apiKey, gotPollData);

}

function gotPollData(data){
  let components = data.list[0].components;
  so2 = components.so2;
  no2 = components.no2;
  o3 = components.o3;
  pm2_5 = components.pm2_5;
  pm10 = components.pm10;

  console.log("so2: " + so2);
  console.log("no2: " + no2);
  console.log("o3: " + o3);
  console.log("pm2_5: " + pm2_5);
  console.log("pm10: " + pm10);

  let goodCount = 0;

  if (so2 >= 0 && so2 <= 200) goodCount++;
  if (no2 >= 0 && no2 <= 90) goodCount++;
  if (o3 >= 0 && o3 <= 100) goodCount++;
  if (pm2_5 >= 0 && pm2_5 <= 20) goodCount++;
  if (pm10 >= 0 && pm10 <= 40) goodCount++;

  
  airQualityMessage = "";
  if (goodCount === 5) {
    airQualityMessage = "Very good air quality. 5/5 values are in a good level.";
  } else if (goodCount === 4) {
    airQualityMessage = "Good air quality. 4/5 values are in a good level.";
  } else if (goodCount === 3) {
    airQualityMessage = "Average air quality. 3/5 values are in a good level.";
  } else if (goodCount === 2) {
    airQualityMessage = "Moderate air quality. 2/5 values are in a good level.";
  } else if (goodCount === 1) {
    airQualityMessage = "Poor air quality. 1/5 values are in a good level.";
  } else {
    airQualityMessage = "Very poor air quality. 1/5 values are in a good level";
  }


  

  loop();
  //plot ();



}

