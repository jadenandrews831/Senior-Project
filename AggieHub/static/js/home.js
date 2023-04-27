var calendar = null; /*!< the calendar object */
var response = null; /*!< the registration response object */

/****************************************************************************************
 * This event initializes the calendar and renders it to the page.
 * 
 * Using the FullCalendar API, the calendar is initialized, customized, and rendered.
 * 
 * @param None
 * @return None
 * 
 ****************************************************************************************/
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
        // eventClick: function(info) {
        //     var selected_event = info.event;
        //     showDialog(1);
        // }
    });
    
    calendar.render();
});

/***************************************************************************************
 * This function compares the times and dates of two events to check for overlap.
 * 
 * Using the day(s) and time of a selected class, the function checks if there is a time 
 * currently in the calendar that conflicts with the selected class.
 * 
 * @param new_time the time of the selected section
 * @param days the day(s) of the selected section
 * @return true if there is a time or date conflict,
 *         false if there is no time or date conflict
 * 
 ***************************************************************************************/
function conflictTime(new_time, days) {
    var table = document.getElementById("details"); /*!< the table containing the pre-selected classes */
    var all_rows = table.rows.length; /*!< the number of rows in the table */
    var section_time =  getTime(new_time); /*!< the start and end time of the selected section */
    var start = section_time[0]; /*!< the start time of the selected section */
    var end = section_time[1]; /*!< the end time of the selected section */
    var clash = 0; /*!< the number of time conflicts */

    var start_date = new Date("01/01/2021 " + start); /*!< the selected section's start time as a Date object */
    var end_date = new Date("01/01/2021 " + end); /*!< the selected section's end time as a Date object  */
    
    for (var i = 1; i < all_rows; i++) {
        if (table.rows[i].cells[8].innerHTML == "") { 
            return false;
        } else {
            var row = table.rows[i]; /*!< the current row in the table */
            var row_days = row.cells[3].innerText; /*!< the day(s) of the current row */
            var row_time = row.cells[4].innerText; /*!< the time range of the current row */
    
            if (row_time == "TBA") {
                return false;
            }
    
            var row_time_array = getTime(row_time); /*!< the start and end time of the current row */
            var row_start = row_time_array[0]; /*!< the start time of the current row */
            var row_end = row_time_array[1]; /*!< the end time of the current row */
    
            var row_start_date = new Date("01/01/2021 " + row_start); /*!< the start date of the current row as a Date object */
            var row_end_date = new Date("01/01/2021 " + row_end); /*!< the end date of the current row as a Date object */
    
            // if (start_date >= row_start_date && start_date < row_end_date && (row_days.includes(days) || days.includes(row_days))) {
            //     clash++;
            // } else if (end_date > row_start_date && end_date <= row_end_date && (row_days.includes(days) || days.includes(row_days))) {
            //     clash++;
            // } else if (start_date <= row_start_date && end_date >= row_end_date && (row_days.includes(days) || days.includes(row_days))) {
            //     clash++;
            // } else if (start_date >= row_start_date && end_date <= row_end_date && (row_days.includes(days) || days.includes(row_days))) {
            //     clash++;
            // } else if (start_date == row_start_date  && end_date == row_end_date && (row_days.includes(days) || days.includes(row_days))) {
            //     clash++;
            // } else {
            //     continue;
            // }

            if ((((start_date <= row_start_date) && (start_date < row_end_date)) && ((end_date <= row_end_date) && (end_date > row_start_date))) && (row_days.includes(days) || days.includes(row_days) || row_days == days)) {
                clash++;
            } else if ((((row_start_date <= start_date) && (start_date < row_end_date)) && ((row_end_date <= end_date) && (end_date > row_start_date))) && (row_days.includes(days) || days.includes(row_days) || row_days == days)) {
                clash++;
            } else if ((((row_start_date <= start_date) && (start_date < row_end_date)) && ((end_date <= row_end_date) && (end_date > row_start_date)))  && (row_days.includes(days) || days.includes(row_days) || row_days == days)) {
                clash++;
            } else if ((((start_date <= row_start_date) && (start_date < row_end_date)) && ((row_start_date < end_date) && (row_end_date <= end_date)))  && (row_days.includes(days) || days.includes(row_days) || row_days == days)) {
                clash++;
            } else if ((((row_start_date == start_date) && (end_date == row_end_date))) && (row_days.includes(days) || days.includes(row_days) || row_days == days)) {
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
}

/***************************************************************************************
 * This function converts days to numbers to be used to add to the calendar.
 * 
 * Each day of the week (M-F) is assigned a number (1-5), respectively. The numbers are
 * added to an array to be used in populating the calendar.
 * Sections that meet on multiple days will have their numbers added to the array of days.
 * 
 * @param day the day of the selected section
 * @return An array of numbers representing the days of the week that the class is held on
 * 
 ***************************************************************************************/
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

/***************************************************************************************
 * This function converts the time of a selected section to a 24-hour format.
 * 
 * The function splits the time into a start and end time. Seconds are added to the time 
 * to be used in the Date object. If the time is in the afternoon (pm), 12 hours are added 
 * to the time to convert it to a 24-hour format.
 * 
 * @param time the time of the proposed section
 * @return An array of the start and end time of the proposed section in 24-hour format
 * 
 ***************************************************************************************/
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

/***************************************************************************************
 * This function adds a class permanently to the calendar and details table.
 * 
 * The function adds a button to the last cell of the last row in the details table. This 
 * button allows the user to remove the class from the calendar and details table. The last
 * row being populated prevents it from being removed when the user selects a new section.
 * 
 * @param None
 * @return None
 * 
 ***************************************************************************************/
function addClass() {
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
            showDialog(2);
        }
        update();
    } else {
        if (last_cell.innerHTML == "") {
            last_cell.innerHTML = '<i class="fa-solid fa-xmark" id="updateView" onclick="removeClass(' + crn + ')"></i>';
            document.getElementById("available").selectedIndex = -1;
        } else {
            showDialog(2);
        }
        update();
    }
}

/***************************************************************************************
 * This function compares the times and dates of two events to check for overlap.
 * 
 * The function has two cases: one for lectures with labs and one for lectures without labs.
 * Going row by row, each case first checks if the section is already in the calendar. If 
 * it is, the function then checks for time conflicts. If there are no conflicts, the 
 * function checks if the class in the row has been added or not. If it has not been added,
 * the function overwrites theq row with the new section. If it has been added, the function
 * adds a new row to the table. If there are any conflicts, the function displays an error
 * message via the showDialog function.
 * 
 * @param index the index of the selected section
 * @return None
 * 
 ***************************************************************************************/
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

                if (row.id == lecture.CRN) {
                    showDialog(3);
                    clearSelection();
                    check++;
                    break;
                }

                if (lecture.Time != "TBA" && lecture.Days != "TBA") {
                    if ((conflictTime(lecture.Time, lecture.Days) == true) || (conflictTime(lab.Time, lab.Days) == true)) {
                        showDialog(4);
                        clearSelection();
                        check++;
                        break;
                    }
                } 

                if (row_section == (lecture.Subj + " " + lecture.Crse)) {
                    if (row.cells[8].innerHTML == "") {
                        if (row.cells[4].innerText != "TBA") {
                            calendar.getEventById(row.id).remove();
                            calendar.getEventById(row.id + "L").remove();
                            calendar.render();
                        }
                        
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
                        lab_row.cells[7].style.color = "white";
                        lab_row.cells[8].innerHTML = "";

                        addEvent(lecture.CRN);
                        document.getElementById("add").style.display = "inline-block";
                        check++;
                        break;
                    } else {
                        showDialog(5);
                        clearSelection();
                        check++;
                        break;
                    }
                }
            }

            if (check == 0) {
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
                lab_row.cells[7].style.color = "white";
                lab_row.insertCell(8).innerHTML = "";

                addEvent(lecture.CRN);
                document.getElementById("add").style.display = "inline-block";
            }
        } else {
            for (var i = 1; i < all_rows; i++) {
                var row = table.rows[i];
                var row_sec = row.cells[1].innerText;
                var row_sec_array = row_sec.split("-");
                var row_section = row_sec_array[0];

                if (row.id == index.CRN) {
                    showDialog(3);
                    clearSelection();
                    check++;
                    break;
                }

                if (index.Time != "TBA" && index.Days != "TBA") {
                    if (conflictTime(index.Time, index.Days) == true) {
                        showDialog(4);
                        clearSelection();
                        check++;
                        break;
                    }
                }

                if (row_section == (index.Subj + " " + index.Crse)) {
                    if (row.cells[8].innerHTML == "") {
                        if (row.cells[4].innerText != "TBA") {
                            calendar.getEventById(row.id).remove();
                            calendar.render();
                        }

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

                        addEvent(index.CRN);
                        document.getElementById("add").style.display = "inline-block";
                        check++;
                        break;
                    } else {
                        showDialog(5);
                        clearSelection();
                        check++;
                        break;
                    }
                }
            }

            if (check == 0) {
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

                addEvent(index.CRN);
                document.getElementById("add").style.display = "inline-block";
            }
        }
    } else {
        if (index.length == 2) {
            var lecture = index[0];
            var lab = index[1];

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
            lab_row.cells[7].style.color = "white";
            lab_row.insertCell(8).innerHTML = "";

            addEvent(lecture_row.id);
            document.getElementById("add").style.display = "inline-block";
        } else {
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

/***************************************************************************************
 * This function removes a class from the calendar and the table.
 * 
 * The CRN is used to find the row in the table and the event in the calendar.
 * The row is then removed from the table and the event is removed from the calendar.
 * If the class is a lecture and lab, the lab is also removed from the table.
 * 
 * @param crn the crn of the class to be removed
 * @return None
 * 
 ***************************************************************************************/
function removeClass(crn) {
    var table = document.getElementById("details");
    var row = document.getElementById(crn).rowIndex;
    if (row != (table.rows.length) - 1) {
        if (table.rows[row + 1].cells[0].innerText == "") {
            table.deleteRow(row+1);
            calendar.getEventById(crn + "L").remove();
        }
    }

    if (table.rows[row].cells[4].innerText != "TBA") {
        table.deleteRow(row);

        calendar.getEventById(crn).remove();
        calendar.render();
        update();
    } else {
        table.deleteRow(row);
    }
}

/***************************************************************************************
 * This function gets the data used to display the section in the calendar.
 * 
 * The crn is used to find the row in the table. The time and day of the class are converted
 * to the correct format for the calendar. The subject and course are also extracted from the
 * table. If the class is a lecture and lab, the lab is also added to the calendar. If the
 * class is online, the class is not added to the calendar. 
 * 
 * @param crn the crn of the selected class
 * @return An array of the data used to display the section in the calendar
 * 
 ***************************************************************************************/
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
        var crn = row.cells[0].innerText;
        var title = subj + " " + crse + " - " + row.cells[2].innerText;
        var instructors = row.cells[5].innerText;
        var location = row.cells[6].innerText;
        var credits = row.cells[7].innerText;

        var nextRow = table.rows[row.rowIndex + 1];
        var nextCRN = nextRow.id;
        var nextTime = nextRow.cells[4].innerText;
        var nextDay = nextRow.cells[3].innerText;
        var nextTitle = title;
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

/***************************************************************************************
 * This function determines if a hex color is light or dark.
 * 
 * The function determines the brightness of the color by splitting the color into its
 * red, green, and blue components. The brightness is then calculated using the formula
 * for relative luminance. If the brightness is greater than 155, the color is light. 
 * If the brightness is less than 155, the color is dark.
 * 
 * @param color the time of the selected section
 * @return true if the color is light,
 *         false if the color is dark
 ***************************************************************************************/
function evalHexColor(color) {
    const rColor = parseInt(color.substring(0, 0 + 2), 16);
    const gColor = parseInt(color.substring(2, 2 + 2), 16);
    const bColor = parseInt(color.substring(4, 4 + 2), 16);
    const brightness = ((rColor * 299) + (gColor * 587) + (bColor * 114)) / 1000;
    return brightness > 155;
}

/***************************************************************************************
 * This function adds a class to the calendar. 
 * 
 * The crn is used to get the data for the class. The data is then used to add the class
 * to the calendar. The color of the class is randomly generated. If the color is light,
 * the text color is set to black. If the color is dark, the text color is set to white.
 * If the class is a lecture and lab, the lab is also added to the calendar.
 * If the class is online, the class is not added to the calendar.
 * 
 * @param crn the crn of the selected section
 * @return None
 * 
 ***************************************************************************************/
function addEvent(crn) {
    var data = getData(crn);
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    const textColor = evalHexColor(randomColor) ? 'black' : 'white';

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
            textColor: textColor,
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
            textColor: textColor,
        });
        document.getElementById(data[1]).cells[0].style.backgroundColor = "#" + randomColor;
        document.getElementById(crn).cells[0].style.backgroundColor = "#" + randomColor;
        
        document.getElementById(data[1]).cells[0].style.color = textColor;
        document.getElementById(crn).cells[0].style.color = textColor;
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
            textColor: textColor,
        });
        document.getElementById(crn).cells[0].style.backgroundColor = "#" + randomColor;
        document.getElementById(crn).cells[0].style.color = textColor;
    }
    calendar.render();
}

