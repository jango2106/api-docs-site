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
            {Object.keys(this.state.docs).map(key => <li key={key}><button onClick={() => this.setActiveDoc(key)}>{key}</button></li>)}
            <li><button onClick={() => this.setActiveDoc("")}>Clear</button></li>
          </ul>
        </div>
        <div>
          {this.state.activeDoc ? (
            <SwaggerUI spec={this.state.docs[this.state.activeDoc]} />) : (<div></div>)
          }
        </div>
      </div>
    )
  }

  listOfDocs() {
    var structure = {};
    docFiles.keys().forEach(key => {
      if (key.match(/json/)) {
        const test = this.docFile(key.replace('./', ''))
        const substruct = {}
        substruct[test.info.title] = test
        structure = { ...structure, ...substruct }
      }
    });
    return Object.keys(structure).sort(this.sortFunction).reduce(
      (obj, key) => {
        obj[key] = structure[key];
        return obj;
      },
      {}
    );
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

  sortFunction = (a, b) => {
    var nameA = a.toUpperCase();
    var nameB = b.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }
}

export default Test;
