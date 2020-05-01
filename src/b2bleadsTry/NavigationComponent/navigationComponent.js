import React, { Component } from 'react'
import './navigationComponent1.css'
import IconComponentColored from '../DumbComponents/IconComponent/iconComponentColored'
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
        if (window.innerWidth > 700)
            this.setState({ isDesktop: true });
        else {
            this.setState({ isDesktop: false });
        }
    }
    openMenu() {
        this.setState({ opened: !this.state.opened })
        console.log(this.state)
    }
    render() {
        const isDesktop = this.state.isDesktop;
        return (
            <div className="fluid-container navigation-bottom-shadow">
                <div className="container navigation-top-container" style={{ pointerEvents: 'all', width: '100%', paddingLeft: '50px' }} >
                    <div className="row" style={{ width: '100%' }}>
                        <div className="col-4 logo-container">
                            <Link style={{ textDecoration: 'none' }} to={{ pathname: "/home", state: { section: 'full_data' } }} >
                                <IconComponentColored color="st1" style={{ margin: 'auto', display: 'block' }} />
                            </Link>
                        </div>
                        {isDesktop ? (
                            <div className="col-8 navigation-buttons-container">
                                <Link style={{ textDecoration: 'none' }} to={{ pathname: "/home", state: { section: 'full_data' } }} >

                                    <div className=" navigation-single-button">
                                        <span className="navigation-div-text">Home</span>
                                    </div>
                                </Link>
                                <Link style={{ textDecoration: 'none' }} to={{ pathname: "/questions" }} >
                                    <div className=" navigation-single-button">
                                        <span className="navigation-div-text">FAQ</span>
                                    </div>
                                </Link>
                                <Link style={{ textDecoration: 'none' }} to={{ pathname: "/aboutus", state: { section: 'full_data' } }} >
                                    <div className=" navigation-single-button">
                                        <span className="navigation-div-text">About</span>
                                    </div>
                                </Link>
                                <Link style={{ textDecoration: 'none' }} to={{ pathname: "/leads", state: { section: 'full_data' } }} >
                                    <button className="botton navigation-single-button-download">
                                        <span className="navigation-div-text">Download</span>
                                    </button>
                                </Link>

                                {/* <ul>
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
                        </ul> */}
                            </div>
                        ) : (
                                <div className="col-8 navigation-with-button-container">


                                    <div className="navigation-main-button-container" onClick={() => this.openMenu()}>
                                        <i className="fa fa-bars icon-bars" aria-hidden="true"></i>
                                    </div>
                                    {!this.state.opened ? (null) : (
                                        <div className="navigation-dropdown-menu">
                                            <Link style={{ textDecoration: 'none' }} to={{ pathname: "/home", state: { section: 'full_data' } }} >

                                                <div className=" navigation-single-button">
                                                    <span className="navigation-div-text">Home</span>
                                                </div>
                                            </Link>
                                            <Link style={{ textDecoration: 'none' }} to={{ pathname: "/questions" }} >
                                                <div className=" navigation-single-button">
                                                    <span className="navigation-div-text">FAQ</span>
                                                </div>
                                            </Link>
                                            <Link style={{ textDecoration: 'none' }} to={{ pathname: "/aboutus", state: { section: 'full_data' } }} >
                                                <div className=" navigation-single-button">
                                                    <span className="navigation-div-text">About</span>
                                                </div>
                                            </Link>
                                            <Link style={{ textDecoration: 'none' }} to={{ pathname: "/leads", state: { section: 'full_data' } }} >
                                                <button className="botton navigation-single-button-download">
                                                    <span className="navigation-div-text">Download</span>
                                                </button>
                                            </Link>

                                            {/* <ul>
                                                <Link style={{ textDecoration: 'none' }} to={{ pathname: "/home", state: { section: 'full_data' } }} >
                                                    <div onClick={() => this.openMenu()}><li><a class="active" href="#home">Home</a></li></div>
                                                </Link>
                                                <Link style={{ textDecoration: 'none' }} to={{ pathname: "/questions" }} >
                                                    <div onClick={() => this.openMenu()}><li><a href="#contact">Questions</a></li></div>
                                                </Link>

                                                <Link style={{ textDecoration: 'none' }} to={{ pathname: "/aboutus", state: { section: 'full_data' } }}  >
                                                    <div onClick={() => this.openMenu()}><li><a href="#about">About</a></li></div>
                                                </Link>
                                                <Link style={{ textDecoration: 'none' }} to={{ pathname: "/leads", state: { section: 'full_data' } }} >
                                                    <div onClick={() => this.openMenu()}>
                                                        <li className="download-li" style={{ width: '100%', backgroundColor: '#FCBD17' }}>
                                                            <div className="download-navigation-button">
                                                                <a class="active" href="#leads">Download</a>
                                                            </div>
                                                        </li>
                                                    </div>
                                                </Link>



                                            </ul> */}
                                        </div>
                                    )}
                                </div>
                            )}
                    </div>
                </div>
            </div>
        )
    }
}
