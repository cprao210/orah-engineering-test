import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import ShortDropdown from "staff-app/components/ShortDropdown/index"
import { useDispatch, useSelector } from 'react-redux';
import { actions } from "./store/action"

export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })

  const [sortedBy, setSortedBy] = useState<"firstName" | "lastName">("firstName")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [students, setStudents] = useState([])

	const dispatch = useDispatch();

  const arr=useSelector(state=>(state.DailyActivityReducer))

  useEffect(() => {
    
    void getStudents()
  }, [getStudents])

  useEffect(() => {
    if(data?.students){
      const newArr=data?.students.map((s,i)=>({...s,activeStatus:true}))
      dispatch({type:actions.SET_NEW_STUDENT_ARR,data:newArr})
    }
  }, [loadState])
  


  const filteredStudents = arr?.studentsArr.map((s) => {
   
    
    const name = `${s.first_name} ${s.last_name}`
    if( name.toLowerCase().includes(searchTerm.toLowerCase())){
      return {...s,activeStatus:true}
    }else{
      return {...s,activeStatus:false}
    }
  })
  
  
  

  const sortedStudents = filteredStudents?.sort((a, b) => {
    const sortFieldA = sortedBy === "firstName" ? a.first_name : a.last_name
    const sortFieldB = sortedBy === "firstName" ? b.first_name : b.last_name

    if (sortOrder === "asc") {
      
      return sortFieldA.localeCompare(sortFieldB)
    } else {
      return sortFieldB.localeCompare(sortFieldA)
    }
  })

 
  


  

  const onToolbarAction = (action: ToolbarAction, value?: any) => {
 
    
    if (action === "sort") {
      if (sortedBy === value) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
      } else {
        setSortedBy(value)
        setSortOrder("asc")
      }
    } else if (action === "search") {
  
      
      setSearchTerm(value || "")
    } else if (action === "roll") {
      setIsRollMode(true)
    }
  }

  useEffect(() => {
    dispatch({ type: actions.SET_NEW_STUDENT_ARR, data: sortedStudents });
  }, [searchTerm, sortedBy, sortOrder]);

  const sortOnRollState=(state:any,arr:any)=>{
    
    
    const newArr=arr.map((d:any)=>{

      
      if(state==='all'){
      return{...d,activeStatus:true,rollState:d.rollState}}
      else if (d.rollState===state){
        console.log(d.rollState===state,d.rollState,state);
        
        return{...d,activeStatus:true,rollState:d.rollState}
      } else{
        
        return{...d,activeStatus:false,rollState:d.rollState}
      }
    })
  
  dispatch({type:actions.SET_NEW_STUDENT_ARR,data:newArr})
  
  
   }





  

  

  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      setIsRollMode(false)
    }
  }




  return (
    <>
      <S.PageContainer>
        <Toolbar
  onItemClick={onToolbarAction}
  sortedBy={sortedBy}
  sortOrder={sortOrder}
  onSortToggle={() =>{ setSortOrder(sortOrder === "asc" ? "desc" : "asc")}}
/>

        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && (
          <>
            {arr&&arr.studentsArr&&arr.studentsArr.map((s,i,arr) => {
              

           return  s.activeStatus&&  <StudentListTile key={s.id} isRollMode={isRollMode} student={s} />
})}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} stateChangeHandler={sortOnRollState} />
    </>
  )
}

type ToolbarAction = "roll" | "sort" | "search";
interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void;
  sortedBy: "firstName" | "lastName";
  sortOrder: "asc" | "desc";
  onSortToggle: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onItemClick,
  sortedBy,
  sortOrder,
  onSortToggle,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSortToggle = () => {

    
    onSortToggle();
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
 
    
    setSearchTerm(value);
    onItemClick("search", value);
  };

  return (
    <S.ToolbarContainer>
      <div
      className="firstRow"
        // onClick={() => onItemClick("sort", sortedBy === "firstName" ? "lastName" : "firstName")}
      >
        Sort By  <span><ShortDropdown onItelick={onItemClick}/></span> (
    <span className="sort_order" onClick={()=>handleSortToggle()}>   {sortOrder === "asc" ? "A-Z" : "Z-A"}</span> )
   
      </div>
      <div>
        <S.SearchInput
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name"
        />
      </div>
      <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
    </S.ToolbarContainer>
  );
};

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
    .firstRow{
      white-space: nowrap;
    /* width: 33%; */
    display: flex;
    gap: 10px;
    align-items: center;
    }
    .sort_order{
      cursor: pointer;
    }
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
  SearchInput: styled.input`
    padding: ${Spacing.u1};
    border-radius: ${BorderRadius.default};
    border: none;
    width: 250px;
    font-size: 1rem;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s;

    &:focus {
      outline: none;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    }
  `,
};
