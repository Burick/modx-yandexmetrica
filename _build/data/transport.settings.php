<?php

$settings['counter_id']= $modx->newObject('modSystemSetting');
$settings['counter_id']->fromArray(
    [
        'key' => 'counter_id',
        'value' => '',
        'xtype' => 'textarea',
        'namespace' => 'yametrica',
    ],
    '',
    true,
    true
);

$settings['oauth_token']= $modx->newObject('modSystemSetting');
$settings['oauth_token']->fromArray(
    [
        'key' => 'oauth_token',
        'value' => '',
        'xtype' => 'textarea',
        'namespace' => 'yametrica',
    ],
    '',
    true,
    true
);