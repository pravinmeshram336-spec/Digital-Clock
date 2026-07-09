function updateClock(){

const now = new Date();

let h = now.getHours();
let m = now.getMinutes();
let s = now.getSeconds();

let ampm = h >= 12 ? "PM" : "AM";

let hour12 = h % 12;
hour12 = hour12 ? hour12 : 12;

hour12 = String(hour12).padStart(2,"0");
m = String(m).padStart(2,"0");
s = String(s).padStart(2,"0");

document.getElementById("clock").innerHTML =
hour12 + ":" + m + ":" + s + " " + ampm;

const days = [
"Sunday","Monday","Tuesday","Wednesday",
"Thursday","Friday","Saturday"
];

const months = [
"January","February","March","April","May","June",
"July","August","September","October","November","December"
];

document.getElementById("date").innerHTML =
days[now.getDay()] + "<br>" +
now.getDate() + " " +
months[now.getMonth()] + " " +
now.getFullYear();

}

updateClock();

setInterval(updateClock,1000);