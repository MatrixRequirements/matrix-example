/// <reference path="../interfaces/generic-dashboard.d.ts" />

namespace Commons {
    export namespace DateRangeFunctionalities {


        function getMonthNames() {
            const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
                "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

            return monthNames;
        }

        function prepareQuarterlyCYCategories(year) {
            let months = [];
            let categories = [];

            categories.push("Quater1", "Quater2", "Quater3", "Quater4");
            months.push(
                { start: new Date(year, 0, 2).toJSON().slice(0, 10), end: new Date(year, 2, 32).toJSON().slice(0, 10) },
                { start: new Date(year, 3, 2).toJSON().slice(0, 10), end: new Date(year, 5, 31).toJSON().slice(0, 10) },
                { start: new Date(year, 6, 2).toJSON().slice(0, 10), end: new Date(year, 8, 31).toJSON().slice(0, 10) },
                { start: new Date(year, 9, 2).toJSON().slice(0, 10), end: new Date(year, 11, 32).toJSON().slice(0, 10) }
            );

            let quarterlyCYCategoryData = {
                categories: categories,
                months: months
            };

            return quarterlyCYCategoryData;
        }

        function prepareQuarterlyFYCategories(year) {
            let months = [];
            let categories = [];

            categories.push("Quater1", "Quater2", "Quater3", "Quater4");
            months.push(
                { start: new Date(year, 3, 2).toJSON().slice(0, 10), end: new Date(year, 5, 31).toJSON().slice(0, 10) },
                { start: new Date(year, 6, 2).toJSON().slice(0, 10), end: new Date(year, 8, 31).toJSON().slice(0, 10) },
                { start: new Date(year, 9, 2).toJSON().slice(0, 10), end: new Date(year, 11, 32).toJSON().slice(0, 10) },
                { start: new Date(year + 1, 0, 2).toJSON().slice(0, 10), end: new Date(year + 1, 2, 32).toJSON().slice(0, 10) }
            );

            let quarterlyFYCategoryData = {
                categories: categories,
                months: months
            };

            return quarterlyFYCategoryData;
        }

        function prepareCurrentMonthCategories(month, year, _start) {
            let weeks = [],
                categories = [],
                firstDate = new Date(year, month, 1),
                lastDate = new Date(year, month + 1, 0),
                numDays = lastDate.getDate();
            let c = Date()
            let start = 1;
            let weekIndex = 1;
            let end = 7 - firstDate.getDay();
            if (_start == 'monday') {
                if (firstDate.getDay() === 0) {
                    end = 1;
                } else {
                    end = 7 - firstDate.getDay() + 1;
                }
            }

            while (start <= numDays) {

                let _s = new Date(year, month, start + 1).toJSON().slice(0, 10);
                let _e = new Date(year, month, end + 1).toJSON().slice(0, 10);

                weeks.push({ start: _s, end: _e });
                categories.push("Week" + weekIndex + "(" + _s + " to " + _e + ")");
                weekIndex += 1;
                start = end + 1;
                end = end + 7;
                end = start === 1 && end === 8 ? 1 : end;
                if (end > numDays) {
                    end = numDays;
                }
            }

            let currentMonthCategoryData = {
                categories: categories,
                weeks: weeks
            };

            return currentMonthCategoryData;
        }

        function prepareCurrentWeekCategories() {
            let currentDate = new Date();
            let currentWeek = [];
            let dateOfWeekDay, formattedDate;

            if (currentDate.getDay() == 0) {
                dateOfWeekDay = currentDate.getDate() - 7;
            } else {
                dateOfWeekDay = currentDate.getDate() - currentDate.getDay();
            }

            let startDate = new Date(currentDate.setDate(dateOfWeekDay));

            for (let i = 1; i <= 7; i++) {
                let formattedDate = new Date(startDate.setDate(startDate.getDate() + 1)).toISOString().slice(0, 10);
                currentWeek.push(formattedDate);
            }

            return currentWeek;
        }

