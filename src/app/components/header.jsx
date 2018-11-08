import React, { Component } from 'react';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <div className={this.props.className + " row main-row"}>
            <div className="col-md-12">
                <h1 className="text-center white header-text">DACLERK</h1>
            </div>
            { this.props.children }
        </div>);
    }
}

export default HeaderComponent