/***************************************************************************************
 * This function calculates the number of credits a student is registered for.
 *  
 * The function loops through the table of registered classes and adds the number of
 * credits for each class to the total number of credits. The total number of credits
 * is then displayed on the page. If the total number of credits is greater than 18, a 
 * warning is displayed.
 * 
 * @param None
 * @return None
 * 
 ***************************************************************************************/
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
        }

        if (total_credits == 0) {
            document.getElementById("reg_status").style.visibility = "hidden";
            document.getElementById("register").style.display = "none";
            document.getElementById("add").style.display = "none";
        } else if (total_credits > 0 && total_credits < 12) {
            document.getElementById("status").innerHTML = "PART-TIME" + " (" + total_credits + " credits)";
            document.getElementById("status").style.color = "#BC5C45";
            document.getElementById("register").style.backgroundColor = "#BC5C45";
            document.getElementById("register").style.cursor = "pointer";
            document.getElementById("register").disabled = false;
            document.getElementById("register").style.display = "inline-block";
            document.getElementById("reg_status").style.visibility = "visible";
        } else if (total_credits >= 12 && total_credits <= 18) {
            document.getElementById("status").innerHTML = "FULL-TIME" + " (" + total_credits + " credits)";
            document.getElementById("status").style.color = "#BC5C45";
            document.getElementById("register").style.backgroundColor = "#BC5C45";
            document.getElementById("register").style.cursor = "pointer";
            document.getElementById("register").disabled = false;
            document.getElementById("register").style.display = "inline-block";
            document.getElementById("reg_status").style.visibility = "visible";
        } else {
            showDialog(6);
            document.getElementById("register").style.backgroundColor = "#EACEC7";
            document.getElementById("register").style.cursor = "not-allowed";
            document.getElementById("register").disabled = true;
            removeClass(table.rows[total_rows - 1].id);
        }
    }
}

