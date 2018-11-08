import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HeaderComponent from '../header';
import States from '../../data/states.jsx';

class AddTown extends Component {

  constructor(props) {
      super(props);
      this.state = {
      };
  }

  componentWillMount() {
      if (!this.props.curState
        || this.props.curTown != "AddNewTown")
        this.context.router.push("/");
  }

  onAddTown() {
    var { value } = this.inputTown;
    if (value.trim() == "") {
        this.inputTownHelp.classList.add(["text-white", "bg-danger"]);
        this.inputTownHelp.innerHTML = "Input town name";
        return;
    }
    
    this.inputTownHelp.classList.remove(["text-white", "bg-danger"]);

    this.props.firebaseTownRef.push({
        state: this.props.curState,
        town: this.inputTown.value
    }, error => {
        this.context.router.push("/");
    })
  }

  onBack() {
    this.context.router.push("/");
  }

  render() {
    if (!this.props.curState)
        return null;

    return (
    <HeaderComponent className="town-page">
        <div className="col-sm">
            <div className="add-town-box">
                <h3>State: {States [this.props.curState]}</h3>

                <div className="form-group">
                    <label>Town name</label>
                    <input type="text" className="form-control" id="townName" aria-describedby="townNameHelp" placeholder="Enter town name" ref={ref => this.inputTown = ref}/>
                    <small id="townNameHelp" className="form-text pl-2" ref={ref => this.inputTownHelp = ref}>Please input town name.</small>
                </div>

                <div className="form-group">
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary" onClick={() => this.onAddTown()}>SAVE</button>
                        <button type="button" className="btn btn-warning" onClick={() => this.onBack()}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    </HeaderComponent>
    );
  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({  }, dispatch);
}

function mapStateToProps(_) {
    return {
        firebaseTownRef: _.state.firebaseTownRef,
        curState: _.state.curState,
        curTown: _.state.curTown
    };
}

AddTown.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTown);