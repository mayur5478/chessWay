<?php 
$dbc = include 'setup.php';
$oldid = filter_input(INPUT_GET,'levelOldID');
$newid = filter_input(INPUT_GET,'levelNewID');
$query = "update training_hierarchy set LevelName = '$newid' where LevelName = '$oldid'";
$r = mysqli_query($dbc,$query);
if (mysqli_affected_rows($dbc) == 1)//if update query was successfull
{
	echo "Level Name updated";
}	

?>