const secondHand=document.getElementsByClassName('second-hand');
const minHand=document.getElementsByClassName('min-hand');
const hourHand=document.getElementsByClassName('hour-hand');
function setDate(){
    const now=new Date();

    const seconds=now.getSeconds();
    const secondsDegrees=((seconds/60)*360)+90;
    secondHand.style.transform=`rotate(${secondsDegrees}deg)`;
    secondHand.innerText = secondsDegrees;

    
    const mins=now.getMinutes();
    const minsDegrees=((mins/60)*360)+((seconds/60)*6)+90;
    minHand.style.transform=`rotate(${minsDegrees}deg)`;
    minHand.innerText = minsDegrees;

    const hour=now.getHours();
    const hourDegrees=((hour/12)*360)+((mins/60)*30)+90;
    hourHand.style.transform=`rotate(${hourDegrees}deg)`;
    hourHand.innerText = hourDegrees;
}
setInterval(setDate,1000);
setDate();