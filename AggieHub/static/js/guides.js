/***************************************************************************************
 * This function is a nested function that incorporates a student selecting a curriculum
 * guide based on their college. The overall output will list out a set of buttons that 
 * are specifically connected to that particular curriculum guide for the user to click 
 * on and view.
 ***************************************************************************************/

    $("#select_curriculum_guide").change(function(){
        var college =$("#college option:selected").attr('value');
          if(college =="College of Agriculture and Environmental Sciences"){
            document.getElementById("box").innerHTML = "";
                $('#content').attr('src', '');
                $('#content').show();
                guides = ['B.S. - Agricultural and Environmental Systems (Agribusiness and Food Industry Management)',
                'B.S. - Agricultural Education (Secondary Education)','B.S. - Agricultural Education (Agricultural Professional Service)',
                'B.S. - Animal Science','B.S. - Animal Science (Animal Industry)','B.S. - Laboratory Animal Science',
                'B.S. - Child Development and Family Studies (Child Development and Family Relations)',
                'B.S. - Child Development and Family Studies (Child Development, Early Education and Family Studies - B-K Licensure',
                'B.S. - Family And Consumer Sciences (Fashion Merchandising and Design)',
                'B.S. - Family and Consumer Sciences (Consumer Science)','B.S. - Food And Nutritional Sciences (Human Nutrition)',
                'B.S. - Food And Nutritional Sciences (Food Science)','Certificate - Family and Consumer Sciences',
                'Certificate - Human Lactation','B.S. Agricultural and Environmental Systems, Concentration in Sustainable Land and Food Systems',
                'B.S. Agricultural and Environmental Systems, Concentration in Environmental Studies','B.S. Biological Engineering (Bioprocess Engineering Track)',
                'B.S. Biological Engineering (Natural Resources Track)','B.S. Landscape Architecture','M.S. - Agricultural Education (Professional Licensure)',
                'M.S. - Agricultural Education (Professional Service)','M.S. – Agricultural and Environmental Systems (Natural Resources and Environmental Systems)',
                'M.S. – Agricultural and Environmental Systems (Agribusiness and Food Industry Management)','M.S. – Agricultural and Environmental Systems (Integrated Animal Health Systems)',
                'M.S. - Food And Nutritional Sciences','Ph.D. - Agribusiness and Applied Economics','Ph.D. - Agricultural and Extension Education',
                'Ph.D - Food Science, Human Nutrition and Health','Ph.D - Sustainable Agriculture and Environmental Sciences','Ph.D - Sustainable Animal Production and Health'];

/***************************************************************************************
 * This function is to create the buttons that will be generated from the college
 * selection of "College of Agriculture and Environmental Sciences".
 ***************************************************************************************/

                function makeButtons(c) {
                 for (var i = 0; i < c.length; i++) {
                   $('.box').append('<button id=' + [i] + ' onclick="btnToPDF1(this)"style="background-color:#95CB89; padding: 10px; margin-bottom: 15px; cursor: pointer;" value=' + c[i] + '>' + c[i] +'</button>');
                  }
                }
          
                makeButtons(guides);
            };
            

          if(college=="College of Arts, Humanities, and Social Sciences"){
                document.getElementById("box").innerHTML = "";
                $('#content').attr('src', '');
                $('#content').show();
                guides1 = ['B.A. - English (Professional English)','B.A. - English (African-American Literature)',
                'B.A. - English (Creative Writing)','B.A. - English (Technical Writing)','B.S. - Secondary Education (English)',
                'B.A. - History','B.S. - History, Secondary Education','B.A. - Political Science','B.S. - Journalism & Mass Communication (Mass Media Production)',
                'B.S. - Journalism & Mass Communication (Multimedia Journalism)','B.S. - Journalism & Mass Communication (Public Relations)','B.A. - Liberal Studies (African-American Studies)',
                'B.A. - Liberal Studies (Applied Cultural Thought)','B.A. - Liberal Studies (Pre-Law)','B.S. - Criminal Justice',
                'B.S. - Criminal Justice, Certificate in Forensic Science – Crime Scene Investigation','B.A. Visual Arts, Design',
                'B.A. Visual Arts, Design (Media Design)','B.A. Secondary Education (Art)','B.F.A. - Professional Theatre (Acting)',
                'B.F.A. - Professional Theatre (Theatre Technology)','B.A. - Music (General)','B.A. - Music (Performance, Vocal Track)',
                'B.A. - Music (Performance, Piano Track)','B.S. - Secondary Education (Music Education, Vocal Track)','B.A. - Music (Performance) Instrumental Track',
                'B.A. - Music (Secondary Education - Instrumental Track)','M.A. - English and African American Literature Thesis / Non-Thesis',
                'M.A.T. - History Education','Graduate Certificate - Technical and Professional Communication'];

/***************************************************************************************
 * This function is to create the buttons that will be generated from the college
 * selection of "College of Arts, Humanities, and Social Sciences".
 ***************************************************************************************/
                function makeButtons(d) {
                 for (var i = 0; i < d.length; i++) {
                   $('.box').append('<button id=' + [i] + ' onclick="btnToPDF2(this)"style="background-color:#D9A9B0; padding: 10px; margin-bottom: 15px; cursor: pointer;" value=' + d[i] + '>' + d[i] +'</button>');
                  }
                }
          
                makeButtons(guides1);                     
             }; 
             if(college =="Wille A. Deese College of Business and Economics"){
                document.getElementById("box").innerHTML = "";
                    $('#content').attr('src', '');
                    $('#content').show();
                    guides2 = ['B.S. - Accounting','B.S. - Finance','B.S. - Business Information Technology','B.S. Management - Management Information Systems Concentration',
                    'B.S. – Economics','B.S. – Economics - ONLINE','B.S. Economics – Economics Business Concentration','B.S. Economics – Economics Law Concentration','B.S. - Management',
                    'B.S. Management – Business Administration Concentration','B.S. Management – Entrepreneurship and Innovation Concentration','B.S. Management – International Management Concentration',
                    'B.S. - Marketing','B.S. - Marketing (Sales)','B.S. - Supply Chain Management','Minor - Supply Chain Management','MAcc - Master of Accountancy','MBA - General Management Concentration',
                    'MBA - Accounting Concentration','MBA - Human Resource Management Concentration','MBA - Supply Chain Management Concentration'];

/***************************************************************************************
 * This function is to create the buttons that will be generated from the college
 * selection of "Wille A. Deese College of Business and Economics".
 ***************************************************************************************/
                    function makeButtons(e) {
                     for (var i = 0; i < e.length; i++) {
                       $('.box').append('<button id=' + [i] + ' onclick="btnToPDF3(this)"style="background-color:#888890; padding: 10px; margin-bottom: 15px; cursor: pointer;" value=' + e[i] + '>' + e[i] +'</button>');
                      }
                    }
              
                    makeButtons(guides2);
                };
                if(college =="College of Education"){
                    document.getElementById("box").innerHTML = "";
                        $('#content').attr('src', '');
                        $('#content').show();
                        guides3 = ['B.S. Elementary Education','Biology Education (Grades 9-12)','Business Education (Grades 7-12)',
                        'Child Development (Birth to Kindergarten)','Elementary Education (Grades K-6)','English Education (Grades 9-12)',
                        'Family and Consumer Sciences','Health and Physical Education (K-12)','History Education (Grades 9-12)','Mathematics Education (Grades 9-12)',
                        'Special Education (Grades K-12)','Technology Education (Grades 9-12)','MAED Reading','M.S. Mental Health Counseling (Clinical Practice)',
                        'M.S. Mental Health Counseling (Rehabilitation)','M.S. School Counseling','Ph.D. Rehabilitation Counseling and Counselor Education',
                        'Certificate - School Administration','M.S. Adult Education','M.S.A - School Administration','Ph.D. Leadership Studies'];

/***************************************************************************************
 * This function is to create the buttons that will be generated from the college
 * selection of "College of Education".
 ***************************************************************************************/
                        function makeButtons(f) {
                         for (var i = 0; i < f.length; i++) {
                           $('.box').append('<button id=' + [i] + ' onclick="btnToPDF4(this)"style="background-color:#FDB827; padding: 10px; margin-bottom: 15px; cursor: pointer;" value=' + f[i] + '>' + f[i] +'</button>');
                          }
                        }
                  
                        makeButtons(guides3);
                    };
                    if(college =="College of Engineering"){
                        document.getElementById("box").innerHTML = "";
                            $('#content').attr('src', '');
                            $('#content').show();
                            guides4 = ['B.S. - Architectural Engineering','B.S. - Civil Engineering',
                            'B.S. - Computer Science','B.S. - Mechanical Engineering','B.S. - Mechanical Engineering (Aerospace)',
                            'B.S. - Industrial and Systems Engineering','B.S. - Electrical Engineering','B.S. - Computer Engineering',
                            'B.S. - Bioengineering (General)','B.S. - Bioengineering (Innovation)','B.S. - Biological Engineering (Bioprocess Engineering)',
                            'B.S. - Biological Engineering (Natural Resources Engineering)','B.S. - Chemical Engineering ',
                            'Ph.D. - Computational Data Science and Engineering','Ph.D. - Computer Science','Ph.D. - Electrical Engineering',
                            'Ph.D. - Industrial and Systems Engineering','Ph.D. - Mechanical Engineering',
                            'M.S. - Bioengineering','M.S. - Chemical Engineering','M.S. - Civil Engineering','M.S. - Civil Engineering (System Engineering)',
                            'M.S. - Data Science and Engineering (Systems Engineering)','M.S. - Computer Science',
                            'M.S. - Data Science and Engineering','M.S. - Electrical Engineering','M.S. - Industrial and Systems Engineering',
                            'M.S. - Mechanical Engineering','M.S. - Mechanical Engineering (Systems Engineering)'];
    
/***************************************************************************************
 * This function is to create the buttons that will be generated from the college
 * selection of "College of Engineering".
 ***************************************************************************************/
                            function makeButtons(g) {
                             for (var i = 0; i < g.length; i++) {
                               $('.box').append('<button id=' + [i] + ' onclick="btnToPDF5(this)"style="background-color:#BC5C45; padding: 10px; margin-bottom: 15px; cursor: pointer;" value=' + g[i] + '>' + g[i] +'</button>');
                              }
                            }
                      
                            makeButtons(guides4);
                        };
                        if(college =="College of Health and Human Sciences"){
                            document.getElementById("box").innerHTML = "";
                                $('#content').attr('src', '');
                                $('#content').show();
                                guides5 = ['B.S. - Kinesiology (KINS) Exercise Science Concentration','B.S. - Kinesiology (KINS) Recreation & Sport Management Concentration',
                                'B.S. - Nursing (ABSN)','B.S. - Nursing Traditional','B.S. - Nursing (RN to BSN)',
                                'B.S. - Nursing (RN to BSN, Part-time)','B.S. - Health Services Management','B.A. - Psychology',
                                'Bachelor of Social Work','B.A. - Sociology','MSW - Social Work','Ph.D. - Social Work'];

/***************************************************************************************
 * This function is to create the buttons that will be generated from the college
 * selection of "College of Health and Human Sciences".
 ***************************************************************************************/
                                function makeButtons(h) {
                                 for (var i = 0; i < h.length; i++) {
                                   $('.box').append('<button id=' + [i] + ' onclick="btnToPDF6(this)"style="background-color:#5CB8DC; padding: 10px; margin-bottom: 15px; cursor: pointer;" value=' + h[i] + '>' + h[i] +'</button>');
                                  }
                                }
                          
                                makeButtons(guides5);
                            };
                            if(college =="College of Science and Technology"){
                                document.getElementById("box").innerHTML = "";
                                    $('#content').attr('src', '');
                                    $('#content').show();
                                    guides6 = ['B.S. - Applied Engineering Technology','B.S. - Automotive Engineering Technology','B.S. -  Biology (Pre-Medical)',
                                    'B.S. -  Biology (General Biology)','B.S. -  Secondary Education (Biology)','B.S. - Construction Management','B.S. - Environmental Health and Safety (Management)',
                                    'B.S. - Environmental Health and Safety (Science)','B.S. - Geomatics','Minor - Construction Management','Minor - Geomatics',
                                    'Certificate - Occupational Safety and Health','B.S. - Chemistry (ACS Certified)','B.S. - Chemistry (Biochemistry and Biomedical Sciences)',
                                    'B.S. - Chemistry (Secondary Education)',' B.S. - Electronics Technology',' B.S. - Information Technology','B.S. - Graphic Communication Systems',
                                    'B.S. - Computer Graphics Technology (Technical Design)','B.S. - Computer Graphics Technology (User Experience)','B.S. - Mathematics','B.S. - Mathematics (Applied Mathematics)',
                                    'B.S. - Mathematics (Statistics)','B.S. - Mathematics (Mathematics Secondary Education)','B.S. - Physics','B.S. - Physics (Engineering Physics)',
                                    'B.S. - Physics (Biological Physics)','B.S. - Physics (Interdisciplinary Physics)','B.S. - Physics (Secondary Education)','B.S. - Atmospheric Sciences and Meteorology',
                                    'M.S. - Applied Mathematics','M.S. - Biology','M.S. - Biology (Industrial Biosciences)','M.S. - Chemistry','M.S. - Chemistry (Applied Chemistry and Chemical Sciences)',
                                    'M.S. - Information Technology (MSIT)','M.S. - Technology Management','Ph.D - Applied Science & Technology'];
            
/***************************************************************************************
 * This function is to create the buttons that will be generated from the college
 * selection of "College of Science and Technology".
 ***************************************************************************************/
                                    function makeButtons(j) {
                                     for (var i = 0; i < j.length; i++) {
                                       $('.box').append('<button id=' + [i] + ' onclick="btnToPDF7(this)"style="background-color:#9A86A9; padding: 10px; margin-bottom: 15px; cursor: pointer;" value=' + j[i] + '>' + j[i] +'</button>');
                                      }
                                    }
                              
                                    makeButtons(guides6);
                                };
                                if(college =="Joint School of Nanoscience and Nanoengineering"){
                                    document.getElementById("box").innerHTML = "";
                                        $('#content').attr('src', '');
                                        $('#content').show();
                                        guides7 = ['M.S. - Nanoengineering','Ph.D - Nanoengineering'];
                
/***************************************************************************************
 * This function is to create the buttons that will be generated from the college
 * selection of "Joint School of Nanoscience and Nanoengineering".
 ***************************************************************************************/
                                        function makeButtons(k) {
                                         for (var i = 0; i < k.length; i++) {
                                           $('.box').append('<button id=' + [i] + ' onclick="btnToPDF8(this)"style="background-color:#DF8738; padding: 10px; margin-bottom: 15px; cursor: pointer;" value=' + k[i] + '>' + k[i] +'</button>');
                                          }
                                        }
                                  
                                        makeButtons(guides7);
                                    };
                                    

                  
        });
        
