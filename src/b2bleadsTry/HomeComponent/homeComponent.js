import React, { Component } from 'react'
import NavigationComponent from '../NavigationComponent/navigationComponent'
import './homeComponent.css'
import { Link } from 'react-router-dom'
import image1 from './process1.JPG';
import image2 from './process2.JPG';
import Hand from './Main03_1.png'
import Target from './Main03_2.png'
import Arrow from './Main03_3.png'
import Illus from './Main03_0.png'
import IllusPng from '../DumbComponents/IconComponent/hero-image.png'
import IconComponentColored from '../DumbComponents/IconComponent/iconComponentColored'
import AimIcon from '../DumbComponents/IconComponent/AimIcon'
import SelectIcon from '../DumbComponents/IconComponent/SelectIcon'
import TargetIcon from '../DumbComponents/IconComponent/TargetIcon'
import BackgroundLogo from '../DumbComponents/IconComponent/BackgroundLogo'
import FooterComponent from '../FooterComponent/footerComponent';
export default class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [image1, image2, image2]
        }
    }
    changeImage(id) {
        let images = this.state.images
        if (id == 1) {

        }
        else if (id == 2) {

        }
        else {

        }
    }
    render() {
        return (
            <div style={{ backgroundColor: 'white',minHeight:'100%', margin: '0 auto -150px' }}>
                <NavigationComponent />
                <div className="fluid-container home-page-bs-container colored-texts" >
                    <div className="container" style={{marginTop:'0px'}}>
                        <div className="row " >
                            <div className="col-sm-12 col-md-8 col-lg-6 home-text-container">
                                <div className=" col-sm-8 col-md-10 col-lg-12">
                                    <header className="home-page-main-header">Ready to grow your business?</header>
                                    <label className="home-page-sub-header">We can help!</label>

                                </div>
                                <div className="col-10 col-sm-8 col-md-7 col-lg-9">
                                    <p style={{ color: 'white' }} className="home-page-small-text">Velbase is trusted company that can provide you with what you need to make your business flourish. We have over 12,000,000 business leads
                                    that can amplify your service needs immediately! We've broken down our leads into categories to simplify your needs.
                                </p>

                                </div>
                                {/*<div className="col-sm-12 col-md-7 how-to-use-container">
                                <div className="first-image-cascade">
                                </div>
                                <div className="second-image-cascade">
                                </div>
                                <div className="third-image-cascade">
                                </div>
                            </div>*/}
                                <div className="col-12">
                                    <Link style={{ textDecoration: 'none' }} to={{ pathname: "/leads", state: { section: 'full_data' } }} >
                                        <button className="discover-leads-button">

                                            Get Started

                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4 col-lg-6" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img class="illus-image" src={IllusPng} />
                            </div>

                        </div>

                    </div>
                </div>
                <div className="container" style={{ backgroundColor: 'white', paddingTop: '20px', marginTop: 0, marginBottom: 0 }}>
                    <div className="row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px', marginBottom: '40px' }}>
                        <label className="home-page-small-text-question">
                            Want to see how easy our process
                        </label>
                    </div>
                    <div className="row">

                        <div className="col-sm-12 col-md-4 direction-text-containers">
                            <div className="center-direction-text direction-image-container" style={{ marginBottom: '10px' }}><SelectIcon /></div>
                            <div className="center-direction-text"><label className="home-page-small-text">Select the type of</label></div>
                            <div className="center-direction-text"><label className="home-page-small-text">leads you need</label></div>
                        </div>
                        <div className="col-sm-12 col-md-4 direction-text-containers">
                            <div className="center-direction-text direction-image-container" style={{ marginBottom: '10px' }}><AimIcon /></div>
                            <div className="center-direction-text"><label className="home-page-small-text">Narrow your selection </label></div>
                            <div className="center-direction-text"><label className="home-page-small-text">to a specific demographic</label></div>
                        </div>
                        <div className="col-sm-12 col-md-4 direction-text-containers">
                            <div className="center-direction-text direction-image-container" style={{ marginBottom: '10px' }}><TargetIcon /></div>
                            <div className="center-direction-text"><label className="home-page-small-text">Get your leads </label></div>
                            <div className="center-direction-text"><label className="home-page-small-text">delivered to your email</label></div>
                        </div>
                    </div>

                </div>
                <div className="fluid-container" style={{ height: 'auto', backgroundColor: 'rgb(244, 251, 255)', paddingTop: '20px', marginBottom: '0px' }}>
                    <div className="row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', marginBottom: '10px' }}>
                        <label className="home-page-small-text-question">
                            About Velbase
                        </label>
                    </div>
                    <div className="row" >
                        <div className="col-12" style={{ alignItems: 'center', justifyContent: 'center', marginTop: '50px' }}>
                            <div className="center-direction-text"><label className="home-page-small-text" style={{ color: 'black' }}>
                                Velbase is an internationally recognized company that helps you make the</label></div>

                            <div className="center-direction-text"><label className="home-page-small-text" style={{ color: 'black' }}>connections you
                                need from a company you can trust.Created in 2019, by Intenwin, </label></div>
                            <div className="center-direction-text"><label className="home-page-small-text" style={{ color: 'black' }}>Velbase provides
                                consumers with laser targeted business lists filtered by location, </label></div>
                            <div className="center-direction-text"><label className="home-page-small-text" style={{ color: 'black' }}>category, annual revenue,
                            employee count, and more!
                                new clients,</label></div>


                        </div>

                    </div>

                    <div className="row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px' }}>
                        <Link style={{ textDecoration: 'none' }} to={{ pathname: "/questions", state: { section: 'full_data' } }} >
                            <button className="discover-leads-button" style={{ marginTop: '-10px' }}>

                                Read More

                            </button>
                        </Link>
                    </div>
                    <div className="row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <BackgroundLogo />
                    </div>


                </div>
                <div className="container" style={{ height: 'auto', backgroundColor: 'white', paddingTop: '20px', marginTop: '20px',padding:'20 px' }}>
                    <div className="row">
                        <div className="col-6" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <label className="home-page-small-text-question">
                                Ready to get started?
                        </label>
                        </div>
                        <div className="col-6" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', outline:'none' ,border:'none' }}>
                            <Link style={{ textDecoration: 'none', outline:'none',border:'none' }} to={{ pathname: "/leads", state: { section: 'full_data' } }} >
                                <button className="discover-leads-button" style={{ margin: 'auto' }}>

                                    Start Now

                                </button>
                            </Link></div>
                    </div>
                </div>
                <FooterComponent/>
            </div>
        )
    }
}
