import React, { Component } from 'react';

class ReadContent extends React.Component{
    render(){
      console.log('Read Content');
      return (
        <article>
            <h2>{this.props.title}</h2>
            {this.props.desc}
        </article>
      );
    }
  }

export default ReadContent;