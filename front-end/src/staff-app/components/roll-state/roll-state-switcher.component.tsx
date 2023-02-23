import React, { useEffect, useState } from "react"
import { RolllStateType } from "shared/models/roll"
import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component"
import { useSelector,useDispatch } from "react-redux";
import { actions } from "staff-app/daily-care/store/action";
interface Props {
  initialState?: RolllStateType
  size?: number
  studentTracker?:any
  onStateChange?: (newState: RolllStateType) => void
}
export const RollStateSwitcher: React.FC<Props> = ({ initialState = "unmark",studentTracker, size = 40, onStateChange }) => {
  const [rollState, setRollState] = useState(initialState)
  
  const StudentsList=useSelector((state:any)=>(state.StudentsList))

  const dispatch= useDispatch()

  const findindex=()=>{
    const index = StudentsList.studentsArr.findIndex((d:any,i:any)=>{
      return d===studentTracker
    })
    return index;
  };

  const nextState = () => {
    const states: RolllStateType[] = ["present", "late", "absent"]
    if (rollState === "unmark" || rollState === "absent") return states[0]
    const matchingIndex = states.findIndex((s) => s === rollState)
    return matchingIndex > -1 ? states[matchingIndex + 1] : states[0]
  };

  const onClick = () => {
    const next = nextState()
    const index= findindex()
    const newArr=StudentsList.studentsArr;
    newArr.splice(index,1,{...studentTracker,rollState:next})
    dispatch({type:actions.SET_NEW_STUDENT_ARR,data:newArr})
    setRollState(next)
    if (onStateChange) {
      onStateChange(next)
    }
  };
  

  return <RollStateIcon type={rollState} size={size} onClick={onClick} />
}
