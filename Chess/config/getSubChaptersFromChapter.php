<?php 
$dbc = include 'setup.php';
$chapterId = filter_input(INPUT_GET,'chapterId');
$levelId = filter_input(INPUT_GET,'levelId');
$query = "select SubChapterName from training_hierarchy where ChapterName = '$chapterId'&& LevelName='$levelId' ";
$r = mysqli_query($dbc,$query);
if($r)
{
	while($row = mysqli_fetch_array($r)){
		echo $row[0];
		echo " ";
	}
	
}
else{
	echo "";
}

?>