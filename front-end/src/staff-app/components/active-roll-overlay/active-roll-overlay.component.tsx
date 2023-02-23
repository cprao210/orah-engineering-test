import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { BorderRadius, Spacing } from "shared/styles/styles";
import { RollStateList } from "staff-app/components/roll-state/roll-state-list.component";
import { useSelector,useDispatch } from "react-redux";
import { actions } from "staff-app/daily-care/store/action";
import { Person } from "shared/models/person";
import { useApi } from "shared/hooks/use-api";
import { useNavigate } from "react-router-dom";
export type ActiveRollAction = "filter" | "exit";

interface Props {
  isActive: boolean
  onItemClick: (action: ActiveRollAction, value?: string) => void
}

const APIUrls = {
  SAVE_ROLL: "save-roll",
  GET_ACTIVITIES: "get-activities",
};

export const ActiveRollOverlay: React.FC<Props> = ({
  isActive,
  onItemClick,
}: Props) => {
  const StudentsList = useSelector((state: any) => state.StudentsList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [stateList, setStateList] = useState([
    { type: "all", count: 0 },
    { type: "present", count: 0 },
    { type: "late", count: 0 },
    { type: "absent", count: 0 },
  ]);
  
  
 const [saveRoll, rollsData, rollsLoadState] = useApi<{ students: Person[] }>({
    url: APIUrls.SAVE_ROLL,
  });
  const [
    getActivity,
    activityData,
    activityLoadState,
  ] = useApi<{ students: Person[] }>({ url: APIUrls.GET_ACTIVITIES });

  useEffect(() => {
    if (StudentsList.studentsArr) {
      const presentCount = StudentsList.studentsArr.filter((student: any) => student.rollState === 'present').length;
      const lateCount = StudentsList.studentsArr.filter((student: any) => student.rollState === 'late').length;
      const absentCount = StudentsList.studentsArr.filter((student: any) => student.rollState === 'absent').length;

      setStateList([
        { type: "all", count: StudentsList.studentsArr.length },
        { type: "present", count: presentCount },
        { type: "late", count: lateCount },
        { type: "absent", count: absentCount },
      ]);
    }
  }, [StudentsList]);

  useEffect(() => {
    activityData&& navigate('/staff/activity',{state:activityData})
  }, [activityData])
  


  
 const sortOnRollState = (state: any, arr: any) => {
  
  const newArr = arr.map((student: any) => {
    if (state === 'all' || student.rollState === state) {
      return { ...student, activeStatus: true ,rollState:student.rollState};
    }
    return { ...student, activeStatus: false ,rollState:student.rollState};
  });
  ;
  
  dispatch({ type: actions.SET_NEW_STUDENT_ARR, data: [...newArr] });
};
  return (
    <S.Overlay isActive={isActive}>
      <S.Content>
        <div>Class Attendance</div>
        <div>
          <RollStateList
            stateListArr={stateList}
            onItemClick={sortOnRollState}
          />
          <div style={{ marginTop: Spacing.u6 }}>
            <Button color="inherit" onClick={() => onItemClick("exit")}>
              Exit
            </Button>
            <Button color="inherit" style={{ marginLeft: Spacing.u2 }} onClick={() => {
              saveRoll(StudentsList.studentsArr.map((d:any)=>{
                return {student_id:d.id,roll_state:d.rollState?d.rollState:'unmark'}
              })).then(()=>{
                getActivity()}).catch((e)=>{
                  console.error(e)
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
