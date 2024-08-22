import React, {useState } from 'react'
import { Box, Button, Divider, IconButton, InputBase, Menu, MenuItem, Switch, Typography, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useDispatch, } from 'react-redux';
import { setQuery } from '../redux/features/Images/querySlice';
import { toggleColorMode } from '../redux/features/colorMode/colorModeSlice';


const Navbar = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput,setSearchInput] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const theme = useTheme();

  const handleSearch = (e) => {
    if (!searchQuery){
      setSearchInput((prevState)=>prevState===true?false:true)
      return;
    }
      
    if (e.type === 'click' || (e.type === 'keydown' && e.key === "Enter")) {
      dispatch(setQuery(searchQuery))
      setSearchQuery('')
      setSearchInput(false)
      return;
    }
  }

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{
      top: '0',
      position: 'fixed',
      zIndex: '1',
      width: '100%',
      height: '97px',
      backgroundColor: 'background.default',
      color: 'text.primary',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: { md: '1440px', sm: '720px', xs: '411px' },
        height: '100%',
        margin: '0 65px 0 65px'
      }}>

        <Typography sx={{ display: 'block', height: '42px', width: '170px', lineHeight: '41.63px', fontFamily: 'Pattaya', fontWeight: '400', fontSize: '30px', color: 'text.primary', cursor: 'default' }} onClick={() => dispatch(setQuery(""))}>
          Image gallery
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: `${theme.palette.mode === 'light' ? '#FAFAFA' : '#4F4F4F'}`,
            border: `${theme.palette.mode === 'light' ? '1px solid #ECECEC' : '1px solid #858484'}`,
            width: { sm: '209.5px', md: '419px',xs:`${searchInput?'150px':'40px'}`},
            borderRadius: '6px',
            height: '43px'
          }} >

          <IconButton sx={{display:"inline-flex", color: `${theme.palette.mode === 'light' ? '#C4C4C4' : '#8D8D8D'}` }} onClick={handleSearch}>
            <SearchIcon />
          </IconButton>

          <InputBase sx={{ display:{xs:`${searchInput?'inline-flex':'none'}`,sm:'inline-flex'},width: '100%', fontFamily: 'Montserrat', fontWeight: 500, lineHeight: '14.63px', fontSize: '12px', color: `${theme.palette.mode === 'light' ? 'black' : 'white'}` }} value={searchQuery} placeholder='search for image...' onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleSearch} />

          <IconButton sx={{display:{xs:'none',sm:'inline-flex'}, color: `${theme.palette.mode === 'light' ? '#C4C4C4' : '#8D8D8D'}` }} onClick={() => setSearchQuery("")}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>

        <Box sx={{
          display: { xs: 'none', sm: 'none', md: 'flex' },
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '259px',
          height: '15px',
        }}>
          <Button sx={{ width: '48px', height: '15px', textTransform: 'none', lineHeight: '14.63px', textDecoration: 'none', color: 'text.primary', fontFamily: 'Montserrat', fontWeight: 700, fontSize: '12px' }}>Explore</Button>
          <Button sx={{ width: '64px', height: '15px', textTransform: 'none', lineHeight: '14.63px', textDecoration: 'none', color: 'text.primary', fontFamily: 'Montserrat', fontWeight: 700, fontSize: '12px' }}>Collection</Button>
          <Button sx={{ width: '75px', height: '15px', textTransform: 'none', lineHeight: '14.63px', textDecoration: 'none', color: 'text.primary', fontFamily: 'Montserrat', fontWeight: 700, fontSize: '12px' }}>Community</Button>
        </Box>
        <Box sx={{
          width: '130px', height: '19px', display: { md: 'flex', xs: 'none' }, justifyContent: 'space-between', alignItems: 'center'
        }}>
          <Typography sx={{ width: '100px', height: '15px', fontWeight: 700, fontSize: '12px', lineHeight: '14.63px', fontFamily: 'Montserrat' }}>{`${theme.palette.mode==='light'?'Dark Mode':'Light Mode'}`}</Typography>
          <Switch checked={`${theme.palette.mode === 'light' ? '' : 'checked'}`} onClick={() => dispatch(toggleColorMode())} />
        </Box>
        <Box sx={{display:{xs:'block',md:'none'}}}>
          <IconButton id="nav-options-button"
            aria-controls={open ? 'nav-options-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            ><FormatListBulletedIcon /></IconButton>
          <Menu id="nav-options-menu"
            MenuListProps={{
              'aria-labelledby': 'nav-options-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{display:{xs:'block',md:'none'}}}
            >
            <MenuItem sx={{height:'19px',fontFamily:'Montserrat',fontWeight:700,fontSize:'12px'}}>
              Explore
            </MenuItem>
            <Divider/>
            <MenuItem sx={{height:'19px',fontFamily:'Montserrat',fontWeight:700,fontSize:'12px'}}>
              Collection
            </MenuItem>
            <Divider/>
            <MenuItem sx={{height:'19px',fontFamily:'Montserrat',fontWeight:700,fontSize:'12px'}}>
              Community
            </MenuItem>
            <Divider/>
            <MenuItem sx={{height:'21px',fontFamily:'Montserrat',fontWeight:700,fontSize:'12px'}}>
            {`${theme.palette.mode==='light'?'Dark Mode':'Light Mode'}`} <Switch checked={`${theme.palette.mode === 'light' ? '' : 'checked'}`} onClick={() => dispatch(toggleColorMode())} />
            </MenuItem>

          </Menu>
        </Box>

      </Box>
    </Box>
  )
}

export default Navbar