/***************************************************************
 * This function switches the pdf shown in the iframe depending
 * on the dept selected.
 ***************************************************************/
$(document).ready(function(){
    $('#contact_name').hide();
    $('#contact_email').hide();
    $('#contact_instructions').hide();
    $("#select_dept").change(function(){
        var form_name = $("#select_dept option:selected").attr('value');
        var department = $("#select_dept option:selected").attr('id');
        var instructions = $('#contact_instructions');
        var name = $('#contact_name');
        var email = $('#contact_email');

        html = "";
        if (department == "noform"){
            $('#content').attr('src', '/static/docs/noform.pdf#toolbar=0');
            instructions.html("There is no override form for this department.")
            instructions.show();
            $('#contact_name').hide();
            $('#contact_email').hide();
            switch(form_name) {
                case "HIST":
                    html = "Reach out to the contact below to request an override.</br></br>Name: Ms. Pamela Carlson";
                    name.html(html);
                    html = "Email: <a href=mailto:pecarlson@ncat.edu>pecarlson@ncat.edu</a></br></br>Phone: 336-285-2324";
                    email.html(html);
                    $('#contact_name').show();
                    $('#contact_email').show();
                    break;
                case "POLI": 
                    html = "Reach out to the contact below to request an override.</br></br>Name: Ms. Pamela Carlson";
                    name.html(html);
                    html = "Email: <a href=mailto:pecarlson@ncat.edu>pecarlson@ncat.edu</a></br></br>Phone: 336-285-2324";
                    email.html(html);
                    $('#contact_name').show();
                    $('#contact_email').show();
                    break;
                case "ABM":
                    html = "Students must physically go in to request an override.</br></br>";
                    name.html(html);
                    html = "Location: Carver Hall, Room 101</br></br>POC: Nate Adkins";
                    email.html(html);
                    $('#contact_name').show();
                    $('#contact_email').show();
                    break;
                case "BUAN":
                    html = "Reach out to the contact below to request an override.</br></br>Name: Sherri Grady";
                    name.html(html);
                    html = "Email: <a href=mailto:smgrady@ncat.edu>smgrady@ncat.edu</a></br></br>Phone: 336-334-7657";
                    email.html(html);
                    $('#contact_name').show();
                    $('#contact_email').show();
                    break;
                case "BTEC":
                    html = "Reach out to the contact below to request an override.</br></br>Name: Sherri Grady";
                    name.html(html);
                    html = "Email: <a href=mailto:smgrady@ncat.edu>smgrady@ncat.edu</a></br></br>Phone: 336-334-7657";
                    email.html(html);
                    $('#contact_name').show();
                    $('#contact_email').show();
                    break;
                case "CHEM":
                    instructions.hide();
                    html = "Complete the form shown to submit your override request.</br></br>";
                    name.html(html);
                    $('#contact_name').show();
                    $('#contact_email').hide();
                    $('#content').show();
                    $('#content').attr('src', 'https://ncat.az1.qualtrics.com/jfe/form/SV_d70M6hoDOXtD22V');
                    break;
            }
        }
        else{
            $('#content').show();
            $('#content').attr('src', '/static/docs/' + form_name);

            instructions.html("Complete the form and email it to the contact below.");
            $('#contact_instructions').show();

            switch (department) {
                case "COMP":
                    html = "Name: Ms. Rosemary Williams";
                    name.html(html);
                    html = "Email: <a href=mailto:rosnlloy@ncat.edu>rosnlloy@ncat.edu</a>";
                    email.html(html);
                    break;
                case "ECEN":
                    html = "Name: Amanda R. Hughes";
                    name.html(html);
                    html = "Email: <a href=mailto:arhughes1@ncat.edu>arhughes1@ncat.edu</a>";
                    email.html(html);
                    break;
                case "MEEN":
                    html = "Name: Jennifer M. Kennedy";
                    name.html(html);
                    html = "Email: <a href=mailto:jk017215@ncat.edu>jk017215@ncat.edu</a>";
                    email.html(html);
                    break;
            }
            $('#contact_name').show();
            $('#contact_email').show();
        }
    });
});