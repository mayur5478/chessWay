<?php
    $dbc = include 'setup.php';
	$problem = filter_input(INPUT_GET,'problem'); 
	$chapter = filter_input(INPUT_GET,'chapter');
	$level = filter_input(INPUT_GET,'level');
	$subChapter = filter_input(INPUT_GET,'subChapter');
	$answerId = filter_input(INPUT_GET,'AnswerId'); 
	$userMove = $_REQUEST['UserMove'];
	$adminMove = $_REQUEST['AdminMove'];
	$moveId = 1;

for ($i=0;$i<count($userMove);$i++ ) {
	$currentUserMove =  $userMove[$i];
	$currentAdminMove =  $adminMove[$i];
	$query = "insert into puzzle_answer values('$level','$chapter','$subChapter',0,'$problem','$moveId','$answerId','$currentUserMove','$currentAdminMove')";
	$r= mysqli_query($dbc,$query);
	$moveId = $moveId + 1;
}

	$dbc.exit;
?>