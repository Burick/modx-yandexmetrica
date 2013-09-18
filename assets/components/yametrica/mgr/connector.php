<?php
//require_once dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php';
// TODO: решить как тут быть
require_once '/home/ik/dev2/modx/modx228/config.core.php';
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
require_once MODX_CONNECTORS_PATH . 'index.php';

$corePath = $modx->getOption(
    'yametrica.core_path',
    null,
    $modx->getOption('core_path') . 'components/yametrica/'
);

require_once $corePath . 'model/yametrica/yametrica.class.php';

$modx->yametrica = new YandexMetrica($modx);
$modx->lexicon->load('yametrica:default');

$modx->request->handleRequest(
	[
    	'processors_path' => $modx->getOption(
			'processorsPath',
			$modx->yametrica->config,
			$corePath . 'processors/'
		),
    	'location' => '',
	]
);