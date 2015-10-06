<?php 
$dbc = include 'setup.php';
$oldname = filter_input(INPUT_GET,'oldChapName');
$newname = filter_input(INPUT_GET,'newChapName');
$currentLevel=filter_input(INPUT_GET,'currentLevel');
$query = "update training_hierarchy set ChapterName = '$newname' where ChapterName = '$oldname' and LevelName='$currentLevel'";
$r = mysqli_query($dbc,$query);
    if (mysqli_affected_rows($dbc) == 1)//if update query was successfull
    {
		echo "chapter Name updated";
	}	

?>