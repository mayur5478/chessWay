<?php 
$dbc = include 'setup.php';
$problem = filter_input(INPUT_GET,'problem');
$chapter = filter_input(INPUT_GET,'chapter');
$level = filter_input(INPUT_GET,'level');
$subChapter = filter_input(INPUT_GET,'subChapter');

$query = "select Position from puzzle_question where 
problem_name = '$problem' and Level='$level' and SubChapter='$subChapter'and Chapter='$chapter'";
$r = mysqli_query($dbc,$query);
while($row = mysqli_fetch_array($r)){
	echo $row[0];
}

if(!$r){
	echo "";
}
?>