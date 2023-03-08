/* scheduleView - START

pull time from detailedview(3:30-5:30), split at "-"
take from first index, split at ":". assign first index to startHour and second index to startMinute
repeat for second index (endHour and endMinute)

calculate the difference between the start and end time


function getTime() {
    var time = document.getElementById("time").value;
    var timeArray = time.split("-");
    var start = timeArray[0];
    var end = timeArray[1];
    var startArray = start.split(":");
    var endArray = end.split(":");
    var startHour = startArray[0];
    var startMinute = startArray[1];
    startMinute = startMinute.replace(" pm", "");
    var endHour = endArray[0];
    var endMinute = endArray[1];
    startMinute = startMinute.replace(" pm", "");
    var difference = endHour - startHour;


    switch (startMinute) {
        case (0):
            break;
        case (30):
            break;
        case (15):
            break;
        case (45):
    }

    switch (endMinute) {
        case (0): 
            break;
        case (30):
            break;
        case (15):
            break;
        case (45):
    }
    //print(startHour, startMinute, endHour, endMinute, difference);
}


function addEvent() {
    document.getElementById("details").innerHTML += "<tr><td>  15256 </td><td> 05 </td><td> Freshman Colloquium </td><td> TR </td><td> 10:00-10:50 </td><td> Kelvin Bryant </td><td> MCNAI 123</td><td> 3 </td><td> x </td></tr>";
    const row = document.querySelector('#details tr[id="03:30"]');
    row.cells[1].innerHTML += "<div class='event'>i'm here now</div>";
}



find time in scheduleview and create a new event starting at startHour and startMinute and ending at endHour and endMinute
if start/endMinute is not 0 or 30 (ex. 15 or 45) then place event half way between 0 and 30



pull days from detailedview, split at each character
check character and assign to a day (if character is "M" then assign to Monday, etc.)
repeat for each character

for each day, find the day in scheduleview and create a new event at the time found 

apply color chosen in detailedview to event

scheduleView - END */



/* detailview - START

check if the class attempted to be added is already in the schedule
check if the class attempted to be added conflicts with any other class in the schedule
if either of the above are true, then do not add the class

add a color wheel for the user to choose a color for the class

detailview - END */



/* select_section - START

display sections after clicking on a course

select_section - END*/