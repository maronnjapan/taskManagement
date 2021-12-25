<?php

$x = $_REQUEST['x'];
$width = $_REQUEST['width'];
$date_start = (int)(($x - 150) / 47) + 2;
$date_end = $date_start + (int)(($width - 150) / 47) + 3;
print($date_start.'日～'.$date_end.'日です');