<?php
    $dbc = include 'setup.php';
	$chapterName = filter_input(INPUT_GET,'chapterName');
	$levelName = filter_input(INPUT_GET,'levelName');
	$subChapterName = filter_input(INPUT_GET,'subChapterName');
	$problemName = filter_input(INPUT_GET,'problemName');
	$query = "insert into problems values('$levelName','$chapterName', '$subChapterName',0,'$problemName')";
	echo $query;
	$r= mysqli_query($dbc,$query);
	$dbc.exit;
?>