/***************************************************************************************
 * This function removes all classes from the calendar and table.
 * 
 * This function is called when the user attempts to change the current registration
 * term after they have already added classes to their schedule. The function loops
 * through the table of registered classes and removes all classes.
 * 
 * @param None
 * @return None
 * 
 ***************************************************************************************/
function clearSchedule() {
    var table = document.getElementById("details");
    var total_rows = table.rows.length;
    for (var i = 1; i < total_rows; i++) {
        removeClass(table.rows[i].id);
        i--;
        total_rows--;
        
        if (table.rows.length < total_rows) {
            i++;
        }
    }
}

/***************************************************************************************
 * This function removes all non-permanent classes from the calendar and table.
 * 
 * The function loops through the table of registered classes and removes all classes
 * that are not permanent. This is used when switching between subjects, courses, and 
 * sections. 
 * 
 * @param None
 * @return None
 * 
 ***************************************************************************************/
function clearSelection() {
    var table = document.getElementById("details");
    var total_rows = table.rows.length;
    for (var i = 1; i < total_rows; i++) {
        if (table.rows[i].cells[8].innerHTML == "") {
            removeClass(table.rows[i].id);
            i--;
            total_rows--;
            
            if (table.rows.length < total_rows) {
                i++;
            }
        }
    }

    document.getElementById("available").selectedIndex = -1;
}

