<?php
/**
 * @package yametrica
 */
class YandexMetrica 
{
    function __construct(modX &$modx, array $config = [])
    {
        $this->modx =& $modx;
		
        $corePath = $this->modx->getOption(
            'yametrica.core_path',
            $config,
            $this->modx->getOption('core_path') . 'components/yametrica/'
        );
        $assetsUrl = $this->modx->getOption(
            'yametrica.assets_url2',
            $config,
            $this->modx->getOption('assets_url').'components/yametrica/'
        );
        $this->config = [
            'basePath' => $corePath,
            'corePath' => $corePath,
            'modelPath' => $corePath . 'model/',
            'processorsPath' => $corePath . 'processors/',
            'elementsPath' => $corePath . 'elements/',
            'chunksPath' => $corePath . 'elements/chunks/',
            'assetsUrl' => $assetsUrl,
            'jsUrl' => $assetsUrl . 'js/',
            'cssUrl' => $assetsUrl . 'css/',
            'assetsUrl' => $assetsUrl,
            'connectorUrl' => $assetsUrl . 'mgr/connector.php'
        ];
    }
}