/***************************************************************************************
 * Based on the student's button click selection, this function is to determine which 
 * curriculum guide is to be shown in the PDF Viewer out of the set 
 * "College of Agriculture and Environmental Sciences".
 ***************************************************************************************/
        function btnToPDF1(button){
            var x = button.id;
            switch (x) {
                case '0':
                    $('#content').attr('src',"https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/bs-agricultural-environmental-agribusiness-food-industry-management-2021-2022.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '1':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/bs-agricultural-education-secondary-education.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '2':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/bs-agricultural-education-agricultural-professional-2021-22.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '3':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/bs-animal-science-2021-2022-curriculum-guide.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '4':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/bs-animal-science-animal-industry-2021-2022.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '5':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/bs-laboratory-animal-science-2021-2022.pdf&embedded=true");
                    $('#content').show();
                    break; 
                case '6':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---child-devleopment-and-family-studies-child-development-and-family-relations.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '7':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---child-devleopment-and-family-studies-child-development-early-education-and-family-studies---b-k-licensure.pdf&embedded=true");
                    $('#content').show();
                    break;  
                case '8':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---family-and-consumer-sciences-fashion-merchandising-and-design.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '9':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---family-and-consumer-sciences-consumer-science.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '10':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---food-and-nutritional-sciences-human-nutition.pdf&embedded=true");
                    $('#content').show();
                    break; 
                case '11':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---food-and-nutritional-sciences-food-science.pdf&embedded=true");
                    $('#content').show();
                    break; 
                case '12':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/certificate---family-and-consumer-sciences1.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '13':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/certificate---human-lactation.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '14':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---agricultural-and-environmental-systems-sustainable-land-and-food-systems.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '15':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---agricultural-and-environmental-systems-enviornmental-studies.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '16':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---biological-engineering-bioprocess-engineering-track.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '17':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---biological-engineering-natural-resources-engineering-track.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '18':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---landscape-architecture.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '19':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---agricultural-education-professional-licensure.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '20':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---agricultural-education-professional-service.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '21':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---agricultural-and-environmental-systems-natural-resources--environmental.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '22':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---agricultural-and-environmental-systems-agribusiness--food-industry.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '23':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---agricultural-and-environmental-systems-integrated-animal-health-systems.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '24':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---food-and-nutritional-sciences.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '25':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/ph.d---agribusiness--applied-economics.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '26':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/ph.d---agricultural--extension-education.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '27':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/ph.d---food-science,-human-nutrition--health.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '28':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/ph.d---sustainable-agriculture--environmental-sciences.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '29':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/ph.d---sustainable-animal-production-and-health.pdf&embedded=true");
                    $('#content').show();
                    break;
            };
        };

