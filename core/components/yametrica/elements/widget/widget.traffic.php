<?php

class TrafficYMWidget extends modDashboardWidgetInterface {

    public function getData() {
        $params = [
            'id' => $this->modx->getOption('yametrica.counter_id'),
            'oauth_token' => $this->modx->getOption('yametrica.oauth_token'),
            'pretty' => 1
        ];

        $url = "http://api-metrika.yandex.ru/stat/traffic/summary.json?" . http_build_query($params);

        $data = file_get_contents($url);

        return $data;
    }

    public function render() {

        return $this->getData();
    }
}
return 'TrafficYMWidget';