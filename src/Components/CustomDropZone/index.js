import React, { Component } from 'react';
import * as firebase from 'firebase';
import Dropzone from 'react-dropzone';

// CSS
import './index.css'; 

import UploadService from '../services/UploadService'

export default class CustomDropZone extends React.Component {
    constructor() {
      super()
      this.state = { 
        uploadProgress : 0,
        loading        : false,
        error          : ''
       }
    }
  
    onDrop(files) {
        if(files[0]){
            const f = files[0];

            UploadService.uploadFile(f, this.props.uploadFolder).then(
                (downloadURL)=>{
                    this.setState({ loading: false });
                    this.props.onFileUpload(downloadURL);
                },
                    
                (error)=>{
                    this.setState({
                        error: error,
                        loading: false
                    });  
                }
            );

            const fileName = `${+(new Date())}-${f.name}`;
            const storageRef = firebase.storage().ref();
            const myImageRef = storageRef.child(`${this.props.uploadFolder}/${fileName}`);
            const uploadTask = myImageRef.put(f);

            uploadTask.on( //Recibe un string y tres funciones
                'state_changed', 
                (snapshot) => {
                    const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.setState({
                        uploadProgress: percentage,
                        loading: true
                    });
                }, 
                (error) => {
                    this.setState({
                        error: 'Ocurrió un error subiendo el archivo',
                        loading: false
                    });
                }, 
                () => {
                    // Upload complete
                    uploadTask.snapshot.ref.getDownloadURL()
                        .then((downloadURL) => {
                            this.setState({ loading: false });
                            this.props.onFileUpload(downloadURL);
                        });
                }
            );
        }
    }
  
    render() {
        const { loading, uploadProgress, error } = this.state;
        const { acceptedFiles } = this.props;

        return (
            <div className="dropzone">
                <Dropzone 
                    onDrop={this.onDrop.bind(this)}
                    accept={acceptedFiles}
                    disabled={loading}
                >
                {this.loading ? 
                    <p>Loading: {uploadProgress}%</p>
                    :
                    error ? <p>{error}</p> : <p>{this.props.text}</p>}
                </Dropzone>
            </div>
        );
    }
}