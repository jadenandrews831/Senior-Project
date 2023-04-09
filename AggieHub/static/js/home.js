var calendar = null;
var course_sections;

//creates the calendar and render it - FUNCTIONAL
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

//FUNCTIONAL
function conflictTime(new_time, days) {
    var table = document.getElementById("details");
    var all_rows = table.rows.length;
    var section_time =  getTime(new_time);
    var start = section_time[0];
    var end = section_time[1];
    var clash = 0;
    //convert start and end to Date objects to compare times

    //check if last row is a lab to change the iteration length
    var start_date = new Date("01/01/2021 " + start);
    var end_date = new Date("01/01/2021 " + end);
    
    for (var i = 1; i < all_rows; i++) {
        if (table.rows[i].cells[8].innerHTML == "") { 
            return false;
        } else {
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
            console.log("clash: " + clash);
            return true;
        } else {
            console.log("clash: " + clash);
            return false;
        }
        }
    //check if the new_time conflicts with any of the times in the table
}

//FUNCTIONAL
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

//FUNCTIONAL
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

//FUNCTIONAL
function addClass() {
    //add i icon to last cell of last row in table if there is not already an i icon
    //if there is an i icon in the last cell, send message to user that they need to select a section to add
    var table = document.getElementById("details");
    var all_rows = table.rows.length;
    var last_row = table.rows[all_rows - 1];
    var crn = last_row.id;
    var last_cell = last_row.cells[8];

    if (crn.includes("L")) {
        var lecture_row = table.rows[all_rows - 2];
        if (last_cell.innerHTML == "") {
            lecture_row.cells[8].innerHTML = '<i class="fa-solid fa-xmark" id="updateView" onclick="removeClass(' + lecture_row.id + ')"></i>';
            last_cell.innerHTML = '<i></i>';
            document.getElementById("available").selectedIndex = -1;
        } else {
            alert("Please select a section to add");
        }
        update();
    } else {
        if (last_cell.innerHTML == "") {
            last_cell.innerHTML = '<i class="fa-solid fa-xmark" id="updateView" onclick="removeClass(' + crn + ')"></i>';
            document.getElementById("available").selectedIndex = -1;
        } else {
            alert("Please select a section to add");
        }
        update();
    }
}

