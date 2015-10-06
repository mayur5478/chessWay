<?php 
$dbc = include 'setup.php';
$BoardPosition1 = filter_input(INPUT_GET,'BoardPosition'); 
$question = filter_input(INPUT_GET,'Question'); 
$level = filter_input(INPUT_GET,'Level'); 
$chapter = filter_input(INPUT_GET, 'Chapter');
$subChapter = filter_input(INPUT_GET, 'SubChapter');
$problemname = filter_input(INPUT_GET, 'problemName');

$query = "insert into puzzle_question values('$level','$chapter','$subChapter',0,'$problemname','$BoardPosition1','$firstMove')";
$r = mysqli_query($dbc,$query);

$dbc.exit;
?>