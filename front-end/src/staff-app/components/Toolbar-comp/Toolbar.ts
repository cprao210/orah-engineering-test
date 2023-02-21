import React, { useState } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"

type ToolbarAction = "roll" | "sort"
type SortDirection = "asc" | "desc"
type SortBy = "firstName" | "lastName"

interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick } = props
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [sortBy, setSortBy] = useState<SortBy>("firstName")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSortToggle = () => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc"
    setSortDirection(newSortDirection)
    onItemClick("sort", `${sortBy}:${newSortDirection}`)
  }

  const handleSortByChange = (newSortBy: SortBy) => {
    setSortBy(newSortBy)
    setSortDirection("asc")
    onItemClick("sort", `${newSortBy}:asc`)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    onItemClick("search", event.target.value)
  }

  return (
    <S.ToolbarContainer>
      <S.SortToggle onClick={handleSortToggle}>
        {sortDirection === "asc" ? (
          <FontAwesomeIcon icon="sort-alpha-up-alt" />
        ) : (
          <FontAwesomeIcon icon="sort-alpha-down-alt" />
        )}
      </S.SortToggle>
      <S.SortByContainer>
        <S.SortByLabel>Sort By:</S.SortByLabel>
        <S.SortByButton
          isActive={sortBy === "firstName"}
          onClick={() => handleSortByChange("firstName")}
        >
          First Name
        </S.SortByButton>
        <S.SortByButton
          isActive={sortBy === "lastName"}
          onClick={() => handleSortByChange("lastName")}
        >
          Last Name
        </S.SortByButton>
      </S.SortByContainer>
      <S.SearchInput
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <S.RollButton onClick={() => onItemClick("roll")}>Start Roll</S.RollButton>
    </S.ToolbarContainer>
  )
}

const S = {
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  SortToggle: styled.div`
    cursor: pointer;
  `,
  SortByContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  SortByLabel: styled.div`
    margin-right: ${Spacing.u1};
  `,
  SortByButton: styled.div<{ isActive: boolean }>`
    cursor: pointer;
    margin-right: ${Spacing.u2};
    font-weight: ${({ isActive }) => (isActive ? FontWeight.strong : FontWeight.normal)};
    text-decoration: ${({ isActive }) => (isActive ? "underline" : "none")};
  `,}
