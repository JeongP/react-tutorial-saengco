import React, { Component } from 'react';

class Subject extends React.Component {
  render() {
    console.log('Subject');
    return (
      <header>
        <h1><a href="/" onClick={
          function(e){
            e.preventDefault();
            this.props.onChangeTitle();
          }.bind(this)
        }>{this.props.title}</a></h1>
        {this.props.sub}
      </header>
    )
  }
}
export default Subject;