import React, { Component } from 'react'
import './navigationComponent.css'
import IconComponent from '../DumbComponents/IconComponent/iconComponent'
import { Link } from 'react-router-dom'
export default class NavigationComponent extends Component {
    render() {
        return (
            <div className="navigation-top-container" >
                <div className="logo-container">
                    <IconComponent />
                </div>
                <div className="navigation-buttons-container">
                    <ul>
                        <Link style={{ textDecoration: 'none' }} to={{ pathname: "/aboutus", state: { section: 'full_data' } }} >
                            <li><a href="#about">About</a></li>
                        </Link>
                        <li><a href="#news">News</a></li>
                        <Link style={{ textDecoration: 'none' }} to={{ pathname: "/questions"}} >
                            <li><a href="#contact">Questions</a></li>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to={{ pathname: "/home", state: { section: 'full_data' } }} >
                            <li><a class="active" href="#home">Home</a></li>
                        </Link>
                    </ul>
                </div>
            </div>
        )
    }
}
