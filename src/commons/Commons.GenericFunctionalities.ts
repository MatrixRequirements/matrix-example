/// <reference path="../../lib/generic-dashboard.d.ts" />

namespace Commons {
    export namespace GenericFunctionalities {

        //common functions

        function getitemCurrentStateData(itemId: string, 
                                         itemCurrentStateValues: ItemCurrentStateData[],
                                         itemCurrentStateTableHeaders: any): ItemCurrentStateData {

            let itemCurrentStateData: ItemCurrentStateData =  itemCurrentStateValues.find((itemCurrentStateData) => itemCurrentStateData.id == itemId);

            if(itemCurrentStateData == null){
                let itemCurrentStateTableInitials : any[] = [];

                itemCurrentStateTableInitials = Array(itemCurrentStateTableHeaders.length).fill("");

                itemCurrentStateData = {
                    id: itemId,
                    attributes: [],
                    tableValues: itemCurrentStateTableInitials,
                    InitiatedDate: null,
                    ClosedDate: null,
                    currentState: ''
                };
            }

            return itemCurrentStateData;

        }

        export function processGroupByObjectData(groupByObject: groupByObject, 
                                                 groupByObjectDataSource: XRLabelEntry[], 
                                                 functionalityCategory: string,
                                                 dateFilterEnablerMap: any,
                                                 itemCurrentStateTableHeaders: any,
                                                 itemCurrentStateValues: ItemCurrentStateData[]) {

            for (const item of groupByObjectDataSource) {

                let itemCategory: string = item.itemRef.substring(0, item.itemRef.indexOf('-'));

                if(itemCategory === functionalityCategory){
                    continue;
                }

                let itemCurrentStateData: ItemCurrentStateData =  getitemCurrentStateData(item.itemRef, 
                                                                                          itemCurrentStateValues,
                                                                                          itemCurrentStateTableHeaders);

                for (const label of item.labels) {
                    let labelIndex = groupByObject.labels.findIndex(labelCode => labelCode === label.label);
                    if(labelIndex > -1 && (label.reset.length !== label.set.length)){
                        if(groupByObject.renderChart == 'Y'){
                            groupByObject.groupWiseData[labelIndex + 1] += 1;
                        }

                        if(groupByObject.showInTable == 'Y'){
                            let headerIndex = itemCurrentStateTableHeaders.findIndex(header => header === groupByObject.tableHeader);
                            itemCurrentStateData.tableValues[headerIndex] = groupByObject.labelsDesc[labelIndex];
                            itemCurrentStateData.attributes.push(groupByObject.labelsDesc[labelIndex]);
                        }

                        if(dateFilterEnablerMap.get(groupByObject.id)){
                            label.set.sort((a, b) => b.version - a.version);
                            let currentLableSetDate = new Date(label.set[0].dateIso);
                            itemCurrentStateData.InitiatedDate = currentLableSetDate;

                            let groupByObjectcurrentLabelData: groupByObjectCurrentData = {
                                id: item.itemRef,
                                currentLabel: label.label,
                                currentLabelSetDate: currentLableSetDate
                            };

                            groupByObject.currentLabelData.push(groupByObjectcurrentLabelData);
                        }

                       
                    }
                }

            }
            
        }


        export function processGroupByOperandsData(groupByOperandsObject: groupByOperandsObject, 
                                                   groupByOperandsDataSource: XRLabelEntry[],
                                                   functionalityCategory: string) {
             
            for (const item of groupByOperandsDataSource) { 
                let itemCategory: string = item.itemRef.substring(0, item.itemRef.indexOf('-'));

                if(itemCategory === functionalityCategory){
                    continue;
                }

                for (const label of item.labels) {
                    groupByOperandsObject.operandsData.forEach((operandObjectData,operandDesc)=>{
                        operandObjectData.labelsState.forEach((isLabelSet,operandLabel)=>{
                            if((operandLabel == label.label) && (label.reset.length !== label.set.length)){
                                isLabelSet = true;
                                operandObjectData.labelsState.set(operandLabel,isLabelSet);
                                groupByOperandsObject.operandsData.set(operandDesc,operandObjectData);
                            }
                        });
                    });
                }

                groupByOperandsObject.operandsData.forEach((operandObjectData,operandDesc)=>{

                    let isOperandConditionMatched : Boolean = false;
                    let operandExpression = JSON.parse(JSON.stringify(operandObjectData.operand));

                    operandObjectData.labelsState.forEach((isLabelSet,operandLabel)=>{
                            isOperandConditionMatched = isLabelSet;
                            operandExpression = operandExpression.replace(operandLabel,isLabelSet ? "true": "false");   
                    });

                    try{
                        if(eval(operandExpression) == 1){
                            isOperandConditionMatched = true;
                        }
                    }catch(e){
                        isOperandConditionMatched = false;
                    }

                    operandObjectData.labelsState.forEach((isLabelSet,operandLabel)=>{
                        operandObjectData.labelsState.set(operandLabel,false);
                    });

                    groupByOperandsObject.operandsData.set(operandDesc,operandObjectData);

                    if(isOperandConditionMatched){
                        let labelDescIndex = groupByOperandsObject.labelsDesc.findIndex(labeldesc => labeldesc === operandDesc);
                        groupByOperandsObject.groupWiseData[labelDescIndex + 1] += 1;
                    }    
                });
            }                                   

        }


