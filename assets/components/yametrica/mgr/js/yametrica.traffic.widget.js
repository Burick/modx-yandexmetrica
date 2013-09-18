MODx.panel.YMTrafficWidget = function(config) {
    config = config || {};

    var traffic = new Ext.data.JsonStore(
        {
            url: YM.connector_url,
            baseParams: {
                action: 'traffic'
            },
            root: 'results'

            //root: config.root || 'results'
            //,fields: config.fields
            //,totalProperty: 'total'
            //,listeners: {
            //'load': {fn:function(){ this.select(0); }, scope:this, single:true}
        }
    );
//    traffic.load();

    Ext.applyIf(
        config,
        {
            border: false,
            baseCls: 'modx-formpanel',
            cls: 'container form-with-labels',
            items: [
                {
                    border: false,
                    html: 'Отчет показывает общую картину посещаемости сайта с течением времени. Показатели за выбранные промежутки времени (дни, недели или месяцы) отображаются в виде гистограммы. Переключатель между показателями расположен под графиком.'
                },
                {
                    xtype: 'modx-tabs',
                    defaults: {
                        autoHeight: true,
                        hideMode: 'offsets',
                        border: true
                    },
                    items: [
                        {
                            title: 'Посещаемость'
                        },
                        {
                            title: 'Вовлечение'
                        },
                        {
                            title: 'По времени суток'
                        },
                        {
                            title: 'Нагрузка на сайт'
                        }
                    ]
                }

                //,
//                {
//                    xtype: 'columnchart',
//                    height: 150,
//                    store: traffic,
//                    url: MODx.config.manager_url + 'assets/ext3/resources/charts.swf'
//                },
//                {
//                    contentEl: 'yametrica-traffic-widget'
//                }
            ]
        }
    );
    MODx.panel.YMTrafficWidget.superclass.constructor.call(this, config);
};
Ext.extend(MODx.panel.YMTrafficWidget, MODx.Panel);
Ext.reg('yametrica-traffic-widget', MODx.panel.YMTrafficWidget);

Ext.onReady(function() {
    MODx.load({
        xtype: 'yametrica-traffic-widget',
        renderTo: 'yametrica-traffic-widget'
    });
});
