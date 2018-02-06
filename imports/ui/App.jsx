import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { HTTP } from 'meteor/http'

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './firstHeight.css';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
    var count = 0 ;
    this.state = {
      hideCompleted: false,
      result: [],
      isLoading: false,
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
      var data = Meteor.call('getData', function(error, result){
   if(error){
      alert('Error');
   }else{
    console.log(result)
 this.setState({
      result:result,
      isLoading: false
                 });




      return result;
   }     
}.bind(this));
}

///for replacing mp4 to gif extension/// not needed , img was replaced with video for mp4 gifs.
replaceMp4 (param1) {

var param1 ;
var res = param1.replace(".mp4", ".gif");
var res = res.replace("giphy-", "");
console.log(res)
return res;
}

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight : true,
      accessibility:true,
      mobileFirst: true,
    };
    var divStyle = {
display: 'flex',
justifyContent: 'center' 
};
 var loadingStyle = {
display: 'flex',
justifyContent: 'center',
color:'white'
};

 var resultSet  = this.state.result
 const { result, isLoading } = this.state;
 if (isLoading) {
      return <p style={loadingStyle}>Loading ...</p>;
    }
console.log({result})
console.log(isLoading)

    return (
      <div className="container">

<Slider {...settings}>
        
  {result.map(result => 

   <div key={result.data.data.id}  style={divStyle}><video src={result.data.data.images.downsized_small.mp4}  autoFocus autoPlay loop muted playsInline />
                <img src={result.data.data.images.downsized_small.mp4}  alt=""/>
    </div>
    )} 
</Slider>
        <ul>
        </ul>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
  };
}, App);
