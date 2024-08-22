import React from 'react'
import { Box, ImageList, Pagination, Stack, Typography, capitalize, useMediaQuery } from '@mui/material'
import ImageCards from '../Components/ImageCards';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../redux/features/Images/pageSlice';
import { useTheme } from '@emotion/react';
import Lottie from 'react-lottie';
import animationData from '../LoadingAnimation.json'

const SearchResults = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    let page = useSelector((state) => state.page.value)
    const totalpages = useSelector((state) => state.totalpages.value)
    const images = useSelector((state) => state.images.value)

    const query = (sessionStorage.getItem('query'));
    
    const dispatch = useDispatch();

    const theme = useTheme();

    const isXs = useMediaQuery(theme.breakpoints.up('xs') && theme.breakpoints.down('sm'))
    const isSm = useMediaQuery(theme.breakpoints.up('sm') && theme.breakpoints.down('md'));
    const isMd = useMediaQuery(theme.breakpoints.up('md') && theme.breakpoints.down('lg'));
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));

    const getCols = () => {
        if (isXs) return 1;
        if (isSm) return 2;
        if (isMd) return 2;
        if (isLg) return 3;
        return 4; // Default to 4 columns if no match
    };
    
    return (

        <Box style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: 'background.default', color: 'text.default' }}>

            <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', width: '100%', height: '44px', marginTop: '97px', }}>
                <Typography sx={{ width: '364px', height: '44px', marginLeft: '65px', fontFamily: 'Montserrat', fontWeight: 700, lineHeight: '43.88px', fontSize: '36px', color: `${theme.palette.mode === 'light' ? '#4F4F4F' : '#FFFFFF'}` }}>{capitalize(query)}</Typography>
            </Box>

            {images?.length>0 ? 
            <Box sx={{ backgroundColor: 'background.default', color: 'text.primary', overflowY: 'scroll' }}>

                <ImageList variant="masonry" gap={10} cols={getCols()} sx={{ backgroundColor: 'background.default', color: 'text.primary', margin: '65px 65px 65px 65px' }}>
                    {images?.map((image) => (
                        <ImageCards image={image} />
                    ))}
                </ImageList>

                <Stack spacing={2} sx={{ margin: '0 0 20px 65px', down: '0', }}>
                    <Pagination count={totalpages} page={page} sx={{ fontFamily: 'Montserrat' }} color='primary' shape='rounded' variant='outlined' onChange={(e, value) => dispatch(setPage(value))} />
                </Stack>

            </Box>
            : <>
            <Lottie options={defaultOptions} style={{width: '400px', height: '400px' }}/>
            <Typography sx={{color:'text.primary',fontFamily:'Montserrat',fontSize:'15px',textAlign:'center'}}>No more images,<Typography sx={{display:'inline',color:'text.primary',fontFamily:'Montserrat',fontSize:'15px',textAlign:'center',cursor:'pointer',"&:hover":{color:'#0096FF'}}} onClick={()=>window.location.reload()}> Click here to refresh</Typography></Typography>
            </>
}
        </Box>

    )
}

export default SearchResults;