/***************************************************************************************
 * Based on the student's button click selection, this function is to determine which 
 * curriculum guide is to be shown in the PDF Viewer out of the set 
 * "College of Arts, Humanities, and Social Sciences".
 ***************************************************************************************/
        function btnToPDF2(button){
            var x = button.id;
            switch (x) {
                case '0':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.a.---english-professional-english.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '1':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.a.---english-african-american-literature.pdf&embedded=true" );
                    $('#content').show();
                    break;
                case '2':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.a.---english-creative-writing.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '3':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.a.---english-technical-writing.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '4':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.a.---english-secondary-education.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '5':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.a.---history.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '6':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.a.---secondary-education-history.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '7':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.a.---political-sciences.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '8':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/jomc-curriculum-guide--mmpr.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '9':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/jomc-curriculum-guide--mmjr.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '10':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/jomc-curriculum-guide--pbrl.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '11':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.a.---liberal-studies-african-american-studies.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '12':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.a.---liberal-studies-applied-cultural-thought.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '13':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.a.---liberal-studies-pre-law.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '14':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---criminal-justice.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '15':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---criminal-justice,-certificate-in-forensic-sciences---crime-scene-investigation.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '16':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.a.---design.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '17':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.a.---media-design.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '18':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.a.---secondary-education-art.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '19':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.f.a---professional-theatre-acting.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '20':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.f.a---professional-theatre-theatre-technology.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '21':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.a.---music-general.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '22':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.a.---music-performance.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '23':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.a.---music-performance,-piano-track.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '24':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.a.---secondary-education-music-education.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '25':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.a.---music-performance,-instrumental-track.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '26':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.a.---music-secondary-education---instrumental-track.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '27':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.a.---english-and-african-american-literature.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '28':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.a.t.---history-education-grades-9-12.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '29':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/certificate---technical-and-professional-communication-tpc.pdf&embedded=true");
                    $('#content').show();
                    break;
             };

        };

