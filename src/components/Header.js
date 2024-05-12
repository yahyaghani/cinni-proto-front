import React, { useState } from 'react';
import styled from 'styled-components';
import PinterestIcon from '@mui/icons-material/Pinterest';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TextsmsIcon from '@mui/icons-material/Textsms';
import FaceIcon from '@mui/icons-material/Face';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


function Header({ onSubmit }) {
    const [input, setInput] = useState("");

    const onSearchSubmit = (e) => {
        e.preventDefault();
        onSubmit(input);
    }

    const LogoWrapper = styled.div`
    img {
        height: 40px;  // Adjust the size as needed
        cursor: pointer;
    }
`;


    return (
        <Wrapper>
     
            {/* <HomePageBtn>
                <a href="/">Homepage</a>
            </HomePageBtn>
            <FollowingBtn>
                <a href="/">Following</a>
            </FollowingBtn> */}
            <SearchWrapper>
                {/* <SearchBarWrapper> */}
                    
                    {/* <SearchIcon style={searchIconStyle}/>
                    <form>
                        <input type="text" onChange={e => setInput(e.target.value)}/>
                        <button type="submit" onClick={onSearchSubmit}></button>
                    </form> */}

<LogoWrapper>
                <IconBtn>
                    {/* <PinterestIcon />
                     */}
                     <LogoWrapper>
                    <img src="./cinni.svg" alt="Logo" />
                </LogoWrapper>

                </IconBtn>   
            </LogoWrapper>
                {/* </SearchBarWrapper> */}
            </SearchWrapper>
            {/* <IconsWrapper>
                <IconBtn>
                    <NotificationsIcon />
                </IconBtn>
                <IconBtn>
                    <TextsmsIcon />
                </IconBtn>
                <IconBtn>
                    <FaceIcon />
                </IconBtn>
                <IconBtn>
                    <KeyboardArrowDownIcon />
                </IconBtn>
            </IconsWrapper> */}
        </Wrapper>
    )
}

export default Header

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    hwight: 56px;
    padding: 12px 4px 4px 16px;
    background-color: #354936;
    color: #000;
`

const LogoWrapper = styled.div`
    .MuiSvgIcon-root {
        color: #e60023;
        font-size: 40px;
        cursor: pointer;
    }
`

const IconBtn = styled.div`
    color: rgb(95, 95, 95);
    background-color: #354936;

    margin-left: 10px;
    padding: 5px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    :hover {
        background-color: #e1e1e1;
    }
`

const Btns = styled.div`
    display: flex;
    background-color: #354936;

    height: 40px;
    min-width: 120px;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    cursor: pointer;
    margin-left: 10px;
    a {
        font-weight: 700;
        text-decoration: none;
    }
`

const HomePageBtn = styled(Btns)`
    background-color: rgb(17, 17, 17);
    a {
        color: #fff;
    }
`

const FollowingBtn = styled(Btns)`
    background-color: #fff;
    a {
        color: #000;     
    }
    :hover {
        background-color: #e1e1e1;
    }
`

const SearchWrapper = styled.div`
    flex: 1;
    margin-left: 10px;
`

const searchIconStyle = {
    color: 'rgb(95, 95, 95)',
    margin: '0 10px'
}

const SearchBarWrapper = styled.div`
    background-color: #354936;

    display: flex;
    align-items: center;
    height: 40px;
    width: 100%;
    border-radius: 50px;
    border: none;
    padding-left: 10px;
    
    form {
        display: flex;
        flex: 1;
    }
    form > input {
        background-color: transparent;
        border: none;
        width: 100%;
        margin-left: 5px;
        font-size: 16px;
    }
    form > button {
        display: none;
    }
    input:focus {
        outline: none;
    }
`

const IconsWrapper = styled.div`
    display: flex;
    align-items: center;
    background-color: #354936;

`