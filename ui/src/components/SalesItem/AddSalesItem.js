import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import FileUploader from "../files/FileUploader";


const AddSalesItem = () => {
  let history = useHistory();
  const [selectedFile, setSelectedFile] = useState(null);
  const [salesItem, setSalesItem] = useState({
    id: "",
    name: "",
    description: "",
    picturepath: "",
  });
    const { _id, name, description, picturepath} = salesItem;
    const onInputChange = e => {
    setSalesItem({ ...salesItem, [e.target.name]: e.target.value });
  };

  // const onSubmit = async e => {
  //   e.preventDefault();
  //   let data = new FormData();
  //     data.append("file", this.state.file);
  //     data.set("data", salesItem);
  //   await axios.post("http://localhost:3001/salesItem", data);
  //   history.push("/");
  // };

  const submitForm = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", selectedFile);
  
    // axios
    //   .post(UPLOAD_URL, formData)
    //   .then((res) => {
    //     alert("File Upload success");
    //   })
    //   .catch((err) => alert("File Upload Error"));
  };

  return (
    <div className="App">
      <form>
        <input
          type="text"
          value={name}
          // onChange={(e) => setName(e.target.value)}
        />

        <FileUploader
          onFileSelectSuccess={(file) => setSelectedFile(file)}
          onFileSelectError={({ error }) => alert(error)}
        />

        <button onClick={submitForm}>Submit</button>
      </form>
    </div>
    // <div className="container">
    //   <div className="w-75 mx-auto shadow p-5">
    //     <h2 className="text-center mb-4">Add A SalesItem</h2>
    //     <form onSubmit={e => onSubmit(e)}>
    //       <div className="form-group">
    //         <input
    //           type="text"
    //           className="form-control form-control-lg"
    //           placeholder="Enter Your Id"
    //           name="id"
    //           value={_id}
    //           onChange={e => onInputChange(e)}
    //         />
    //       </div>
    //       <div className="form-group">
    //         <input
    //           type="text"
    //           className="form-control form-control-lg"
    //           placeholder="Enter Your Name"
    //           name="name"
    //           value={name}
    //           onChange={e => onInputChange(e)}
    //         />
    //       </div>
    //       <div className="form-group">
    //         <input
    //           type="text"
    //           className="form-control form-control-lg"
    //           placeholder="Enter Your description"
    //           name="description"
    //           value={description}
    //           onChange={e => onInputChange(e)}
    //         />
    //       </div>
    //       <div className="form-group">
    //         <input
    //           type="file"
    //           className="form-control form-control-lg"
    //           placeholder="browse file"
    //           name="picturepath"
    //           value={picturepath}
    //           onChange={e => handleFileChange(e)}
    //         />
    //       </div>
    //       <button className="btn btn-primary btn-block">Add SalesItem</button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default AddSalesItem;
