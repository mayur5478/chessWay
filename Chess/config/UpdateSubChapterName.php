<?php 
$dbc = include 'setup.php';
$oldname = filter_input(INPUT_GET,'oldSubChapName');
$newname = filter_input(INPUT_GET,'newSubChapName');
$chapterName = filter_input(INPUT_GET,'chapterName');
$levelName = filter_input(INPUT_GET,'levelName');
$query = "update training_hierarchy set SubChapterName = '$newname' where SubChapterName = '$oldname' and LevelName ='$levelName' and ChapterName='$chapterName'";
$r = mysqli_query($dbc,$query);
    if (mysqli_affected_rows($dbc) == 1)//if update query was successfull
    {
		echo "chapter Name updated";
	}	

?>