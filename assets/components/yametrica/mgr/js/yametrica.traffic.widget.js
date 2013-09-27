var YMTrafficWidget = function(config) {
    config = config || {};
    YMTrafficWidget.superclass.constructor.call(this, config);
};
Ext.extend(YMTrafficWidget, Ext.Component, {
    page:{}
    ,window:{}
    ,grid:{}
    ,tree:{}
    ,panel:{}
    ,combo:{}
    ,config:{}
    ,view:{}
    ,connector_url: ''
});
Ext.reg('YMTrafficWidget', YMTrafficWidget);
var YMTrafficWidget = new YMTrafficWidget();

Ext.onReady(function() {
    MODx.load({
        xtype: 'yametrica-traffic-widget',
        renderTo: 'yametrica-traffic-widget'
    });
});

YMTrafficWidget.panel = function(config) {
    config = config || {};

    Ext.applyIf(
        config,
        {
            border: false,
            baseCls: 'modx-formpanel',
            id: 'yametrica-traffic-widget-panel',
            items: [
                {
                    border: false,
                    html: 'Отчет показывает общую картину посещаемости сайта с течением времени. Показатели за выбранные промежутки времени (дни, недели или месяцы) отображаются в виде гистограммы. Переключатель между показателями расположен под графиком.',
                    bodyCssClass: 'panel-desc'
                },
                {
                    xtype: 'modx-tabs',
                    cls: 'main-wrapper',
                    defaults: {
                        autoHeight: true,
                        autoWidth: true,
                        hideMode: 'offsets',
                        border: false
                    },
                    stateful: true,
                    stateEvents: ['tabchange'],
                    getState: function() {
                        return {
                            activeTab: this.items.indexOf(this.getActiveTab())
                        }
                    },
                    items: [
                        {
                            title: 'Посещаемость',
                            id: 'yametrica-traffic-attendance',
                            layout: 'form',
                            border: true,
                            items: [
                                {
                                    cls: 'main-wrapper',
                                    xtype: 'yametrica-traffic-widget-attendance-grid'
                                }
                            ]
                        },
                        {
                            title: 'Вовлечение',
                            id: 'yametrica-traffic-involvement',
                            layout: 'form',
                            items: [
                                {
                                    bodyCssClass: 'main-wrapper',
                                    html: '234'
                                }
                            ]
                        },
                        {
                            title: 'По времени суток',
                            id: 'yametrica-traffic-timeofday',
                            layout: 'form',
                            items: [
                                {
                                    bodyCssClass: 'main-wrapper',
                                    html: '345'
                                }
                            ]
                        },
                        {
                            title: 'Нагрузка на сайт',
                            id: 'yametrica-traffic-loadonthesite',
                            layout: 'form',
                            items: [
                                {
                                    bodyCssClass: 'main-wrapper',
                                    html: '456'
                                }
                            ]
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
    YMTrafficWidget.panel.superclass.constructor.call(this, config);
};
Ext.extend(YMTrafficWidget.panel, MODx.Panel);
Ext.reg('yametrica-traffic-widget', YMTrafficWidget.panel);

YMTrafficWidget.grid.Attendance = function(config) {
    config = config || {};
    this._loadStore();

    //wday: 4
    this.cm = new Ext.grid.ColumnModel({
        columns: [
            {
                header: ('date')
                ,dataIndex: 'date'
                ,width: 45
            },
            {
                header: ('denial')
                ,dataIndex: 'denial'
                ,width: 35
                ,sortable: false
                ,sortDir: 'ASC'
            },
            {
                header: ('depth')
                ,dataIndex: 'depth'
                ,width: 35
                ,sortable: false
                ,editable: false
            },
            {
                header: ('new_visitors')
                ,dataIndex: 'new_visitors'
                ,width: 35
                ,sortable: false
                ,editable: false
            },
            {
                header: ('new_visitors_perc')
                ,dataIndex: 'new_visitors_perc'
                ,width: 35
                ,sortable: false
                ,editable: false
            },
            {
                header: ('page_views')
                ,dataIndex: 'page_views'
                ,width: 35
                ,sortable: false
                ,editable: false
            },
            {
                header: ('visit_time')
                ,dataIndex: 'visit_time'
                ,width: 35
                ,sortable: false
                ,editable: false
            },
            {
                header: ('visitors')
                ,dataIndex: 'visitors'
                ,width: 35
                ,sortable: false
                ,editable: false
            },
            {
                header: ('visits')
                ,dataIndex: 'visits'
                ,width: 35
                ,sortable: false
                ,editable: false
            }
        ]
    });

    Ext.applyIf(config,{
        store: this.store,
        cm: this.cm
        ,loadMask: true
        ,autoHeight: true
        ,autoWidth: true
        ,collapsible: true
        ,stripeRows: true
        ,header: false
        ,cls: 'modx-grid'
        ,preventRender: true
        ,preventSaveRefresh: true
        ,showPerPage: true
        ,stateful: false

        ,id: 'yametrica-traffic-widget-attendance-grid'

        ,paging: true
        ,remoteSort: false
        //,storeId: 'yamtwag'
    });
    YMTrafficWidget.grid.Attendance.superclass.constructor.call(this, config);
    if (config.paging) {
        this.getBottomToolbar().bind(this.store);
    }
    this.getStore().load({
        params: {
            start: config.pageStart || 0
            ,limit: config.hasOwnProperty('pageSize')
                ? config.pageSize
                : (parseInt(MODx.config.default_per_page) || 5)
        }
    });
    this.getStore().on('exception',this.onStoreException,this);
    this.config = config;
}
Ext.extend(YMTrafficWidget.grid.Attendance, MODx.grid.Grid, {
    windows: {},

    _loadStore: function() {
        this.store = new Ext.data.JsonStore({
            url: YM.connector_url
            ,baseParams: {
                action: 'traffic'
            }
            //,fields: this.config.fields - из конфига брать бы все
            ,fields: ['date','denial','depth','id','new_visitors','new_visitors_perc','page_views','visit_time','visitors','visits','wday']
            ,root: 'data'
            ,totalProperty: 'rows'
            //,remoteSort: this.config.remoteSort || false
            //,storeId: this.config.storeId || Ext.id()
            ,storeId: 'yamtwag'
            ,autoDestroy: true
            ,listeners:{
                load: function(){
                    //Ext.getCmp('modx-content').doLayout(); /* Fix layout bug with absolute positioning */
                }
            }
        });
    }

});
Ext.reg('yametrica-traffic-widget-attendance-grid', YMTrafficWidget.grid.Attendance);
