<?php

    $filename = $_GET['url'].'?'.$_GET['params'];

    $handle = fopen( $filename , 'r' );

    $contents = fread( $handle, 20000);

    fclose($handle);

    echo $contents;