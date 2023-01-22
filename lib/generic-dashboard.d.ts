interface groupByObjectCurrentData {
    id: string;
    currentLabel: string;
    currentLabelSetDate: Date;
}

interface groupByStackCurrentData {
    id: string;
    currentCategoryLabel: string;
    currentgroupLabel: string;
    currentgroupLabelSetDate: Date;
}

interface closureObjectCurrentData {
    id: string;
    daysToClose: number;
    closedDate: Date;
}

interface trackerObjectCurrentData {
    id: string;
    currentState: string;
    currentStateSetDate: Date;
    itemStateDays: Map<string, Number>;
}

interface operandObjectData {
    operand: string;
    labelsState: Map<string, Boolean>;
}

interface ItemCurrentStateData {
    id: string;
    attributes: any[];
    tableValues: any[];
    InitiatedDate: Date;
    ClosedDate: Date;
    currentState: string;
}

interface groupByObject {
    id: string;
    dataSourceType: string;
    renderChart: string;
    showInTable: string;
    tableHeader: string;
    labels: any[];
    labelsDesc: any[];
    groupWiseData: any[];
    currentLabelData: groupByObjectCurrentData[];
}

interface groupByOperandsObject {
    id: string;
    dataSourceType: string;
    renderChart: string;
    showInTable: string;
    tableHeader: string;
    labels: any[];
    labelsDesc: any[];
    operandsData: Map<string, operandObjectData>;
    groupWiseData: any[];
}

interface groupByStateObject {
    id: string;
    dataSourceType: string;
    type: string;
    renderChart: string;
    showInTable: string;
    tableHeader: string;
    stateCodes: any[];
    stateDesc: any[];
    stateColors: any[];
    openState: string;
    stateWiseInitialData: any[];
    stateWiseData: any[];
    currentState: string;
    currentLabelData: groupByObjectCurrentData[];
}

interface groupByStateOverDueObject extends groupByStateObject {
    dataSources: any[];
    OpenItemsDueDateMap: Map;
}

interface groupByStackObject {
    id: string;
    dataSourceType: string;
    renderChart: string;
    showInTable: string;
    tableHeader: string;
    categoryCodes: any[];
    categoryDesc: any[];
    groupByCodes: any[];
    groupByCodesDesc: any[];
    groupByCodeColors: any[];
    groupByStackInitialData: any[];
    groupByStackData: any[];
    currentLabelData: groupByStackCurrentData[];
}

interface avgObject {
    id: string;
    dataSourceType: string;
    renderChart: string;
    stateCodes: any[];
    stateDesc: any[];
    allStateCodes: any[];
    allStateDesc: any[];
    statusWiseTotalDaysData: any[];
    statusWiseAvgData: any[];
    intialState: string;
    closedState: string;
    rejectedState: string;
    currentState: string;
    initiatedDate: Date;
    closedDate: Date;
}

interface closureObject {
    id: string;
    dataSourceType: string;
    renderChart: string;
    showInTable: string;
    tableHeader: string;
    allStateCodes: any[];
    allStateDesc: any[];
    closedItemsData: any[];
    closureTimeData: any[];
    intialState: string;
    closedState: string;
    rejectedState: string; 
    currentState: string;
    initiatedDate: Date;
    closedDate: Date;
    currentLabelData: closureObjectCurrentData[];
}

interface dateRangeCompareObject {
    id: string;
    dataSourceType: string;
    renderChart: string;
    showInTable: string;
    dateRanges: any[];
    defaultDateRange: string;
    labels: any[];
    labelsDesc: any[];
    labelColors: any[];
    leastStatusSetDate: Date;
    currentLabelData: groupByObjectCurrentData[];
}

interface trackerObject {
    id: string;
    dataSourceType: string;
    renderChart: string;
    showInTable: string;
    stateCodes: any[];
    stateDesc: any[];
    stateColors: any[];
    allStateCodes: any[];
    allStateDesc: any[];
    stateTrackerInitialData: any[];
    stateTrackerData: any[];
    closedState: string;
    rejectedState: string;
    currentState: string;
    currentLabelData: Map<string, trackerObjectCurrentData>;
}

interface ByCategoryLabelData {
    category: string;
    groupByData: groupByObject[];
    groupByOperandsData: groupByOperandsObject[];
    groupByStateData: groupByStateObject[];
    groupByStackData: groupByStackObject[];
    groupByStateOverdueData: groupByStateOverDueObject[];
    avgData: avgObject[];
    closureData: closureObject[];
    trackerData: trackerObject[];
    dateRangeCompareData: dateRangeCompareObject[];
    itemCurrentStateTableHeaders: any[];
    itemCurrentStateValues: ItemCurrentStateData[];
}

interface dateRangeData {
    currentWeekCategoryData: any[];
    currentMonthCategoryData: any;
    threeMonthsCategoryData: any[];
    sixMonthsCategoryData: any[];
    twelveMonthsCategoryData: any[];
    ytdCategoryData: any[];
    moreThanYearCategoryData: any[];
    quarterlyCYCategoryData: any;
    quarterlyFYCategoryData: any;
    currentWeekColumnsData: any[];
    currentMonthColumnsData: any[];
    threeMonthsColumnsData: any[];
    sixMonthsColumnsData: any[];
    twelveMonthsColumnsData: any[];
    ytdColumnsData: any[];
    moreThanYearColumnsData: any[];
    quarterlyCYColumnsData: any[];
    quarterlyFYColumnsData: any[];
}

