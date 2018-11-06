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
        <header className="navbar navbar-static-top navbar-inverse hide" id="top" role="banner">
          <div className="container">
            <div className="navbar-header">
              <button
                className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <Link to="/" className="navbar-brand">Daclerk Rating website</Link>
              </div>
              <nav className="collapse navbar-collapse bs-navbar-collapse" role="navigation">
                <ul className="nav navbar-nav">
                  <li><Link to="/"> Home</Link></li>,
                </ul>
              </nav>
          </div>
        </header>

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