/***************************************************************************************
 * This function registers the student for all permanent classes in the table.
 * 
 * The function loops through the table of registered classes and adds the CRN of each 
 * permanent class to a list. The list is then sent, by the submit() function, to the 
 * server with the current term and the student's registeration PIN to register the student 
 * for the classes. If the PIN is correct, the student is registered for the classes and the
 * schedule is cleared.
 * 
 * @param None
 * @return None
 * 
 ***************************************************************************************/
function register() {
    var table = document.getElementById("details");
    var total_rows = table.rows.length;
    crns = [];
    var titles = [];
    var section = [];
    var crse = [];
    var subj = [];
    var class_info;
    term = document.getElementById("select_term").value;
   

    for (var i = 1; i < total_rows; i++) {
        if (table.rows[i].cells[8].innerHTML != "" && table.rows[i].cells[0].innerText != "") {
            var row = table.rows[i];
            crns.push(row.id);
            titles.push(row.cells[2].innerText);
            section.push(row.cells[1].innerText);
            class_info = row.cells[1].innerText.split("-");
            class_info = class_info[0].split(" ");
            subj.push(class_info[0]);
            crse.push(class_info[1]);
        }
    }
    var message = "You are about to register for the following classes:</br>";
    for (var i = 0; i < crns.length; i++) {
        message += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"  + section[i] + " - " + titles[i] + " (" + crns[i] + ")</br>";
    }
    message += "</br>Please review your schedule before continuing.";

    confirmation(message).then(function(decision){
        var selected_option = (String(decision) == "true");
        if(selected_option){
            getPIN().then(function(selection){
                var choice = (String(selection) == "true");
                if(choice) {
                    var pin = document.getElementById("PIN").value;
                    response = {'pkg': [term, pin, crns]};
                    var button = document.getElementById("submit_classes");
                    button.click();
                }
            });
        }
    });
}

