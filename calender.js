const calendar= document.querySelector('.calendar')
const date= document.querySelector('.date')
const daysContainer= document.querySelector('.days')
const week = document.querySelector('.weekdays')
const todayBtn = document.querySelector('.todayBtn')
const modal = $('.modalBox');
const modalLeave = $('.modalLeaveBox')
const eventsContainer = document.querySelector('.events')
const clearAllEvents = document.querySelector('.clearAll')
const saveChecklist = document.querySelector('.saveChecklist')
const eventForm = document.querySelector('#event-form')
const leaveForm = document.querySelector('#leave-form')

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

let eventsArray = [
    // {
    //     day: 29,
    //     month: 3,
    //     year: 2024,
    //     events: [
    //         {
    //             title: 'Event 1',
    //             desc: 'lorem ipsum',
    //             dateFrom: '2024-03-29',
    //             dateTo: '2024-03-30',
    //         }
    //     ]
    // },
    // {
    //     day: 30,
    //     month: 3,
    //     year: 2024,
    //     events: [
    //         {
    //             title: 'Event 2',
    //             desc: 'lorem ipsum w22',
    //             dateFrom: '2024-03-29',
    //             dateTo: '2024-03-30',
    //         }
    //     ]
    // }
]

// let eventsArr = [
//     {
//         title: 'Event 1',
//         desc: 'lorem ipsum',
//         dateFrom: '2024-03-29',
//         dateTo: '2024-03-30',
//     },
//     {
//         title: 'Event 2',
//         desc: 'lorem ipsum',
//         dateFrom: '2024-03-29',
//         dateTo: '2024-03-30',
//     },
//     {
//         title: 'Event 1',
//         desc: 'lorem ipsum',
//         dateFrom: '2024-03-29',
//         dateTo: '2024-03-30',
//     },
//     {
//         title: 'Event 2',
//         desc: 'lorem ipsum',
//         dateFrom: '2024-03-29',
//         dateTo: '2024-03-30',
//     }
// ]
let leavesArray = [
    // {
    //   reason:"Personal reason",
    //   leaveDate:"2024-03-29", 
    // },
    // {
    //     reason:"Personal reason",
    //     leaveDate:"2024-03-31" 
    // },
]

$(function(){
    var dtToday = new Date();
 
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
     day = '0' + day.toString();
    var maxDate = year + '-' + month + '-' + day;
    $('#dateFrom').attr('min', maxDate);
    $('#dateTo').attr('min', maxDate);
});

