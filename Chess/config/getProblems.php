<?php 
$dbc = include 'setup.php';
$levelId = filter_input(INPUT_GET,'levelId');
$chapterId = filter_input(INPUT_GET,'chapterId');
$subChapterId = filter_input(INPUT_GET,'subChapterId');
$query = "select distinct(problem_name) from problems where Level='$levelId' and SubChapter = '$subChapterId' and Chapter = '$chapterId'";
$r = mysqli_query($dbc,$query);
if($r)
{
	while($row = mysqli_fetch_array($r)){
		echo $row[0];
		echo "#";
	}
}
else{
	echo "";
}

?>