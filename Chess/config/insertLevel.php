<?php
    $dbc = include 'setup.php';
	$levelName = filter_input(INPUT_GET,'levelName');

	$query = "insert into training_hierarchy values('$levelName','','')";
	echo $query;
	$r= mysqli_query($dbc,$query);
	
	$dbc.exit;
?>