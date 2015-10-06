$(document).ready(function(){
					var userMove = [],
						automatedMove = [],
						answerId =  parseInt(location.search.split('&&subChapter=')[0].split('&&chapterName=')[0].split('&&levelName=')[0].split('&&problemName=')[0].split('answerId=')[1]) ||1,
						that = this,
 						level = location.search.split('&&subChapter=')[0].split('&&chapterName=')[0].split('&&levelName=')[1],
 						chapter = location.search.split('&&subChapter=')[0].split('&&chapterName=')[1],
 						subChapter = location.search.split('&&subChapter=')[1],
 						problem = location.search.split('&&subChapter=')[0].split('&&chapterName=')[0].split('&&levelName=')[0].split('problemName=')[1];
						
			          $.ajax({url:"config/showBoard.php",data:{level:level,chapter:chapter,subChapter:subChapter,problem:problem}}).done(function(data){
			          	console.log(typeof data);
			          	that.position = JSON.parse(data);
			          	var cfg ={
						  draggable: true,
						  dropOffBoard: 'trash',
						  position :that.position,
						  onDragStart: that.onDragStart,
  						  onDrop : that.onDrop,
						  onSnapEnd: that.onSnapEnd
						};
			          	that.board = new ChessBoard('board',cfg);
			          	that.fen = that.board.fen()+" w"+" -"+" -"+" 0"+" 10";
			          	that.game= new Chess(that.fen);
			          	that.updateStatus();
					  });
					$(this).find('#movePanel').append('<div class ="row"><div class="col-md-6">User Move</div><div class="col-md-6">Automated Move</div></div>');
				// do not pick up pieces if the game is over
				// only pick up pieces for the side to move
				 this.onDragStart = function(source, piece, position, orientation) {
				  if (that.game.game_over() === true ||
				      (that.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
				      (that.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
				    return false;
				  }
				};
				
				this.onDrop = function(source, target) {
				  // see if the move is legal
				  var move = that.game.move({
				    from: source,
				    to: target,
				    promotion: 'q' // NOTE: always promote to a queen for example simplicity
				  });
				  if(source!=target && move!==null) 
				  {
				  	var moveObject = source + "-" + target;
					 if(that.game.turn() === 'b'){
					 	userMove.push(JSON.stringify(moveObject));
					 	$(that).find('#movePanel').append('<div class="col-md-7" >'+ source+"-"+target +
					 	'</div>');
					  }
					 else{
					 	automatedMove.push(JSON.stringify(moveObject));
					 	$(that).find('#movePanel').append('<div class="col-md-5" >'+source+"-"+target +
					 	'</div>');
					 }
				}
				  // illegal move
				  if (move === null) return 'snapback';
				
				  that.updateStatus();
				};
				
				// update the board position after the piece snap 
				// for castling, en passant, pawn promotion
				this.onSnapEnd = function() {
				  that.board.position(that.game.fen());
				};
				
				this.updateStatus = function() {
				  this.status = '';
				
				  var moveColor = 'White';
				  if (that.game.turn() === 'b') {
				    moveColor = 'Black';
				  }
				
				  // checkmate?
				  if (that.game.in_checkmate() === true) {
				    this.status = 'Game over, ' + moveColor + ' is in checkmate.';
				  }
				
				  // draw?
				  else if (that.game.in_draw() === true) {
				    this.status = 'Game over, drawn position';
				  }
				
				  // game still on
				  else {
				    this.status = moveColor + ' to move';
				
				    // check?
				    if (that.game.in_check() === true) {
				      this.status += ', ' + moveColor + ' is in check';
				    }
				  }
				
				  
				};
					/*After this , handling of Buttons is done*/
					
	
					
					$('#resetAnswer').on('click',function(){
						var cfg ={
						  draggable: true,
						  dropOffBoard: 'trash',
						  position :that.position,
						  onDragStart: that.onDragStart,
  						  onDrop : that.onDrop,
						  onSnapEnd: that.onSnapEnd
						};
			          	that.board = new ChessBoard('board',cfg);
			          	$('#movePanel').find('.col-md-7').remove();
			          	$('#movePanel').find('.col-md-5').remove();
			          	that.fen = that.board.fen()+" w"+" -"+" -"+" 0"+" 10";
			          	that.game= new Chess(that.fen);
			          	that.updateStatus();
			          	userMove = [];
			          	automatedMove = [];
						
					});
					
					$('#moveReset').on('click',function(){
						var selector = $("#movePanel").children('div:last-child ');
						var firstChild = $("#movePanel").children('div:first');
						if(selector[0]!=firstChild[0])
						{
							if(that.game.turn()=='b'){
								userMove.pop();
							}
							else{
								automatedMove.pop();
							}
							var oldMovePosition = selector.text().split("-");
							var newMovePosition  = oldMovePosition[1]+"-"+oldMovePosition[0];
							that.board.move(newMovePosition);
							that.game.undo();
							selector.remove();
						}
					});
 
 					$('#viewAnswer').on('click',function(){
 						if($( "#dialogBox" ).dialog( "instance" )===undefined)
 						{
 							$( "#dialogBox" ).dialog({
 							title:"Previous answers",      
	      					modal: true,
							useCss: true,
							 position: { my: "left top", at: "left top", of: '#sidePanel' },
					        open: function(){
					       	that.addSlides();
	     				 },
	     				 close:function(){
	     				 	$('#dialog').dialog("destroy");
	     				 },
	     				 height:550
	     	    	});
	      $("#sliderDiv").bxSlider({
      		onSliderLoad : function(){	      			
      			
      		}
      	});
	      }
	      else{
	      	$('#dialogBox').dialog("open");
	      }
	  });
	  
	  
	  that.addSlides = function (){
	  	
	  	
		var stack = {
					"answer1":{						
					    "AdminMove":[{"a1":"a2"},{"a2":"a3"},{"a1":"a2"},{"a2":"a3"},{"a1":"a2"},{"a2":"a3"}],
					    "AutomatedMove":[{"b1":"b2"},{"b2":"b3"},{"b1":"b2"},{"b2":"b3"},{"b1":"b2"},{"b2":"b3"}]					    
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
				    	  	
	

		$.each(stack,function(key, answer){

		  		var slideDiv = $("<div>").addClass("slide");
		  		var tableDiv = $("<div class=\"row\"><div class=\"col-sm-6\">Admin Move</div><div class=\"col-sm-6\">Automated Move</div></div>");
		  		$("#sliderDiv").append(slideDiv);
		  		$(slideDiv).append(tableDiv);

	  			var adminMovesArray = answer.AdminMove;
	  			var autoMovesArray = answer.AutomatedMove;
	  			
	  			for(var index = 0;index<adminMovesArray.length;index++){
	  				var objAdminMove = adminMovesArray[index];
	  				var objAutoMove = autoMovesArray[index];
	  				for(var key in objAdminMove){
	  					var rowEntry = "<div class=\"row\"><div class=\"col-sm-6\">"+key+"->"+objAdminMove[key]+"</div>";	  				
	  					for(var key in objAutoMove){
	  						rowEntry = rowEntry+"<div class=\"col-sm-6\">"+key+"->"+objAutoMove[key]+"</div></div>";	  						
	  					}
	  				}
	  				
	  				$(slideDiv).append(rowEntry);
	  			}
	  			
	  	});

	 
 					
};
 	$('#submitAnswer').on('click',function(){
 		automatedMove[automatedMove.length] = "";
	  		 $.ajax({url:"config/insertAnswer.php",data:{level:level,chapter:chapter,subChapter:subChapter,problem:problem,UserMove:userMove,AdminMove:automatedMove,AnswerId:answerId}})
	  		 .done(function(data){
	  		 	answerId = answerId + 1;
	  		 	$('#dialogBox').dialog({
	  		 		title:"More Answers?",      
	      					modal: true,
							useCss: true,
						buttons: { "Ok": {  text: 'Yes', 
                               class: 'btn primary', 
                               click: function () {
									window.location = "next.php?answerId="+answerId+"&&problemName="+problem+"&&levelName="+level+"&&chapterName="+chapter+'&&subChapter='+subChapter;
                                }
                                },
                                "Cancel": {  
                                	text: 'No', 
                               class: 'btn primary', 
                               click: function () {
										window.location = "levelSelection.php";
                                 }
							}
                   
                  }
	  		 });
	  		 
	  		 $('#dialog').dialog("open");
	  	});
});
});	