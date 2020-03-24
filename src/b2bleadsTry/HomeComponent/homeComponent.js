import React, { Component } from 'react'
import NavigationComponent from '../NavigationComponent/navigationComponent'
import './homeComponent.css'
import { Link } from 'react-router-dom'
import image1 from './process1.JPG';
import image2 from './process2.JPG';
export default class HomeComponent extends Component {
    constructor(props){
        super(props);
        this.state ={
            images : [image1,image2,image2]
        }
    }
    changeImage (id) { 
        let images  = this.state.images
        if(id == 1){
            
        }
        else if(id == 2){

        }
        else{

        }
    }
    render() {
        return (
            <div>
                <NavigationComponent />
                <div className="container home-page-bs-container" >
                    <div className="row" >
                        <div className="col-md-12">
                            <header className="home-page-main-header">Are you ready to grow your business?</header>
                            <label className="home-page-sub-header">Velbase can help!</label>

                        </div>

                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-5">
                            <p className="home-page-small-text">Velbase is trusted company that can provide you with what you need to make your business flourish. We have over 12,000,000 business leads
                                    that can amplify your service needs immediately! We've broken down our leads into categories to simplify your needs.
                            </p>
                            <header className="home-page-small-text-question">
                                Want to see how easy our process
                            </header>
                            <p className="home-page-small-text">
                                1.Select the type of leads you need<br/>
                                2.Narrow your selection to a specific demographic<br/>
                                3.Get your leads delivered to your email<br/>
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
                            <div className="discover-leads-button">
                                <Link style={{ textDecoration: 'none' }} to={{ pathname: "/leads", state: { section: 'full_data' } }} >
                                    <label className="discover-leads-button-text">Discover Leads</label>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
