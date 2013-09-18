<?php

class TrafficYMWidget extends modDashboardWidgetInterface {

    public function render() {
        $corePath = $this->modx->getOption(
            'yametrica.core_path',
            null,
            $this->modx->getOption('core_path') . 'components/yametrica/'
        );

        require_once $corePath . 'model/yametrica/yametrica.class.php';

        $yametrica = new YandexMetrica($this->modx);

        $this->modx->regClientStartupHTMLBlock(
            '<script type="text/javascript">
                var YM = {
                    connector_url:"' . $yametrica->config['connectorUrl'] . '",
                    assets_url:"' . $yametrica->config['assetsUrl'] . '"
                };
            </script>'
        );

        //$modx->regClientCSS($yametrica->config['assetsUrl'] . 'css/analytics.panel.widget.css');
        $this->modx->regClientStartupScript($yametrica->config['assetsUrl'] . 'mgr/js/yametrica.traffic.widget.js');

        return $this->modx->smarty->fetch($yametrica->config['elementsPath'].'tpl/traffic.widget.tpl');

    }
}
return 'TrafficYMWidget';