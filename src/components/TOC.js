import React, { Component } from 'react';

class TOC extends Component{
  shouldComponentUpdate(newProps, newState) {
    console.log(newProps.data);
    console.log(this.props.data)
    return false;
  }
  render(){
    console.log("===> TOC render");
    const data = this.props.data;
    return (
      <nav>
        <ul>
          {data.map(i => (
            <li key={i.id}>
              <a href={'/content/'+i.id} onClick={
                function(id,e){
                  e.preventDefault();
                  this.props.onClick(id);
                }.bind(this,i.id)
              }>{i.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }   
}

export default TOC;