import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';

import './index.css';

class Header extends Component {
   constructor(props){
    super(props);

    this.state = {
        user : this.props.user,
    }

    this.signOut = this.signOut.bind(this);

   }

    signOut(){   //Esta función informa a FireBase sobre el logout y FB automáticamente ejecuta el onAuthStateChange del App
        firebase.auth().signOut()
            .then(() => {
                alert('See you later !') // Sign-out successful.
            })
            .catch(() => {
                alert("Ups! Seems you'll have to stay longer")// An error happened.
        });
    }

    render() {
        console.log('el user en el Header', this.props.user)
        return (

            <div className="header">

                <div className="header-left">
                    <div className="title">
                     {this.props.user &&   <p>{this.props.user.name}</p>}
                    </div>
                </div>

                <div className="header-mid">

                    <div className="nav-block">
                    {!this.props.user ? <p>AurorApp</p>
                        :<Link to={`/home/${this.props.user.uid}`}>Home</Link>
                    } 
                    </div>

                    
                </div>

                <div className="header-right">

                    <div className="nav-block">
                        {this.props.user ? 
                            <span onClick={this.signOut}><Link to="/login">Sign-out</Link></span>
                            :
                            <Link to="/login">Sign-In</Link>}
                    </div>

                </div>

            </div>
                            

        );
    }
}
export default Header;