const createWeekDays = () =>{
    for(let i=0; i <= weekDays.length-1; i++){
        const newDiv = document.createElement('div');
        const newContent = document.createTextNode(weekDays[i]);
        newDiv.appendChild(newContent);
        week.appendChild(newDiv);
    }
}
createWeekDays();
updateEvents();

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
        days += `<div class="day prev-date ${month}"> ${prevDays - i + 1} </div>`
    }

    //setting today: current month days
    for(let i = 1; i <= lastDate; i++){

        //check if event is present on current Day
        let event = false;
        let leave = false;
        eventsArray.forEach((eventObj)=>{
            //if event found, updaye event to true
            if(eventObj.day == i && eventObj.month == month + 1 && eventObj.year == year){
                event = true;
            }

        })

        leavesArray.forEach((obj)=>{

            const leaveDatesplit = obj.leaveDate.split('-')

            //if event found, updaye event to true
            if(leaveDatesplit[2] == i && leaveDatesplit[1] == month + 1 && leaveDatesplit[0] == year) 
            {
                leave = true;
            }

        })

        //add class today to todays date
        if(i == new Date().getDate() && year == new Date().getFullYear() && month == new Date().getMonth()){
            //update Events for today if any
            //updateEvents(i);

            if(event){
                if(leave){
                    days += `<div class="day today currMonth ${month+1} event leave"> ${i} </div>`
                }else{
                    days += `<div class="day today currMonth ${month+1} event"> ${i} </div>`
                }  
            }
            else{
                if(leave){
                    days += `<div class="day today currMonth ${month+1} leave"> ${i} </div>`
                }else{
                    days += `<div class="day today currMonth ${month+1}"> ${i} </div>`
                }
            }
        }
        else {
            if(event){
                if(leave){
                    days += `<div class="day event currMonth ${month+1} leave"> ${i} </div>`
                }else{
                    days += `<div class="day event currMonth ${month+1}"> ${i} </div>`
                }
            }
            else{
                if(leave){
                    days += `<div class="day currMonth ${month+1} leave"> ${i} </div>`
                }else{
                    days += `<div class="day currMonth ${month+1}"> ${i} </div>`
                }
            }
            
        }
    }

    //setting next month days
    for(let i = 1; i <= nextDays; i++ ){
        days += `<div class="day next-date ${month+2}"> ${i} </div>`
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

//show modal window to add checklist
$('.addChecklist').click(()=>{
    eventForm.reset();
    modal.addClass( "active" );
})

//show modal window to add leave
$('.addLeave').click(()=>{
    leaveForm.reset();
    modalLeave.addClass( "active" );
})

//hide modal window to add checklist
$('.close').click(()=>{
    modal.removeClass( "active" );
})

//hide modal window to add checklist
$('.closeLeave').click(()=>{
    modalLeave.removeClass( "active" );
})

function updateEvents(){
    console.log('updateEvents', eventsArray);
    let events = '';
    eventsArray.forEach((event)=>{
       // if(date = event.day && month+1 == event.month && year == event.year){
            event.events.forEach((innEvent)=>{
                events += `
                <div class="event">
                    <div class="title">
                        <i class="fas fa-circle"></i>
                        <h3 class = "event-title">${innEvent.title}</h3>
                    </div>
                    <div class = "event-description">
                        ${innEvent.desc}
                    </div>
                    <div class="eventDate">
                        ${innEvent.dateFrom} till ${innEvent.dateTo}
                    </div>
                </div>`
            })
       // }
    });

    if(events == ""){
        events = `<div class="no-event">
                  <h3>No Events</h3>
                  </div>`;
    }

    //console.log('events::', events);
    eventsContainer.innerHTML = events; 
}


//function to clear all the events created so far
clearAllEvents.addEventListener("click",()=>{
    eventsArray = [];
    updateEvents();
})

leaveForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const leaveReason = document.querySelector('.leave-reason').value,
    leaveDateFrom = document.querySelector('.leave-date-from').value,
    leaveDateFromsplit = document.querySelector('.leave-date-from').value.split('-'),
    leaveDateTo = document.querySelector('.leave-date-to').value,
    leaveDateTosplit = document.querySelector('.leave-date-to').value.split('-')

    if(leaveReason == "" || leaveDateFrom == "" || leaveDateTo == ""){
        alert('Please fill all the fields');
        return;
    }

    let arr=[] 

    for(dt=new Date(leaveDateFrom); dt<=new Date(leaveDateTo); dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt).toLocaleDateString('en-CA'));
    }
    //console.log('datearray:',arr);

    arr.forEach((element) => {
       // console.log('element')
        leavesArray.push({
            reason: leaveReason,
            leaveDate: element
        })
          
    });


    console.log('leavesArray',leavesArray) 
    modalLeave.removeClass( "active" );

    let d = document.querySelectorAll(".day")

    //adding leave class to the days
    d.forEach((day)=>{
        leavesArray.forEach((element)=>{
            const a = Number(day.innerHTML);
            const b = element.leaveDate.split('-')[2];

            const c = element.leaveDate.split('-')[1].replace(/^0|[^\/]0./, '');

            if(a == b && day.classList.value.includes(c)){
                day.classList.add("leave");
                //console.log("after:",day);
            }
        })
    })
})

eventForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    const eventTitle = document.querySelector('.event-name').value,
     eventDesc = document.querySelector('.event-desc').value,
     eventDateFrom = document.querySelector('.event-date-from').value,
     eventDateFromsplit = document.querySelector('.event-date-from').value.split('-'),
     eventDateTo = document.querySelector('.event-date-to').value,
     eventDateTosplit = document.querySelector('.event-date-to').value.split('-')

 console.log(`${eventDateFrom} till ${eventDateTo}`);

    if(eventTitle == "" || eventDateFrom == "" || eventDateTo == ""){
        alert('Please fill all the fields');
        return;
    }

    //create new event
    const newEvent = {
        title: eventTitle,
        desc: eventDesc,
        dateFrom: eventDateFrom,
        dateTo: eventDateTo
    };


    eventsArray.push({
        day: Number(eventDateFromsplit[2]),
        month: Number(eventDateFromsplit[1]),
        year: Number(eventDateFromsplit[0]),
        events: [newEvent]
    })

    if(eventDateFrom != eventDateTo){
        const NoOfDays = Number(eventDateTosplit[2]) - Number(eventDateFromsplit[2])
    
        eventsArray.push({
        day: Number(eventDateTosplit[2]),
        month: Number(eventDateTosplit[1]),
        year: Number(eventDateTosplit[0]),
        events: [newEvent]
        })
    }

    //close modal window
    modal.removeClass( "active" );
    updateEvents();

    console.log(eventsArray)

    //add event class to the date selected
    const activeDays = Number(eventDateFromsplit[2])
    const a = document.querySelector(".days");
    const currMonth = a.querySelectorAll(".currMonth");
    const activeDay = currMonth[activeDays-1];

    console.log(activeDay)
    
    if(!activeDay.classList.contains('event')){
        activeDay.classList.add("event")
    }
})




