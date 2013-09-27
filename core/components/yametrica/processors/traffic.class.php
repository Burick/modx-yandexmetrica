<?php

class YMTrafficWidgetProcessor extends modProcessor
{
    public function process()
    {
        $params = [
            'id' => $this->modx->getOption('yametrica.counter_id'),
            'oauth_token' => $this->modx->getOption('yametrica.oauth_token'),
            'pretty' => 1
        ];

        $url = "http://api-metrika.yandex.ru/stat/traffic/summary.json?" . http_build_query($params);

        $data = $this->modx->fromJSON(file_get_contents($url));

        return $this->outputArray($data);
    }

    public function outputArray(array $array, $count = false) {
        return $this->modx->toJSON($array);
    }
}

return 'YMTrafficWidgetProcessor';
