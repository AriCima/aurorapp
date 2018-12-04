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
                var errorMessage = error.message;
                
            })
            
        });
    };
    static getUserInfo(userId){
        return new Promise((resolve, reject) => {

            firebase.firestore().collection('users').doc(userId).get()

            .then((result) => {
                resolve(result.data());   // OBTENGO TODO LO QUE TENGO ALMACENADO DE ÉSTE USUARIO
            })
            .catch((error) => {
                reject('Usuario no existe');
            })
            
        });
    };

    // CASES
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
                var errorMessage = error.message;
                
            })
            
        });
    };
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
                var errorMessage = error.message;
                
            })
            
        });
    };
    static getPatientInfo(patientId) {  

        return new Promise((resolve, reject) => {
            console.log('el ID con el que se pide la info de la patient = ', patientId)
            firebase.firestore().collection('patients').doc(patientId).get()

            .then((result) => {
                console.log('el result del getpatientInfo', result);
                resolve(result.data());
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('Error al cargar la patientInfo: ', errorCode);
                var errorMessage = error.message;
                
            })
            
        });
    };
    static getUserPatients(userId){
        return new Promise((resolve, reject) => {
            console.log('el userID en getpatients = ', userId)
            firebase.firestore().collection('patients').where(``,`==`, userId).get()
            .then((result) => {
            
                let jms=[];
                result.docs.forEach((d) => {
                    let j = d.data();
                    j.id=d.id;
                    jms.push(j);
                })
                resolve(jms);  
            })

            .catch((error) => {
               console.log('error: ', error)
                // reject('Usuario no existe', error)

            })
            
        });
    };
    static addPatientToUser(userID, newpatient){
        return new Promise((resolve, reject) => {
            console.log('inputs en el dataservice ', userID, newpatient);
            firebase.firestore().collection('users').doc(userID).update({
                userpatients : newpatient})
            .then((result) => {
                console.log("patient succesfully added to the User ")
                resolve(result);
            })

            .catch((error) => {
                var errorCode = error.code;
                console.log('ERROR patient NOT added to user: ', error);                
            })
            
        });
    }

    
}