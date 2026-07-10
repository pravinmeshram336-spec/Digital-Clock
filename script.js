let is24Hour = false;
let darkMode = true;

// ================= CLOCK =================

function updateClock() {

    const now = new Date();

    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    const ampm = h >= 12 ? "PM" : "AM";

    const displayHour = is24Hour
        ? String(h).padStart(2, "0")
        : String((h % 12) || 12).padStart(2, "0");

    m = String(m).padStart(2, "0");
    s = String(s).padStart(2, "0");

    document.getElementById("clock").innerHTML =
        is24Hour
            ? `${displayHour}:${m}:${s}`
            : `${displayHour}:${m}:${s} ${ampm}`;

    const days = [
        "Sunday","Monday","Tuesday","Wednesday",
        "Thursday","Friday","Saturday"
    ];

    const months = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    document.getElementById("date").innerHTML =
        `${days[now.getDay()]}<br>${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

updateClock();
setInterval(updateClock,1000);

// ================= CLOCK COLOR =================

document.getElementById("clockColor").addEventListener("input",function(){

    const clock=document.getElementById("clock");

    clock.style.color=this.value;
    clock.style.boxShadow=`0 0 20px ${this.value}`;

});

// ================= BACKGROUND =================

document.getElementById("bgColor").addEventListener("input",function(){

    document.body.style.backgroundColor=this.value;

});

// ================= 12 / 24 =================

document.getElementById("toggleFormat").addEventListener("click",function(){

    is24Hour=!is24Hour;

    this.innerHTML=is24Hour?"12 Hour":"24 Hour";

    updateClock();

});

// ================= LIGHT / DARK =================

document.getElementById("themeBtn").addEventListener("click",function(){

    if(darkMode){

        document.body.style.background="#ffffff";
        document.body.style.color="#111111";

        document.querySelector(".container").style.background="#eeeeee";

        this.innerHTML="Dark Mode";

    }else{

        document.body.style.background="#111111";
        document.body.style.color="#ffffff";

        document.querySelector(".container").style.background="#1b1b1b";

        this.innerHTML="Light Mode";

    }

    darkMode=!darkMode;

});

// ================= SPEAK TIME =================

document.getElementById("speakBtn").addEventListener("click",function(){

    const now=new Date();

    let h=now.getHours();
    let m=now.getMinutes();

    const ampm=h>=12?"PM":"AM";

    h=(h%12)||12;

    speechSynthesis.cancel();

    const speech=new SpeechSynthesisUtterance(
        `The time is ${h} ${m} ${ampm}`
    );

    speech.lang="en-US";

    speechSynthesis.speak(speech);

});

// ================= ALARM =================

let alarmTime="";
let alarmPlayed=false;

document.getElementById("setAlarm").addEventListener("click",function(){

    alarmTime=document.getElementById("alarmTime").value;

    if(alarmTime===""){

        alert("Select Alarm Time");
        return;

    }

    document.getElementById("alarmStatus").innerHTML=
        "Alarm Set : "+alarmTime;

    alarmPlayed=false;

});

setInterval(function(){

    if(alarmTime==="") return;

    const now=new Date();

    const current=
        String(now.getHours()).padStart(2,"0")+":"+
        String(now.getMinutes()).padStart(2,"0");

    if(current===alarmTime && !alarmPlayed){

        alarmPlayed=true;

        alert("⏰ Alarm!");

        speechSynthesis.speak(
            new SpeechSynthesisUtterance("Wake up! Alarm Time.")
        );

    }

},1000);