        function prepareMonthWiseCategories(previousMonths) {

            let monthNames = getMonthNames();

            let previousMonthsCategoryData = [];

            for (let i = previousMonths - 1; i >= 0; i--) {
                let currentDate = new Date();
                let currentMonth = currentDate.getMonth();
                currentDate.setMonth(currentMonth - i);
                previousMonthsCategoryData.push(monthNames[currentDate.getMonth()] + " " + currentDate.getFullYear())
            }

            return previousMonthsCategoryData;
        }

        function prepareYtdCategories(month, year) {

            let monthNames = getMonthNames();
            let ytdCategoryData = [];

            for (let i = 0; i <= month; i++) {
                ytdCategoryData.push(monthNames[i] + " " + year);
            }

            return ytdCategoryData;
        }

        function prepareMoreThanYearCategories(year, leastStatusSetDate) {
            let leastStatusSetYear = new Date(leastStatusSetDate).getFullYear();
            let moreThanYearCategoryData = [];

            while (leastStatusSetYear !== year) {
                moreThanYearCategoryData.push(leastStatusSetYear);
                leastStatusSetYear += 1;
            }

            moreThanYearCategoryData.push(year);

            return moreThanYearCategoryData;

        }

        function prepareInitialColumns(categoiesLength, labels) {

            let emptyInitials = Array(categoiesLength).fill(0);
            let initialColumns = [];

            labels.forEach(
                (label) => {
                    initialColumns.push([label, ...emptyInitials]);
                });

            return initialColumns;
        }

        function prepareCurrentWeekColumnData(currentStatus, currentStausSetDate, categoriesData, columnsData) {

            let statusColumnIndex = columnsData.findIndex(column => column[0] === currentStatus);
            let currentStatusSetDate = new Date(currentStausSetDate);
            categoriesData.forEach((categoryData, index) => {
                if ((currentStatusSetDate <= new Date(categoryData)) && (new Date(categoryData) <= new Date())) {
                    columnsData[statusColumnIndex][index + 1] += 1;
                }
            });
        }

        function prepareCurrentMonthColumnData(currentStatus, currentStausSetDate, categoriesData, columnsData) {

            let statusColumnIndex = columnsData.findIndex(column => column[0] === currentStatus);
            let currentStatusSetDate = new Date(currentStausSetDate);
            categoriesData.weeks.forEach((categoryData, index) => {
                if ((currentStatusSetDate <= new Date(categoryData.start) || currentStatusSetDate <= new Date(categoryData.end))
                    && (new Date(categoryData.start) <= new Date())) {
                    columnsData[statusColumnIndex][index + 1] += 1;
                }
            });
        }

        function prepareQuarterlyColumnData(currentStatus, currentStausSetDate, categoriesData, columnsData) {

            let statusColumnIndex = columnsData.findIndex(column => column[0] === currentStatus);
            let currentStatusSetDate = new Date(currentStausSetDate);
            categoriesData.months.forEach((categoryData, index) => {
                if ((currentStatusSetDate <= new Date(categoryData.start) || currentStatusSetDate <= new Date(categoryData.end))
                    && (new Date(categoryData.start) <= new Date())) {
                    columnsData[statusColumnIndex][index + 1] += 1;
                }
            });
        }

        function prepareMonthWiseColumnData(currentStatus, currentStausSetDate, categoriesData, columnsData) {
            let monthNames = getMonthNames();
            let statusColumnIndex = columnsData.findIndex(column => column[0] === currentStatus);
            let currentStatusSetDate = new Date(currentStausSetDate);
            let formattedCurrentStatusSetDate = new Date(monthNames[currentStatusSetDate.getMonth()] + " " + currentStatusSetDate.getFullYear());
            categoriesData.forEach((categoryData, index) => {
                if (formattedCurrentStatusSetDate <= new Date(categoryData)) {
                    columnsData[statusColumnIndex][index + 1] += 1;
                }
            });
        }

