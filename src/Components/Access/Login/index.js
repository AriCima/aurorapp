import React, { Component } from 'react';
import {Link} from 'react-router-dom';

// SERVICES API
import AuthService from '../../services/AuthService'

import './index.css';
import DataService from '../../services/DataService';

class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            userId      : '',
            patInfo     : '',
            email       : '',
            password    : '',
            emailError  : false,
            loginError  : '',
        }

        this.login              = this.login.bind(this);
        this.onChangeEmail      = this.onChangeEmail.bind(this);
        this.onChangePassword   = this.onChangePassword.bind(this);
    }

    onChangeEmail(event){
        this.setState({email: event.target.value})
    }

    onChangePassword(event){
        this.setState({password: event.target.value})
    }

    login(e){
        e.preventDefault();
        let error = false;

        if(this.state.email === ''){
            this.setState({emailError: true});
            error = true;
        }

        if(this.state.password === ''){
            this.setState({passwordError: true});
            error = true;
        }

        if(!error){
            this.setState({loginError: ''});

            AuthService.login(this.state.email, this.state.password)
                .then((result)=>{
                    let patID = '';
                    // console.log('Result de Login', result)
                   //console.log('Result.user.uid de Login', result.user.uid)
                  let userID = result.user.uid;
                  //    this.setState({userId : result.user.uid});
                  //    console.log('this.state.userId en el Login = ', this.state.userId);
                   DataService.getPatientInfoALT(userID)
                   .then(result => {
                    //    console.log('el result = ', result)
                    patID = result.patID;
                    // console.log('patID1 = ', patID)
                    
                    this.setState({patInfo: result})
                    // console.log('patInfo = ', this.state.patInfo);
                   this.props.propsFn.push(`/patient-overview`) 
                   })
                   .catch(error => {
                    var errorCode = error.code;
                    console.log("patient could not be loaded: ", errorCode);
                  })
                },(error)=>{
                    this.setState({loginError: error});
                }
            );
           
            
        }

        
    }

    render(){
      const {emailError, loginError} = this.state;
      return (

        <div className="background-login">

          <div className="inner-container">

              <form onSubmit={this.login}> 
              
                <div className="box">
                      
                      <input 
                          type="email" 
                          placeholder="Email"
                          value={this.state.email} 
                          onChange={this.onChangeEmail}
                      />
                      {emailError && <span className="form-error">Campo obligatorio</span>}
                  
                      <input 
                          type="password" 
                          placeholder="Password"
                          value={this.state.password} 
                          onChange={this.onChangePassword}
                      />
                  

                  <div>
                      {loginError && <span>{loginError}</span>}
                  </div>

                    <div className="sendArea">
                        <button>Sign-In</button>
                        <p>Not a member?</p>
                        <div className="sendArea-register">
                           <Link to="/register"><p>Register</p></Link>
                        </div>
                    </div>
                </div>
              </form>
            </div>
        </div>
      );
  }
}

export default Login;
