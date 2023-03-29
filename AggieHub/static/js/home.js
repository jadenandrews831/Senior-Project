var calendar = null;
var course_sections;

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


function getTime(start, end) {
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

    return [start, end];
}


function addClass(section) {

}


//check if the row in the table already has a class. 
    //if it does, check the time of the class and the time of the class being added. if the times overlap, do not add the class
    //if the times do not overlap, add to the next available row's innerHTML
    //check that a section from the same class is not already in the table
function displaySection(index) {
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
    var subj = section_data.Subj;
    
    var table = document.getElementById("details");
    var all_rows = table.rows.length;
    
    if (all_rows > 1) {
        for (var i = 1; i < all_rows; i++) {
            var row = table.rows[i];
            var row_crn = row.cells[0].innerText;
            var row_title = row.cells[2].innerText;
            var row_days = row.cells[3].innerText;
            var row_time = row.cells[4].innerText;
            var evaluation;
            //var remove_option = row.cells[8].innerHTML;
            if (row_crn == crn) {
                alert("You have already added this section.");
                evaluation = 1;
            } else if (row_title == title) {
                alert("You have already added a section for this course.");
                evaluation = 1;
            } else if (row_time.includes(time) && row_days.includes(days)) {
                alert("This class conflicts with another class you have added.");
                evaluation = 1;
            } else {
                evaluation = 0;
            }
        }

        if (evaluation == 0) {
            var new_row = table.insertRow(all_rows);
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
            update();
        } else {
            return;
        }
    } else {
        var new_row = table.insertRow(all_rows);
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
        update();
    }
    //iterate through the table and check if any time and days overlap with the selected time and day
    //if there is an overlap, alert the user and do not add the class

    //change last td of row to <i class="fa-solid fa-xmark" onclick="removeClass()"></i>
    //calculate the new total number of credits and update status and register button (if needed)
}

function removeClass(crn) {
    var table = document.getElementById("details");
    //find the index of the row with the id of the crn
    var row = document.getElementById(crn).rowIndex;
    table.deleteRow(row);

    calendar.getEventById(crn).remove();
    calendar.render(); 
    update();
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

    //check if there is more than one time range for the class
    // if (time.includes(",")) {
    //     alert("TO DO: multiple times"); //FUNCTIONAL
    //     return; 
    // }
    
    var timeArray = time.split("-");
    var start = timeArray[0];
    var end = timeArray[1];
    //convert to 24 hour time
    var timeRange = getTime(start, end);

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
    return [crn, title, instructors, location, credits, days].concat(timeRange);
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
        startTime: data[6],
        endTime: data[7],
        daysOfWeek: data[5],
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
    var total_rows = table.rows.length;
    var total_credits = 0;

    if (total_rows == 1) {
        document.getElementById("reg_status").style.visibility = "hidden";
        document.getElementById("register").style.visibility = "hidden";
    } else {
        for (var i = 1; i < total_rows; i++) {
            total_credits += parseInt(table.rows[i].cells[7].innerText);
        }

        if (total_credits > 0 && total_credits < 12) {
            document.getElementById("status").innerHTML = "PART-TIME";
            document.getElementById("status").style.color = "#BC5C45";
            document.getElementById("register").style.backgroundColor = "#BC5C45";
            document.getElementById("register").style.cursor = "pointer";
            document.getElementById("register").disabled = false;
            document.getElementById("register").style.visibility = "visible";
            document.getElementById("reg_status").style.visibility = "visible";
        } else if (total_credits >= 12 && total_credits <= 18) {
            document.getElementById("status").innerHTML = "FULL-TIME";
            document.getElementById("status").style.color = "#BC5C45";
            document.getElementById("register").style.backgroundColor = "#BC5C45";
            document.getElementById("register").style.cursor = "pointer";
            document.getElementById("register").disabled = false;
            document.getElementById("register").style.visibility = "visible";
            document.getElementById("reg_status").style.visibility = "visible";
        } else {
            alert("To register for more than 18 credits, you need to get approval from both the department head and dean.");
            document.getElementById("register").style.backgroundColor = "#EACEC7";
            document.getElementById("register").style.cursor = "not-allowed";
            document.getElementById("register").disabled = true;
        }
    }
    
    //var remove_cell = table.rows[row].cells[8];

    
    //check if row has i tag in last td
       //add up the credits of all the classes in the table and update the total credits
       //if the total credits is greater than 18, disable the register button and turn status red
       //if total credits is less than 12, change status to "part-time" and turn green
       //if total credits is between 12 and 18, change status to "full-time" and turn green

    //return the total number of credits
}


// tester function to populate the section dropdown with some fake data
function deselect() {
    document.getElementById("available").selectedIndex = -1;

}