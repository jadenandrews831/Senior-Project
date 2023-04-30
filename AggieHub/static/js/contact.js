/***************************************************************************************
 * This function retrieves the student's profile data. Based on the data collected,
 * it will output to the student the advisor name and contact info that is assigned 
 * to that student.
 ***************************************************************************************/

$(document).ready(function() {
    $.ajax ({
        type: "POST",
        url: "{% url 'get_profile' %}",
        data: {
            'csrfmiddlewaretoken': '{{ csrf_token }}'
        },
        dataType: 'json',
        success: function (response) {
            var advisor = $("#advisor");
            advisor.html(response.advisor);
            var name = $("#full_name");
            name.val(response.first + " " + response.last);
        }
    });
})