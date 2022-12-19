<?php
$vote = $_REQUEST['vote'];

//get content of textfile
$filename = "poll_result.txt";
$content = file($filename);

//put content in array
$array = explode("||", $content[0]);
$yes = $array[0];
$no = $array[1];

if ($vote == 0) {
  $yes = $yes + 1;
}
if ($vote == 1) {
  $no = $no + 1;
}

//insert votes to txt file
$insertvote = $yes."||".$no;
$fp = fopen($filename,"w");
fputs($fp,$insertvote);
fclose($fp);
?>
<div id="poll2">
<p>Czy technologia nas uratuje?</p>

  <p>Tak:<?php echo(100*round($yes/($no+$yes),2)); ?>%</p>
<p>Nie:<?php echo(100*round($no/($no+$yes),2)); ?>%</p>



</div>
