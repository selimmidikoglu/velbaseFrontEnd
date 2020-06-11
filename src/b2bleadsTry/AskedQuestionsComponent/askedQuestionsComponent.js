import React, { Component } from 'react'
import './askedQuestionsComponent.css'
import NavigationComponent from '../NavigationComponent/navigationComponent';
import FooterComponent from '../FooterComponent/footerComponent';
import { SlideDown } from 'react-slidedown'
import { Link } from 'react-router-dom'

import 'react-slidedown/lib/slidedown.css'
let questions = [
    {
        question: 'Do I need leads?',
        answer: "Yes! Leads can be used to generate new sales in an area you might not have been able to \
        break into organically. Leads are used to expand your client base and grow your business at a \
        rapid pace. Leads help you get in front of potential customers immediately, without spending \
        time and energy."
    },
    {
        question: "What is a laser-targeted business list?",
        answer: "A laser-targeted business list is a list of leads that can help you get your business off the \
        ground without spending hours cold-calling from the phonebook or finding leads on social \
        media. These contacts are industry-specific consumers who are interested in what your \
        business has to offer. By utilizing our lists, you are able to immediately start contacting your \
        leads without the guesswork."
    },
    {
        question: "How is Velbase different from other lead generators?",
        answer: "We strive to help your business grow at the touch of a button. At Velbase, we have over \
        twelve million leads in our database that are categorized for ease-of-use at a fraction of the \
        cost! Our leads are priced at $.09/lead—no confusion or complex tiered pricing. We can \
        provide this service at such a low price because we don&#39;t buy our data from a broker or another \
        data provider. We gather data using advance machine learning technologies and data \
        warehousing. At Velbase, we gather, clean and unify our own data. We offer cutting edge leads \
        that are vetted for your specific market audience. You wouldn’t want to call a restaurant to \
        offer shoe sales—let us help you narrow your market search to find the best possible \
        consumers for your product."
    },
    {
        question: "How will I know it works?",
        answer: "Velbase uses current market trends to ensure that your consumers are top-of-the-line \
        quality. We’ve invested our time to ensure that your leads are market-specific and up-to-date, \
        including double checking our data from multiple sources, so that our data is fresh and \
        accurate. We give you the opportunity to search for contact type, employee count, annual \
        revenue, location—by city and state—and category, so you always know you’re getting our \
        best."
    },
    {
        question: "How can I search for specific leads?",
        answer: "We’ve created a simple form to ensure that you have best possible experience with Velbase. \
        Simply click on categories for market-specific leads you need, narrow your results by location, \
        and filter out those who have the specific type of income and contact type that you’re looking \
        for. \n \
        Example: If you’re a start-up company in North Dakota whose goal is to market a new hair \
        product to salons, we’d suggest:\n \
        Categories: Hairdressers, Unisex Hair Salons, Hair Care Products, Hair Dressing School, Beauty \
        Shops \
        Locations: North Dakota \n \
        Field Filters: Has Website \n \
        \n \
        Results: 286 leads \n \
        \n \
        We’ve taken the work out of generating leads, now all you have to do is utilize them!"
    },
    {
        question: "What industries do you provide for?",
        answer: "Velbase provides leads for: \n \
        \t - Food industry \n \
        \t - Religious Organization \n \
        \t - Housing \n \
        \t - Legal Services \n \
        \t - Medical \n \
        \t - Real Estate \n \
        \t - Customer Service \n \
        \t - Child Care \n \
        \t - Clothing \n \
        \n \
        …and many more! The best way to see if we can help you generate a laser-targeted lead list is \
        to type your specific industry, product, or service into our category search. You’ll find a full, \
        comprehensive list of the best leads to utilize for your business!"
    },
    {
        question: "What is the best practice for contacting leads after I acquire them?",
        answer: "Never sit on lead! Be sure to call the prospect as soon as possible once you've \
         received their full information. If a lead is unavailable or not home at the time of contact(if using phone) \
          ensure that you note to call them back on the next cycle "
    }
]
let whichQuestion = [false, false, false, false, false, false, false]
class AskedQuestionsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            whichQuestion: [false, false, false, false, false, false, false]
        }
    }
    render() {
        return (
            <div style={{ backgroundColor: 'white', minHeight: '100%', margin: '0 auto -150px' }}>
                <NavigationComponent />
                <div className="fluid-container main-header-container-asked-questions">
                    <label className="main-header-asked-questions-text">Frequently Asked Questions</label>
                </div>
                <div className="container" style={{}}>
                    <div className="row">

                        {questions.map((row, index) => (
                            <div className="col-12 question-row-container">
                                 <hr class="divider" style={{ color: 'gray' }}></hr>
                                <label className="col-12 question-text" style={{ marginBottom: '25px', textAlign: 'left', marginTop: '25px' }} onClick={() => {

                                    let whichQuestion = this.state.whichQuestion
                                    console.log(whichQuestion)
                                    for (let i = 0; i < this.state.whichQuestion.length; i++) {
                                        if (i == index)
                                            this.state.whichQuestion[i] == false ? whichQuestion[i] = true : whichQuestion[i] = false
                                        else
                                            whichQuestion[i] = false

                                    }
                                    this.setState({ whichQuestion })
                                }}>{row.question}</label>
                                <SlideDown closed={!this.state.whichQuestion[index]} style={{ width: '100%' }}>
                                    {row.answer.split('\n').map((item, index) => (
                                        <label className="col-12 answer-text" key={index}>{item}</label>
                                    ))}
                                </SlideDown>
                               
                            </div>

                        ))}
                    </div>
                </div>
                <div className="fluid-container" style={{ height:'150px',backgroundColor: '#e6e6e6',marginBottom:'100px' }}>
                    <div className="container" style={{  paddingTop: '20px',  }}>
                        <div className="row" style={{}}>
                            <div className="col-6" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column' }}>
                                <label style={{ color: '#2B3079', fontFamily: 'Gilmer-Heavy', fontSize: '15px', marginBottom: '-15px' }}>
                                    Still got questions?
                            </label>
                                <br />
                                <label style={{ fontSize: '13px' }}>
                                    Feel free to contact us!
                            </label>
                            </div>
                            <div className="col-6" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Link style={{ textDecoration: 'none' }} to={{ pathname: "/leads", state: { section: 'full_data' } }} >
                                    <button type="button" className="btn btn-primary contact-us-button"
                                        style={{
                                            display: 'block',
                                            borderStyle: 'none',
                                            fontColor: 'white',
                                            fontFamily: 'Gilmer-Regular',
                                            fontSize: '16px',
                                            backgroundColor: '#FCBD17',
                                            borderRadius: '20px',

                                        }}
                                    >Contact Us</button>
                                    {/*<button type="button" className="discover-leads-button" style={{ margin: 'auto' }}>

                                    <label className="discover-leads-button-text" >Start Now</label>

                                    </button>*/}
                                </Link></div>
                        </div>
                    </div>
                </div>
                <FooterComponent />
            </div>
        )
    }
}

export default AskedQuestionsComponent;