//FUNCTIONAL
function displaySection(index) {
    var table = document.getElementById("details");
    var all_rows = table.rows.length;
    var check = 0;

    if (all_rows > 1) {
        if (index.length == 2) {
            var lecture = index[0];
            var lab = index[1];
            
            for (var i = 1; i < all_rows; i++) {
                var row = table.rows[i];
                var row_sec = row.cells[1].innerText;
                var row_sec_array = row_sec.split("-");
                var row_section = row_sec_array[0];

                if (lecture.Time != "TBA" && lecture.Days != "TBA") {
                    if ((conflictTime(lecture.Time, lecture.Days) == true) || (conflictTime(lab.Time, lab.Days) == true)) {
                        clearSelection();
                        alert("This class conflicts with another class you have added.");
                        check++;
                        break;
                    }
                } 

                if (row.id == lecture.CRN) {
                    clearSelection();
                    alert("You have already added this section");
                    check++;
                    break;
                }

                if (row_section == (lecture.Subj + " " + lecture.Crse)) {
                    if (row.cells[8].innerHTML == "") {
                        if (row.cells[3].innerText != "TBA") {
                            //remove lecture
                            calendar.getEventById(row.id).remove();
                            //remove lab
                            calendar.getEventById(row.id + "L").remove();
                            calendar.render();
                        }
                        
                        //change le cture row
                        row.id = lecture.CRN;
                        row.cells[0].innerText = lecture.CRN;
                        row.cells[1].innerText = lecture.Subj + " " + lecture.Crse + "-" + lecture.Sec;
                        row.cells[2].innerText = lecture.Title;
                        row.cells[3].innerText = lecture.Days;
                        row.cells[4].innerText = lecture.Time;
                        row.cells[5].innerText = lecture.Instructor;
                        row.cells[6].innerText = lecture.Location;
                        row.cells[7].innerText = lecture.Cred;
                        row.cells[8].innerHTML = "";
                        //change lab row
                        var lab_row = table.rows[i + 1];
                        lab_row.id = lecture.CRN + "L";
                        lab_row.cells[0].innerText = "";
                        lab_row.cells[1].innerText = "";
                        lab_row.cells[2].innerText = "";
                        lab_row.cells[3].innerText = lab.Days;
                        lab_row.cells[4].innerText = lab.Time;
                        lab_row.cells[5].innerText = lab.Instructor;
                        lab_row.cells[6].innerText = lab.Location;
                        lab_row.cells[7].innerText = "0.000";
                        lab_row.cells[8].innerHTML = "";

                        //add lecture and lab to calendar
                        addEvent(lecture.CRN);
                        document.getElementById("add").style.display = "inline-block";
                        check++;
                        break;
                    } else {
                        clearSelection();
                        alert("You have already added a section for this course");
                        check++;
                        break;
                    }
                }
            }

            if (check == 0) {
                //add lecture row
                var lecture_row = table.insertRow(all_rows);
                lecture_row.id = lecture.CRN;
                lecture_row.insertCell(0).innerText = lecture.CRN;
                lecture_row.insertCell(1).innerText = lecture.Subj + " " + lecture.Crse + "-" + lecture.Sec;
                lecture_row.insertCell(2).innerText = lecture.Title;
                lecture_row.insertCell(3).innerText = lecture.Days;
                lecture_row.insertCell(4).innerText = lecture.Time;
                lecture_row.insertCell(5).innerText = lecture.Instructor;
                lecture_row.insertCell(6).innerText = lecture.Location;
                lecture_row.insertCell(7).innerText = lecture.Cred;
                lecture_row.insertCell(8).innerHTML = "";
                //add lab row
                var lab_row = table.insertRow(all_rows + 1);
                lab_row.id = lecture.CRN + "L";
                lab_row.insertCell(0).innerText = "";
                lab_row.insertCell(1).innerText = "";
                lab_row.insertCell(2).innerText = "";
                lab_row.insertCell(3).innerText = lab.Days;
                lab_row.insertCell(4).innerText = lab.Time;
                lab_row.insertCell(5).innerText = lab.Instructor;
                lab_row.insertCell(6).innerText = lab.Location;
                lab_row.insertCell(7).innerText = "0.000";
                lab_row.insertCell(8).innerHTML = "";

                //add lecture and lab to calendar
                addEvent(lecture.CRN);
                document.getElementById("add").style.display = "inline-block";
            }
        } else {
            for (var i = 1; i < all_rows; i++) {
                var row = table.rows[i];
                var row_sec = row.cells[1].innerText;
                var row_sec_array = row_sec.split("-");
                var row_section = row_sec_array[0];

                if (index.Time != "TBA" && index.Days != "TBA") {
                    if (conflictTime(index.Time, index.Days) == true) {
                        clearSelection();
                        alert("This class conflicts with another class you have added.");
                        check++;
                        break;
                    }
                }

                if (row.id == index.CRN) {
                    clearSelection();
                    alert("You have already added this section");
                    check++;
                    break;
                }

                if (row_section == (index.Subj + " " + index.Crse)) {
                    if (row.cells[8].innerHTML == "") {
                        if (row.cells[3].innerText != "TBA") {
                            //remove lecture
                            calendar.getEventById(row.id).remove();
                            calendar.render();
                        }

                        //change lecture row
                        row.id = index.CRN;
                        row.cells[0].innerText = index.CRN;
                        row.cells[1].innerText = index.Subj + " " + index.Crse + "-" + index.Sec;
                        row.cells[2].innerText = index.Title;
                        row.cells[3].innerText = index.Days;
                        row.cells[4].innerText = index.Time;
                        row.cells[5].innerText = index.Instructor;
                        row.cells[6].innerText = index.Location;
                        row.cells[7].innerText = index.Cred;
                        row.cells[8].innerHTML = "";

                        //add lecture to calendar
                        addEvent(index.CRN);
                        document.getElementById("add").style.display = "inline-block";
                        check++;
                        break;
                    } else {
                        clearSelection();
                        alert("You have already added a section for this course");
                        check++;
                        break;
                    }
                }
            }

            if (check == 0) {
                //add lecture row
                var lecture_row = table.insertRow(all_rows);
                lecture_row.id = index.CRN;
                lecture_row.insertCell(0).innerText = index.CRN;
                lecture_row.insertCell(1).innerText = index.Subj + " " + index.Crse + "-" + index.Sec;
                lecture_row.insertCell(2).innerText = index.Title;
                lecture_row.insertCell(3).innerText = index.Days;
                lecture_row.insertCell(4).innerText = index.Time;
                lecture_row.insertCell(5).innerText = index.Instructor;
                lecture_row.insertCell(6).innerText = index.Location;
                lecture_row.insertCell(7).innerText = index.Cred;
                lecture_row.insertCell(8).innerHTML = "";

                //add lecture and lab to calendar
                addEvent(index.CRN);
                document.getElementById("add").style.display = "inline-block";
            }
        }
    } else {
        if (index.length == 2) {
            var lecture = index[0];
            var lab = index[1];

            //add lecture row
            var lecture_row = table.insertRow(all_rows);
            lecture_row.id = lecture.CRN;
            lecture_row.insertCell(0).innerText = lecture.CRN;
            lecture_row.insertCell(1).innerText = lecture.Subj + " " + lecture.Crse + "-" + lecture.Sec;
            lecture_row.insertCell(2).innerText = lecture.Title;
            lecture_row.insertCell(3).innerText = lecture.Days;
            lecture_row.insertCell(4).innerText = lecture.Time;
            lecture_row.insertCell(5).innerText = lecture.Instructor;
            lecture_row.insertCell(6).innerText = lecture.Location;
            lecture_row.insertCell(7).innerText = lecture.Cred;
            lecture_row.insertCell(8).innerHTML = "";
            //add lab row
            var lab_row = table.insertRow(all_rows + 1);
            lab_row.id = lecture.CRN + "L";
            lab_row.insertCell(0).innerText = "";
            lab_row.insertCell(1).innerText = "";
            lab_row.insertCell(2).innerText = "";
            lab_row.insertCell(3).innerText = lab.Days;
            lab_row.insertCell(4).innerText = lab.Time;
            lab_row.insertCell(5).innerText = lab.Instructor;
            lab_row.insertCell(6).innerText = lab.Location;
            lab_row.insertCell(7).innerText = "0.000";
            lab_row.insertCell(8).innerHTML = "";

            addEvent(lecture_row.id);
            document.getElementById("add").style.display = "inline-block";
        } else {
            //add lecture row
            var lecture_row = table.insertRow(all_rows);
            lecture_row.id = index.CRN;
            lecture_row.insertCell(0).innerText = index.CRN;
            lecture_row.insertCell(1).innerText = index.Subj + " " + index.Crse + "-" + index.Sec;
            lecture_row.insertCell(2).innerText = index.Title;
            lecture_row.insertCell(3).innerText = index.Days;
            lecture_row.insertCell(4).innerText = index.Time;
            lecture_row.insertCell(5).innerText = index.Instructor;
            lecture_row.insertCell(6).innerText = index.Location;
            lecture_row.insertCell(7).innerText = index.Cred;
            lecture_row.insertCell(8).innerHTML = "";

            addEvent(lecture_row.id);
            document.getElementById("add").style.display = "inline-block";
        }
    }
}

