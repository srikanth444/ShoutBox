/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//*******************************//user registration code start *******************************************

	var currentRole;

$(document).ready(function () {
	

	
	
	//*******************************//Move to sig in when register button clicked *******************************************	
	
	$( "#btnReg" ).click(function() {
		window.location = "registration.jsp";
	});
	
	$( "#signout" ).click(function() {
		window.location = "signin.jsp";
	});
	
	$( "#signoutviewpapers" ).click(function() {
		window.location = "../signin.jsp";
	});
	
	
	$('#dropdown1').change(function() {
		 
		if($(this).val() === "chair"){
			 currentRole = "chair";
			 window.location = "createanevent.jsp";
		}else if($(this).val() === "reviewer") {
			 currentRole = "reviewer";
			 window.location = "http://localhost:8080/test/getallpapers/"+useremail;
		}else{
			 currentRole = "author";
			 window.location = "papersubmission.jsp";
		}       
    });
	
	
	
		$('#regFrm').submit(function(event) {
					
			var firstName = $("#regFirstname").val();
            var lastName = $("#regLastname").val();
            var emailAddress = $("#email").val();
            var phone= $("#regPhonenum").val();
            var password = $("#regPassword").val();
            var dateOfBirth = $("#date1").val();
            
			var json = {
				'firstName' : firstName,
				'lastName' : lastName,
				'email' : emailAddress,
				'contactNumber' : phone,
				'password' : password,
				'dob':dateOfBirth
			};
			$.ajax({
				url : "http://localhost:8080/test/register",
				data : JSON.stringify(json),
				type : "POST",				
				contentType: 'application/json',
				dataType: "text",
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Content-Type", "application/json");
				},
				success : function(data) {
					alert("Welcome "+data+ ", Account has been created successfully");
					window.location = "http://localhost:8080/test/signin.jsp";
				},
			    complete: function () {
			    	 
			    }
			});

			event.preventDefault();
		});
		//user registration code end.



 
//******************************* SIGN IN FORM *****************************************      
      
      
$('#signForm').submit(function(event) {

    var userName = $('#userName').val();
    var password = $('#password').val();
    userNameSignIn = userName;
    
    document.cookie=userName;
    var json = {
          'email' : userName,
          'password' : password
    };

    $.ajax({
          url : "http://localhost:8080/test/signin",
          data : JSON.stringify(json),
          type : "POST",
          contentType: 'application/json',
          dataType: "text",
          beforeSend : function(xhr) {
                 xhr.setRequestHeader("Accept", "application/json");
                 xhr.setRequestHeader("Content-Type", "application/json");
          },
          success : function(data) {
        	 
        	 var test = $('input[name=radio]:checked').val();
        	 useremail = $('#userName').val();
        	 //console.log(data);     
        	 
        	 var res = data.split("$$$$");        	 
        	 $('#userEmailLogin').val(useremail);        	         	 
        	 console.log($('#userEmailLogin').val(useremail));
        	
        	 if(res[0] != "Login Successful") {
        		 alert(res[0]);
       	  	 }  else if(test === "author" && res[3] ==="true"){        		 
       	  		 currentRole = "author"; 
       	  		 window.location = "papersubmission.jsp";
        	  }
        	  else if(test === "reviewer" && res[2]==="true"){
        		  currentRole = "reviewer";
        		  window.location = "http://localhost:8080/test/getallpapers/"+useremail;        		 
        	  } 
        	  else if(test === "chair" && res[1]==="true"){
        		  currentRole = "chair";
        		  window.location = "createanevent.jsp";
        	  } else if(test != "author" && test != "reviewer" && test != "chair"){
        		  alert("Please select your role");
        	  }   else {
        		  alert(" You have selected an incorrect role");
        	  }      	  
          },
          complete: function () {
        	 
		  }
    });

    event.preventDefault();
});

//ENd






//******************************* CREATE AN EVENT  FORM *****************************************      
    
    
$('#ceForm').submit(function(event) {
  
  var eventName = $('#eventName').val();
  var eventDate = $('#eventDate').val();
  var subDate = $('#subDate').val();
  var eventOrgName = $('#eventOrgName').val();
  var eventDes = $('#eventDes').val();
  
  var username = document.cookie;
  var u1 = username.split('.');
  
  var json = {
        'eventName' : eventName,
        'dateOfEvent' : eventDate,
        'submissionDueDate' : subDate,
        'organizerName' : eventOrgName,
        'eventDescription' : eventDes
  };

  $.ajax({
        url : "http://localhost:8080/test/createanevent/"+u1[0],
        data : JSON.stringify(json),
        type : "POST",
        contentType: 'application/json',
        dataType: "json",
        beforeSend : function(xhr) {
               xhr.setRequestHeader("Accept", "application/json");
               xhr.setRequestHeader("Content-Type", "application/json");
        },
        success : function(data) {	
      	  alert("Event " +data.eventName +" has been created successfully");
      	  
      	 $('#eventName').val("");
      	$('#eventDate').val("");
      	$('#subDate').val("");
      	 $('#eventOrgName').val("");
      	$('#eventDes').val("");
      	  
      	  
        },
        complete: function () {

		}
  });
  event.preventDefault();
});

//ENd




//******************************* Enter FeedBack  FORM *****************************************      

$('#feedForm').click(function(event) {

var paperID = $('#feedHidden').val();
var feedBack = $('#feedbackData').val();

var json = {
      'paperID' : paperID,
      'reviewerFeedback' : feedBack      
};

$.ajax({
      url : "http://localhost:8080/test/submitFeedback",
      data : JSON.stringify(json),
      type : "POST",
      contentType: 'application/json',
      dataType: "text",
      beforeSend : function(xhr) {
             xhr.setRequestHeader("Accept", "application/json");
             xhr.setRequestHeader("Content-Type", "application/json");
      },      
      success : function(data) {      	
      	  alert(data);
      	  location.reload();
        },
        complete: function () {
		}

});
event.preventDefault();
});



/************************************Save Assign Papers******************************/



$('#btnAssign').click(function() {
	
	/*var table = $('#AssignPapersTable').tableToJSON();
	    var mydataPID = JSON.stringify(table); 
	    var value = $('select.rrr option:selected').text();
	 */ 
	 var json = jsonObj;	  		  
	 $.ajax({
	        url : "http://localhost:8080/test/assignpapers",
	        data : JSON.stringify(json),
	        type : "POST",
	        contentType: 'application/json',
	        dataType: "text",
	        beforeSend : function(xhr) {
	               xhr.setRequestHeader("Accept", "application/json");
	               xhr.setRequestHeader("Content-Type", "application/json");
	        },
	        success : function(data) {	
	          alert(data);
	          location.reload();	          	          
	        },
	        complete: function () {
			}
	  });
	  event.preventDefault();
	});

});
 
var myReviewers = new Array();
/*function jsFunction( ev) {
	myReviewers[length] = $(ev).val();
	console.log(myReviewers[length]);
}*/

jsonObj = [];
function jsFunction(id, opt){
	
	item = {}
    item ["paperID"] = id;
    item ["reviewerID"] = opt;
    jsonObj.push(item);	
}