        export function processGroupByStackData(groupByStackObject: groupByStackObject, 
                                                groupByStackDataSource: XRLabelEntry[],
                                                functionalityCategory: string,
                                                itemCurrentStateValues: ItemCurrentStateData[],
                                                itemCurrentStateTableHeaders: any) {
             
            for (const item of groupByStackDataSource) { 
                let itemCategory: string = item.itemRef.substring(0, item.itemRef.indexOf('-'));

                if(itemCategory === functionalityCategory){
                    continue;
                }

                let itemCurrentStateData: ItemCurrentStateData =  getitemCurrentStateData(item.itemRef, 
                    itemCurrentStateValues,
                    itemCurrentStateTableHeaders);

                let groupByStackCurrentCategory = new Map();
                let groupByStackCurrentgroup = new Map();

                for (const label of item.labels) {
                    let categoryLabelIndex = groupByStackObject.categoryCodes.findIndex(categoryCode => categoryCode === label.label);
                    let groupLabelIndex = groupByStackObject.groupByCodes.findIndex(groupCode => groupCode === label.label);

                    if(categoryLabelIndex > -1 && (label.reset.length !== label.set.length)){
                        groupByStackCurrentCategory.set(groupByStackObject.id,{label: label, labelIndex: categoryLabelIndex});
                    }else if(groupLabelIndex > -1 && (label.reset.length !== label.set.length)){
                        groupByStackCurrentgroup.set(groupByStackObject.id,{label: label, labelIndex: groupLabelIndex});
                    }  
                }

                let categoryLabelData = groupByStackCurrentCategory.get(groupByStackObject.id);
                let groupLabelData = groupByStackCurrentgroup.get(groupByStackObject.id);

                let categoryLabelIndex = -1;
                let groupLabelIndex = -1;

                if(categoryLabelData && groupLabelData){
                    categoryLabelIndex = categoryLabelData.labelIndex;
                    groupLabelIndex = groupLabelData.labelIndex;
                }


                if(categoryLabelIndex >= 0 && groupLabelIndex >= 0){
                    let groupDesc = groupByStackObject.groupByCodesDesc[groupLabelIndex];
                    let categoryDesc = groupByStackObject.categoryDesc[categoryLabelIndex];
                    
                    groupByStackObject.groupByStackData.forEach(stackGroupData => {
                        if(stackGroupData[0] == groupDesc){
                            stackGroupData[categoryLabelIndex + 1] += 1;
                        }
                    });

                    categoryLabelData.label.set.sort((a, b) => b.version - a.version);
                    let currentLableSetDate = new Date(categoryLabelData.label.set[0].dateIso);
                    itemCurrentStateData.InitiatedDate = currentLableSetDate;

                    let groupByLabelCurrentData: groupByStackCurrentData = {
                        id: item.itemRef,
                        currentCategoryLabel: categoryDesc,
                        currentgroupLabel: groupDesc,
                        currentgroupLabelSetDate: currentLableSetDate
                    };

                    groupByStackObject.currentLabelData.push(groupByLabelCurrentData);
                }
            }    
        }

        export function processGroupByStateData(groupByStateObject: groupByStateObject, 
                                                groupByStateDataSource: XRLabelEntry[], 
                                                functionalityCategory: string,
                                                dateFilterEnablerMap: any,
                                                itemCurrentStateTableHeaders: any,
                                                itemCurrentStateValues: ItemCurrentStateData[]) {

            
            for (const item of groupByStateDataSource) {

                let itemCategory: string = item.itemRef.substring(0, item.itemRef.indexOf('-'));

                if(itemCategory === functionalityCategory){
                    continue;
                }

                let itemCurrentStateData: ItemCurrentStateData =  getitemCurrentStateData(item.itemRef, 
                                                                                          itemCurrentStateValues,
                                                                                          itemCurrentStateTableHeaders);

                for (const label of item.labels) {

                    let stateIndex = groupByStateObject.stateCodes.findIndex(stateCode => stateCode === label.label);
                    if(stateIndex > -1){
                        if(label.reset.length !== label.set.length){    
                            if(groupByStateObject.renderChart == 'Y'){
                                groupByStateObject.stateWiseData[stateIndex][1] += 1;
                            }
                            groupByStateObject.currentState = label.label;
                            itemCurrentStateData.currentState = label.label;
                            if(groupByStateObject.showInTable == 'Y'){
                                let headerIndex = itemCurrentStateTableHeaders.findIndex(header => header === groupByStateObject.tableHeader);
                                itemCurrentStateData.tableValues[headerIndex] = groupByStateObject.stateDesc[stateIndex];
                                itemCurrentStateData.attributes.push(groupByStateObject.stateDesc[stateIndex]);
                            }

                            if(this.dateFilterEnablerMap.get(groupByStateObject.id)){
                                label.set.sort((a, b) => b.version - a.version);
                                let currentLableSetDate = new Date(label.set[0].dateIso);
                                itemCurrentStateData.InitiatedDate = currentLableSetDate;

                                let groupByObjectcurrentLabelData: groupByObjectCurrentData = {
                                    id: item.itemRef,
                                    currentLabel: label.label,
                                    currentLabelSetDate: currentLableSetDate
                                };

                                groupByStateObject.currentLabelData.push(groupByObjectcurrentLabelData);
                            }
                        }
                    }
                }
            }

        }

    }
}