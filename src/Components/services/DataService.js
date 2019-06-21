import firebase from "firebase";

export default class DataService {
  // * * * * * * * * * USERS * * * * * * * * *

  static saveUserInfoInFirestore(userId, userToSave) {
    //registro en Firebase
    // console.log("el user recibido en el registro firestore es:", userId)
    console.log("el userToSave recibido en firestore es: ", userToSave)
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .set(userToSave)
        .then(result => {
          console.log("User information succesfully saved !");
          resolve(result);
        })

        .catch(error => {
          var errorCode = error.code;
          console.log("User NOT added: ", errorCode);
        });
    });
  };
  static getUserInfo(userId) {
    //console.log('el userID recibido es = ', userId);
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .get()

        .then(result => {
          //console.log('el result del getuser Info = ', result.data())
          resolve(result.data()); // OBTENGO TODO LO QUE TENGO ALMACENADO DE ÉSTE USUARIO
        })
        .catch(error => {
          reject("Usuario no existe");
        });
    });
  };
  static getUserPatients(userId) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("patients")
        .where(`adminId`, `==`, userId)
        .get()

        .then(result => {
          let pats = [];
          result.docs.forEach(d => {
            let j = d.data();
            j.id = d.id;
            pats.push(j);
          });

          resolve(pats);
        })
        // .then((result) => {
        //     //console.log('el result del getuser Info = ', result.data())
        //     resolve(result.data());
        //     console.log('result.data() en el get user patients', result.data()) // OBTENGO TODO LO QUE TENGO ALMACENADO DE ÉSTE USUARIO
        // })
        .catch(error => {
          reject("Usuario no existe");
        });
    });
  };

  // * * * * * * * * * PATIENT * * * * * * * * *
  static newPatientALT(userID, newPatientInfo) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("users")
        .doc(userID)
        .collection("patients")
        .add(newPatientInfo)


        .then(result => {
          const patRef = result.get();
          console.log(`pat ID = ${result.id}, patRef = ${patRef} patient succesfully added !`
          );
          resolve(result);
        })
        .catch(error => {
          var errorCode = error.code;
          console.log("patient could not be added: ", errorCode);
        });
    });
  };
  static getPatientInfoALT(userID) {
    return new Promise((resolve, reject) => {
      firebase
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("patients")
      .get()

      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // console.log(doc.id, " => ", doc.data());
          let patInfo = {patID: doc.id, patData: doc.data()}
          resolve(patInfo)
        })
      })
      .catch(error => {
        var errorCode = error.code;
        console.log("patient could not be found: ", errorCode);
      })
    })   

  };
  // Para solicitar la info desde PatOverview
  static getPatientInfoALT2(userID) {
    // console.log('user en el getP2 :', userID)
    return new Promise((resolve, reject) => {
      firebase
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("patients")
      .get()

      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // console.log(doc.id, " => ", doc.data());
          let patInfo = {patID: doc.id, patData: doc.data()}
          resolve(patInfo)
        })
      })
      .catch(error => {
        var errorCode = error.code;
        console.log("patient could not be found: ", error);
      })
    })   

  };

  // static newPatient(patientInfo) {
  //   return new Promise((resolve, reject) => {
  //     firebase
  //       .firestore()
  //       .collection("patients")
  //       .add(patientInfo)

  //       .then(result => {
  //         const patRef = result.get();
  //         console.log(
  //           `pat ID = ${
  //             result.id
  //           }, patRef = ${patRef} patient succesfully added !`
  //         );
  //         resolve(result);
  //       })
  //       .catch(error => {
  //         var errorCode = error.code;
  //         console.log("patient could not be added: ", errorCode);
  //       });
  //   });
  // };
  static newPatientOwnType(ownType) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("ownEventTypes")
        .add(ownType)

        .then(result => {
          console.log(`${result.id} OwnType succesfully added !`);
          resolve(result);
        })

        .catch(error => {
          var errorCode = error.code;
          console.log("patient could not be added: ", errorCode);
        });
    });
  }
  static newPatientDetonations(detoInfo) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("ownDetonations")
        .add(detoInfo)

        .then(result => {
          console.log(`${result.id} Detonations succesfully added !`);
          resolve(result);
        })

        .catch(error => {
          var errorCode = error.code;
          console.log("patient could not be added: ", errorCode);
        });
    });
  }
  static editPatient(patID, patientInfo) {
    return new Promise((resolve, reject) => {
      console.log("patientInfo.adminId", patientInfo.adminId);

      firebase
        .firestore()
        .collection("patients")
        .doc(patID)
        .update({
          patient: patientInfo.adminId,
          patientName: patientInfo.name,
          patientSurname: patientInfo.surname,
          birthDate: patientInfo.born,
          birthWeight: patientInfo.weight,
          pregIssues: patientInfo.pIssues,
          birthIssues: patientInfo.bIssues
        })

        .then(result => {
          console.log(`${result.id} patient succesfully EDITED !`);
          resolve(result);
        })

        .catch(error => {
          var errorCode = error.code;
          console.log("patient could not be EDITED: ", errorCode);
        });
    });
  }
  static getPatientInfo(patientId) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("patients")
        .doc(patientId)
        .get()

        .then(result => {
          resolve(result.data());
        })

        .catch(error => {
          var errorCode = error.code;
          console.log("Error al cargar la patientInfo: ", errorCode);
        });
    });
  }
  static addPatientToUser(userID, newpatient) {
    return new Promise((resolve, reject) => {
      console.log("inputs en el dataservice ", userID, newpatient);
      firebase
        .firestore()
        .collection("users")
        .doc(userID)
        .update({
          userPatients: newpatient
        })
        .then(result => {
          console.log("patient succesfully added to the User ");
          resolve(result);
        })

        .catch(error => {
          console.log("ERROR patient NOT added to user: ", error);
        });
    });
  }

  //  * * * * * * * * * * * * * * * EVENTS * * * * * * * * * * * * * * *


  static newEvent(stateInfo) {
    console.log("info del estado a guardar = ", stateInfo);
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("events")
        .add(stateInfo)

        .then(result => {
          // console.log(`${result.id} Event succesfully added !`)
          resolve(result);
        })

        .catch(error => {
          var errorCode = error.code;
          console.log("patient could not be added: ", errorCode);
        });
    });
  };
  static newEventSub(stateInfo,patID) {
    console.log("info del estado a guardar = ", stateInfo);
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection(`patients/${patID}/pat-events`)
        .add(stateInfo)

        .then(result => {
          // console.log(`${result.id} Event succesfully added !`)
          resolve(result);
        })

        .catch(error => {
          var errorCode = error.code;
          console.log("patient could not be added: ", errorCode);
        });
    });
  };
  static getPatientsEvents(patID) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("events")
        .where("patientId", "==", patID)
        .get()
        .then(result => {
          let events = [];
          result.docs.forEach(d => {
            let j = d.data();
            j.id = d.id;
            events.push(j);
          });
          resolve(events);
        })
        .catch(error => {
          console.log("error: ", error);
        });
    });
  }
  static getEventInfo(eventID) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("events")
        .doc(eventID)
        .get()

        .then(result => {
          resolve(result.data());
        })

        .catch(error => {
          var errorCode = error.code;
          console.log("Error al cargar la patientInfo: ", errorCode);
        });
    });
  }
  static updateEventInfo(eventID, eventInfo) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("events")
        .doc(eventID)
        .update({
          date: eventInfo.date,
          startTime: eventInfo.startTime,
          duration: eventInfo.duration,
          type: eventInfo.type,
          ownType: eventInfo.ownType,
          clinicObservation: eventInfo.clinicObservation,
          action: eventInfo.action,
          detonation: eventInfo.detonation,
          ownDetonation: eventInfo.ownDetonation,
          intensity: eventInfo.intensity,
          state: eventInfo.state
        })
        .then(result => {
          console.log(`Event ${result.id} succesfully EDITED !`);
          resolve(result);
        })
        .catch(error => {
          var errorCode = error.code;
          console.log("Error al cargar la patientInfo: ", errorCode);
        });
    });
  }
  static updateEventTypes(patID, typeArray) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("patients")
        .doc(patID)
        .update({
          ownEventTypes: typeArray
        })
        .then(result => {
          console.log(`Type succesfully UPDATED !`);
          resolve(result);
        })
        .catch(error => {
          var errorCode = error.code;
          console.log("Error al cargar la patientInfo: ", errorCode);
        });
    });
  }
  static addEventType(newType) {
    console.log("add eventType launched");
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("ownEventTypes")
        .add(newType)
        .then(result => {
          console.log(`${result.id} New Event Type succesfully created !`);
          resolve(result);
        })

        .catch(error => {
          var errorCode = error.code;
          console.log("New-Event-Type could not be added: ", errorCode);
        });
    });
  }
  static setEventType(docID, newType) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("ownEventTypes")
        .doc(docID)
        .set(newType)
        .then(result => {
          console.log(`${result.id} New Event Type succesfully created !`);
          resolve(result);
        })

        .catch(error => {
          var errorCode = error.code;
          console.log("New-Event-Type could not be added: ", errorCode);
        });
    });
  };
  static getEventOwnType(patID) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("ownEventTypes")
        .where(`patientId`, `==`, patID)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            console.log("doc.data() / doc.id", doc.data(), " / ", doc.id);
            resolve({ types: doc.data().ownTypes, id: doc.id });
          });
        })
        .catch(error => {});
    });
  };
  static addDetonation(newDeto) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("ownDetonations")
        .add(newDeto)

        .then(result => {
          console.log(`${result.id} Own Detonations succesfully created !`);
          resolve(result);
        })

        .catch(error => {
          var errorCode = error.code;
          console.log("New-Event-Type could not be added: ", errorCode);
        });
    });
  }
  static setDetonation(docID, newDeto) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("ownDetonations")
        .doc(docID)
        .set(newDeto)

        .then(result => {
          console.log(`${result.id} Own Detonations succesfully created !`);
          resolve(result);
        })

        .catch(error => {
          var errorCode = error.code;
          console.log("New-Event-Type could not be added: ", errorCode);
        });
    });
  }
  static updateEventDetonations(patID, detoArray) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("patients")
        .doc(patID)
        .update({
          ownDetonations: detoArray
        })
        .then(result => {
          console.log(`Detonation succesfully UPDATED !`);
          resolve(result);
        })
        .catch(error => {
          var errorCode = error.code;
          console.log("Error al cargar la patientInfo: ", errorCode);
        });
    });
  }
  static getOwnDetonations(patID) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("ownDetonations")
        .where(`patientId`, `==`, patID)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            resolve({ types: doc.data().ownDetonations, id: doc.id });
          });
        })
        .catch(error => {});
    });
  }

  // * * * * * * * * * * * * * * * MEDICINES * * * * * * * * * * * * * * *

  static newMedicineALT(userID, patID, medInfo) {
    console.log('newMedALT launched con ', userID, patID, medInfo)
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("users")
        .doc(userID)
        .collection('patients')
        .doc(patID)
        .collection('medicines')
        .add(medInfo)

        .then(result => {
          console.log(`${result.id} Med succesfully registered !`);
          resolve(result);
        })

        .catch(error => {
          var errorCode = error.code;
          console.log("patient could not be added: ", errorCode);
        });
    });
  };

  static getPatientsMeds(patID) {
    // console.log('getPatMeds laucnhed with ', patID)
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("medicines")
        .where("patientId", "==", patID)
        .get()
        .then(result => {
          let meds = [];
          result.docs.forEach(d => {
            let j = d.data();
            j.id = d.id;
            meds.push(j);
          });
          resolve(meds);
        })
        .catch(error => {
          console.log("error: ", error);
        });
    });
  }
  static getSingleMedHistory(patID, medName) {
    return new Promise((resolve, reject) => {
      let dName = medName.toUpperCase();
      firebase
        .firestore()
        .collection("medicines")
        .where("patientId", "==", patID)
        .where("drugName", "==", dName)
        .get()
        .then(result => {
          let meds = [];
          result.docs.forEach(d => {
            let j = d.data();
            j.id = d.id;
            meds.push(j);
          });
          resolve(meds);
        })
        .catch(error => {
          console.log("error: ", error);
        });
    });
  }

  static getPatMeds(userID, patID){
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("users")
        .doc(userID)
        .collection('patients')
        .doc(patID)
        .collection('medicines')
        .orderBy("drugName").orderBy("date", "desc")
        .get()
        .then(result => {
            let meds = [];
            result.docs.forEach(d => {
            let j = d.data();
            j.id = d.id;
            meds.push(j);
          });
            resolve(meds);
        })
        .catch(error => {
          console.log("error: ", error);
        });
    });
  };

        

  
  // * * * * * * * * * * * * * * * WEIGHTS * * * * * * * * * * * * * * *


  static newWeightALT(userID, patID, newWeightInfo) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("users")
        .doc(userID)
        .collection("patients")
        .doc(patID)
        .collection("weight")
        .add(newWeightInfo)


        .then(result => {
          const weightRef = result.get();
          console.log(`Weight ID = ${result.id}, weightRef = ${weightRef} patient succesfully added !`
          );
          resolve(result);
        })
        .catch(error => {
          var errorCode = error.code;
          console.log("patient could not be added: ", errorCode);
        });
    });
  };

  static addWeight(weightInfo) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("weight")
        .add(weightInfo)

        .then(result => {
          console.log(`${result.id} Weight succesfully registered !`);
          resolve(result);
        })

        .catch(error => {
          var errorCode = error.code;
          console.log("patient could not be added: ", errorCode);
        });
    });
  }
  static getPatientsWeights(patID) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("weight")
        .where("patientId", "==", patID)
        .get()
        .then(result => {
          let weights = [];
          result.docs.forEach(d => {
            let j = d.data();
            j.id = d.id;
            weights.push(j);
          });
          resolve(weights);
        })
        .catch(error => {
          console.log("error: ", error);
        });
    });
  }
}
