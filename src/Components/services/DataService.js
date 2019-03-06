import firebase from 'firebase';

export default class DataService {

    // USERS 
    static saveUserInfoInFirestore(userId, userToSave){
        //registro en Firebase
        // console.log("el user recibido en el registro firestore es:", userId)
        // console.log("el userToSave recibido en firestore es: ", userToSave)
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('users').doc(userId).set(userToSave)
            .then((result) => {
                
                console.log("User information succesfully saved !")
                resolve(result);
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('User NOT added: ', errorCode);
               // var errorMessage = error.message;
                
            })
            
        });
    };
    static getUserInfo(userId){
        //console.log('el userID recibido es = ', userId);
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('users').doc(userId).get()

            .then((result) => {
                //console.log('el result del getuser Info = ', result.data())
                resolve(result.data());   // OBTENGO TODO LO QUE TENGO ALMACENADO DE ÉSTE USUARIO
            })
            .catch((error) => {
                reject('Usuario no existe');
            })
            
        });
    };
    
    static getUserPatients(userId){

        return new Promise((resolve, reject) => {

            firebase.firestore().collection('patients').where(`adminId`, `==` , userId).get()

            .then((result) => {
            
                let pats=[];
                result.docs.forEach((d) => {
                    let j = d.data();
                    j.id=d.id;
                    pats.push(j);
                })
                
                resolve(pats);  
            })
            // .then((result) => {
            //     //console.log('el result del getuser Info = ', result.data())
            //     resolve(result.data());  
            //     console.log('result.data() en el get user patients', result.data()) // OBTENGO TODO LO QUE TENGO ALMACENADO DE ÉSTE USUARIO
            // })
            .catch((error) => {
                reject('Usuario no existe');
            })
            
        });
    };

    // PATIENT
    static newPatient(patientInfo) {  
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('patients').add(patientInfo)

            .then((result) => {
                
                console.log(`${result.id} patient succesfully added !`)
                resolve(result);
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('patient could not be added: ', errorCode);
               // var errorMessage = error.message;
                
            })
            
        });
    };

    static editPatient(patID, patientInfo) {
        return new Promise((resolve, reject) => {

            console.log('patientInfo.adminId', patientInfo.adminId)

            firebase.firestore().collection('patients').doc(patID).update({
                patient             : patientInfo.adminId,
                patientName         : patientInfo.name,     
                patientSurname      : patientInfo.surname,  
                birthDate           : patientInfo.born,
                birthWeight         : patientInfo.weight,
                pregIssues          : patientInfo.pIssues,
                birthIssues         : patientInfo.bIssues,
                // patientsEvents      : patientInfo.events, 
                // patientsWeights     : patientInfo.weights,  
                // patientsMedicines   : patientInfo.medicines,
            })

            .then((result) => {
                
                console.log(`${result.id} patient succesfully EDITED !`)
                resolve(result);
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('patient could not be EDITED: ', errorCode);
               // var errorMessage = error.message;
                
            })
            
        });
    }
    static getPatientToJoin(patientCode) {  
        console.log('patientCode recibido en el join del Data =', patientCode);
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('patients').where('patientCode', '==', patientCode).get()

            // .then((result) => {
            //     console.log('el result del join = ', result);
            //     resolve(result.data());
            // })
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots

                    let reply = doc.data();
                    reply.patientId = doc.id;

                    resolve(reply)
                });
                
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('patient NOT joined: ', errorCode);
             //   var errorMessage = error.message;
                
            })
            
        });
    };
    static getPatientInfo(patientId) {  
        

        return new Promise((resolve, reject) => {
            firebase.firestore().collection('patients').doc(patientId).get()

            .then((result) => {
                resolve(result.data());
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('Error al cargar la patientInfo: ', errorCode);
             //   var errorMessage = error.message;
                
            })
            
        });
    };

    static addPatientToUser(userID, newpatient){
        return new Promise((resolve, reject) => {
            console.log('inputs en el dataservice ', userID, newpatient);
            firebase.firestore().collection('users').doc(userID).update({
                userPatients : newpatient})
            .then((result) => {
                console.log("patient succesfully added to the User ")
                resolve(result);
            })

            .catch((error) => {
              //  var errorCode = error.code;
                console.log('ERROR patient NOT added to user: ', error);                
            })
            
        });
    }

    // EVENT
    static newEvent(stateInfo) {  
        console.log('info del estado a guardar = ', stateInfo )
    return new Promise((resolve, reject) => {

        firebase.firestore().collection('events').add(stateInfo)

        .then((result) => {
            
            console.log(`${result.id} State succesfully added !`)
            resolve(result);
        })

        .catch((error) => {
            var errorCode = error.code;
            console.log('patient could not be added: ', errorCode);
           // var errorMessage = error.message;
            
        })
        
    });
    };

    static addNewEventToPatient(patId, newStateInfo) {  
    return new Promise((resolve, reject) => {

        firebase.firestore().collection('patients').doc(patId).update({
            patientsEvents : newStateInfo})

        .then((result) => {
            
            console.log(`${result.id} State succesfully added !`)
            resolve(result);
        })

        .catch((error) => {
            var errorCode = error.code;
            console.log('EVENT could not be added to the patient: ', errorCode);
           // var errorMessage = error.message;
            
        })
        
    });
    };

    static getPatientsEvents(patID){
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('events').where("patientId", "==", patID).get()
            .then((result) => {
                let events=[];
                result.docs.forEach((d) => {
                    let j = d.data();
                    j.id=d.id;
                    events.push(j);
                })
                resolve(events);  
            })
            .catch((error) => {
               console.log('error: ', error);
                // reject('Usuario no existe', error)
            })
        })
    }
    

    static getEventInfo(eventID) {  

        return new Promise((resolve, reject) => {
            firebase.firestore().collection('events').doc(eventID).get()

            .then((result) => {
                resolve(result.data());
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('Error al cargar la patientInfo: ', errorCode);
                
            })
            
        });
    };
    static updateEventInfo(eventID) {  

        return new Promise((resolve, reject) => {
            firebase.firestore().collection('events').doc(eventID).get()

            .then((result) => {
                resolve(result.data());
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('Error al cargar la patientInfo: ', errorCode);
                
            })
            
        });
    };
    
    // MEDICINES
    static newMedicineRegister(patId, newMedicine) {  
        return new Promise((resolve, reject) => {
    
            console.log('add medicine launched con', patId, ' y ', newMedicine)
            firebase.firestore().collection('patients').doc(patId).update({
                patientsMedicines : newMedicine})
    
            .then((result) => {
                
                console.log(`new MEDICINE succesfully added !`)
                resolve(result);
            })
    
            .catch((error) => {
                var errorCode = error.code;
                console.log('New MEDICINE could not be added to the patient: ', error);
               // var errorMessage = error.message;
                
            })
            
        });
    };

    static newMedicine(medInfo) {  
    
    return new Promise((resolve, reject) => {

        firebase.firestore().collection('medicines').add(medInfo)

        .then((result) => {
            
            console.log(`${result.id} Med succesfully registered !`)
            resolve(result);
        })

        .catch((error) => {
            var errorCode = error.code;
            console.log('patient could not be added: ', errorCode);
           // var errorMessage = error.message;
            
        })
        
    });
    };

    static getPatientsMeds(patID){
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('medicines').where("patientId", "==", patID).get()
            .then((result) => {
                let meds=[];
                result.docs.forEach((d) => {
                    let j = d.data();
                    j.id=d.id;
                    meds.push(j);
                })
                resolve(meds);  
            })
            .catch((error) => {
               console.log('error: ', error);
                // reject('Usuario no existe', error)
            })
        })
    }

    // WEIGHT

    static addNewWeight(patId, weightArray) {  
    return new Promise((resolve, reject) => {

        firebase.firestore().collection('patients').doc(patId).update({
            patientsWeights : weightArray})

        .then((result) => {
            
            console.log(`new Weight reading State succesfully added !`)
            resolve(result);
        })

        .catch((error) => {
            var errorCode = error.code;
            console.log('EVENT could not be added to the patient: ', errorCode);
           // var errorMessage = error.message;
            
        })
        
    });
    };

}