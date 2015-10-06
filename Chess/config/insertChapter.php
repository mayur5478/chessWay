<?php
    $dbc = include 'setup.php';
	$chapterName = filter_input(INPUT_GET,'name');
	$levelName = filter_input(INPUT_GET,'levelName');
	$query = "insert into training_hierarchy values('$levelName','$chapterName', '')";
	echo $query;
	$r= mysqli_query($dbc,$query);
	
	$dbc.exit;
?>