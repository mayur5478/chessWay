<?php 
$dbc = include 'setup.php';
$oldname = filter_input(INPUT_GET,'oldProblemName');
$newname = filter_input(INPUT_GET,'newProblemName');
$chapterName = filter_input(INPUT_GET,'currentChapter');
$levelName = filter_input(INPUT_GET,'currentLevel');
$subChapterName = filter_input(INPUT_GET,'currentSubChapter');
$query = "update problems set problem_name = '$newname' where problem_name='$oldname' and SubChapter = '$subChapterName' and Level ='$levelName' and Chapter='$chapterName'";
$r = mysqli_query($dbc,$query);
    if (mysqli_affected_rows($dbc) == 1)//if update query was successfull
    {
		echo "Problem Name updated";
	}	

?>