/***************************************************************************************
 * Based on the student's button click selection, this function is to determine which 
 * curriculum guide is to be shown in the PDF Viewer out of the set 
 * "Wille A. Deese College of Business and Economics".
 ***************************************************************************************/
        function btnToPDF3(button){
            var x = button.id;
            switch (x) {
                case '0':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/bs-accounting_2021-2022.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '1':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/bs-finance-2021-2022.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '2':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/bs-business-information-technology_2021---2022-curriculum-guide.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '3':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/bs-management-management-information-systems.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '4':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/bs-economics-2021-2022.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '5':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/bs-economics-2021-2022.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '6':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/cobe_2021-2022-bs-economics-business-curriculum-guide.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '7':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/bs-economics-law-2021-2022.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '8':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/cobe_2021-2022-bs-management-curriculum-guide.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '9':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/cobe_2021-2022-bs-management-business-admin-curriculum-guide.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '10':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/cobe_2021-2022-bs-management-entrepreneurship-curriculum-guide.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '11':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/2021-2022-bs-management-international-management-curriculum-guide.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '12':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/bs-marketing-2021-2022.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '13':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/bs-marketing-sales-2021-2022.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '14':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/bs-supply-chain-2021-2022.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '15':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/scm-minor-jan-2019-prefix-update.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '16':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.acc---accountancy.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '17':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.b.a.---business-administration-general-management.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '18':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.b.a.---business-administration-accountancy.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '19':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.b.a.---business-administration-human-resouces-management.pdf&embedded=true");
                    $('#content').show();
                    break;
                    case '20':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.b.a.---business-administration-supply-chain-management.pdf&embedded=true");
                    $('#content').show();
                    break;
               };

        };
    
