<html lang="en">
<head>
  <meta charset="utf-8">
  
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">


<!-- Latest compiled JavaScript -->
<script src="../bootstrap/js/bootstrap.min.js"></script>
    
  <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
  <script src="http://code.jquery.com/jquery-1.10.2.js"></script>
  <script src="http://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
  <script src="../lib/jquery.bxslider.js"></script>

  <link rel="stylesheet" href="../css/jquery.bxslider.css">
  <script>
	var that = this;
	  $(function() {
	    $( "#popupDiv" ).dialog({      
	      modal: true,
		  /*position: 
			{
				top: "69%",
				left: "5%"
			},*/
			width: "50%",
			height: "80%",
		useCss: false,
	      open: function(){
	      	that.addSlides();
	      }
	    });
	  });
	  
	  
	  function addSlides(){
	  	
	  	
		var stack = {
					"answer1":{						
					    "AdminMove":[{"a1":"a2"},{"a2":"a3"}],
					    "AutomatedMove":[{"b1":"b2"},{"b2":"b3"}]					    
					},
					"answer2":{						
					    "AdminMove":[{"a1":"a2"},{"a2":"a3"}],
					    "AutomatedMove":[{"b1":"b2"},{"b2":"b3"}]					    
					},
					"answer3":{						
					    "AdminMove":[{"a1":"a2"},{"a2":"a3"}],
					    "AutomatedMove":[{"b1":"b2"},{"b2":"b3"}]					    
					}
				};
				    	  	
	/*  	$.each(stack,function(key, answer){

		  		var slideDiv = $("<div>").addClass("slide");
		  		var tableDiv = $("<table><thead><tr><td>Admin Move</td><td>Automated Move</td></tr></thead><tbody></tbody></table>");
		  		$("#sliderDiv").append(slideDiv);
		  		$(slideDiv).append(tableDiv);

	  			var adminMovesArray = answer.AdminMove;
	  			var autoMovesArray = answer.AutomatedMove;
	  			
	  			for(var index = 0;index<adminMovesArray.length;index++){
	  				var objAdminMove = adminMovesArray[index];
	  				var objAutoMove = autoMovesArray[index];
	  				for(var key in objAdminMove){
	  					var rowEntry = "<tr><td>"+key+"->"+objAdminMove[key]+"</td>";	  				
	  					for(var key in objAutoMove){
	  						rowEntry = rowEntry+"<td>"+key+"->"+objAutoMove[key]+"</td></tr>";	  						
	  					}
	  				}
	  				
	  				tableDiv.find("tbody").append(rowEntry);
	  			};
	  			
	  	});
*/	  	

		$.each(stack,function(key, answer){

		  		var slideDiv = $("<div>").addClass("slide");
		  		var tableDiv = $("<div class=\"row\"><div class=\"col-sm-4\">Admin Move</div><div class=\"col-sm-4\">Automated Move</div></div>");
		  		$("#sliderDiv").append(slideDiv);
		  		$(slideDiv).append(tableDiv);

	  			var adminMovesArray = answer.AdminMove;
	  			var autoMovesArray = answer.AutomatedMove;
	  			
	  			for(var index = 0;index<adminMovesArray.length;index++){
	  				var objAdminMove = adminMovesArray[index];
	  				var objAutoMove = autoMovesArray[index];
	  				for(var key in objAdminMove){
	  					var rowEntry = "<div class=\"row\"><div class=\"col-sm-4\">"+key+"->"+objAdminMove[key]+"</div>";	  				
	  					for(var key in objAutoMove){
	  						rowEntry = rowEntry+"<div class=\"col-sm-4\">"+key+"->"+objAutoMove[key]+"</div></div>";	  						
	  					}
	  				}
	  				
	  				$(slideDiv).append(rowEntry);
	  			};
	  			
	  	});

	  	$("#sliderDiv").bxSlider({
      		onSliderLoad : function(){	      			
      			
      		}
      	});
	  }
  </script>
</head>
<body>
<div id="popupDiv">
	<div id="sliderDiv" class="container-fluid">
		
	</div>
</div> 
 
</body>
</html>
