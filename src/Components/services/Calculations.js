

export default class Calculations {

    static getCurrentMonth(){
        let months  =  ['Januay', 'February', 'March', 'April','May', 'June', 'July', 'August','September', 'October', 'November', 'December'];
        const date = new Date();
        let monthNr = date.getMonth()
        let currentMonth = months[monthNr]
       
        return currentMonth
    };
    static getFormatedDate(x){
        let days = ['Sun','Mon', 'Tue','Wed', 'Thu', 'Fri', 'Sat'];
        let months  =  ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec'];

        const date = new Date(x);

        let day = date.getDate(x);

        let monthI = date.getMonth()
        let month = months[monthI]

        let year = date.getFullYear()

        let formatedDate = [day, month, year]
        
        return formatedDate
    };
    static getFormatedDatePlusOne(x){
        let days = ['Sun','Mon', 'Tue','Wed', 'Thu', 'Fri', 'Sat'];
        let months  =  ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec'];

        const date = new Date(x);

        let day = date.getDate(x)+1;

        let monthI = date.getMonth()
        let month = months[monthI]

        let year = date.getFullYear()

        let formatedDate = [day, month, year]
        
        return formatedDate
    };
    static getDaysUntilToday(x){
        let now = new Date();
        let inBetweenDays = [];

        for (let i = new Date(x); i <= now; i.setDate(i.getDate() + 1)) {
            inBetweenDays.push(new Date(i));
        }
       
        return inBetweenDays
    };

    // - - - - - SORTING FUNCTIONS 
    // https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/

    static sortByEventDate(x){

        function compare(a,b){
            const drugA = a.eventDate;
            const drugB = b.eventDate;
        
            let comparison = 0;
            if (drugA < drugB) {
            comparison = -1;
            } else if (drugA > drugB) {
            comparison = 1;
            }
            return comparison;
        }

        return x.sort(compare)
    };
    static sortMedicinesDate(x){
        function orderMedicines(a, b) {
        
            const drugA = a.date;
            const drugB = b.date;
          
            let comparison = 0;
            if (drugA < drugB) {
              comparison = -1;
            } else if (drugA > drugB) {
              comparison = 1;
            }
            return comparison;
        };

        return x.sort(orderMedicines)
    };
    static sortMedicinesAlpha(x){
        function compareName(a, b) {
        
            const drugA = a.drugName;
            const drugB = b.drugName;
          
            let comparison = 0;
            if (drugA > drugB) {
              comparison = -1;
            } else if (drugA < drugB) {
              comparison = 1;
            }
            return comparison;
        };
        return x.sort(compareName)
    };
    static sortReadingsByDate(x){
        function orderReadings(a, b) {
        
            const readingA = a.readingDate;
            const readingB = b.readingDate;
          
            let comparison = 0;
            if (readingA > readingB) {
              comparison = 1;
            } else if (readingA < readingB) {
              comparison = -1;
            }
            return comparison;
        };
        return x.sort(orderReadings)
    };

    // - - - - CODE GENERATION 
    static generateCode(){
     // GENERATE BOOKING CODE
     const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
     let codeArray = [];

     for (let l=0; l<4; l++){
        let capital = Math.round(Math.random()*10);
        let random = Math.round(Math.random()*26);

        if(Number.isInteger(capital/2)){
            codeArray[l]=(letters[random]).toUpperCase();
        } else {
            codeArray[l]=letters[random];
        }
     }

     let d = new Date();
     let t = d.getTime().toString().slice(-8);  // el bookCode = milisegundos

     let code = codeArray.join("").concat(t);

     // CHECK POINT
     // console.log('El code generado es: ', code

     return code
     
    };
}