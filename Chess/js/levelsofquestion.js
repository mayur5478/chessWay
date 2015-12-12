$(function(){
	var that = this,
		levelSelected ,
		chapterSelected,
		subChapterSelected;
			
			
	/*This function loads levels */		
	this.loadLevels = function(){
		$.ajax({url:'config/getLevels.php'}).done(function(option){
		
		$("#problemsDivInner").empty();
		var selector = $("#levelsDivInner");
  		selector.empty();
  		if(option!=""){
  			var levellist = option.split("#");
  			levellist.pop();
  			for(var index in levellist){
  				if(levellist[index]!=null && levellist[index].length>0){
	  				
			 		var htmltext = "<div class='level' id='"+levellist[index]+"'><a href='#' id='"+levellist[index]+"'>"+levellist[index]+"</a>&nbsp&nbsp&nbsp&nbsp<i class='fa fa-pencil fa-fw'></i>&nbsp<i class='fa fa-trash-o fa-fw'></i></div>";				
					selector.append(htmltext);
					$("a[id='"+levellist[index]+"']").bind('click',that.onLevelClick);
		 		}
  			}
  		}
		
	});	
	};
	this.loadLevels();
    $("#AddLevels").click(function(){
    	
		$("#inputdiv").dialog({
		  resizable: false,
		  height:140,
		  modal: true,
		  title:"LevelName",
		  buttons: {
		    "Ok": function() {
		    	var newname = $(this).find("#inputtext").val();
		    	$( this ).dialog( "close" );
				var htmltext = "<div class='level' id='"+newname+"'><a href='#' id='"+newname+"'>"+newname+"</a>&nbsp&nbsp&nbsp&nbsp<i class='fa fa-pencil fa-fw'></i>&nbsp<i class='fa fa-trash-o fa-fw'></i></div>";				
				$("#levelsDivInner").append(htmltext);
				$("a[id='"+newname+"']").bind('click',that.onLevelClick);
				$('#inputtext').val("");
				
			    $.ajax({url:"config/insertLevel.php",data:{levelName:newname}}).done(function(value){			          		
		          	
				});			
			},
		    Cancel: function() {
		      $( this ).dialog( "close" );
		    }
		  }
		});
		//open add level php 
		 
	});

    $(document).on('click', '.level>.fa-pencil', function () {
    	var name = $(this).parent().find("a").text();
            $("#inputtext").val(name).focus();
            var that = this;
		$("#inputdiv").dialog({
		  resizable: false,
		  height:140,
		  modal: true,
		  title:"LevelName",
		  buttons: {
		    "Ok": function() {
		    	var newName = $('#inputtext').val();
		    	$('#inputtext').val("");
				$.ajax({url:"config/UpdateLevelName.php",data:{levelOldID:name,levelNewID:newName}}).done(function(){			          		
                            	$(that).parent().find("a").text(newName);
                            	$(that).parent().find("a").attr("id",newName);
	                            levelSelected = newName ;
	                            updateSubChapter();
                                updateChapterDiv();
                                updateProblem();
 		
                  });   
				$( this ).dialog( "close" );
			},
		    Cancel: function() {
		      $( this ).dialog( "close" );
		    }
		  }
		});

		
    });
	$(document).on('click',".level>.fa-trash-o", function(){
		var id = $(this).parent().find("a").text();
		$("[id='"+id+"']").remove();
	     //delete level with chapter and subchapter for id 
		$.ajax({url:"config/DeleteLevelByName.php",data:{name:id}}).done(function(){			          		
	       	
	       	that.loadLevels();
		});
		if($("#chaptersDivLevel").text().indexOf(id)>-1)
	       	{
	       		$("#chaptersDivInner").empty();
	       		$("#chaptersDivLevel").empty();
				$("#subChaptersDivChapterLevel").empty();
				$("#subChaptersDivInner").empty();
				$("#problemsDivChapterLevelSubChapter").empty();
				$("#problemsDivInner").empty();
				$('#addproblem').remove();
				$('#addchapter').remove();
				$('#addsubchapter').remove();
		  	}	
	});
	that.onLevelClick  = function(){
						var id = this.id,
							parentId = $("[id='"+id+"']").parent().parent().attr('id');
						levelSelected = id ;
						if(parentId.indexOf('level')>-1){
							addChapter(id);					
						}
		};
	var addChapter = function(id){
		  var levelID = id;
		  $.ajax({url:'config/getChaptersFromLevel.php',data:{levelId:levelID}}).done(function(option){
		  		$("#subChaptersDivChapterLevel").empty();
				$("#subChaptersDivInner").empty();
				$("#problemsDivChapterLevelSubChapter").empty();
				$("#problemsDivInner").empty();
		  		var selector = $("#chaptersDivInner");
		  		selector.empty();
		  		if(option!=""){
		  			var chapterList = option.split("#");
		  			chapterList.pop();
		  			for(var index in chapterList){
		  				if(chapterList[index]!=null && chapterList[index].length>0){
			  				var htmltext = "<div class='chapter' id='"+chapterList[index]+"'><a href='#' id='"+chapterList[index]+"'>"+chapterList[index]+"</a>&nbsp&nbsp&nbsp&nbsp<i class='fa fa-pencil fa-fw'></i>&nbsp<i class='fa fa-trash-o fa-fw'></i></div>";
			  				//var htmltext = "<br><a class='chapter'  href='#' id="+chapterList[index]+">"+chapterList[index]+"</a>";
					 		selector.append(htmltext);
					 		$("a[id='"+chapterList[index]+"']").bind('click',that.onChapterClick);
				 		}
		  			}
		  		}
		  		updateChapterDiv();
		  		var selector = $('#addchapter') ;
		  		if(selector.length == 0)
		  		{
		  			var htmltext = "<br><button id='addchapter'>Add Chapters</button>";
					$("#chaptersDiv").append(htmltext);
					$('#addchapter').bind('click',that.onChapterButtonClick);			
				}
				});
		};
		
		var updateChapterDiv = function(){
			var htmltext = "<br>"+levelSelected+'->';
			$("#chaptersDivLevel").empty().append(htmltext);
				
		};
		
				$(document).on('click', '.chapter>.fa-pencil', function () {

		var name = $(this).parent().find("a").text();
           $("#inputtext").val(name).focus();
            var that = this;
		$("#inputdiv").dialog({
		  resizable: false,
		  height:140,
		  modal: true,
		  title:"LevelName",
		  buttons: {
		    "Ok": function() {
		    	var newName = $('#inputtext').val();
		    	$('#inputtext').val("");
				$.ajax({url:"config/UpdateChapterName.php",data:{oldChapName:name,newChapName:newName,currentLevel:levelSelected}}).done(function(){			          		
                          	$(that).parent().find("a").text(newName);
                            $(that).parent().find("a").attr("id",newName);
                            chapterSelected = newName ;
                            updateSubChapter();
                            updateProblem();
			
                  });   
				$( this ).dialog( "close" );
			},
		    Cancel: function() {
		      $( this ).dialog( "close" );
		    }
		  }
		});

			    });
				$(document).on('click',".chapter>.fa-trash-o", function(){
					var id = $(this).parent().find("a").text();
					$("[id='"+id+"']").remove();
					if($("#subChaptersDivChapterLevel").text().indexOf(id)>-1)
				      	{
							$("#subChaptersDivChapterLevel").empty();
							$("#subChaptersDivInner").empty();
							$("#problemsDivChapterLevelSubChapter").empty();
							$("#problemsDivInner").empty();
								$('#addproblem').remove();
								$('#addsubchapter').remove();
		  	
					  	}
					//delete level with chapter and subchapter for id 
					$.ajax({url:"config/DeleteChapterByName.php",data:{name:id}}).done(function(){			          		
				      	
				       	that.loadLevels();
					});
				});
	
	
	that.onChapterButtonClick = function(){
		//open add chapter php 
		// display the added chap to select menu
		$("#inputdiv").dialog({
		  resizable: false,
		  height:140,
		  modal: true,
		  title:"ChapterName",
		  buttons: {
		    "Ok": function() {
			    	var newname = $(this).find("#inputtext").val();
			    	$( this ).dialog( "close" );
	  				var htmltext = "<div class='chapter' id='"+newname+"'><a href='#' id='"+newname+"'>"+newname+"</a>&nbsp&nbsp&nbsp&nbsp<i class='fa fa-pencil fa-fw'></i>&nbsp<i class='fa fa-trash-o fa-fw'></i></div>";
	  				//var htmltext = "<br><a class='chapter' href='#' id="+newname+">"+newname+"</a>";
			 		$("#chaptersDivInner").append(htmltext);	
			 		$("a[id='"+newname+"']").bind('click',that.onChapterClick);
			 		$('#inputtext').val("");
			 		$.ajax({url:"config/insertChapter.php",data:{name:newname,levelName:levelSelected}}).done(function(){			          		
				    });
			 },
		    Cancel: function() {
		      $( this ).dialog( "close" );
		    }
		  }
		}); 
	};
	
		that.onChapterClick  = function(){
						var id = this.id,
							parentId = $("[id='"+id+"']").parent().parent().attr('id');
						chapterSelected = id;
						if(parentId.indexOf('chapter')>-1){
							addSubChapter(id);					
						}
		};
	var updateSubChapter = function(){
		 		var htmltext = "<br>"+levelSelected+'->'+chapterSelected+'->';
				$("#subChaptersDivChapterLevel").empty().append(htmltext);
	};
		
	var addSubChapter = function(id){
		
		  var chapterID = id;
		  $.ajax({url:'config/getSubChaptersFromChapter.php',data:{chapterId:chapterID,levelId:levelSelected}}).done(function(option){
		  					$("#problemsDivChapterLevelSubChapter").empty();
				$("#problemsDivInner").empty();
		  		var selector = $("#subChaptersDivInner");
		  		
		  		if(option!=""){
		  			selector.empty();
		  			var subChapterList = option.split("#");
		  				
		  			subChapterList.pop();
		  			for(var index in subChapterList){
		  				if(subChapterList[index]!=null && subChapterList[index].length>0){
		  					var htmltext = "<div class='subchapter' id='"+subChapterList[index]+"'><a href='#' id='"+subChapterList[index]+"'>"+subChapterList[index]+"</a>&nbsp&nbsp&nbsp&nbsp<i class='fa fa-pencil fa-fw'></i>&nbsp<i class='fa fa-trash-o fa-fw'></i></div>";
		  					//var htmltext = "<br><a  href='#' id="+subChapterList[index]+">"+subChapterList[index]+"</a>";
					 		selector.append(htmltext);	
		 		 			$("a[id='"+subChapterList[index]+"']").bind('click',that.onSubChapterClick);
		 		 		}
		  			}
		  		}
		  		updateSubChapter();
		 
		  		var selector = $('#addsubchapter');
		  		if(selector.length == 0)
		  		{
		  			var htmltext = "<br><button id='addsubchapter'>Add Sub Chapters</button>";
					$("#subChaptersDiv").append(htmltext);
					$('#addsubchapter').bind('click',that.onSubChapterButtonClick);			
			  	}
			  	$(document).on('click', '.subchapter>.fa-pencil', function () {

					var name = $(this).parent().find("a").text();
            $("#inputtext").val(name).focus();
            var that = this;
		$("#inputdiv").dialog({
		  resizable: false,
		  height:140,
		  modal: true,
		  title:"LevelName",
		  buttons: {
		    "Ok": function() {
		    	var newName = $('#inputtext').val();
		    	$('#inputtext').val("");
				$.ajax({url:"config/UpdateSubChapterName.php",data:{oldSubChapName:name,newSubChapName:newName,chapterName:chapterSelected,levelName:levelSelected}}).done(function(){			          		
                          	$(that).parent().find("a").text(newName);
                            	$(that).parent().find("a").attr("id",newName);
                            	subChapterSelected = newName;
                                updateProblem();			
                  });   
				$( this ).dialog( "close" );
			},
		    Cancel: function() {
		      $( this ).dialog( "close" );
		    }
		  }
		});

			    });
				$(document).on('click',".subchapter>.fa-trash-o", function(){
					var id = $(this).parent().find("a").text();
					$("[id='"+id+"']").remove();
						if($("#problemsDivChapterLevelSubChapter").text().indexOf(id)>-1)
							{
								$("#problemsDivChapterLevelSubChapter").empty();
								$("#problemsDivInner").empty();
									$('#addproblem').remove();
			
					  		}
					//delete level with chapter and subchapter for id 
					$.ajax({url:"config/DeleteSubChapterByName.php",data:{name:id}}).done(function(){			          		
							
										    });
				});
			});
	};
	
	that.onSubChapterButtonClick = function(){
		//open add chapter php 
		// display the added chap to select menu
		$("#inputdiv").dialog({
		  resizable: false,
		  height:140,
		  modal: true,
		  title:"SubChapterName",
		  buttons: {
		    "Ok": function() {
			    	var newname = $(this).find("#inputtext").val();
			    	$( this ).dialog( "close" );
			    	var htmltext = "<div class='subchapter' id='"+newname+"'><a href='#' id='"+newname+"'>"+newname+"</a>&nbsp&nbsp&nbsp&nbsp<i class='fa fa-pencil fa-fw'></i>&nbsp<i class='fa fa-trash-o fa-fw'></i></div>";
	  				//var htmltext = "<br><a class='chapter' href='#' id="+newname+">"+newname+"</a>";
			 		$("#subChaptersDivInner").append(htmltext);	
			 		$("a[id='"+newname+"']").bind('click',that.onSubChapterClick);
			 		$('#inputtext').val("");
					$.ajax({url:"config/insertSubChapter.php",data:{name:newname,chaptername:chapterSelected,levelName:levelSelected}}).done(function(){			          		
				       
					});
			 },
		    Cancel: function() {
		      $( this ).dialog( "close" );
		    }
		  }
		});
	};
	that.onSubChapterClick= function(){
					var id = this.id,
							parentId = $("[id='"+id+"']")	.parent().parent().attr('id');
						subChapterSelected = id;
							
						if(parentId.indexOf('subChapter')>-1){
							addProblem(id);					
						}
		};
	var addProblem = function(id){
		  $.ajax({url:'config/getProblems.php',data:{levelId:levelSelected,chapterId:chapterSelected,subChapterId:subChapterSelected}}).done(function(option){
		  		if(option!=""){
		  			var problemList = option.split("#"),
		  				selector = $("#problemsDivInner");
		  			selector.empty();
		  			problemList.pop();
		  			for(var index in problemList){
		  				var htmltext = "<br><a  href='#' id='"+problemList[index]+"'>Problem"+problemList[index]+"</a>";
				 			var htmltext = "<div class='problem' id='"+problemList[index]+"'><a href='#' id='"+problemList[index]+"'>"+problemList[index]+"</a></div>";
	  			/*&nbsp&nbsp&nbsp&nbsp<i class='fa fa-pencil fa-fw'></i>&nbsp<i class='fa fa-trash-o fa-fw'></i>*/
				 		selector.append(htmltext);	
				 		$("a[id='"+problemList[index]+"']")	.bind('click',that.onProblemDivClick);
		  			}
		  		}
		  		updateProblem();
		  		var selector = $('#addproblem');
		  		if(selector.length == 0)
		  		{
		  			var htmltext = "<br><button id='addproblem'>Add Problems</button>";
					$("#problemsDiv").append(htmltext);
					$('#addproblem').bind('click',that.onProblemClick);			
			  	}
			});
	};
			
	var updateProblem = function(){
		var htmltext = "<br>"+levelSelected+'->'+chapterSelected+'->'+subChapterSelected+'->';
		$("#problemsDivChapterLevelSubChapter").empty().append(htmltext);
		  		
	};
	that.onProblemClick = function(){
			
			
				$("#inputdiv").dialog({
		  resizable: false,
		  height:140,
		  modal: true,
		  title:"ProblemName",
		  buttons: {
		    "Ok": function() {
			    	var newname = $(this).find("#inputtext").val();
			    	$( this ).dialog( "close" );
	  				/*&nbsp&nbsp&nbsp&nbsp<i class='fa fa-pencil fa-fw'></i>&nbsp<i class='fa fa-trash-o fa-fw'></i>*/
	  				var htmltext = "<div class='problem' id='"+newname+"'><a href='#' id='"+newname+"'>"+newname+"</a></div>";
	  		 		$("#problemsDivInner").append(htmltext);	
			 		$("a[id='"+newname+"']").bind('click',that.onProblemDivClick);
			 		$('#inputtext').val("");
			 		$.ajax({url:"config/insertProblem.php",data:{subChapterName:subChapterSelected,chapterName:chapterSelected,levelName:levelSelected,problemName:newname}}).done(function(){			          		
				       
					});
			 },
		    Cancel: function() {
		      $( this ).dialog( "close" );
		    }   
		  }
		});	};
	that.onProblemDivClick= function(){
			var id = this.id;
			window.location.href ="index.php?problemId="+id+"&&levelId="+levelSelected
			+'&&chapterId='+chapterSelected+'&&subChapter='+subChapterSelected;			
		
	};
	$(document).on('click', '.problem>.fa-pencil', function () {

		var name = $(this).parent().find("a").text();
           $("#inputtext").val(name).focus();
            var that = this;
		$("#inputdiv").dialog({
		  resizable: false,
		  height:140,
		  modal: true,
		  title:"LevelName",
		  buttons: {
		    "Ok": function() {
		    	var newName = $('#inputtext').val();
		    	$('#inputtext').val("");
				$.ajax({url:"config/UpdateProblemName.php",data:{oldProblemName:name,newProblemName:newName,currentLevel:levelSelected,
					currentChapter:chapterSelected,currentSubChapter:subChapterSelected}}).done(function(){			          		
                          	$(that).parent().find("a").text(newName);
                            $(that).parent().find("a").attr("id",newName);
                            problemSelected = newName ;
                           
                  });   
				$( this ).dialog( "close" );
			},
		    Cancel: function() {
		      $( this ).dialog( "close" );
		    }
		  }
		});

			    });
				$(document).on('click',".problem>.fa-trash-o", function(){
					var id = $(this).parent().find("a").text();
					$("[id='"+id+"']").remove();
					//delete level with chapter and subchapter for id 
					$.ajax({url:"config/DeleteProblemByName.php",data:{name:id,chapterName:chapterSelected,subChapterName:subChapterSelected,levelName:levelSelected}}).done(function(){			          		
					});
				});
	
}); 

