import React from 'react';

// CSS
import './index.css'; 


export default class Landing extends React.Component {

  
    render(){

        return (
            <div className="landing-body">
            
                <div className="the-app">
                    <div className="the-app-box">
                        <div className="the-app-text">
                            <h4>"AurorApp" facilita el <span>registro</span> de eventos de epilepsia refractaria. </h4>
                            <h4>Presentación de <span>estadísticas</span>.</h4>
                        </div>
                    </div>

                </div>

                <div className="about-us">
                
                </div>

                <div className="contact">
                
                </div>
            
            </div>
        )
    }
}