/***************************************************************************************
 * This function submits the student's registration for all permanent classes in the table.
 * 
 * The function is called by register() and sends the term, PIN, and CRNs of the classes
 * the student is registering for to the server. The server then registers the student for
 * the classes and returns a response. The response is then displayed to the student.
 * 
 * @param None
 * @return The term, PIN, and CRNs of the classes the student is registering for.
 * 
 ***************************************************************************************/
function submit() {
    return response;
}

/***************************************************************************************
 * This function displays a popup window with all proposed classes for registration.
 * 
 * Using JQuery UI, a dialog box is created with a message passed to the function from 
 * register(). The dialog box has two buttons, "Confirm" and "Cancel". If the user clicks
 * "Confirm", the function returns "true" and the function prompting for the PIN is called.
 * If the user clicks "Cancel", the function returns "false" and the process is cancelled.
 * 
 * @param message The message to be displayed in the class summary popup.
 * @return defer.promise(): The user's decision to register for the classes or not.
 * 
 ***************************************************************************************/
function confirmation(message) {
    var defer = $.Deferred();
    $('<div></div>')
        .html("<p style='text-align: left;'>" + message + "</p>")
        .dialog({
            autoOpen: true,
            resizable: false,
            width: 'auto',
            height: "auto",
            modal: true,
            title: 'Course Selection - Summary',
            buttons: {
                "Confirm": function () {
                    defer.resolve("true");
                    $(this).dialog("close");
                },
                "Cancel": function () {
                    defer.resolve("false");
                    $(this).dialog("close");
                }
            },
            close: function () {
                //$(this).remove();
                $(this).dialog('destroy').remove()
            }
        });
    return defer.promise();
}

/***************************************************************************************
 * This function displays a popup window that asks for the student's registration PIN.
 * 
 * The function creates a dialog box, using JQuery UI, with a text box for the student to 
 * enter their PIN. The dialog box has two buttons, "Register" and "Cancel". If the user
 * clicks "Register", the function returns "true" and the classes are submitted for
 * registration. If the user clicks "Cancel", the function returns "false" and the process
 * is cancelled.
 * 
 * @param None
 * @return defer.promise(): The user's decision to register for the classes or not.
 * 
 ***************************************************************************************/
