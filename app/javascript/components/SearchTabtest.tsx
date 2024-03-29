// import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import TabPanel from '@mui/lab/TabPanel';
import Searchusersub from './Searchusersub';
import TabContext from '@mui/lab/TabContext';       
import Searchproblemsub from './Searchproblemsub';
import React,{ useState, useRef } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@mui/material/IconButton';
import '../../assets/stylesheets/index.css';


const Box1 = styled(Box)`
  position: relative;
  z-index: 7;
`


const SearchInput = styled(InputBase)`
    width: 88%;
    padding: 0;
    border-radius: 15px;
    border: 1px rgb(155,155,155,70) solid;
    background: rgb(230,230,230);
    padding-left: 15px;
    margin: 10px 5px 10px  10px;
    display: flex;
    align-items: center;
    &:hover{
      background: rgb(350,350,350);
    }
`
const Searchwrapper = styled.div`
    width: 35vw;
    background: rgb(350,350,350);
    z-index: 20;
    height: 50px;
    position: fixed;
    top: 64px;
    left: 65vw;
`
const Wrapper2 = styled.div`
    width: 100%;
    text-align: center;
   
    height: calc(100vh - 114px);
    overflow-y: auto;
    overflow-x: hidden;
    
    margin-top: 50px;
`
const Allwrapper = styled.div`
    min-height: calc(100vh - 64px);
    width: 35vw;
    scrollbar-width: none;
`

const SearchTabtest:React.VFC = () => {
  const [value, setValue] = useState('1')
  const search = useRef(null)
  const [keyword, setKeyword] = useState('')
    const handleChange = (e?: React.SyntheticEvent, newValue?: string) => {
        if (e && newValue) {
            setValue(newValue);
        };
    };
  const handlesubmit = () => {
    if (search) {
      const searchkey: any = search.current;
      setKeyword(searchkey.childNodes[0].value)
    } else {
      setKeyword('')
    }
  }
  const handlekeypress = (e: any) => {
    if (e.key === 'Enter') {
      handlesubmit()
    }
  }

    return (<Allwrapper>
        <Searchwrapper>
        <SearchInput ref={search} placeholder="検索キーワード..." onKeyPress={e => { handlekeypress(e)}}/>
        <IconButton sx={{ padding: '0 0 0 5px',  position: 'absolute', top: '20px', right: '1%'}} onClick={handlesubmit}>
                <SearchIcon />
            </IconButton>
        </Searchwrapper>
      <Wrapper2 id='wrapper' className='box' >
        <Box1 key='box1' sx={{ width: '100%' }}>
            <TabContext value={value}>
            <Box1 key='box2' sx={{ borderBottom: 1, borderColor: 'divider',width:'100%' }}>
            <TabList
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
                >
                    <Tab key='one'  label="ユーザー" value='1' sx={{width: '50%'}}  />
                    <Tab key='two'  label="問題" value='2' sx={{width: '50%'}} />
            </TabList>
            </Box1>
            <TabPanel key='one-user-sub' value={'1'} sx={{p: '0'}} >
                <Searchusersub keyword={keyword} />
            </TabPanel>
            <TabPanel key='two-user-sub' value={'2'}  sx={{p: '0'}}>
                <Searchproblemsub keyword={keyword} />
              </TabPanel>
          </TabContext>
        </Box1>
        </Wrapper2>
    </Allwrapper>)
}

export default SearchTabtest