/***************************************************************************************
 * Based on the student's button click selection, this function is to determine which 
 * curriculum guide is to be shown in the PDF Viewer out of the set 
 * "College of Education".
 ***************************************************************************************/
        function btnToPDF4(button){
            var x = button.id;
            switch (x) {
                case '0':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.--elementary-education.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '1':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/m.a.t.---biology-education.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '2':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/m.a.t.---business-education.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '3':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/m.a.t.---child-dev,-early-edu,-and-family-studies-b-k.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '4':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/m.a.t.---elementary-education-k-6.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '5':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/m.a.t.---english-education.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '6':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/m.a.t.---family-and-consumer-sciences-education.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '7':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/m.a.t.---health-and-physical-education.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '8':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/m.a.t.---history-education.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '9':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/m.a.t.---mathematics-education.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '10':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/m.a.t.---special-education-general-curriculum-k-12.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '11':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/m.a.t.---technology-education.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '12':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/m.aed.---reading-education-k-12.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '13':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/m.s.---mental-health-counseling-clinical.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '14':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/m.s.---mental-health-counseling-rehabilitation.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '15':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/m.s.---school-counseling.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '16':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/ph.d.---rehabilitation-counseling-and-counselor-education.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '17':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/certificate---school-administration.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '18':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/m.s.---adult-education.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '19':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/m.s.a.---school-administration.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '20':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/ph.d.---leadership-studies.pdf&embedded=true");
                    $('#content').show();
                    break;
            };
        };
    
