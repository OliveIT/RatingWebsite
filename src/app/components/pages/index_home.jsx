import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

import States from '../../data/states.jsx';
import FireBaseTools from '../../utils/firebase';
import HeaderComponent from '../header'

import { setFirebaseRefRating, setFirebaseRefTown, setCurState, setCurTown } from '../../actions/firebase_actions';

class HomeComponent extends Component {
    constructor(props) {
        super(props);

        var stateOptions = [];
        Object.keys(States).map((key, index) =>
            stateOptions.push({
                value: key,
                label: index + 1 + ". " + States [key]
            })
        );

        this.state = {
            stateOptions: stateOptions,
            townList: [],

            curState: "",
            curTown: "",
            townData: {},

            ratingTypes: ["SCHOOLS", "PRPOPERTY TAXES", "NEIGHBORGHOOD", "TOWN CLERK'S HELP"]
        };
    }

    componentDidMount() {
        this.firebaseTownsRef = FireBaseTools.getDatabaseReference("towns");
        this.firebaseRatingRef = FireBaseTools.getDatabaseReference("ratings");

        this.firebaseCallback = this.firebaseTownsRef.on('value', (snap) => {
            this.setState({
                townList: snap.val()
            });
        });

        this.props.setFirebaseRefRating(this.firebaseRatingRef);
        this.props.setFirebaseRefTown(this.firebaseTownsRef);
    }
  
    componentWillUnmount() {
        // Un-register the listener on '/todoList'.
        this.firebaseTownsRef.off('value', this.firebaseCallback);
    }

    /*processTownData(snapData) {
        var townData = {};

        Object.keys(snapData).map(key => {
            var value = snapData [key];
            if (!townData [value.state])    townData [value.state] = [];

            townData [value.state].push({
                id: key,
                state: value.state,
                town: value.town
            });
        })

        this.setState({
            townData: townData,
            curTown: ""
        })
    }*/

    onSelectState(state) {
        this.props.setCurState(state.value);
        this.setState({curState: state.value});
    }

    getTownOptions() {
        var townOptions = [{
            value: "AddNewTown",
            label: "Add New Town"
        }];

        Object.keys(this.state.townList).map((_id, index) => {
            if (this.state.townList [_id].state == this.state.curState)
                townOptions.push({
                    value: _id,
                    label: townOptions.length + ". " + this.state.townList [_id].town
                })
        })

        return townOptions;
    }

    onSelectTown(town) {
        if (town.value == "AddNewTown") {
            this.props.setCurTown("AddNewTown");
            this.context.router.push("/town");
            return;
        }
        this.props.setCurTown({
            id: town.value,
            state: this.state.curState,
            town: town.label
        });
        this.context.router.push("/rate");
    }

    render() {
        return (
        <HeaderComponent className="home-page">
            <div className="col-sm-12 col-md-6 mt-3 mb-3">
                <Dropdown options={this.state.stateOptions} value={this.state.curState} onChange={(value) => this.onSelectState(value)} placeholder="SELECT STATE" />
            </div>
            <div className="col-sm-12 col-md-6 mt-3 mb-3">
                <Dropdown options={this.getTownOptions()} onChange={(value) => this.onSelectTown(value)} placeholder="SELECT TOWN" />
            </div>
        </HeaderComponent>
        );
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setFirebaseRefRating,
        setFirebaseRefTown,
        setCurState,
        setCurTown
    }, dispatch);
}

function mapStateToProps(state) {
    return {};
}

HomeComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);