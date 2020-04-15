import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import IconComponentColored from '../DumbComponents/IconComponent/iconComponentColored'
export default class FooterComponent extends Component {
    render() {
        return (
            
            <footer className="page-footer" style={{ backgroundColor: 'rgb(29,45,64)',bottom:'0' }}>
                <div className="container" style={{position:'inherit    ',bottom:'0',height: '150px'}}>
                    <div className="row" style={{ height: '75px' }}>
                        <div className="col-sm-4 col-md-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                            <IconComponentColored color="st0" />
                        </div>
                        <div className="col-sm-8 col-md-9">
                            <div className="row">
                                <div className="col-3 footer-link-container" >
                                    <Link style={{ textDecoration: 'none' }} to={{ pathname: "/home", state: { section: 'full_data' } }} >
                                        <label className="footer-links-desing">Home</label>
                                    </Link>
                                </div>
                                <div className="col-3 footer-link-container" >
                                    <Link style={{ textDecoration: 'none' }} to={{ pathname: "/aboutus", state: { section: 'full_data' } }} >
                                        <label className="footer-links-desing">About</label>
                                    </Link>
                                </div>
                                <div className="col-3 footer-link-container" >
                                    <Link style={{ textDecoration: 'none' }} to={{ pathname: "/questions", state: { section: 'full_data' } }} >
                                        <label className="footer-links-desing">Questions</label>
                                    </Link>
                                </div>
                                <div className="col-3 footer-link-container" >
                                    <Link style={{ textDecoration: 'none' }} to={{ pathname: "/leads", state: { section: 'full_data' } }} >
                                        <label className="footer-links-desing">Download</label>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ heigth: '75px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', borderTopWidth: '1px', borderTopColor: 'white', borderTopStyle: 'solid',bottom:'0'  }}>
                        <div className="col-6" style={{ height: '75px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <label className="footer-links-desing" style={{ fontSize: '13px' }}>CopyRights @ Velbase 2020</label>
                        </div>
                        <div className="col-6" style={{ height: '75px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <label className="footer-links-desing" style={{ fontSize: '13px' }}>CopyRights @ Velbase 2020</label>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
