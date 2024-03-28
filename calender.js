const calendar= document.querySelector('.calendar')
const date= document.querySelector('.date')
const daysContainer= document.querySelector('.days')
const week = document.querySelector('.weekdays')
// const prev= document.querySelector('.prev')
// const next= document.querySelector('.next')
const todayBtn = document.querySelector('.todayBtn')

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

const createWeekDays = () =>{
    for(let i=0; i <= weekDays.length-1; i++){
        const newDiv = document.createElement('div');
        const newContent = document.createTextNode(weekDays[i]);
        newDiv.appendChild(newContent);
        week.appendChild(newDiv);
    }
}
createWeekDays();

const createCalendar = () =>{
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month+1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7-lastDay.getDay()-1;

    //setting Month on the top of calendar
    date.innerHTML = monthNames[month] + " " + year; 

    //setting days
    let days=""

    //setting last month days
    for(let i = day; i > 0; i-- ){
        days += `<div class="day prev-date"> ${prevDays - i + 1} </div>`
    }

    //setting today
    for(let i = 1; i <= lastDate; i++){
        if(i == new Date().getDate() && year == new Date().getFullYear() && month == new Date().getMonth()){
            days += `<div class="day today"> ${i} </div>`
        }
        else {
            days += `<div class="day"> ${i} </div>`
        }
    }

    //setting next month days
    for(let i = 1; i <= nextDays; i++ ){
        days += `<div class="day next-date"> ${i} </div>`
    }
    
    daysContainer.innerHTML = days
}

createCalendar();

const prevMonth = () =>{
    month--;
    if(month < 0){
        month = 11;
        year--;
    }
    createCalendar();

}

const nextMonth = () =>{
    month++;
    if(month > 11){
        month = 0;
        year++;
    }
    createCalendar();
}

todayBtn.addEventListener("click",()=>{
    today= new Date();
    month = today.getMonth();
    year = today.getFullYear();
    createCalendar();
})

