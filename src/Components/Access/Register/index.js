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
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
  }

  onChangeState(field, value){
    let userInfo = this.state;
    userInfo[field] = value;
    this.setState(userInfo)
};

  onChangeEmail(event){
    this.setState({email: event.target.value})
  }

  onChangeName(event){
    this.setState({name: event.target.value})
  }

  onChangePassword(event){
    this.setState({password: event.target.value})
  }
  onChangePasswordConfirm(event){
    this.setState({passwordConfirm: event.target.value})
  }

  onChangePasswordConfirm(event){
    this.setState({passwordConfirm: event.target.value})
  }

  register(e){
    e.preventDefault();
    let error = false;

    if(this.state.email == ''){
      this.setState({emailError: true});
      error = true;
    }
    if(this.state.password == ''){
      this.setState({passwordError: true});
      error = true;
    }

    if(this.state.password !== this.state.passwordConfirm){
      this.setState({passwordError: true});
      error = true;
    }
  
    if(!error){
      AuthService.register(this.state.email, this.state.password)
        .then((result)=>{
          console.log("Welcome new user ID:", result.user.uid);
          let userID = result.user.uid;
          this.setState({userId : userID})

          let userToRegister = {
            name        : this.state.name,
            email       : this.state.email, 
          }

          DataService.saveUserInfoInFirestore(result.user.uid, userToRegister)
          this.props.propsFn.push(`/home/${this.state.userId}`)
      },(error)=>{
          this.setState({registerError: error});
        }
      );
    }

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
                onChange={this.onChangeState}
                // onChange={this.onChangeName}
              />

              <input 
                type="email" 
                placeholder="Email"
                value={this.state.email} 
                onChange={this.onChangeState}
                // onChange={this.onChangeEmail}
              />
              {emailError && alert("Email is mandatory")}

              <input 
                type="password" 
                placeholder="Password"
                value={this.state.password} 
                onChange={this.onChangeState}
                // onChange={this.onChangePassword}
              />

              <input 
                type="password" 
                placeholder="Confirm Password"
                value={this.state.passwordConfirm} 
                onChange={this.onChangeState}
                // onChange={this.onChangePasswordConfirm}
              />
              {passwordError && alert("Passwords don't match!")}

              <div className="form-item">
                <button type="submit">Register</button>
              </div>
            </div>

          </form>
        </div>
      </div>

    );
  }

}