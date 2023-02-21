import React, { useEffect, useState,useRef } from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { useLocation } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
const RollStateContainer = styled.div`
  margin: 2rem auto;
  max-width: 800px;
`;

const RollList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const RollItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const RollIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #007aff;
  color: white;
  font-size: 1.5rem;
  margin-right: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const RollInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const RollType = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const RollDate = styled.p`
  margin: 0;
  color: #808080;
`;

const EmptyStateContainer = styled.div`
  margin: 2rem auto;
  max-width: 800px;
  text-align: center;
  color: #808080;
`;

const EmptyStateIcon = styled.div`
  margin-bottom: 1rem;
  font-size: 3rem;
  color: #c3c3c3;
`;
const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
   padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  flex: 1;
  margin-right: 1rem;
  transition: box-shadow 0.2s ease-in-out;
  outline: none;

  &:focus {
    box-shadow: 0 0 5px #007aff;
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  color: #fff;
  cursor: pointer;
`;
const SearchButton = styled.button`
  background-color: #007aff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export const ActivityPage= () => {
const [activityArr, setactivityArr] = useState([])
const location = useLocation();

const [filteredActivityArr, setFilteredActivityArr] = useState([]);

useEffect(() => {
 location?.state?.activity&&
 setactivityArr(location?.state?.activity);  
}, [location])


useEffect(() => {
  setFilteredActivityArr(activityArr);
}, [activityArr]);

const handleSearch = (event) => {
  const query = event.target.value;
  const filtered = activityArr.filter((roll) =>
  roll.entity.name.toLowerCase().toLowerCase().includes(query.toLowerCase())
  );
  setFilteredActivityArr(filtered);
};
const searchInputRef = useRef (null);

const handleSearch2 = () => {
  searchInputRef.current.focus();
};

  return     <S.Container>
  {activityArr.length ? (
    <RollStateContainer>
      <h2>Completed Rolls</h2>
      <SearchBarContainer>
          <SearchInput
            type="text"
            placeholder="Search..."
            ref={searchInputRef}
            onChange={handleSearch}
          />
       <SearchButton onClick={handleSearch2} >   <SearchIcon icon={faSearch} /></SearchButton>
        </SearchBarContainer>
      <RollList>
        {filteredActivityArr.map((roll, index) => 
       { console.log(roll);
        
        return  <RollItem key={index}>
            <RollIcon>
              <BsCheckCircle />
            </RollIcon>
            <RollInfo>
              <RollType>{roll.entity.name}</RollType>
              <RollDate>{new Date(roll.date).toLocaleString()}</RollDate>
            </RollInfo>
          </RollItem>}
        )}
      </RollList>
    </RollStateContainer>
  ) : (
    <EmptyStateContainer>
      <EmptyStateIcon>
        <BsCheckCircle />
      </EmptyStateIcon>
      <p>No completed rolls yet</p>
    </EmptyStateContainer>
  )}
</S.Container>

}

const S = {
  Container: styled.div`
    /* display: flex;
    flex-direction: column;
    width: 100%;
    margin: ${Spacing.u4} auto 0; */
  `,
}
