import React, { useState } from "react";
import { useRecoilState } from "recoil";
import SubmitButton from "../SubmitButton";
import { projectsState } from "../../globalstate";
import { modalState } from "../../globalstate";
import FormControl from "@mui/material/FormControl";
import StyledTextField from "../StyledTextField";
const EditProjectModal = () => {
  const [projects, setProjects] = useRecoilState(projectsState)
  const modal = useRecoilState(modalState);
  const [form, setForm] = useState({ title: "", message: ""});
  const [select,setSelect] = useState(false);
  var clicked_id = modal[0].data.id
  


  function handleChange(e) {
		setForm({ ...form, [e.target.id]: e.target.value});
	}
  function handleSubmit(e) {
    //send api request
    e.preventDefault()

    var edited_array = JSON.parse(JSON.stringify(projects))
   const p =  edited_array.find(
      (x) => {return(x.id === clicked_id) }

    )
    console.log(p)
    p.name = form.title
    p.description = form.message
    p.active = select
    console.log(p)
    

    setProjects([...edited_array])

    
    
    
  }
  

  return (
    <div className="modal-body">
      
       <div><FormControl style={formStyle}>
				<StyledTextField
					id="title"
					value={form.title}
					label="Project Name"
					variant="standard"
					onChange={handleChange}
				/>
				<StyledTextField
					id="message"
					value={form.message}
					label="Description"
					variant="standard"
					multiline
					onChange={handleChange}
				/>
        <h2> Active? </h2>
        <select
          
          value = {select}
          onChange ={e=> {
            
            let updated = e.target.value
            if(updated === "true" || updated === 'false'){
              updated = JSON.parse(updated)
            }
            setSelect(updated)}}
          
          
          > 
          <option value = {true} > Yes</option>
          <option  value = {false}>  No</option>
          
             </select>

	
			</FormControl></div>
      
      

      

      
      <SubmitButton handleSubmit={handleSubmit} />
     
    </div>
  );
};

export default EditProjectModal;

const formStyle = {
	display: "flex",
	flexDirection: "column",
	gap: "2rem",
	width: "300px"
};
