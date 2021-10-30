import React from "react";
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = { docs: {}, activeDoc: "" };
  }

  async componentDidMount() {
    await this.populateDocs();
    setInterval(async () => {
      await this.populateDocs();
    }, 20000)
  }

  render() {
    return (
      <div id="main">
        <button onClick={() => this.openNav()}><i className="fa fa-align-justify"></i></button>
        <div id="mySidenav" className="sidenav">
          <h2 className="white">Documentation</h2>
          <button className="closebtn" onClick={() => this.closeNav()}><i className="fa fa-times"></i></button>
          {this.state.docs ?
            (<ul className="no-bullet white">
              {Object.keys(this.state.docs).map(key => <li key={key}><button onClick={() => this.setActiveDoc(key)}>{key}</button></li>)}
              <li><button onClick={() => this.setActiveDoc("")}>Clear</button></li>
            </ul>) : (<div></div>)}
        </div>
        <div>
          {this.state.activeDoc ? (
            <SwaggerUI spec={this.state.docs[this.state.activeDoc]} />) : (<div></div>)
          }
        </div>
      </div>
    )
  }

  async getSwaggerManifestFile() {
    const manifestFiles = await fetch(process.env.PUBLIC_URL + '/swagger-doc-manifest.json');
    return await manifestFiles.json()
  }

  async swaggerDocs() {
    var structure = {}
    const manifest = await this.getSwaggerManifestFile();
    console.log(manifest)
    for (const key of manifest) {
      if (key.match(/json/)) {
        const swaggerDoc = await this.getSwaggerDocFile(key.replace('./', ''))
        const substruct = {}
        substruct[swaggerDoc.info.title] = swaggerDoc
        structure = { ...structure, ...substruct }
      }
    }
    return Object.keys(structure).sort(this.sortFunction).reduce(
      (obj, key) => {
        obj[key] = structure[key];
        return obj;
      },
      {}
    );
  }

  async getSwaggerDocFile(name) {
    const fileResponse = await fetch(process.env.PUBLIC_URL + `/swagger-docs/${name}`)
    return await fileResponse.json()
  }

  async setActiveDoc(name) {
    await this.setState({ activeDoc: name })
  }

  renderButtons() {
    if (this.state.docs) {
      this.state.docs.forEach(element => {
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

  async populateDocs() {
    const docs = await this.swaggerDocs()
    this.setState({ docs: docs })
    console.log("State Updated")
  }
}

export default Test;
