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

function conflictTime(new_time, days) {
    var table = document.getElementById("details");
    var all_rows = table.rows.length;
    var section_time =  getTime(new_time);
    var start = section_time[0];
    var end = section_time[1];
    var clash = 0;
    //convert start and end to Date objects to compare times
    var start_date = new Date("01/01/2021 " + start);
    var end_date = new Date("01/01/2021 " + end);
    
    for (var i = 1; i < all_rows; i++) {
    //check if the new_time conflicts with any of the times in the table
        var row = table.rows[i];
        var row_days = row.cells[3].innerText;
        var row_time = row.cells[4].innerText;

        if (row_time == "TBA") {
            return false;
        }

        var row_time_array = getTime(row_time);
        var row_start = row_time_array[0];
        var row_end = row_time_array[1];

        var row_start_date = new Date("01/01/2021 " + row_start);
        var row_end_date = new Date("01/01/2021 " + row_end);

        if (start_date >= row_start_date && start_date < row_end_date && (row_days.includes(days) || days.includes(row_days))) {
            clash++;
        } else if (end_date > row_start_date && end_date <= row_end_date && (row_days.includes(days) || days.includes(row_days))) {
            clash++;
        } else if (start_date <= row_start_date && end_date >= row_end_date && (row_days.includes(days) || days.includes(row_days))) {
            clash++;
        } else if (start_date >= row_start_date && end_date <= row_end_date && (row_days.includes(days) || days.includes(row_days))) {
            clash++;
        } else if (start_date == row_start_date  && end_date == row_end_date && (row_days.includes(days) || days.includes(row_days))) {
            clash++;
        } else {
            continue;
        }
    }

    if (clash > 0) {
        return true;
    } else {
        return false;
    }
}

function getDays(day) {
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

    return days;
}

