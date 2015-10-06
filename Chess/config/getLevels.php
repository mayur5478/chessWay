<?php 
$dbc = include 'setup.php';

$query = "select distinct(LevelName) from training_hierarchy ";
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