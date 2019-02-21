import React, { Component } from 'react'
import {Link} from 'react-router-dom';

import '../HeaderGral/index.css';

class HeaderLanding extends Component {
  

    render() {
        return (

            <div className="header">

                <div className="header-left">

                    <div className="nav-block">
                    <Link to="/href"> AurorApp</Link>
                    </div>

                </div>

                <div className="header-mid">

                    <div className="nav-block">
                        <Link to="/href">La App</Link>
                    </div>

                    <div className="nav-block">
                        <Link to="/href">Nosotros</Link>
                    </div>

                    <div className="nav-block">
                        <Link to="/href">Contacto</Link>
                    </div>

                </div>

                <div className="header-right">

                        <div className="nav-block">
                            <Link to="/login">Log-In</Link>
                        </div>

                        <div className="nav-block">
                            <Link to="/register">Sign-up</Link>
                        </div>
                    </div>

            </div>
                            

        );
    }
}
export default HeaderLanding;
