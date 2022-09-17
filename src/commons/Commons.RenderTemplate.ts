/// <reference path="../../lib/generic-dashboard.d.ts" />

namespace Commons {
    export namespace RenderTemplate {
        export function preparePluginHtmlTemplate(pluginConfig: any): any {

            const allChartsMap = new Map();
            const dateFilterEnablerMap = new Map();
            const dateRangeData : any[] = [];
            let currentTimeRangeSelected : string;
            let pluginTableId : string;

            let genericDomStyle = "";

            let waitElementDom = `
                <div  style="margin:10px;">
                    <div class="row" id="waiting" class="spinningWait"></div>
                </div>
            `;

            let genericChartRowDom = "";

            let genericTableRowDom = "";

            if(pluginConfig.layoutConfig){
                let layoutConfig = pluginConfig.layoutConfig;
                genericDomStyle = layoutConfig.layoutDomStyle;
                if(layoutConfig.rowConfig && layoutConfig.rowConfig.length > 0){
                    let chartRowDom = "";
                    let tableRowDom = "";
                    layoutConfig.rowConfig.forEach(
                        (rowConfig) => {
                            
                            let chartColumnsDom = "";
                            let tableColumnsDom = "";

                            if(rowConfig.columnConfig && rowConfig.columnConfig.length > 0){
                                rowConfig.columnConfig.forEach(
                                    (columnConfig)=>{

                                        let contentConfig = columnConfig.contentConfig;
                                        let dateFilterIconDom = "";
                                        let dateFilterDom = "";

                                        if(contentConfig.dateFilterRequired == 'Y'){

                                            dateFilterEnablerMap.set(contentConfig.id,{functionality:contentConfig.functionality,dateFilterEnabled: false});

                                            dateFilterIconDom = `
                                                <i id="${contentConfig.id}-date-filter-icon" 
                                                class="far fa-calendar-alt" aria-hidden="true" style="padding-left:12px;cursor:pointer" 
                                                data-original-title="Date Filter"> </i>
                                            `;

                                            let dateFilterClass = "";

                                            if((columnConfig.contentType == "chart") || (columnConfig.contentType == "date-range-chart")){
                                                if(columnConfig.size == 12){
                                                    dateFilterClass = "dateFilterSize12";
                                                }else if(columnConfig.size == 6){
                                                    dateFilterClass = "dateFilter";
                                                }
                                            }else if(columnConfig.contentType == "table"){
                                                dateFilterClass = "tableDateFilter";
                                            }
                                            
                                            dateFilterDom = ` 
                                                <div id="${contentConfig.id}-date-filter" class="baseControl ${dateFilterClass}">
                                                    <p>
                                                        <span class="">From</span>
                                                        <input id="${contentConfig.id}-fromdate" type='text' class='date-filter-form-control filterDates'>
                                                        <span class="">To</span>
                                                        <input id="${contentConfig.id}-todate" type='text' class='date-filter-form-control filterDates'>
                                                        <button id="${contentConfig.id}-gobutton" type="button" class="date-filter-btn btn-success">Go</button>
                                                    </p>
                                                </div>
                                            `;
                                        }

                                    let chartColumnDom = "";
                                    let tableColumnDom = "";

                                    if(columnConfig.contentType == "date-range-chart"){
                                        allChartsMap.set(contentConfig.id,'');

                                        currentTimeRangeSelected = contentConfig.defaultDateRange;
                                        
                                        let dateRangeDom = "";
                                        let dateRangesDom = "";

                                        contentConfig.dateRanges.forEach((dateRange,index) => {
                                            let dateRangeDisplay = contentConfig.displayDateRanges[index];

                                            let dateRangeClass = "";

                                            if(contentConfig.defaultDateRange == dateRange){
                                                dateRangeClass = "timerangeselected";
                                            }else{
                                                dateRangeClass = "timerangenormal";
                                            }

                                            dateRangeDom = `
                                                <div class="btn-group labelTools">
                                                    <button id="${dateRange}Range" class="btn btn-default btn-xs ${dateRangeClass}">${dateRangeDisplay}</button>
                                                </div>
                                            `;

                                            dateRangesDom += dateRangeDom;

                                            dateRangeData.push(
                                                {
                                                    "range" : dateRange,
                                                    "contentId" : contentConfig.id
                                                }
                                            );

                                        });


                                        let dateRangesCompleteDom = `
                                            <div id="timeSeriesChartRangeFilter" class="date-range-container">
                                                ${dateRangesDom}
                                            </div>
                                        `;

                                        chartColumnDom = `
                                            <div class="col-lg-${columnConfig.size} ">
                                                <div class="panel panel-default">
                                                    <div class="panel-heading">
                                                        <h3 class="panel-title" id="${contentConfig.id}-ChartTitle">
                                                        ${contentConfig.title}
                                                        </h3>
                                                    </div>
                                                    <div class="panel-body">
                                                        <div class='copyTitle'> </div>
                                                        ${dateRangesCompleteDom}
                                                        ${dateFilterDom}
                                                        <div id="${contentConfig.id}-Chart" class="${contentConfig.contentClass}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        `;

                                    }else if(columnConfig.contentType == "chart"){
                                        allChartsMap.set(contentConfig.id,'');
                                        chartColumnDom = `
                                            <div class="col-lg-${columnConfig.size} ">
                                                <div class="panel panel-default">
                                                    <div class="panel-heading">
                                                        <h3 class="panel-title" id="${contentConfig.id}-ChartTitle">
                                                        ${contentConfig.title}
                                                        ${dateFilterIconDom}
                                                        </h3>
                                                    </div>
                                                    <div class="panel-body">
                                                        <div class='copyTitle'> </div>
                                                        ${dateFilterDom}
                                                        <div id="${contentConfig.id}-Chart" class="${contentConfig.contentClass}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        `;
                                     }else if(columnConfig.contentType == "table"){

                                        pluginTableId = contentConfig.id;

                                        tableColumnDom = `
                                            <div id="currentStatusList">
                                                <div class="row" id="${contentConfig.id}TitleForCopy"></div> 
                                                <div class="row doNotCopy ${contentConfig.id}table">
                                                    <div class="col-lg-3 ">
                                                        <h3 id="${contentConfig.id}TableHeader">
                                                        ${contentConfig.title}
                                                        ${dateFilterIconDom}
                                                        </h3>
                                                    </div>
                                                    <div class=" col-lg-7"></div>
                                                    <div class=" col-lg-2">
                                                        <input type="text" id="${contentConfig.id}InputFilter" style="margin-bottom:10px;" placeholder="filter..." class="doNotCopy  form-control"></input>
                                                    </div>
                                                </div>
                                                <div class="row ${contentConfig.id}table">
                                                    <div class="col-md-12">
                                                        ${dateFilterDom}
                                                        <div class="table-responsive">
                                                            <table class="table table-condensed table-borderless table-hover" id="${contentConfig.id}Table">
                                                                <thead id="${contentConfig.id}-TableHeader">
                                                                </thead>
                                                                <tbody id="${contentConfig.id}RowList">
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        `;
                                     }

                                     chartColumnsDom += chartColumnDom;
                                     tableColumnsDom += tableColumnDom;

                                });
                            }

                            chartRowDom += `<div class="row doNotCopy">${chartColumnsDom}</div>`;
                            tableRowDom += tableColumnsDom
                    });

                    genericChartRowDom += chartRowDom;
                    genericTableRowDom += tableRowDom;

                }
            }

            let genericHtmlDom = `
                <div class="panel-body-v-scroll fillHeight panel-default ">
                    <style>${genericDomStyle}</style>
                    ${waitElementDom}
                    <div id="MCSOContent" class="" style="margin:10px;" >
                    ${genericChartRowDom}
                    ${genericTableRowDom}
                    </div>
                </div>
            `;
            
            const renderTemplateData : any = {
                "genericHtmlDom" : genericHtmlDom,
                "allChartsMap" : allChartsMap,
                "dateFilterEnablerMap" : dateFilterEnablerMap,
                "currentTimeRangeSelected" : currentTimeRangeSelected,
                "pluginTableId" : pluginTableId,
                "dateRangeData": dateRangeData

            };

            return renderTemplateData;

        }

    }
}