        function prepareMoreThanYearColumnData(currentStatus, currentStausSetDate, categoriesData, columnsData) {

            let statusColumnIndex = columnsData.findIndex(column => column[0] === currentStatus);
            let currentStatusSetDate = new Date(currentStausSetDate);
            let formattedCurrentStatusSetDate = new Date(currentStatusSetDate.getFullYear());
            categoriesData.forEach((categoryData, index) => {
                if (formattedCurrentStatusSetDate <= new Date(categoryData)) {
                    columnsData[statusColumnIndex][index + 1] += 1;
                }
            });
        }

        function prepareDateRangeCompareChartInitialData(
            dateRanges: any[], 
            labelsDesc: any[], 
            leastStatusSetDate: Date,
            dateRangeData: dateRangeData
            ) {

            let currentDate = new Date();
            let currentMonth = currentDate.getMonth();
            let currentYear = currentDate.getFullYear();

            dateRanges.forEach(
                (dateRange) => {
                    switch (dateRange) {
                        case 'week':
                            dateRangeData.currentWeekCategoryData = [];
                            dateRangeData.currentWeekColumnsData = [];
                            dateRangeData.currentWeekCategoryData = prepareCurrentWeekCategories();
                            dateRangeData.currentWeekColumnsData = prepareInitialColumns(dateRangeData.currentWeekCategoryData.length, labelsDesc);

                            break;
                        case 'month':
                            dateRangeData.currentMonthCategoryData = {};
                            dateRangeData.currentMonthColumnsData = [];
                            dateRangeData.currentMonthCategoryData = prepareCurrentMonthCategories(currentMonth, currentYear, 'monday');
                            dateRangeData.currentMonthColumnsData = prepareInitialColumns(dateRangeData.currentMonthCategoryData.categories.length, labelsDesc);
                            break;
                        case 'threeMonths':
                            dateRangeData.threeMonthsCategoryData = [];
                            dateRangeData.threeMonthsColumnsData = [];
                            dateRangeData.threeMonthsCategoryData = prepareMonthWiseCategories(3);
                            dateRangeData.threeMonthsColumnsData = prepareInitialColumns(dateRangeData.threeMonthsCategoryData.length, labelsDesc);
                            break;
                        case 'sixMonths':
                            dateRangeData.sixMonthsCategoryData = [];
                            dateRangeData.sixMonthsColumnsData = [];
                            dateRangeData.sixMonthsCategoryData = prepareMonthWiseCategories(6);
                            dateRangeData.sixMonthsColumnsData = prepareInitialColumns(dateRangeData.sixMonthsCategoryData.length, labelsDesc);
                            break;
                        case 'twelveMonths':
                            dateRangeData.twelveMonthsCategoryData = [];
                            dateRangeData.twelveMonthsColumnsData = [];
                            dateRangeData.twelveMonthsCategoryData = prepareMonthWiseCategories(12);
                            dateRangeData.twelveMonthsColumnsData = prepareInitialColumns(dateRangeData.twelveMonthsCategoryData.length, labelsDesc);
                            break;
                        case 'ytd':
                            dateRangeData.ytdCategoryData = [];
                            dateRangeData.ytdColumnsData = [];
                            dateRangeData.ytdCategoryData = prepareYtdCategories(currentMonth, currentYear);
                            dateRangeData.ytdColumnsData = prepareInitialColumns(dateRangeData.ytdCategoryData.length, labelsDesc);
                            break;
                        case 'moreThanYear':
                            dateRangeData.moreThanYearCategoryData = [];
                            dateRangeData.moreThanYearColumnsData = [];
                            dateRangeData.moreThanYearCategoryData = prepareMoreThanYearCategories(currentYear, leastStatusSetDate);
                            dateRangeData.moreThanYearColumnsData = prepareInitialColumns(dateRangeData.moreThanYearCategoryData.length, labelsDesc);
                            break;
                        case 'quarterlyCY':
                            dateRangeData.quarterlyCYCategoryData = [];
                            dateRangeData.quarterlyCYColumnsData = [];
                            dateRangeData.quarterlyCYCategoryData = prepareQuarterlyCYCategories(currentYear);
                            dateRangeData.quarterlyCYColumnsData = prepareInitialColumns(dateRangeData.quarterlyCYCategoryData.categories.length, labelsDesc);
                            break;
                        case 'quarterlyFY':
                            dateRangeData.quarterlyFYCategoryData = [];
                            dateRangeData.quarterlyFYColumnsData = [];
                            dateRangeData.quarterlyFYCategoryData = prepareQuarterlyFYCategories(currentYear);
                            dateRangeData.quarterlyFYColumnsData = prepareInitialColumns(dateRangeData.quarterlyFYCategoryData.categories.length, labelsDesc);
                            break;
                    };
                });

        }

