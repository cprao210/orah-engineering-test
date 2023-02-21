import { FormControl, InputLabel, NativeSelect } from "@material-ui/core"
import React from "react"

const ShortDropdown = ({onItelick}) => {


const dropdownArr=[{value:'firstName',label:'First Name'},{
    value:'lastName',label:'Last Name'
}]

  return (
    <FormControl 
    sx={{color:'#fff'}}
    >
   
      <NativeSelect
        defaultValue={'firstName'}
        inputProps={{
          name: "age",
          id: "uncontrolled-native",
        }}
        onChange={(e)=>{
const {value,label}=e.target;
onItelick('sort',value)
        }}
      >
        {dropdownArr.map((option,i)=>( <option key={i} value={option.value}>{option.label}</option>))}
       
       
      </NativeSelect>
    </FormControl>
  )
}

export default ShortDropdown
