var cfg ={
					  draggable: true,
					  dropOffBoard: 'trsh',
					  sparePieces: true
				};
				this.board = new ChessBoard('board',cfg);
				var subChapter = location.search.split('subChapter=')[1]||''.split('&')[0] ;
				var chapter = location.search.split('&&subChapter=')[0].split('chapterId=')[1];	
				var level = location.search.split('&&subChapter=')[0].split('&&chapterId=')[0].split('levelId=')[1];
				var problem = location.search.split('&&subChapter=')[0].split('&&chapterId=')[0].split('&&levelId=')[0].split('problemId=')[1];
				
				$('#saveAndNext').on('click', function() {
					  var boardPositionNew = board.position();
	 		          		
					  if( (!jQuery.isEmptyObject(boardPositionNew)) )
					  {
					  		$.ajax({url:"config/CaptureBoard.php",data:{BoardPosition:JSON.stringify(boardPositionNew),problemName:problem,Level:level,Chapter:chapter,SubChapter:subChapter}}).done(function(){
			          			window.location.href="next.php?problemName="+problem+'&&levelName='+level+'&&chapterName='+chapter +"&&subChapter="+subChapter;
			          		});
			          }
			          else{
			          		console.log("Error");
			          }
				});

			    var that = this;
				$('#show').on('click', function() {
				      $.ajax({url:"config/showBoard.php"}).done(function(data){
			          		var position = JSON.parse(data);
			          		that.board = new ChessBoard('board',position);
			         });
					});
					
				$('#reset').on('click', this.board.clear);
		