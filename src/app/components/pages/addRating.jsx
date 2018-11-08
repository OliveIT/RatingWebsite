import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StarRating from 'react-star-rating'

import HeaderComponent from '../header';
import States from '../../data/states.jsx';

class AddRating extends Component {

  constructor(props) {
      super(props);
      this.state = {
        ratingTypes: ["SCHOOLS", "PRPOPERTY TAXES", "NEIGHBORGHOOD", "TOWN CLERK'S HELP"],
        averageList: [],
        ratings: []
      };
      this.ratingRef = [];
      this.firebaseCallback = null;
  }

  componentWillMount() {
      if (!this.props.curTown
        || typeof this.props.curTown != "object")
        this.context.router.push("/");
      else if (this.props.firebaseRatingRef) {
        this.firebaseCallback = this.props.firebaseRatingRef.on('value', (snap) => {
            this.calculateAverage(snap.val());
        });
      }
  }
  
  componentWillUnmount() {
      // Un-register the listener on '/todoList'.
      if (this.firebaseCallback)
          this.props.firebaseRatingRef.off('value', this.firebaseCallback);
  }

  calculateAverage(rateList) {
    var averageList = [];
    this.state.ratingTypes.map(() => 
        averageList.push(0)
    )

    var count = 0;
    var ratings = [];

    Object.keys(rateList).map(key => {
        if (rateList [key].townId != this.props.curTown.id)   return;
        rateList [key].rating.map((value, index) => 
            averageList [index] += value
        )

        ratings.push(rateList [key]);
        count ++;
    })

    if (count) {
        averageList.map((value, index) => 
            averageList [index] = Math.round(value * 20 / count)
        )
    }

    this.setState({
        averageList: averageList,
        ratings: ratings
    })
  }

  onSaveRatings() {
      if (!this.nameRef.value.trim())
        return;
        
      var ratings = [];
      this.ratingRef.map(ratingRef =>
          ratings.push(ratingRef.state.currentRatingVal)
      );

      this.props.firebaseRatingRef.push({
          townId: this.props.curTown.id,
          rating: ratings,
          comment: this.commentRef.value,
          name: this.nameRef.value,
          created_at: moment().format('MMM D, YYYY hh:mm:ss')
      }, error => {
        this.context.router.push("/");
      })
  }

  onBack() {
    this.context.router.push("/");
  }

  render() {
    if (!this.props.curTown
        || typeof this.props.curTown != "object")
        return null;

    return (
    <HeaderComponent className="rating-page">
        <div className="col-sm">
            <div className="add-town-box">
                <h3>State: {States [this.props.curState]}</h3>
                <h3>Town: {this.props.curTown.town}</h3>

                {this.state.ratingTypes.map((value, index) =>
                    <div className="form-group row" key={index}>
                        <label className="col-sm text-center">{value}</label>
                        <StarRating name="react-star-rating" totalStars={5} size={20} className="form-control col-sm" ref={ref => this.ratingRef [index] = ref}/>
                        <label className="col-sm text-center">{this.state.averageList [index]} / 100</label>
                    </div>
                )}

                <div className="form-group">
                    <label>Comment</label>
                    <textarea className="form-control" id="commentTextArea" placeholder="Your comment here..." rows="3" ref={ref => this.commentRef = ref}/>
                </div>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" id="raterName" aria-describedby="townNameHelp" placeholder="Enter your name" ref={ref => this.nameRef = ref}/>
                </div>

                <div className="form-group">
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary" onClick={() => this.onSaveRatings()}>Save</button>
                        <button type="button" className="btn btn-warning" onClick={() => this.onBack()}>Back</button>
                    </div>
                </div>
                <hr/>

                {this.state.ratings.map(value => {
                    var averStar = 0;
                    value.rating.map(star => averStar += star);
                    averStar /= this.state.ratingTypes.length;

                    return (<div className="form-group rating-item">
                        <label className="form-label font-weight-bold mr-5">{value.name}</label>
                        <StarRating name="react-star-rating" totalStars={5} size={20} rating={averStar} className="form-control col-sm"/>
                        <label className="form-label font-weight-light ml-5">{value.created_at}</label>
                        <p>{value.comment}</p>
                    </div>);
                })}
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
        firebaseRatingRef: _.state.firebaseRatingRef,
        curState: _.state.curState,
        curTown: _.state.curTown,
    };
}

AddRating.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRating);