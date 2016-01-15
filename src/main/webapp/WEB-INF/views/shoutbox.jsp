<!DOCTYPE html>
<html>
    <head>
        <title>Hurray!</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">        
        <script src="resources/js/lib/jquery.min.js" type="text/javascript"></script>
		<script src="resources/js/lib/bootstrap.min.js" type="text/javascript"></script>
		<script src="resources/js/lib/jquery.easing.min.js" type="text/javascript"></script>      
        
        <style>           
            
            body{ margin: 0; background-color: #99ff66; }
            
            #header{ position: relative; width: 100%; line-height: 400%; background-color: #000000; text-align: center;
                    color: white; margin: auto; font-weight: bold; font-size: 140%; margin-bottom: 0.3%;}
            
            #allMessagesArea{ width: 70%; margin: auto; height: 480px; background-color: #cccccc; border: solid #003333; 
                              margin-bottom: 0.3%; overflow: scroll; font-size: 130%;}
            
            #controls{width: 70%; margin: auto;  }
            
            #messeageSent{ width: 92.4%; resize: none;}
            
            #sendMessage{ font-size: 140%; position: absolute;}
        </style>        
        
        <script type="text/javascript">


            $("document").ready(function(){                
                
            	var count = 0;
            	var rows = 0;

            	doAjax();   		// runs on page load
                function doAjax() {
	                    $.ajax({
							url : "${pageContext.request.contextPath}/getSBMessage",
							type : "GET",				
			                dataType: "json",
							beforeSend : function(xhr) {
								xhr.setRequestHeader("Accept", "application/json");
								xhr.setRequestHeader("Content-Type", "application/json");
							},
							success : function(data) {																	
						    	
								if(count < 1){
									if(data.length > 0){
										count++;	
										rows = data.length;
										for(i = 0; i < data.length; i++){
											$("#allMessagesArea").append(data[i].message + "<br>");
										}									
									}
								}
								
								if(data.length-rows == 1){
									//$("#allMessagesArea").append("<br>" + data[rows].message);
									$("#allMessagesArea").append(data[rows].message + "<br>" );
								}
								else{
									for(i = rows; i < data.length; i++){
										//$("#allMessagesArea").append("<br>" + data[i].message);
										$("#allMessagesArea").append(data[i].message + "<br>");
									}
								}								
								rows = data.length;								
								$("#allMessagesArea").scrollTop($("#allMessagesArea").prop("scrollHeight"));			                
							},
						    complete: function (data) {		
						    	setTimeout(doAjax, 1000); 		// this will run after every 1 second
						    }
                    });
                }
                   
                
                $("#messeageSent").keypress(function(event){                    
                    if(event.which === 13){
                        $("#sendMessage").click();
                        event.preventDefault();
                    }
                });
                
                
                $("#sendMessage").click(function(){
                    var userMessage = $("#messeageSent").val();                    
                    var json = {
						'message' : userMessage
		    		};
                    $("#messeageSent").val("");                    
                    var prevState = $("#allMessagesArea").html();   
 
                    if(prevState.length >= 1){                       
                        userMessage = '<br>' + userMessage;
                    }
                    //$("#allMessagesArea").append(userMessage);

                    
                    $.ajax({
						url : "${pageContext.request.contextPath}/postSBMessage.htm",
						data : JSON.stringify(json),
						type : "POST",				
						contentType: 'application/json',
						beforeSend : function(xhr) {
							xhr.setRequestHeader("Accept", "application/json");
							xhr.setRequestHeader("Content-Type", "application/json");
						},
						success : function() {					
						},
				        complete: function () {			    	 
				        }
                    });   
                    
                    doAjax();
                    $("#allMessagesArea").scrollTop($("#allMessagesArea").prop("scrollHeight"));
                    
                });
            });
        </script>
        
    </head>
    <body>
        
        <div id="header">NORTHWEST SHOUTBOX</div>
        
        <div id="allMessagesArea"></div>
        
        <div id="controls">
            <textarea id="messeageSent" placeholder="Enter Your Message Here..."></textarea>
            <button id="sendMessage">Send</button>
        </div>       
        
    </body>
</html>
