<?php
/**
 * @param $psDdmmyyyy
 * @param string $iSearch
 * @return null|string
 */
function _ddmmyyyyToYYyymmdd($psDdmmyyyy)
{
    $return = str_replace('/','-',$psDdmmyyyy);
    $return = Date('Y-m-d', strtotime($return));
    return $return;
}

function _YYyymmddToddmmyyyy($psDdmmyyyy)
{
    $return = Date('d/m/Y', strtotime($psDdmmyyyy));
    return $return;
}