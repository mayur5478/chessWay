<?php 
$dbc = include 'setup.php';
$id = filter_input(INPUT_GET,'levelId');
$query = "select distinct(ChapterName) from training_hierarchy where LevelName = '$id'";
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