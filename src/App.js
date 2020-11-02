import React, { Component } from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import UpdateContent from "./components/UpdateContent"
import Subject from "./components/Subject"
import Control from "./components/Control"
import './App.css';
import Content from './components/Content';


class App extends Component {

  // 생성자는 컴포넌트가 생성될 때, render 보다 먼저 호출되어 컴포넌트의 값을 초기화 시켜주는 역할을 한다.
  constructor(props) {
    super(props);
    this.max_contents_id = 3;
    this.state = {
      mode: "create",
      conditioned_id: 2,
      welcome: {title: 'WELCOME', desc:"REACT WORLD!"},
      subject:{title: 'WEB', sub:"world wide web!"},
      contents: [
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is   for interactive'}
      ]
    }
  }
  
  render() {
    let _title, _desc, _article= null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === "read"){
      let id = this.state.conditioned_id;
      var i=0;
      while(i<this.state.contents.length) {
        if(id === this.state.contents[i].id) {
          _title = this.state.contents[i].title;
          _desc = this.state.contents[i].desc;
          _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
          break;
        }
        i++;
      }
    } else if (this.state.mode === "create") {
      _article = <CreateContent onSubmit={
        function(title, desc){
          this.max_contents_id = this.max_contents_id+1;
          // console.log(this.max_contents_id);
          var _contents = this.state.contents.concat(
            {id:this.max_contents_id, title:title, desc:desc}
          )
          this.setState({
            contents:_contents
          })
        }.bind(this)
      }></CreateContent>
    }
    console.log(this.max_contents_id);
    console.log('render!', this);
    return (
      <div className="App">
        {/* 상위 컴포넌트의 state 값을 하위 컴포넌트의 props의 값으로 전달하는 것 가능. */}
        
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub} 
          onChangeTitle={
            function(){
              this.setState({
                mode: 'welcome'
              });
            }.bind(this)
          }>
        </Subject>
        <Control onChangeMode = {
          function(_mode){
            console.log(_mode);
            this.setState({
              mode: _mode
            });
          }.bind(this)
        }></Control>
        <TOC data={this.state.contents} onClick={
          function(id) {
            this.setState({
              mode: 'read',
              conditioned_id: id
            });
          }.bind(this)
        }></TOC>

        {_article}
        
      </div>
    );
  }
}

export default App;