/***************************************************************************************
 * Based on the student's button click selection, this function is to determine which 
 * curriculum guide is to be shown in the PDF Viewer out of the set 
 * "College of Engineering".
 ***************************************************************************************/
        function btnToPDF5(button){
            var x = button.id;
            switch (x) {
                case '0':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---architectural-engineering.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '1':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---civil-engineering.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '2':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---computer-science.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '3':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---mechanical-engineering.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '4':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---mechanical-engineering-aerospace.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '5':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---industrial-and-systems-engineering.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '6':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---electrical-engineering_.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '7':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---computer-engineering_.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '8':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---bioengineering-general.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '9':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---bioengineering-innovation.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '10':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---biological-engineering-bioprocess-engineering-track1.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '11':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---biological-engineering-natural-resources-engineering-track1.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '12':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---chemical-engineering.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '13':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/ph.d.---computational-data-science-and-engineering.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '14':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/ph.d.---computer-science.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '15':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/ph.d.---electrical-engineering.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '16':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/ph.d.---industrial-and-systems-engineering.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '17':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/ph.d.---mechanical-engineering.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '18':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---bioengineering.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '19':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---chemical-engineering.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '20':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---civil-engineering.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '21':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---civil-engineering-systems-engineering.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '22':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---data-science-and-engineering-systems-engineering.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '23':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---computer-science.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '24':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---data-science-and-engineering.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '25':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---electrical-engineering.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '26':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---industrial-and-systems-engineering.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '27':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---mechanical-engineering.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '28':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---mechanical-engineering-systems-engineering.pdf&embedded=true");
                    $('#content').show();
                    break;
               };
        };
    