//FUNCTIONAL
function removeClass(crn) {
    console.log(crn);
    var table = document.getElementById("details");
    var table_rows = table.rows.length;
    var row = document.getElementById(crn).rowIndex;
    //check that the row is not the last row
    if (row != table_rows - 1) {
        if ( table.rows[row + 1].cells[0].innerText == "") {
            table.deleteRow(row+1);
            calendar.getEventById(crn + "L").remove();
        }
    }

    table.deleteRow(row);

    calendar.getEventById(crn).remove();
    calendar.render();
    update();
}

//get the class data from the table needed for the event
    //called at the end of the addClass function when a class is added to the schedule

//FUNCTIONAL
function getData(crn) {
    var table = document.getElementById("details");
    var row = document.getElementById(crn);
    var time = row.cells[4].innerText;
    var day = row.cells[3].innerText;
    
    var class_info = row.cells[1].innerText.split("-");
    class_info = class_info[0].split(" ");
    subj = class_info[0];
    crse = class_info[1];

    if (row.rowIndex == table.rows.length - 1) {
        if (time.includes("TBA")) {
            return "virtual";
        }
        //convert to 24 hour time
        var timeRange = getTime(time);
        var days = getDays(day);
    
        var crn = row.cells[0].innerText;
        var title = subj + " " + crse + " - " + row.cells[2].innerText;
        var instructors = row.cells[5].innerText;
        var location = row.cells[6].innerText;
        var credits = row.cells[7].innerText;
        return [crn, title, instructors, location, credits, days].concat(timeRange);
    } else {
        if (time.includes("TBA")) {
            return "virtual";
        }
        //convert to 24 hour time    
        var crn = row.cells[0].innerText;
        var title = subj + " " + crse + " - " + row.cells[2].innerText;
        var instructors = row.cells[5].innerText;
        var location = row.cells[6].innerText;
        var credits = row.cells[7].innerText;

        var nextRow = table.rows[row.rowIndex + 1];
        var nextCRN = nextRow.id;
        var nextTime = nextRow.cells[4].innerText;
        var nextDay = nextRow.cells[3].innerText;
        var nextTitle = title + " - LAB";
        var nextInstructor = nextRow.cells[5].innerText;
        var nextLocation = nextRow.cells[6].innerText;
        var nextCredits = nextRow.cells[7].innerText;

        var timeRange = getTime(time);
        var days = getDays(day);
        var nextTimeRange = getTime(nextTime);
        var nextDays = getDays(nextDay);

        return [crn, nextCRN, title, nextTitle, instructors,  nextInstructor, location, nextLocation, credits, nextCredits, days, nextDays].concat(timeRange, nextTimeRange);
    }    
}

