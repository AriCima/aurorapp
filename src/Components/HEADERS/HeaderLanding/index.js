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
                        <Link to="/href"><p>La App</p></Link>
                    </div>

                    <div className="nav-block">
                        <Link to="/href"><p>Nosotros</p></Link>
                    </div>

                    <div className="nav-block">
                        <Link to="/href"><p>Contacto</p></Link>
                    </div>

                </div>

                <div className="header-right">

                        <div className="nav-block">
                            <Link to="/login"><p>Log-in</p></Link>
                        </div>

                        <div className="nav-block">
                            <Link to="/register"><p>Sign-up</p></Link>
                        </div>
                    </div>

            </div>
                            

        );
    }
}
export default HeaderLanding;
