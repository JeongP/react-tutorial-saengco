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
      mode: "welcome",
      selected_id: 2,
      welcome: {title: 'WELCOME', desc:"REACT WORLD!"},
      subject:{title: 'WEB', sub:"world wide web!"},
      contents: [
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is   for interactive'}
      ]
    }
  }

  findContent() {

    var i=0;
    while(i<this.state.contents.length) {
      var content = this.state.contents[i];
      if(content.id === this.state.selected_id) {
        return content;
      }
      i++;
    }
  }

  getContents = () => {
    let _title, _desc, _article= null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === "read"){
      var _content = this.findContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
    } else if (this.state.mode === "create") {
      _article = <CreateContent onSubmit={
        function(title, desc){
          this.max_contents_id = this.max_contents_id+1;
          
        // concat 으로 복사하는 방법
          // var _contents = this.state.contents.concat(
          //   {id:this.max_contents_id, title:title, desc:desc}
          // )
          
        // Array.from으로 복사하는 방법
          var _contents = Array.from(this.state.contents);
          _contents.push({id:this.max_contents_id, title:title, desc:desc});
          this.setState({
            contents:_contents,
            mode: 'read',
            selected_id: this.max_contents_id
          })
        }.bind(this)
      }></CreateContent>
    } else if(this.state.mode === 'update') {
      var _content = this.findContent();
      _article = <UpdateContent content={_content}
        onSubmit={
          function(_id,_title,_desc){
            // this.state.selected_id = _id;
            var _contents = Array.from(this.state.contents);
            var i=0;
            while(i<_contents.length) {
              console.log(_id, this.state.contents[i].id);
              if(_id == this.state.contents[i].id) {
                console.log('진입')
                this.setState({
                  mode: "read",
                  selected_id: _id
                })
                _contents[i] = {id: _id, title: _title, desc: _desc};
                break;
              }
              i++;
            }
            this.setState({
              contents: _contents
            })
          }.bind(this)
        }
      ></UpdateContent>
    }
    // console.log(this.max_contents_id);
    // console.log('render!', this);
    return _article;
  }


  render() {
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
            if(_mode === 'delete') {
              if(window.confirm('really delete?')){
                // 배열에서 제거
                var _contents = Array.from(this.state.contents);
                var i=0;
                while(i<_contents.length) {
                  if(_contents[i].id === this.state.selected_id) {
                    _contents.splice(i,1);
                    break;
                  }
                  i++;
                }
                this.setState({
                  contents: _contents,
                  mode: 'welcome'
                })
                alert("Deleted");
              }
            } else {
              this.setState({
                mode: _mode
              });
            }
          }.bind(this)
        }></Control>
        <TOC data={this.state.contents} onClick={
          function(id) {
            this.setState({
              mode: 'read',
              selected_id: id
            });
          }.bind(this)
        }></TOC>

        {this.getContents()}
        
      </div>
    );
  }
}

export default App;
