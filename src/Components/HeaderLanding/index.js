import React, { Component } from 'react'
import {Link} from 'react-router-dom';

import './index.css';

class HeaderLanding extends Component {
  

    render() {
        return (

            <div className="landing-header">

                <div className="lheader-left">

                    <div className="lnav-block">
                    <Link to="/href"> AurorApp</Link>
                    </div>

                </div>

                <div className="lheader-right">

                    <div className="lnav-block">
                        <Link to="/href">La App</Link>
                    </div>

                    <div className="lnav-block">
                        <Link to="/href">Nosotros</Link>
                    </div>

                    <div className="lnav-block">
                        <Link to="/href">Contacto</Link>
                    </div>

                    
                    <div className="lnav-block">
                        <Link to="/register">Sign-up</Link>
                    </div>

                    <div className="lnav-block">
                        <Link to="/login">Log-In</Link>
                    </div>

                </div>

            </div>
                            

        );
    }
}
export default HeaderLanding;