function getPIN() {
    var defer = $.Deferred();
    $('<div></div>')
        .html("<p style='text-align:center;'><span style='float:left; margin:12px 12px 20px 0;'></span>Please enter your PIN for registration.</br></br><input type='password' id='PIN'/>")
        .dialog({
            autoOpen: true,
            resizable: false,
            width: 400,
            height: "auto",
            modal: true,
            title: 'Registration PIN',
            buttons: {
                "Register": function () {
                    defer.resolve("true");
                    $(this).dialog("close");
                },
                "Cancel": function () {
                    defer.resolve("false");
                    $(this).dialog("close");
                }
            }
        });
    return defer.promise();
}

/***************************************************************************************
 * This function displays a popup window.
 * 
 * The function creates a dialog box, using JQuery UI, with a message passed to the function
 * depending on the options parameter. The dialog box has one button, "OK". If the user
 * clicks "OK", the dialog box is closed.
 * 
 * @param options A number representing the message to display.
 * @return None
 * 
 ***************************************************************************************/
function showDialog(options)
{
    switch(options){
        case 1:
            $('<div></div>')
            .html("<p style='text-align: center;'><span style='float:left; margin:12px 12px 20px 0;'></span>Select a color.</br></br><input type='text' id='color' data-coloris value='#000000' class=coloris'/></p>")
            .dialog({
                autoOpen: true,
                resizable: false,
                width: 'auto',
                height: "auto",
                modal: true,
                title: 'Color Picker',
                buttons: {
                    "OK": function () {
                        $(this).dialog("close");
                    }
                },
                close: function () {
                    $(this).dialog('destroy').remove()
                }
            });
            break;
        case 2:
            $('<div></div>')
            .html("<p style='text-align: center;'><span style='float:left; margin:12px 12px 20px 0;'></span>Please select a section to add.</p>")
            .dialog({
                autoOpen: true,
                resizable: false,
                width: 'auto',
                height: "auto",
                modal: true,
                title: 'No Section Selected',
                buttons: {
                    "OK": function () {
                        $(this).dialog("close");
                    }
                },
                close: function () {
                    $(this).dialog('destroy').remove()
                }
            });
            break;
        case 3:
            $('<div></div>')
            .html("<p style='text-align: center;'><span style='float:left; margin:12px 12px 20px 0;'></span>You have already added this section.</p>")
            .dialog({
                autoOpen: true,
                resizable: false,
                width: 'auto',
                height: "auto",
                modal: true,
                title: 'Section Already Added',
                buttons: {
                    "OK": function () {
                        $(this).dialog("close");
                    }
                },
                close: function () {
                    $(this).dialog('destroy').remove()
                }
            });
            break;
        case 4:
            $('<div></div>')
            .html("<p style='text-align: center;'><span style='float:left; margin:12px 12px 20px 0;'></span>This class conflicts with another class you have added.</p>")
            .dialog({
                autoOpen: true,
                resizable: false,
                width: 'auto',
                height: "auto",
                modal: true,
                title: 'Time Conflict',
                buttons: {
                    "OK": function () {
                        $(this).dialog("close");
                    }
                },
                close: function () {
                    $(this).dialog('destroy').remove()
                }
            });
            break;
        case 5:
            $('<div></div>')
            .html("<p style='text-align: center;'><span style='float:left; margin:12px 12px 20px 0;'></span>You have already added a section for this course.</p>")
            .dialog({
                autoOpen: true,
                resizable: false,
                width: 'auto',
                height: "auto",
                modal: true,
                title: 'Course Already Added',
                buttons: {
                    "OK": function () {
                        $(this).dialog("close");
                    }
                },
                close: function () {
                    $(this).dialog('destroy').remove()
                }
            });
            break;
        case 6:
            $('<div></div>')
            .html("<p style='text-align: center;'><span style='float:left; margin:12px 12px 20px 0;'></span>To register for more than 18 credits, you need to get approval from both the department head and dean.</p>")
            .dialog({
                autoOpen: true,
                resizable: false,
                width: 400,
                height: "auto",
                modal: true,
                title: 'Credit Limit Exceeded',
                buttons: {
                    "OK": function () {
                        $(this).dialog("close");
                    }
                },
                close: function () {
                    $(this).dialog('destroy').remove()
                }
            });
            break;
    }
}