/***************************************************************************************
 * Based on the student's button click selection, this function is to determine which 
 * curriculum guide is to be shown in the PDF Viewer out of the set 
 * "College of College of Health and Human Sciences".
 ***************************************************************************************/
        function btnToPDF6(button){
            var x = button.id;
            switch (x) {
                case '0':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/kins-2021-exercise-science-concentration-exsc.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '1':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/kins-2021-recreation--sprt-mgmt-concentration-rcsm.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '2':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/2021---2022-accelerated-curriculum-guide.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '3':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/2021---2022-traditional-curriculum-guide.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '4':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/2021---2022-bsnc-full-time-curriculum-guide.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '5':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/2021---2022-bsnc-part-time-curriculum-guide.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '6':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---heath-services-management.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '7':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.a.---psychology.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '8':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.-social-work.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '9':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.-sociology.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '10':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.w.---social-work.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '11':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/ph.d.---social-work.pdf&embedded=true");
                    $('#content').show();
                    break;
                };
        };

/***************************************************************************************
 * Based on the student's button click selection, this function is to determine which 
 * curriculum guide is to be shown in the PDF Viewer out of the set 
 * "College of Science and Technology".
 ***************************************************************************************/
        function btnToPDF7(button){
            var x = button.id;
            switch (x) {
                case '0':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---applied-engineering-technology.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '1':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---automotive-engineering-technology.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '2':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---biology-pre-medical.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '3':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---biology-general-biology.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '4':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---secondary-education-biology.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '5':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---consturction-management.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '6':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---environmental-health-and-safety-management.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '7':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---environmental-health-and-safety-science.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '8':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---geomatics.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '9':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/minor-department-of-built-environment-cm-5-12-2020.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '10':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/geom-minor.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '11':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/ohs-undergrad-certificate-2020-2021.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '12':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---chemistry-acs-certified.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '13':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---chemistry-biochemistry-and-biomedical-sciences.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '14':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---chemistry-secondary-education.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '15':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---electronics-technology.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '16':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---information-technology.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '17':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---graphic-communicatins-systems.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '18':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---computer-graphic-technology-technical-design.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '19':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---computer-graphic-technology-user-experience.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '20':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---mathematics.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '21':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---mathematics-applied-mathematics.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '22':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---mathematics-statistics--data-science.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '23':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---mathematics-statistics--data-science1.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '24':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---physics.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '25':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---physics-engineering-physics.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '26':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---physics-biological-physics.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '27':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---physics-interdisciplinary-physics.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '28':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---physics-secondary-education.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '29':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/b.s.---atomspheric-sciences-and-meterology.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '30':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---applied-mathematics.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '31':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---biology.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '32':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---biology-industrial-biosciences-psm.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '33':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---chemistry.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '34':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---chemistry-applied-chemistry-and-chemical-sciences-psm.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '35':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---information-technology.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '36':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---technology-management.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '37':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/ast-2022-23-curriculum-guide_final-1.pdf&embedded=true");
                    $('#content').show();
                    break;
                };
        };
    
/***************************************************************************************
 * Based on the student's button click selection, this function is to determine which 
 * curriculum guide is to be shown in the PDF Viewer out of the set 
 * "Joint School of Nanoscience and Nanoengineering".
 ***************************************************************************************/
        function btnToPDF8(button){
            var x = button.id;
            switch (x) {
                case '0':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/m.s.---nanoengineering.pdf&embedded=true");
                    $('#content').show();
                    break;
                case '1':
                    $('#content').attr('src', "https://docs.google.com/gview?url=https://www.ncat.edu/provost/academic-affairs/curriculum-guides/ph.d.---nanoengineering.pdf&embedded=true");
                    $('#content').show();
                    break;
            };
        };
