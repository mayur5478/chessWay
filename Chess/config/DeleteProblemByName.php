<?php 
$dbc = include 'setup.php';
$name = filter_input(INPUT_GET,'name');
$chapterName = filter_input(INPUT_GET,'chapterName');
$subChapterName = filter_input(INPUT_GET,'subChapterName');
$levelName = filter_input(INPUT_GET,'levelName');
$query = "delete from problems where Level = '$levelName' and Chapter='$chapterName'
and SubChapter='$subChapterName' and problem_name='$name'";
$r = mysqli_query($dbc,$query);
    if ($r)//if update query was successfull
    {
		echo "Level deleted";
	}	

?>