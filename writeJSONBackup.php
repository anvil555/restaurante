<?php

if (isset($_POST['jsonObj'])) {
    $json = $_POST['jsonObj'];

    $fecha = time();

    $campos = getdate($fecha);

    $title = "Backup/Backup-$campos[mday]-$campos[mon]-$campos[year]-$campos[hours]_$campos[minutes]_$campos[seconds].json";

    $fd = fopen("$title", "w+") or die("Error al crear el archivo");

    fputs($fd, $json);

    fclose($fd);
    echo $title;
}

?>