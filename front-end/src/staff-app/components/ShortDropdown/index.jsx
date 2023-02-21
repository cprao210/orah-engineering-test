import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useState } from "react";
const useStyles = makeStyles((theme) => ({
  select: {
    color: "#fff",
    backgroundColor: "#343f64",
    borderRadius: 5,
    padding: '0px',
    "&:focus": {
      backgroundColor: "#5e6ebf",
    },
  },
}));
const ShortDropdown = ({ onItemClick }) => {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState("firstName"); // Use state to manage the selected dropdown value

  
  const dropdownArr = [
    { value: "firstName", label: "First Name" },
    { value: "lastName", label: "Last Name" },
  ];
  
  const handleDropdownChange = (event) => {
    const { value } = event.target;
    setSelectedValue(value);
    onItemClick("sort", value);
  };


  return (
    <Select
    value={selectedValue}
    className={classes.select}
    onChange={handleDropdownChange}
    >
      {dropdownArr.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default ShortDropdown;
