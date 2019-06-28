// AUX COMPONENTS
import moment from 'moment';

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

    static getAge(x){
        let born = moment(new Date(x));
        let today = moment(new Date());
        
        let age = today.diff(born, "years");
        let edad = '';
        // console.log('age = ', age);

        if(age < 1 ){

            let months = today.diff(born, "months");

            if(months <=1){
                edad = months + " mes"
            } else {
                edad = months + " meses"
            }
            // console.log(' edad = ', edad );
            
            return edad;

        } else {
            let anios = today.diff(born, "years", true);
            let aniosInt = today.diff(born, "years");
            // console.log('anios = ', anios)

            let years = age;
            // console.log(' años = ', years);

            let meses = Math.round((anios-aniosInt)*12);
            // console.log('meses = ', meses)
            
            if(meses > 1){
                edad = years + ' años, ' + meses + " meses";
                // console.log('edad = ', edad);
                return edad;
            } else {
                edad = years + ' años';
                // console.log('edad = ', edad);
                return edad;
            }
        }   
         
    };



    // - - - - - SORTING FUNCTIONS 

    // https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
    static sortByDateAsc(x){

        function compare(a,b){
            const varA = a.date;
            const varB = b.date;
        
            let comparison = 0;
            if (varA < varB) {
            comparison = -1;
            } else if (varA > varB) {
            comparison = 1;
            }
            return comparison;
        }

        return x.sort(compare)
    };
    static sortByDateDesc(x){

        function compare(a,b){
            const varA = a.date;
            const varB = b.date;
        
            let comparison = 0;
            if (varA > varB) {
            comparison = -1;
            } else if (varA < varB) {
            comparison = 1;
            }
            return comparison;
        }

        return x.sort(compare)
    };

    // * * * * * * * * CODE GENERATION * * * * * * * *
    static generateCode(){
     // GENERATE BOOKING CODE
     const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
     let index = letters.length-1;
     let codeArray = [];
     
     for (let l=0; l<4; l++){
        let capital = Math.round(Math.random()*10);
        let random = Math.round(Math.random()*index);

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

    // * * * * * * * * MEDICINES * * * * * * * * 

    // static  getSortedMedicines (medNames, meds){
    //     // medNames = {drugName: name, allDoses: []}
    //     let mNL       = medNames.length;
    //     let mL        = meds.length;
           
    //     for (let j = 0; j < mNL; j++){  // itero entre medNames
    //         let name   = medNames[j].drugName;
    //         let xDose  = '';
    //         let hDose  = [];
    //         let date   = '';
    //         let unit   = 'mg';
    //         for (let k = 0; k < mL; k++){  // itero entre el meds 
    //             if (name === meds[k].drugName){
    //                 xDose   = meds[k].dailyDose;
    //                 hDose   = meds[k].hourlyDose;
    //                 date    = meds[k].date;
    //                 unit    = meds[k].drugUnits;

    //                 let doseToAdd = {date: date, hourlyDose: hDose, dailyDose : xDose, drugUnits: unit};
    //                 medNames[j].allDoses.push(doseToAdd)
    //             }
    //         }

    //         let sortedDoses = this.sortByDateDesc(medNames[j].allDoses)
    //         medNames[j].allDoses = sortedDoses;
            
    //     }
        
    //     return medNames
    // }

    static getCurrentMeds(array){
        // ARRAY IS ORDERED BY DRUGNAME (ascending)AND BY DATE (descending)
        let aL = array.length;
        let result = []
        
        result.push(array[0]);

        for (let i = 1; i <aL; i++){
            let prevDrugName = array[i-1].drugName;
            let drugName = array[i].drugName
            if(prevDrugName !== drugName){
                result.push(array[i]);
            } else {
                continue;
            };
        };

        return result;
    };


    // * * * * * * * * WEIGHT * * * * * * * * 

    static getCurrentWeight(array){
        // ARRAY IS ORDERED BY DATE (descending)
        let result = []
        result.push(array[0]);

        return result;
    };

}