        export function prepareDateRangeCompareChartData(
            labelsCurrentStateData: groupByObjectCurrentData[],
            labelsDesc: any[],
            dateRanges: any[],
            leastStatusSetDate: Date,
            dateRangeData: dateRangeData) {

            prepareDateRangeCompareChartInitialData(dateRanges, labelsDesc, leastStatusSetDate, dateRangeData);


            labelsCurrentStateData.forEach(
                (labelCurrentData) => {

                    dateRanges.forEach(
                        (dateRange) => {
                            switch (dateRange) {
                                case 'week':
                                    prepareCurrentWeekColumnData(labelCurrentData.currentLabel,
                                        labelCurrentData.currentLabelSetDate,
                                        dateRangeData.currentWeekCategoryData,
                                        dateRangeData.currentWeekColumnsData);
                                    break;
                                case 'month':
                                    prepareCurrentMonthColumnData(labelCurrentData.currentLabel,
                                        labelCurrentData.currentLabelSetDate,
                                        dateRangeData.currentMonthCategoryData,
                                        dateRangeData.currentMonthColumnsData);

                                    break;
                                case 'threeMonths':
                                    prepareMonthWiseColumnData(labelCurrentData.currentLabel,
                                        labelCurrentData.currentLabelSetDate,
                                        dateRangeData.threeMonthsCategoryData,
                                        dateRangeData.threeMonthsColumnsData);
                                    break;
                                case 'sixMonths':
                                    prepareMonthWiseColumnData(labelCurrentData.currentLabel,
                                        labelCurrentData.currentLabelSetDate,
                                        dateRangeData.sixMonthsCategoryData,
                                        dateRangeData.sixMonthsColumnsData);
                                    break;
                                case 'twelveMonths':
                                    prepareMonthWiseColumnData(labelCurrentData.currentLabel,
                                        labelCurrentData.currentLabelSetDate,
                                        dateRangeData.twelveMonthsCategoryData,
                                        dateRangeData.twelveMonthsColumnsData);
                                    break;
                                case 'ytd':
                                    prepareMonthWiseColumnData(labelCurrentData.currentLabel,
                                        labelCurrentData.currentLabelSetDate,
                                        dateRangeData.ytdCategoryData,
                                        dateRangeData.ytdColumnsData);
                                    break;
                                case 'moreThanYear':
                                    prepareMoreThanYearColumnData(labelCurrentData.currentLabel,
                                        labelCurrentData.currentLabelSetDate,
                                        dateRangeData.moreThanYearCategoryData,
                                        dateRangeData.moreThanYearColumnsData);
                                    break;
                                case 'quarterlyCY':
                                    prepareQuarterlyColumnData(labelCurrentData.currentLabel,
                                        labelCurrentData.currentLabelSetDate,
                                        dateRangeData.quarterlyCYCategoryData,
                                        dateRangeData.quarterlyCYColumnsData);
                                    break;
                                case 'quarterlyFY':
                                    prepareQuarterlyColumnData(labelCurrentData.currentLabel,
                                        labelCurrentData.currentLabelSetDate,
                                        dateRangeData.quarterlyFYCategoryData,
                                        dateRangeData.quarterlyFYColumnsData);
                                    break;
                            };
                        });

                });

        }
    }
}