/***************************************************************************************
 * This function displays a popup window with the results of the registration.
 * 
 * The function creates a dialog box, using JQuery UI, and displays the results of the
 * registration. Successful registrations are displayed with a green check mark and failed 
 * registrations are displayed with a red x-mark and the reason for the failure. The dialog 
 * box has one button, "OK". If the user clicks "OK", the dialog box is closed.
 * 
 * @param output An array containing the results of the registration.
 * @return None
 * 
 ***************************************************************************************/
function displayConfirmation(output) {
    var successful = output[0];
    var failed = output[1];
    var message = "";

    if (output[2] == false) {
        message = "<b>Successfully registered: </b></br>";
        for (var i = 0; i < (successful.CRN_IN).length; i++) {
            // for (var j = 1; j < total_rows; j++) {
            //     if (table.rows[j].cells[0].innerHTML == successful.CRN_IN[i]) {
            //         message += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"  + table.rows[j].cells[1].innerHTML + " - " + table.rows[j].cells[2].innerHTML + "(" + successful.CRN_IN[i]+ ")</br>";
            //     }
            // }
            message += "&nbsp;&nbsp;&nbsp;&nbsp;<i class='fa-solid fa-check' style='color: #000000;'></i>&nbsp;"  + (successful.SUBJ[i]) + " " + (successful.CRSE[i]) + "-" + (successful.SEC[i]) + " - " + (successful.TITLE[i]) + " (" + (successful.CRN_IN[i]) + ")</br>";
        }
    } else {
        if ((successful.CRN_IN).length > 0) {
            message = "<b>Successfully registered: </b></br>";
            for (var i = 0; i < (successful.CRN_IN).length; i++) {
                // for (var j = 1; j < total_rows; j++) {
                //     if (table.rows[j].cells[0].innerHTML == successful.CRN_IN[i]) {
                //         message += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"  + table.rows[j].cells[1].innerHTML + " - " + table.rows[j].cells[2].innerHTML + "(" + successful.CRN_IN[i]+ ")</br>";
                //     }
                // }
                message += "&nbsp;&nbsp;&nbsp;&nbsp;<i class='fa-solid fa-check' style='color: #000000;'></i>&nbsp;"  + (successful.SUBJ[i]) + " " + (successful.CRSE[i]) + "-" + (successful.SEC[i]) + " - " + (successful.TITLE[i]) + " (" + (successful.CRN_IN[i]) + ")</br>";
            }

            if (failed.length > 0) {
                message += "</br></br><b>Unable to register: </b></br>";
                for (var i = 0; i < failed.length; i++) {
                    message += "&nbsp;&nbsp;&nbsp;&nbsp;<i class='fa-solid fa-xmark' style='color: #000000;'></i>&nbsp;"  + (failed[i])[2] + " " + (failed[i])[3] + "-" + (failed[i])[4] + " - " + (failed[i])[8] + " (" + (failed[i])[1] + ")</br>";
                    message += "<i>" + (failed[i])[0] + "</i></br></br>";
                }
            }
        } else {
            if (failed.length > 0) {
                message = "<b>Unable to register: </b></br>";
                for (var i = 0; i < failed.length; i++) {
                    message += "&nbsp;&nbsp;&nbsp;&nbsp;<i class='fa-solid fa-xmark' style='color: #000000;'></i>&nbsp;"  + (failed[i])[2] + " " + (failed[i])[3] + "-" + (failed[i])[4] + " - " + (failed[i])[8] + " (" + (failed[i])[1] + ")</br>";
                    message += "<i>" + (failed[i])[0] + "</i></br></br>";
                }
            }
        }
        
    }  

    $('<div></div>')
    .html("<p style='text-align:center;'>" + message + "</p>")
    .dialog({
        autoOpen: true,
        resizable: false,
        width: 'auto',
        height: "auto",
        modal: true,
        title: 'Registration Confirmation',
        buttons: {
            "OK": function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            //$(this).remove();
            $(this).dialog('destroy').remove()
        }
    });
}

module.exports = {getDays, getTime, evalHexColor};


// function updateColor(event, color) {
//     //remove the events from the calendar
//     //add event back to the calendar with the new color
//     //update the color for the event in the first column of the table
//     var table = document.getElementById("details");
    
//     calendar.getEventById(event.groupId).backgroundColor = color;
//     calendar.render();
// }