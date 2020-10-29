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
    this.state = {
      subject:{title: 'WEB', sub:"world wide web!"},
      contents: [
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }

  }
  render() {
    return (
      <div className="App">
        {/* 상위 컴포넌트의 state 값을 하위 컴포넌트의 props의 값으로 전달하는 것 가능. */}
        <Subject title={this.state.subject.title} sub={this.state.subject.sub}></Subject>
        <TOC data={this.state.contents}></TOC>
        <Content title="HTML" desc="HTML is HyperText Markup Language."></Content>
      </div>
    );
  }
}

export default App;
