import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import IconComponentColored from '../DumbComponents/IconComponent/iconComponentColored'
import './footerComponent.css'
export default class FooterComponent extends Component {
    render() {
        return (

            <footer className="page-footer" style={{ backgroundColor: 'rgb(29,45,64)', bottom: '0px', left: '0px', right: '0px', position: 'relative' }}>
                <div className="container" style={{ bottom: '0', height: '120px' }}>
                    <div className="row" style={{ height: '60px' }}>
                        <div className="col-6" style={{ height:'60px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <IconComponentColored color="st0" heightCondition={true} width="80px" />
                        </div>
                        <div className="col-6" style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                            
                                 
                                        <div className=" footer-link-container" >
                                            <Link style={{ textDecoration: 'none' }} to={{ pathname: "/home", state: { section: 'full_data' } }} >
                                                <label className="footer-links-desing">Home</label>
                                            </Link>
                                        </div>
                                        <div className=" footer-link-container" >
                                            <Link style={{ textDecoration: 'none' }} to={{ pathname: "/aboutus", state: { section: 'full_data' } }} >
                                                <label className="footer-links-desing">About</label>
                                            </Link>
                                        </div>
                                        <div className=" footer-link-container" >
                                            <Link style={{ textDecoration: 'none' }} to={{ pathname: "/questions", state: { section: 'full_data' } }} >
                                                <label className="footer-links-desing">Questions</label>
                                            </Link>
                                        </div>
                                        <div className=" footer-link-container" >
                                            <Link style={{ textDecoration: 'none' }} to={{ pathname: "/contactUs", state: { section: 'full_data' } }} >
                                                <label className="footer-links-desing">Contact</label>
                                            </Link>
                                        </div>
                                        <div className=" footer-link-container" >
                                            <Link style={{ textDecoration: 'none' }} to={{ pathname: "/leads", state: { section: 'full_data' } }} >
                                                <label className="footer-links-desing">Download</label>
                                            </Link>
                                        </div>
                                   
                            
                        </div>
                    </div>
                    <div className="row" style={{ heigth: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', borderTopWidth: '1px', borderTopColor: 'white', borderTopStyle: 'solid', bottom: '0' }}>
                        <div className="col-6" style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <label className="footer-links-desing" style={{ fontSize: '13px' }}>CopyRights @ Velbase 2020</label>
                        </div>
                        <div className="col-6" style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <label className="footer-links-desing" style={{ fontSize: '13px' }}>Privacy Policy-Terms & Conditions</label>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
