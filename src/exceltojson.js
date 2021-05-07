import React from "react";
import * as XLSX from "xlsx";
import db from './firebase'

class ExcelToJson extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      file: null,
      data: "", 
      message:"",  
      fire_data : [],
      json_data: []
    };
  }

  handleClick(e) {
    this.refs.fileUploader.click();
  }

  filePathset(e) {
    e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
    console.log(file);
    this.setState({ file });

    console.log(this.state.file);
  }

  readFile() {
      const file = this.state.file
    if (file && file.name ) { 
    var f = this.state.file;
    var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      const json_data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log("json data:", json_data)
      /* Update state */
      console.log("Data>>>" + data);// shows that excel data is read
      // this is where the data return
      const mydata =  (this.convertToJson(data)); // shows data in json format
      this.setState({data: mydata})
      
    };
    reader.readAsBinaryString(f);
}
else { 
    this.setState({data: "there is no file "})
}
  }

  convertToJson(csv) {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    result.pop()
    this.setState({json_data: result})
    return JSON.stringify(result); //JSON
    }

    insert_data_database = async () =>{
        console.log("data need to be inserted", this.state.json_data)
        this.state.json_data.forEach(async user=>{
            const docRef = db.collection("users").doc(user.first) 
            await docRef.set({
                first:user.first, 
                last:user.last, 

            })
        })
        this.setState({message: "good job!!!"})
        
    }
    display_data_from_database =async () =>{
        console.log("display the data from database ")
        const res = db.collection("users")
        const data = await res.get() 
        data.docs.forEach(item =>{
            this.setState({fire_data: [...this.state.fire_data, item.data()]})
        })
    }
  render() {
    return (
      <div>
        <input
          type="file"
          id="file"
          ref="fileUploader"
          onChange={this.filePathset.bind(this)}
        />
        <button
          onClick={() => {
            this.readFile();
          }}
        >
          Read File
        </button>
        <div>Data will be display below </div>
        <div>{this.state.data} </div>
          <hr></hr>
        <div>
            <button onClick={this.insert_data_database}>
                insert the data to the database 
            </button>
            <div>message: {this.state.message}  </div>
        </div>
        <hr/>
        <div>
            <button onClick={this.display_data_from_database}>
                get ALL the data from database  
            </button>
            {/* <div>{this.state.fire_data? this.state.fire_data: null}  </div> */}
            <div>
                {
                    this.state.fire_data && this.state.fire_data.map(item=>{
                        return (
                            <div key ={item.id}>
                                {item.first}, {item.last}
                            </div>
                        )
                    })
                }
            </div>
        </div>
      </div>
    );
  }
}

export default ExcelToJson;