<?php
$corepath = $modx->getOption(
	'analytics.core_path',
	null,
	$modx->getOption('core_path') . 'components/yametrica/'
);

require_once dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php';
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
require_once MODX_CONNECTORS_PATH.'index.php';
require_once $corepath . 'model/yametrica/yametrica.class.php';

$modx->yametrica = new YandexMetrica($modx);
$modx->lexicon->load('yametrica:default');

$modx->request->handleRequest(
	[
    	'processors_path' => $modx->getOption(
			'processorsPath',
			$modx->yametrica->config,
			$corepath . 'processors/'
		),
    	'location' => '',
	]
);