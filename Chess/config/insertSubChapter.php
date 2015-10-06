<?php
    $dbc = include 'setup.php';
	$name = filter_input(INPUT_GET, 'name');
	$chapterName = filter_input(INPUT_GET,'chaptername');
	$levelName = filter_input(INPUT_GET,'levelName');
	$query = "insert into training_hierarchy values('$levelName','$chapterName', '$name')";
	echo $query;
	$r= mysqli_query($dbc,$query);
	
	$dbc.exit;
?>