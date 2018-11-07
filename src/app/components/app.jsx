import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FireBaseTools from '../utils/firebase'

console.log(FireBaseTools.getDatabaseReference);

class App extends Component {

  constructor(props) {
    super(props); 
  }

  render() {
    return (
      <div>
        <div className="body-overlay"> </div>
        <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href="#">US Town Rating</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        </nav>

        <div className="container">
         {this.props.children}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({  }, dispatch);
}


function mapStateToProps(state) {
  return {  };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
