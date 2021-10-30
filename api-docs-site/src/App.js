import React from "react";
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
const docFiles = require.context('./docs');

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = { docs: this.listOfDocs(), activeDoc: "" };
  }
  render() {
    return (
      <div id="main">

        <button onClick={() => this.openNav()}><i className="fa fa-align-justify"></i></button>
        <div id="mySidenav" className="sidenav">
          <h2 className="white">Documentation</h2>
          <button className="closebtn" onClick={() => this.closeNav()}><i className="fa fa-times"></i></button>
          <ul className="no-bullet white">
            {this.state.docs.map(item => <li key={item}><button onClick={() => this.setActiveDoc(item)}>{item}</button></li>)}
            <li><button onClick={() => this.setActiveDoc("")}>Clear</button></li>
          </ul>
        </div>
        <div>
          {this.state.activeDoc ? (
            <SwaggerUI spec={this.docFile(this.state.activeDoc)} />) : (<div></div>)
          }
        </div>
      </div>
    )
  }

  listOfDocs() {
    const list = [];
    docFiles.keys().forEach(key => {
      if (key.match(/json/)) {
        list.push(key.replace('./', ''));
      }
    });
    return list;
  }

  docFile(name) {
    return require(`./docs/${name}`)
  }

  async setActiveDoc(name) {
    await this.setState({ activeDoc: name })
  }

  renderButtons() {
    console.log("Rendering buttons")
    console.log(JSON.parse(JSON.stringify(this.state)))
    if (this.state.docs) {
      this.state.docs.forEach(element => {
        console.log(element);
        return <button>{element}</button>
      });
    } else {
      return <button>$</button>
    }
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

}

export default Test;
