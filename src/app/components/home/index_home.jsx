import React, { Component } from 'react';
import States from '../../data/states.jsx';
import FireBaseTools from '../../utils/firebase';
import StarRating from 'react-star-rating'

class HomeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            curState: "",
            curTown: "",
            townData: {},

            ratingTypes: ["SCHOOLS", "PRPOPERTY TAXES", "NEIGHBORGHOOD", "TOWN CLERK'S HELP"]
        };

        this.ratingRef = [];
    }

    componentDidMount() {
        this.firebaseTownsRef = FireBaseTools.getDatabaseReference("towns");
        this.firebaseRatingRef = FireBaseTools.getDatabaseReference("ratings");

        this.firebaseCallback = this.firebaseTownsRef.on('value', (snap) => {
            this.processTownData(snap.val());
        });
    }
  
    componentWillUnmount() {
        // Un-register the listener on '/todoList'.
        this.firebaseTownsRef.off('value', this.firebaseCallback);
    }

    processTownData(snapData) {
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
    }

    onSelectState(shortState) {
        this.setState({curState: shortState});
    }

    onSelectAddTown() {
        this.setState({
            curTown: "NewTown"
        })
    }

    onAddTown() {
        var { value } = this.inputTown;
        if (value.trim() == "") {
            this.inputTownHelp.classList.add(["text-white", "bg-danger"]);
            this.inputTownHelp.innerHTML = "Input town name";
            return;
        }
        
        this.inputTownHelp.classList.remove(["text-white", "bg-danger"]);

        this.firebaseTownsRef.push({
            state: this.state.curState,
            town: this.inputTown.value
        }, error => {
            this.inputTownHelp.innerHTML = "New Town saved.";
        })
    }

    onSelectTown(town) {
        this.setState({
            curTown: town
        });
    }

    onSaveRatings() {
        var ratings = [];
        this.ratingRef.map(ratingRef =>
            ratings.push(ratingRef.state.currentRatingVal)
        );

        this.firebaseRatingRef.push({
            townId: this.state.curTown.id,
            rating: ratings,
            comment: this.commentRef.value,
            name: this.nameRef.value
        }, error => {
            this.setState({
                curTown: ""
            })
        })
    }

    render() {
        return (
        <div className="row main-row mt-3 mb-3">
            <div className="col-md-12">
                <h1 className="text-center white">DACLERK</h1>
            </div>
            <div className="col-sm">
                <div className="list-container">
                    <div className="list-group">
                        {
                            Object.keys(States).map((value, index) => {
                                var className = "list-group-item list-group-item-action ";
                                if (this.state.curState == value)
                                    className += "active";

                                return (
                                    <button type="button" className={className} key={value} onClick={() => this.onSelectState(value)}>
                                        {index + 1}. {States[value]}
                                    </button>);
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="col-sm">
                <div className="list-container">
                {this.state.curState != "" ?
                    <div className="list-group">
                        <button type="button" className="list-group-item list-group-item-action" key={0} onClick={() => this.onSelectAddTown()}>
                            +
                        </button>
                        {
                            this.state.townData [this.state.curState] ?
                            this.state.townData [this.state.curState].map((value, index) => {
                                var className = "list-group-item list-group-item-action ";
                                if (typeof this.state.curTown == "object" 
                                    && this.state.curTown.town == value.town)
                                    className += "active";

                                return (
                                    <button type="button" className={className} key={value.id} onClick={() => this.onSelectTown(value)}>
                                        {index + 1}. {value.town}
                                    </button>);
                            })
                            : null
                        }
                    </div>
                    : null}
                </div>
            </div>
            <div className="col-sm">
                <div className="list-container">
                {
                this.state.curTown == "NewTown" ?
                    <div className="add-town-box">
                        <div className="form-group">
                            <label>Town name</label>
                            <input type="text" className="form-control" id="townName" aria-describedby="townNameHelp" placeholder="Enter town name" ref={ref => this.inputTown = ref}/>
                            <small id="townNameHelp" className="form-text pl-2" ref={ref => this.inputTownHelp = ref}>Please input town name.</small>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={() => this.onAddTown()}>Save</button>
                    </div>
                : null
                }

                {typeof this.state.curTown == "object" ?
                    <div className="add-town-box">
                        {this.state.ratingTypes.map((value, index) =>
                            <div className="form-group">
                                <label>{value}</label>
                                <StarRating name="react-star-rating" totalStars={5} size={20} className="form-control" ref={ref => this.ratingRef [index] = ref}/>
                            </div>
                        )}

                        <div class="form-group">
                            <label>Comment</label>
                            <textarea className="form-control" id="commentTextArea" placeholder="Your comment here..." rows="3" ref={ref => this.commentRef = ref}/>
                        </div>

                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" id="raterName" aria-describedby="townNameHelp" placeholder="Enter your name" ref={ref => this.nameRef = ref}/>
                        </div>

                        <button type="button" className="btn btn-primary" onClick={() => this.onSaveRatings()}>Save</button>
                    </div>
                : null}
                </div>
            </div>
        </div>
        );
    }
};

export default HomeComponent;