function getTime(time) {

    var timeArray = time.split("-");
    var start = timeArray[0];
    var end = timeArray[1];

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


function addClass() {
    //add i icon to last cell of last row in table if there is not already an i icon
    //if there is an i icon in the last cell, send message to user that they need to select a section to add
    var table = document.getElementById("details");
    var all_rows = table.rows.length;
    var last_row = table.rows[all_rows - 1];
    var crn = last_row.id;
    var last_cell = last_row.cells[8];
    if (last_cell.innerHTML == "") {
        last_cell.innerHTML = '<i class="fa-solid fa-xmark" id="updateView" onclick="removeClass(' + crn + ')"></i>';
        document.getElementById("available").selectedIndex = -1;
    } else {
        alert("Please select a section to add");
    }
    update();
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
    evaluation = 0;
    
    if (all_rows > 1) {
        for (var i = 1; i < all_rows; i++) {
            var row = table.rows[i];
            var row_crn = row.cells[0].innerText;
            var row_time = row.cells[4].innerText;
            var row_sec = row.cells[1].innerText;
            var row_sec_array = row_sec.split("-");
            var row_section = row_sec_array[0];

            if (row_crn == crn) {
                alert("You have already added this section.");
                document.getElementById("available").selectedIndex = -1;
                evaluation = 1;
                break;
            } else if (row_section == (subj + " " + crse)) {
                var remove_option = row.cells[8].innerHTML;
                if (remove_option == "") {
                    if (row_time != "TBA") {
                        calendar.getEventById(row_crn).remove();
                        calendar.render();
                    }

                    row.cells[0].innerText = crn;
                    row.cells[1].innerText = subj + " " + crse + "-" + section;
                    row.cells[2].innerText = title;
                    row.cells[3].innerText = days;
                    row.cells[4].innerText = time;
                    row.cells[5].innerText = instructor;
                    row.cells[6].innerText = location;
                    row.cells[7].innerText = credits;
                    row.cells[8].innerHTML = "";
                    row.id = crn;
                    
                    addEvent(crn);
                    document.getElementById("add").style.display = "inline-block";
                    evaluation = 1;
                    break;
                } else {
                    alert("You have already added a section for this course.");
                    document.getElementById("available").selectedIndex = -1;
                    evaluation = 1;
                    break;
                }
            } else if (time != "TBA") {
                if ((conflictTime(time, days) == true)) {
                    clearSchedule();
                    document.getElementById("available").selectedIndex = -1;
                    alert("This class conflicts with another class you have added.");
                    //remove selected section from the detail view and from the calendar
                    evaluation = 1;
                    break;
                }
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
            remove_cell.innerHTML = "";
            addEvent(crn);
            document.getElementById("add").style.display = "inline-block";
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
        remove_cell.innerHTML = "";
        addEvent(crn);
        document.getElementById("add").style.display = "inline-block";
    }
    //iterate through the table and check if any time and days overlap with the selected time and day
    //if there is an overlap, alert the user and do not add the class

    //change last td of row to <i class="fa-solid fa-xmark" onclick="removeClass()"></i>
    //calculate the new total number of credits and update status and register button (if needed)
}

function removeClass(crn) {
    var table = document.getElementById("details");
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
    var time = row.cells[4].innerText;
    var day = row.cells[3].innerText;

    if (time.includes("TBA")) {
        return "virtual";
    }
    //convert to 24 hour time
    var timeRange = getTime(time);

    var days = getDays(day);

    var crn = row.cells[0].innerText;
    var title = row.cells[2].innerText;
    var instructors = row.cells[5].innerText;
    var location = row.cells[6].innerText;
    var credits = row.cells[7].innerText;
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
        document.getElementById("register").style.display = "none";
        document.getElementById("add").style.display = "none";
    } else {
        for (var i = 1; i < total_rows; i++) {
            //check that there is a value in the credits column
            total_credits += parseInt(table.rows[i].cells[7].innerText);
        }

        if (total_credits > 0 && total_credits < 12) {
            document.getElementById("status").innerHTML = "PART-TIME";
            document.getElementById("status").style.color = "#BC5C45";
            document.getElementById("register").style.backgroundColor = "#BC5C45";
            document.getElementById("register").style.cursor = "pointer";
            document.getElementById("register").disabled = false;
            document.getElementById("register").style.display = "inline-block";
            document.getElementById("reg_status").style.visibility = "visible";
        } else if (total_credits >= 12 && total_credits <= 18) {
            document.getElementById("status").innerHTML = "FULL-TIME";
            document.getElementById("status").style.color = "#BC5C45";
            document.getElementById("register").style.backgroundColor = "#BC5C45";
            document.getElementById("register").style.cursor = "pointer";
            document.getElementById("register").disabled = false;
            document.getElementById("register").style.display = "inline-block";
            document.getElementById("reg_status").style.visibility = "visible";
        } else {
            alert("To register for more than 18 credits, you need to get approval from both the department head and dean.");
            document.getElementById("register").style.backgroundColor = "#EACEC7";
            document.getElementById("register").style.cursor = "not-allowed";
            document.getElementById("register").disabled = true;
            //remove last class added
            removeClass(table.rows[total_rows - 1].id)
        }
    }
}


function clearSchedule() {
    //check that all rows in the table have an i tag in the last td
    //if not, remove row from table and calendar
    var table = document.getElementById("details");
    var total_rows = table.rows.length;
    for (var i = 1; i < total_rows; i++) {
        var row = table.rows[i];
        var remove_cell = row.cells[8];
        if (remove_cell.innerHTML == "") {
            removeClass(row.id);
            update();
            i--;
            total_rows--;
        }
    }
}

function register() {
    //get all row ids and display them in a popup asking for confirmation
    //if confirmed, prompt for user to enter their registration pin
    //if pin is correct, display a success message and clear the schedule
    //if pin is incorrect, display an error message
    var table = document.getElementById("details");
    var total_rows = table.rows.length;
    var crns = [];
    var titles = [];
    var section = [];
    for (var i = 1; i < total_rows; i++) {
        var row = table.rows[i];
        crns.push(row.id);
        titles.push(row.cells[2].innerText);
        section.push(row.cells[1].innerText);
    }
    var message = "You are about to register for the following classes:";
    for (var i = 0; i < crns.length; i++) {
        message += "\n"  + section[i] + " - " + titles[i] + " (" + crns[i] + ")";
    }
    message += "\n\nAre you sure you want to continue?";
    if (confirm(message)) {
        var pin = prompt("Please enter your registration pin");
        //if the user hits cancel, close the prompt
        if (pin == null) {
            return;
        } else if (pin == "0000") { //pin will be sent to scrAApe tool
            alert("Registration successful!");
        } else {
            //handle response from scrAApe tool here (if pin is incorrect, if course cannot be registered for, etc.)
            alert("Incorrect pin. Please try again."); 
        }
    }
}