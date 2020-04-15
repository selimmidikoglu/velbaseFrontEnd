import React, { Component } from 'react'
import NavigationComponent from '../NavigationComponent/navigationComponent'
import './aboutuscomponent.css'
import FooterComponent from '../FooterComponent/footerComponent'
class Aboutuscomponent extends Component {
    render() {
        return (
            <div style={{ backgroundColor: 'white' }}>
                <NavigationComponent />
                <div className="container" style={{height:'100%'}}>
                    <div className="row">
                        <div className="col-12 header-about-us-container">
                            <label className="header-about-us">Velbase</label>
                        </div>
                        <div className="col-md-6 sub-text-container">
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
                    </div>
                </div>
                <FooterComponent/>
            </div>
        )
    }
}

export default Aboutuscomponent;