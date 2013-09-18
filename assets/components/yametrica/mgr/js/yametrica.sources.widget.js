MODx.panel.YMSourcesWidget = function(config) {
    config = config || {};

    var sources = new Ext.data.JsonStore(
        {
            url: YM.connector_url,
            baseParams: {
                action: 'sources'
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
                    html: '<h3>Источники</h3>'
                    ,border: false
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
    MODx.panel.YMSourcesWidget.superclass.constructor.call(this, config);
};
Ext.extend(MODx.panel.YMSourcesWidget, MODx.Panel);
Ext.reg('yametrica-sources-widget', MODx.panel.YMSourcesWidget);

Ext.onReady(function() {
    MODx.load({
        xtype: 'yametrica-sources-widget',
        renderTo: 'yametrica-sources-widget'
    });
});
