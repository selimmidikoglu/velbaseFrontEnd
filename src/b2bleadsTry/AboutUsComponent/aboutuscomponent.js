import React, { Component } from 'react';
import NavigationComponent from '../NavigationComponent/navigationComponent';
import './aboutuscomponent.css';
import FooterComponent from '../FooterComponent/footerComponent';
import BackgroundLogo from '../DumbComponents/IconComponent/BackgroundLogo';
class Aboutuscomponent extends Component {
    render() {
        return (
            <div
                style={{
                    backgroundColor: 'white',
                    minHeight: '100%',
                    bottom: '0',
                    margin: '0 auto -150px',
                }}
            >
                <NavigationComponent />
                <div className="fluid-container main-header-container-asked-questions">
                    <label className="main-header-asked-questions-text">About Us</label>
                </div>
                <div className="container" style={{ height: '100%' }}>
                    <div className="row">
                       
                        <div className="col-sm-1 col-md-2 col-lg-2 header-about-us-container" />
                        <div className="col-sm-10 col-md-8 col-lg-8 sub-text-aboutus-container">
                            <label className="header-about-us">Laser targeted business lists.</label>
                            <p className="aboutus-sub-text">
                                Velbase is an internationally recognized company that helps you make the connections you
                                need from a company you can trust. Created in 2019, by Intenwin, Velbase provides
                                consumers with laser targeted business lists filtered by location, category, annual revenue,
                                employee count, and more! We’ve done the work for you, and can assist you in researching
                                new clients, preparing an email campaign, connecting with potential customers…and more!
                            </p>
                            <p className="aboutus-sub-text">
                                You choose the type of leads that would be most beneficial to your growing company, and they
                                are immediately sent your way! Find customers who are interested in your products without
                                having to spend time and energy gathering them yourself! We help you take the guesswork out
                                of generating business.
                            </p>
                            <p className="aboutus-sub-text">
                                Let us help you make the best connections possible to increase your sales potential.
                            </p>
                        </div>
                        <div className="col-sm-1 col-md-2 col-lg-2" />
                    </div>
                </div>

                <div style={{position:'fixed', bottom: '0px', right: '0', left: '0' }}>
                    <div
                        style={{
                            marginBottom: '-20px',
                            width: '100%',
                            padding: 'auto',
                            textAlign: 'center',
                        }}
                    >
                        <BackgroundLogo />
                    </div>
                    <FooterComponent />
                </div>
            </div>
        );
    }
}

export default Aboutuscomponent;