//FUNCTIONAL
function addEvent(crn) {

    var data = getData(crn);
    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    if (data == "virtual") {
        document.getElementById(crn).cells[0].style.backgroundColor = "white";
        return;
    }

    if (data.length == 16) {
        calendar.addEvent({
            id: crn,
            groupId: crn,
            title: data[2],
            startTime: data[12],
            endTime: data[13],
            daysOfWeek: data[10],
            extendedProps: {
                instructors: data[4],
                location: data[6],
                credits: data[8]
              },
            editable: false,
            color: "#" + randomColor,
        });
        calendar.addEvent({
            id: data[1],
            groupId: crn,
            title: data[3],
            startTime: data[14],
            endTime: data[15],
            daysOfWeek: data[11],
            extendedProps: {
                instructors: data[5],
                location: data[7],
                credits: data[9]
              },
            editable: false,
            color: "#" + randomColor,
        });
        document.getElementById(data[1]).cells[0].style.backgroundColor = "#" + randomColor;
        document.getElementById(crn).cells[0].style.backgroundColor = "#" + randomColor;
    } else {
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
        document.getElementById(crn).cells[0].style.backgroundColor = "#" + randomColor;
    }

    calendar.render();
    //set background color of crn column of row to match event color
    
}

//FUNCTIONAL
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
            total_credits += parseInt(table.rows[i].cells[7].innerText);
            console.log("total credits: " + total_credits);
        }

        if (total_credits == 0) {
            document.getElementById("reg_status").style.visibility = "hidden";
            document.getElementById("register").style.display = "none";
            document.getElementById("add").style.display = "none";
        } else if (total_credits > 0 && total_credits < 12) {
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
            removeClass(table.rows[total_rows - 1].id);
        }
    }
}

//CONTINUE TESTING
// function clearSchedule() {
//     //clear all events from calendar
//     var table = document.getElementById("details");
//     var total_rows = table.rows.length;

//     for (var i = 1; i < total_rows; i++) {
//         var crn = table.rows[i].id;
//         removeClass(crn);
//     }
// }

//FUNCTIONAL
function clearSelection() {
    
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
    document.getElementById("available").selectedIndex = -1;
}

//CONTINUE TESTING
function register() {
    //get all row ids and display them in a popup asking for confirmation
    //if confirmed, prompt for user to enter their registration pin
    //if pin is correct, display a success message and clear the schedule
    //if pin is incorrect, display the error message

    //PIN, TERM, CRSE, SUBJ, CRN (send as dict)
    var table = document.getElementById("details");
    var total_rows = table.rows.length;
    var crns = [];
    var titles = [];
    var section = [];
    var crse = [];
    var subj = [];
    var class_info;
    var term = document.getElementById("select_term").value;
    var register_info = {'term': term};
   

    for (var i = 1; i < total_rows; i++) {
        var row = table.rows[i];
        crns.push(row.id);
        titles.push(row.cells[2].innerText);
        section.push(row.cells[1].innerText);
        class_info = row.cells[1].innerText.split("-");
        class_info = class_info[0].split(" ");
        subj = class_info[0];
        crse = class_info[1];
    }
    var message = "You are about to register for the following classes:";
    for (var i = 0; i < crns.length; i++) {
        message += "\n"  + section[i] + " - " + titles[i] + " (" + crns[i] + ")";
    }
    message += "\n\nAre you sure you want to continue?";
    if (confirm(message)) {
        var pin = prompt("Please enter your registration pin");
        //add pin to register_info
        register_info['pin'] = pin;
        //if the user hits cancel, close the prompt
        //register pin is _ digits 
        if (pin.length != 6) {
            alert("Incorrect pin. Please try again."); 
        } else { //pin will be sent to scrAApe tool
            for (var i = 0; i < crns.length; i++) {
                //add subj, crse, and section to dict
                register_info['crn'] = crns[i];
                register_info['subj'] = subj[i];
                register_info['crs'] = crse[i];
            }
            return register_info;
        }
    }
}