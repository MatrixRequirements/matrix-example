/// <reference path="../../lib/generic-dashboard.d.ts" />

namespace Commons {
    export namespace GenericFunctionalities {

        export function processGroupByObjectData(groupByObject: groupByObject, 
                                                 groupByObjectDataSource: XRLabelEntry[], 
                                                 dateFilterEnablerMap: any,
                                                 functionalityCategory: String,
                                                 itemCurrentStateTableHeaders: any,
                                                 itemCurrentStateValues: ItemCurrentStateData[]) {

            for (const item of groupByObjectDataSource) {

                let itemCategory: string = item.itemRef.substring(0, item.itemRef.indexOf('-'));

                if(itemCategory === functionalityCategory){
                    continue;
                }

                let itemCurrentStateData: ItemCurrentStateData =  itemCurrentStateValues.find((itemCurrentStateData) => itemCurrentStateData.id == item.itemRef);

                if(itemCurrentStateData == null){
                    let itemCurrentStateTableInitials : any[] = [];

                    itemCurrentStateTableInitials = Array(itemCurrentStateTableHeaders.length).fill("");

                    itemCurrentStateData = {
                        id: item.itemRef,
                        attributes: [],
                        tableValues: itemCurrentStateTableInitials,
                        InitiatedDate: null,
                        ClosedDate: null,
                        currentState: ''
                    };
                }

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
                                                   functionalityCategory: String) {
             
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

    }
}