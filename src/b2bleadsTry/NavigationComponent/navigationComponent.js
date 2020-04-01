import React, { Component } from 'react'
import './navigationComponent.css'
import IconComponent from '../DumbComponents/IconComponent/iconComponent'
import { Link } from 'react-router-dom'
export default class NavigationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            isDesktop: false //This is where I am having problems
        };

        this.updatePredicate = this.updatePredicate.bind(this);
    }
    componentDidMount() {
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }

    updatePredicate() {
        this.setState({ isDesktop: window.innerWidth > 711 });
    }
    openMenu(){
        this.setState({opened: !this.state.opened})
        console.log(this.state)
    }
    render() {
        const isDesktop = this.state.isDesktop;
        return (
            <div className="navigation-top-container" style={{iwidth: '100%'}} >
                <div className="logo-container">
                    <IconComponent />
                </div>
                {isDesktop?(
                    <div className="navigation-buttons-container">
                    <ul>
                        <Link style={{ textDecoration: 'none' }} to={{ pathname: "/leads", state: { section: 'full_data' } }} >
                            <li className="download-li" style={{}}>
                                <div className="download-navigation-button">
                                <a class="active" href="#leads">Download</a>
                                </div>
                            </li>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to={{ pathname: "/aboutus", state: { section: 'full_data' } }} >
                            <li><a href="#about">About</a></li>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to={{ pathname: "/questions" }} >
                            <li><a href="#contact">Questions</a></li>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to={{ pathname: "/home", state: { section: 'full_data' } }} >
                            <li><a class="active" href="#home">Home</a></li>
                        </Link>
                    </ul>
                </div>
                ):(
                    <div className="navigation-with-button-container">
                             
                        
                            <div className="navigation-main-button-container" onClick={()=> this.openMenu()}>
                                <i className="fa fa-bars icon-bars" aria-hidden="true"></i>
                            </div>
                            {!this.state.opened?(null):(
                            <div className="navigation-dropdown-menu">
                                <ul>
                                    <Link style={{ textDecoration: 'none' }} to={{ pathname: "/home", state: { section: 'full_data' } }} >
                                        <div onClick={()=> this.openMenu()}><li><a class="active" href="#home">Home</a></li></div>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to={{ pathname: "/questions" }} >
                                        <div onClick={()=> this.openMenu()}><li><a href="#contact">Questions</a></li></div>
                                    </Link>
                                       
                                    <Link style={{ textDecoration: 'none' }} to={{ pathname: "/aboutus", state: { section: 'full_data' } }}  >
                                        <div onClick={()=> this.openMenu()}><li><a href="#about">About</a></li></div>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to={{ pathname: "/leads", state: { section: 'full_data' } }} >
                                        <div onClick={()=> this.openMenu()}>
                                            <li className="download-li" style={{ width:'100%',backgroundColor:'#FCBD17'}}>
                                                <div className="download-navigation-button">
                                                <a class="active" href="#leads">Download</a>
                                                </div>
                                            </li>
                                        </div>
                                    </Link>
                                    
                                    
                                    
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }
}
