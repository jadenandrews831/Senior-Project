var calendar = null;

//creates the calendar and render it
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('scheduleview');
  
    calendar = new FullCalendar.Calendar(calendarEl, {
        timeZone: 'UTC',
        initialView: 'timeGridWeek',
        allDaySlot: false,
        dayHeaderFormat: { weekday: 'long' },
        slotMinTime: '08:00:00',
        slotMaxTime: '20:00:00',
        headerToolbar: false,
        height: 'auto',
        weekends: false,
        selectable: false,
        eventOverlap: false,
        selectOverlap: false,
    });
    
    calendar.render();
  });
  
//check if the row in the table already has a class. 
    //if it does, check the time of the class and the time of the class being added. if the times overlap, do not add the class
    //if the times do not overlap, add to the next available row's innerHTML
function addClass() {
    //get selected time and day from #available
    var selected = document.getElementById("available");
    var value = selected.value;
    var text = selected.options[selected.selectedIndex].text;
    var classInfo = text.split(" | ");
    var time = classInfo[2];
    var day = classInfo[1];
    var days = [];

    //iterate through the table and check if any time and days overlap with the selected time and day
    //if there is an overlap, alert the user and do not add the class

    if (time == "TBA") {
        alert("Virtual Class");
    } else {
        alert(text);
    } //functional up to here
    

    // var table = document.getElementById("detailview");
    // var rows = table.getElementsByTagName("tr");

    // alert(rows.length);

    // for (var i = 0; i < rows.length; i++) {
    //     var row = rows[i];
    //     var rowTime = row.getElementsByTagName("td")[4].innerText;
    //     var rowDay = row.getElementsByTagName("td")[3].innerText;
        
        

    //     if (time.includes(rowTime) && day.includes(rowDay)) {
    //         alert("TO DO: time conflict"); 
    //         return;
    //     } 
    // }
}

//removes class from the table by setting the innerHTML of the row to empty? or by removing the row?
//also removes the event from the calendar
    //get the crn from the row and use it to remove the event from the calendar
function removeClass() {
    // get row from table
    // get crn from row
    // remove event from calendar
    var row = document.getElementById("10572");
    var crn = row.getElementsByTagName("td")[0].innerText;
    calendar.getEventById(crn).remove();
    calendar.render(); 
    //functional

    // clear row contents

}

//get the class data from the table needed for the event
    //called at the end of the addClass function when a class is added to the schedule
function getData() {
    var row = document.getElementById("10572");
    var time = row.getElementsByTagName("td")[4].innerText;
    var day = row.getElementsByTagName("td")[3].innerText;

    if (time.includes("TBA")) {
        return "virtual";
    }

    //check if there is more than one time range for the class (ex. 8:00-9:00, 10:00-11:00)
    if (time.includes(",")) {
        alert("TO DO: multiple times"); //FUNCTIONAL
        return; 
    }
    
    var timeArray = time.split("-");
    var start = timeArray[0];
    var end = timeArray[1];
    //convert to 24 hour time
    if (start.includes("pm") && end.includes("pm")) {
        var startArray = start.split(":");
        startArray[0] = parseInt(startArray[0]) + 12;
        start = startArray.join(":");
        var endArray = end.split(":");
        endArray[0] = parseInt(endArray[0]) + 12;
        end = endArray.join(":");
        start = start.replace(" pm", ":00");
        end = end.replace(" pm", ":00");
    } else if (start.includes("am") && end.includes("pm")) {
        start = start.replace(" am", ":00");
        var endArray = end.split(":");
        endArray[0] = parseInt(endArray[0]) + 12;
        end = endArray.join(":");
        start = start.replace(" pm", ":00");
        end = end.replace(" pm", ":00");
    } else {
        start = start.replace(" am", ":00");
        end = end.replace(" am", ":00");
    }
    
    var days = [];

    for (var i = 0; i < day.length; i++) {
        switch(day.charAt(i)) {
            case "M": days +=  1; break;
            case "T": days +=  2; break;
            case "W": days +=  3; break;
            case "R": days +=  4; break;
            case "F": days +=  5; break;
        }
    }

    var crn = row.getElementsByTagName("td")[0].innerText;
    var title = row.getElementsByTagName("td")[2].innerText;
    var instructors = row.getElementsByTagName("td")[5].innerText;
    var location = row.getElementsByTagName("td")[6].innerText;
    var credits = row.getElementsByTagName("td")[7].innerText;
    return [crn, title, instructors, location, credits, start, end, days];
}

//adds the event to the calendar
function addEvent() {
    var data = getData();
    if (data == "virtual") {
        return;
    }

    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    calendar.addEvent({
        id: data[0],
        groupId: data[0],
        title: data[1],
        startTime: data[5],
        endTime: data[6],
        daysOfWeek: data[7],
        extendedProps: {
            instructors: data[2],
            location: data[3],
            credits: data[4]
          },
        editable: false,
        color: "#" + randomColor,
    });

    calendar.render();
}

/* select_section - START

display sections after clicking on a course 
    if the section has a blank space for days, change to TBA
    if the section is full (seatsremaining = 0), disable the option and change the text to "FULL"
    if the section has more than one time, separate the times with a comma

select_section - END*/



function displaySection() {
    var selected = document.getElementById("available");
    var value = selected.value;
    var text = selected.options[selected.selectedIndex].text;
    var classInfo = text.split(" | ");
    var time = classInfo[2];
    var day = classInfo[1];
    var days = [];

    if (time == "TBA") {
        alert("Virtual Class");
        return;
    }


}