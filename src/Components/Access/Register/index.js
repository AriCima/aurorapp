import React, { Component } from 'react';
import firebase from 'firebase';

import AuthService from '../../services/AuthService';
import DataService from '../../services/DataService';


import './index.css';


export default class Register extends Component {
  constructor(props){
    super(props);

    this.state = {
      email           : '',
      name            : '',
      password        : '',
      passwordConfirm :'',
      userId          : '',
      passwordError   : false,
      emailError      : false,
    }

    this.db = firebase.auth();
    this.database = firebase.database();

    this.register = this.register.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
  }

  onChangeState(field, value){
    let userInfo = this.state;
    userInfo[field] = value;
    this.setState(userInfo)
};


  register(e){
    e.preventDefault();
    let error = false;
    let errorMessage = '';

    if(this.state.email === ''){
      this.setState({emailError: true});
      error = true;
      errorMessage = 'Invalid email address';
    }
    if(this.state.password.length <= 5){
      this.setState({passwordError: true});
      error = true;
      errorMessage = 'Password must have at least 6 characters';
    }

    if(this.state.password !== this.state.passwordConfirm){
      this.setState({passwordError: true});
      error = true;
      errorMessage = 'Passwords dont match!';
    }
  
    if(!error){
      AuthService.register(this.state.email, this.state.password)
        .then((result)=>{
          console.log("Welcome new user ID:", result.user.uid);
          let userID = result.user.uid;
          this.setState({userId : userID})

          let userToRegister = {
            name          : this.state.name,
            email         : this.state.email, 
          }

          DataService.saveUserInfoInFirestore(result.user.uid, userToRegister)
          this.props.propsFn.push(`/add_patient/${this.state.userId}`)

      },(error)=>{
          this.setState({registerError: error});
        }
      );
    } else {
      console.log('errormessage = ', errorMessage);
      alert(`Error:  ${errorMessage}`)
    };

  }

  render(){
    const {emailError, passwordError} = this.state;

    return (

      <div className="background-register">
      
        <div className="inner-container">
        
          <form onSubmit={this.register}> 

            <div className="box">
        
              <input 
                type="name" 
                placeholder="Nombre"
                value={this.state.name} 
                onChange={(e)=>{this.onChangeState('name', e.target.value)}}
              />

              <input 
                type="email" 
                placeholder="Email"
                value={this.state.email} 
                onChange={(e)=>{this.onChangeState('email', e.target.value)}}
              />
              {emailError && alert("Email is mandatory")}

              <input 
                type="password" 
                placeholder="Contraseña"
                value={this.state.password} 
                onChange={(e)=>{this.onChangeState('password', e.target.value)}}
              />

              <input 
                type="password" 
                placeholder="Confirm Password"
                value={this.state.passwordConfirm} 
                onChange={(e)=>{this.onChangeState('passwordConfirm', e.target.value)}}
              />
              {/* {passwordError && alert("Passwords don't match!")} */}

              <div className="form-item">
                <button type="submit">Registrar</button>
              </div>
            </div>

          </form>
        </div>
      </div>

    );
  }

}