import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component"
import { Spacing, FontWeight } from "shared/styles/styles"
import { RolllStateType } from "shared/models/roll"
import { useSelector } from "react-redux";
interface Props {
  stateListArr:any
  onItemClick?: (type: ItemType,arr:any) => void
  size?: number
}
export const RollStateList: React.FC<Props> = ({ stateListArr, size = 14, onItemClick }) => {
  const onClick = (type: ItemType,arr:any) => {
    if (onItemClick) {
      onItemClick(type,arr)
    }
  }
  const arr=useSelector((state:any)=>(state.DailyActivityReducer.studentsArr))
 

  return (
    <S.ListContainer>
      {stateListArr.map((s:any, i:any) => {
        if (s.type === "all") {
          return (
            <S.ListItem key={i}>
              <FontAwesomeIcon icon="users" size="sm" style={{ cursor: "pointer" }} onClick={() =>{ 
                onClick(s.type,arr)}} />
              <span>{s.count}</span>
            </S.ListItem>
          )
        }

        return (
          <S.ListItem key={i}>
            <RollStateIcon type={s.type} size={size} onClick={() => onClick(s.type,arr)} />
            <span>{s.count}</span>
          </S.ListItem>
        )
      })}
    </S.ListContainer>
  )
}

const S = {
  ListContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  ListItem: styled.div`
    display: flex;
    align-items: center;
    margin-right: ${Spacing.u2};

    span {
      font-weight: ${FontWeight.strong};
      margin-left: ${Spacing.u2};
    }
  `,
}

interface StateList {
  type: ItemType
  count: number
}

type ItemType = RolllStateType | "all"
