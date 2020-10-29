import React, { Component } from 'react';

class TOC extends Component{
  render(){
    const data = this.props.data;
    

    return (
      <nav>
        <ul>
          {data.map(i => (
            <li key={i.id}><a href={'/content/'+i.id}>{i.title}</a></li>
          ))}
        </ul>
      </nav>
    );
  }   
}

export default TOC;