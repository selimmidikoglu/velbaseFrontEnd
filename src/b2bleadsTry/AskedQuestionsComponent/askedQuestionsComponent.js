import React, { Component } from 'react'
import './askedQuestionsComponent.css'
import NavigationComponent from '../NavigationComponent/navigationComponent';
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
        question:"How will I know it works?",
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
        Annual Revenue: $0-250,000\ \
        Employee Count: 0-100 \n \
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
    }
]
class AskedQuestionsComponent extends Component {
    render() {
        return (
            <div>
                <NavigationComponent/>
                <div className="container">
                    <div className="row">
                        <div className="col-12 main-header-container-asked-questions">
                            <label className="main-header-asked-questions-text">Frequently Asked Questions</label>
                        </div>
                        {questions.map((row) => (
                            <div className="col-12 question-row-container">
                                <label className="col-12 question-text">{row.question}</label>
                                {row.answer.split('\n').map((item,index)=> (
                                    <label className="col-12 answer-text" key={index}>{item}</label>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default AskedQuestionsComponent;
