import React, { Component } from 'react';
import * as firebase from 'firebase';
import Dropzone from 'react-dropzone';

import UploadService from '../services/UploadService'

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  }
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };
  
export default class DropzoneWithPreview extends React.Component {
    constructor() {
      super()
      this.state = {
        files: []
      };
    }
  
    onDrop(files) {
      this.setState({
        files: files.map(file => Object.assign(file, {preview: URL.createObjectURL(file)}))
      });
    }
  
    componentWillUnmount() {
      // Make sure to revoke the data uris to avoid memory leaks
      this.state.files.forEach(f => URL.revokeObjectURL(f.preview))
    }
  
    render() {
      const {files} = this.state;
  
      const thumbs = files.map(file => (
        <div style={thumb}>
          <div style={thumbInner}>
            <img
              src={file.preview}
              style={img}
            />
          </div>
        </div>
      ));
  
      return (
        <section>
          <div className="dropzone">
            <Dropzone
              accept="image/*"
              onDrop={this.onDrop.bind(this)}
            />
          </div>
          <aside style={thumbsContainer}>
            {thumbs}
          </aside>
        </section>
      );
    }
}
  