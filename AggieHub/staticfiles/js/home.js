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
        slotMaxTime: '21:00:00',
        headerToolbar: false,
        height: 'auto',
        weekends: false,
        selectable: false,
        eventOverlap: false,
    });
    
    calendar.render();
  });

//check if the row in the table already has a class. 
    //if it does, check the time of the class and the time of the class being added. if the times overlap, do not add the class
    //if the times do not overlap, add to the next available row's innerHTML
    //check that a section from the same class is not already in the table
function addClass(index) {
    //get selected time and day from #available
    var section_data = index;
    var time = section_data.Time;
    var days = section_data.Days;
    var instructor = section_data.Instructor;
    var location = section_data.Location;
    var credits = section_data.Cred;
    var title = section_data.Title;
    var crn = section_data.CRN;
    var section = section_data.Sec;
    var crse = section_data.Crse;
    var cmp = section_data.Cmp;
    var cap = section_data.Cap;
    var act = section_data.Act;
    var rem = section_data.Rem;
    var subj = section_data.Subj;
    
    var table = document.getElementById("details");
    var all_rows = table.rows.length;
    
    //get selected row from #available
    
    if (all_rows > 1) {
        for (var i = 1; i < all_rows; i++) {
            var row = table.rows[i];
            var row_time = row.cells[4].innerText;
            var row_days = row.cells[3].innerText;
            var row_crn = row.cells[0].innerText;
            var row_section = row.cells[1].innerText;
            var row_title = row.cells[2].innerText;

            if (row_crn == crn) {
                alert("You have already added this section.");
                return;
            } else if (row_title == title) {
                alert("You have already added a section for this course.");
                return;
            } else if (rem == 0) {
                alert("This section is full.");
                return;
            } else if (row_time.includes(time) && row_days.includes(days)) {
                alert("This class conflicts with another class you have added.");
                return;
            } else {
                //add the class to the table and call addEvent()
                var new_row = table.insertRow(all_rows);
                //set the id of the row to the crn
                new_row.id = crn;
                var crn_cell = new_row.insertCell(0);
                var section_cell = new_row.insertCell(1);
                var title_cell = new_row.insertCell(2);
                var days_cell = new_row.insertCell(3);
                var time_cell = new_row.insertCell(4);
                var instructor_cell = new_row.insertCell(5);
                var location_cell = new_row.insertCell(6);
                var credits_cell = new_row.insertCell(7);
                var remove_cell = new_row.insertCell(8);
                crn_cell.innerText = crn;
                section_cell.innerText = subj + " " + crse + "-" + section;
                title_cell.innerText = title;
                days_cell.innerText = days;
                time_cell.innerText = time;
                instructor_cell.innerText = instructor;
                location_cell.innerText = location;
                credits_cell.innerText = credits;
                remove_cell.innerHTML = '<i class="fa-solid fa-xmark" id="updateView" onclick="removeClass(' + crn + ')"></i>';
                addEvent(crn);
                return;
            }
        }
    } else {
        //add the class to the table and call addEvent()
        var new_row = table.insertRow(all_rows);
        //set the id of the row to the crn
        new_row.id = crn;
        var crn_cell = new_row.insertCell(0);
        var section_cell = new_row.insertCell(1);
        var title_cell = new_row.insertCell(2);
        var days_cell = new_row.insertCell(3);
        var time_cell = new_row.insertCell(4);
        var instructor_cell = new_row.insertCell(5);
        var location_cell = new_row.insertCell(6);
        var credits_cell = new_row.insertCell(7);
        var remove_cell = new_row.insertCell(8);
        crn_cell.innerText = crn;
        section_cell.innerText = subj + " " + crse + "-" + section;
        title_cell.innerText = title;
        days_cell.innerText = days;
        time_cell.innerText = time;
        instructor_cell.innerText = instructor;
        location_cell.innerText = location;
        credits_cell.innerText = credits;
        remove_cell.innerHTML = '<i class="fa-solid fa-xmark" id="updateView" onclick="removeClass(' + crn + ')"></i>';
        addEvent(crn);

    }
    //iterate through the table and check if any time and days overlap with the selected time and day
    //if there is an overlap, alert the user and do not add the class
    

    // for (var i = 0; i < rows.length; i++) {
    //     var row = rows[i];
    //     var rowTime = row.getElementsByTagName("td")[4].innerText;
    //     var rowDay = row.getElementsByTagName("td")[3].innerText;
        
        

    //     if (time.includes(rowTime) && day.includes(rowDay)) {
    //         alert("TO DO: time conflict");
    //         return;
    //     } 
    // }

    //change last td of row to <i class="fa-solid fa-xmark" onclick="removeClass()"></i>
    //calculate the new total number of credits and update status and register button (if needed)
}

//removes class from the table by setting the innerHTML of the row to empty? or by removing the row?
//also removes the event from the calendar
    //get the crn from the row and use it to remove the event from the calendar
function removeClass(crn) {
    var table = document.getElementById("details");
    //find the index of the row with the id of the crn
    var row = document.getElementById(crn).rowIndex;
    table.deleteRow(row);

    calendar.getEventById(crn).remove();
    calendar.render(); 
    //update();
    //deselect the option in #available
}

//get the class data from the table needed for the event
    //called at the end of the addClass function when a class is added to the schedule
function getData(crn) {
    //find first empty row in table
    var row = document.getElementById(crn);
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
        if (startArray[0] != 12) {
            startArray[0] = parseInt(startArray[0]) + 12;
        }
        start = startArray.join(":");
        var endArray = end.split(":");
        if (endArray[0] != 12) {
            endArray[0] = parseInt(endArray[0]) + 12;
        }
        end = endArray.join(":");
        start = start.replace(" pm", ":00");
        end = end.replace(" pm", ":00");
    } else if (start.includes("am") && end.includes("pm")) {
        start = start.replace(" am", ":00");
        var endArray = end.split(":");
        if (endArray[0] != 12) {
            endArray[0] = parseInt(endArray[0]) + 12;
        }
        end = endArray.join(":");
        start = start.replace(" pm", ":00");
        end = end.replace(" pm", ":00");
    } else {
        start = start.replace(" am", ":00");
        end = end.replace(" am", ":00");
    }
    
    var days = [];

    for (var i = 0; i < day.length; i++) {
        //handle multiple days
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
function addEvent(crn) {
    var data = getData(crn); 

    if (data == "virtual") {
        return;
    }

    //if data length == 11, there are two classes, so add two events with the same id and group id
    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    if (data.length == 11) {

    }
    calendar.addEvent({
        id: crn,
        groupId: crn,
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

    calendar.addEvent({
        id: crn,
        groupId: crn,
        title: data[1],
        startTime: data[8],
        endTime: data[9],
        daysOfWeek: data[10],
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

function update() {
    var table = document.getElementById("details");
    //get the row of the table with the credits
       //add up the credits of all the classes in the table and update the total credits
       //if the total credits is greater than 18, disable the register button and turn status red
       //if total credits is less than 12, change status to "part-time" and turn green
       //if total credits is between 12 and 18, change status to "full-time" and turn green

    //return the total number of credits
}


// tester function to populate the section dropdown with some fake data
function clearRow(crn) {
    //create a few section options with each thing in the list having it's own property
        //ex: sections[0] would return a section object with the properties crn, title, instructors, location, credits, time, days
        //this properties can be accessed by using sections[0].crn, sections[0].title, etc. and will return those values
    
}