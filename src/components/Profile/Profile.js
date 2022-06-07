import React from "react";
import styled from "styled-components";

import Button from "../shared/Button";

const Profile = () => {
  return (
    <ProfileStyle>
      <StatusBar>status bar</StatusBar>
      <UserContainer>
        <Avatar>image</Avatar>
        <UserName>username</UserName>
      </UserContainer>
      <SearchBar>input</SearchBar>
      <ButtonContainer>
        <Button>Personal Todo</Button>
        <Button>Group List</Button>
      </ButtonContainer>
    </ProfileStyle>
  );
};

export default Profile;

const ProfileStyle = styled.div``;
const StatusBar = styled.div``;
const UserContainer = styled.div``;
const UserName = styled.div``;
const Avatar = styled.div``;
const SearchBar = styled.input``;
const ButtonContainer = styled.div``;
