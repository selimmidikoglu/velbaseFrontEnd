import React, { Component } from 'react'

export default class Deneme1 extends Component {
    render() {
        return (
            <div className = "Deneme1">
                <button>{this.props.name}</button>
            </div>
        )
    }
}
