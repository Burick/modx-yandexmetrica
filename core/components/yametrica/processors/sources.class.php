<?php

class modYMSourcesWidgetProcessor extends modProcessor
{
    public function process()
    {
        $params = [
            'id' => $this->modx->getOption('yametrica.counter_id'),
            'oauth_token' => $this->modx->getOption('yametrica.oauth_token'),
            'pretty' => 1
        ];

        $url = "http://api-metrika.yandex.ru/stat/sources/summary.json?" . http_build_query($params);

        $data = $this->modx->fromJSON(file_get_contents($url));

        return $this->success('2', $data);
    }
}

return 'modYMSourcesWidgetProcessor';
