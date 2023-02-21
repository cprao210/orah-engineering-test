import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/Button"
import { BorderRadius, Spacing } from "shared/styles/styles"
import { RollStateList } from "staff-app/components/roll-state/roll-state-list.component"
import { RolllStateType } from "shared/models/roll"
import { useSelector,useDispatch } from "react-redux";
import { actions } from "staff-app/daily-care/store/action"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
export type ActiveRollAction = "filter" | "exit"
interface Props {
  isActive: boolean
  onItemClick: (action: ActiveRollAction, value?: string) => void
  stateChangeHandler: (state:any,arr:any) => void
}

export const ActiveRollOverlay: React.FC<Props> = (props) => {
  const { isActive, onItemClick,stateChangeHandler } = props
  const arr=useSelector(state=>(state.DailyActivityReducer))
  const dispatch = useDispatch()
  const [stateList, setStateList] = useState([
    { type: "all", count: 0 },
    { type: "present", count: 0 },
    { type: "late", count: 0 },
    { type: "absent", count: 0 },
  ])
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "save-roll" })
  const [getactivity, data1, loadState1] = useApi<{ students: Person[] }>({ url: "get-activities" })

 
console.log(data1);

 
  

  useEffect(() => {
    if (arr.studentsArr) {
      let students= arr.studentsArr
    let presentCount = 0;
    let lateCount = 0;
    let absentCount = 0;
  
    for (let i = 0; i < students.length; i++) {
      const rollState = students[i].rollState;
      if (rollState === 'present') {
        presentCount++;
      } else if (rollState === 'late') {
        lateCount++;
      } else if (rollState === 'absent') {
        absentCount++;
      }
    }
   
    setStateList([  { type: "all", count: students.length },
    { type: "present", count: presentCount },
    { type: "late", count: lateCount },
    { type: "absent", count: absentCount },])
    
    
    }
  }, [arr])


  

 const sortOnRollState=(state:any,arr:any)=>{
  console.log(arr,state,'arr');
  
  const newArr=arr.map((d:any)=>{
    console.log(d);
    
    if(state==='all'){
console.log(d.id);

    return{...d,activeStatus:true,rollState:d.rollState}}
    else if (d.rollState===state){
      console.log(d.rollState===state,d.rollState,state);
      
      return{...d,activeStatus:true,rollState:d.rollState}
    } else{
      console.log(d.rollState===state,d.rollState,state);
      
      return{...d,activeStatus:false,rollState:d.rollState}
    }
  })

  console.log(newArr,'newArr');
dispatch({type:actions.SET_NEW_STUDENT_ARR,data:newArr})


 }

  return (
    <S.Overlay isActive={isActive}>
      <S.Content>
        <div>Class Attendance</div>
        <div>
          <RollStateList
            stateList={stateList}
            onItemClick={stateChangeHandler}
          />
          <div style={{ marginTop: Spacing.u6 }}>
            <Button color="inherit" onClick={() => onItemClick("exit")}>
              Exit
            </Button>
            <Button color="inherit" style={{ marginLeft: Spacing.u2 }} onClick={() => {
              getStudents(arr.studentsArr.map((d:any)=>{
                return {student_id:d.id,roll_state:d.rollState?d.rollState:'unmark'}
              })).then((d)=>{
                console.log(d);
                
              }).catch((e)=>{
                console.log(e);
                
              }).then(()=>{
                getactivity().then(d=>{
                  console.log(d);
                  
                })
              })
            }}>
              Complete
            </Button>
          </div>
        </div>
      </S.Content>
    </S.Overlay>
  )
}

const S = {
  Overlay: styled.div<{ isActive: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    height: ${({ isActive }) => (isActive ? "120px" : 0)};
    width: 100%;
    background-color: rgba(34, 43, 74, 0.92);
    backdrop-filter: blur(2px);
    color: #fff;
  `,
  Content: styled.div`
    display: flex;
    justify-content: space-between;
    width: 52%;
    height: 100px;
    margin: ${Spacing.u3} auto 0;
    border: 1px solid #f5f5f536;
    border-radius: ${BorderRadius.default};
    padding: ${Spacing.u4};
  `,
}
