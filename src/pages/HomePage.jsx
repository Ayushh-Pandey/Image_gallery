import React, { useState, } from 'react'
import { Box, IconButton, ImageList, InputBase, Typography, useMediaQuery, } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import tmp from './homepageImage.jpg'
import { useSelector, useDispatch } from 'react-redux';
import { setImages } from '../redux/features/Images/imageSlice';
import { setTotalPages } from '../redux/features/Images/totalpagesSlice';
import { setQuery } from '../redux/features/Images/querySlice';
import { useGetImageByTagQuery } from '../redux/services/searchImage';
import Navbar from '../Components/Navbar';
import ImageCards from '../Components/ImageCards';
import SearchResults from './SearchResults';
import Lottie from 'react-lottie'
import animationData from '../LoadingAnimation.json';
import { useTheme } from '@emotion/react';


const HomePage = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const [searchQuery, setSearchQuery] = useState('');

    const page = useSelector((state) => state.page.value)
    const images = useSelector((state) => state.images.value)
    let query = useSelector((state => state.query.value))


    const customQuery = sessionStorage.getItem('query')
    if (customQuery !== null) {
        query = customQuery;
    }

    const dispatch = useDispatch();

    const theme = useTheme();

    const { data, error, isLoading, isFetching, isSuccess, isUninitialized } = useGetImageByTagQuery(query?.length ? { query, page } : 'nature');


    if (data) {
        dispatch(setImages(data.results));
        dispatch(setTotalPages(data.total_pages));
    }

    const handleSearch = (e) => {
        if (!searchQuery)
            return;
        else if (e.type === 'click' || (e.type === 'keydown' && (e.key === "Enter"))) {
            dispatch(setQuery(searchQuery))
            setSearchQuery('')
            return;
        }
    }

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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100vw', height: '100vh', }}>

            <Navbar />

            {images?.length > 0 ? <>

                {(query === '') ? <>
                    {(isFetching || isLoading || isUninitialized) && <Lottie options={defaultOptions} style={{ marginTop: '150px', width: '400px', height: '400px' }} />}

                    <Box sx={{ displaly: 'flex', flexDirection: 'column', width: '100%', bgcolor: 'background.default', color: 'text.default', overflow: 'auto', marginTop: '97px', position: 'relative', height: '100%', padding: '0' }}>

                        <Box style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', backgroundPosition: 'center', backgroundSize: 'cover', height: '384px', backgroundImage: `url(${tmp})`, overflow: 'hidden' }}>
                            <Typography sx={{ display: 'block', marginTop: '119px', fontFamily: 'Montserrat', fontSize: '32px', fontWeight: 700, lineHeight: '39.01px', letterSpacing: '-0.02em', textAlign: 'center', color: '#FFFFFF' }}>
                                Download High Quality Images by creators
                            </Typography>
                            <Typography sx={{ display: 'block', marginTop: '17px', fontFamily: 'Montserrat', fontWeight: 500, fontSize: '14px', lineHeight: '17.07px', color: '#C4C4C4' }}>Over 2.4 million+ stock Images by our talented community</Typography>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#FFFFFF',
                                width: { md: '808px', sm: '600px', xs: '325px' },
                                height: '54px',
                                borderRadius: '8px',
                                marginTop: '16px',
                            }}>
                                <IconButton sx={{ color: `${theme.palette.mode === 'light' ? '#C4C4C4' : '#8D8D8D'}` }} onClick={handleSearch} type='submit'>
                                    <SearchIcon />
                                </IconButton>

                                <InputBase sx={{ width: '100%', height: '17px', fontFamily: 'Montserrat', fontSize: '14px', lineHeight: '17.07px', color: `${theme.palette.mode === 'light' ? 'black' : '#8D8D8D'}` }} value={searchQuery} placeholder='Search high resolution Images, categories, wallpapers...' onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleSearch} />

                                <IconButton sx={{ color: `${theme.palette.mode === 'light' ? '#C4C4C4' : '#8D8D8D'}` }} onClick={() => setSearchQuery("")}>
                                    <CloseOutlinedIcon />
                                </IconButton>
                            </Box>
                        </Box>

                        <Box sx={{ backgroundColor: 'background.default', color: 'text.primary' }}>
                            <ImageList variant="masonry" cols={getCols()} gap={10} style={{ backgroundColor: 'background.default', color: 'text.primary', margin: '65px 65px 65px 65px' }}>
                                {images?.map((image) => (
                                    <ImageCards image={image} />
                                ))}
                            </ImageList>
                        </Box>

                    </Box >
                </>
                    : <>
                        {(isSuccess) && <SearchResults />}
                        {(error || isFetching || isLoading || isUninitialized) && <Lottie options={defaultOptions} style={{ marginTop: '150px', width: '400px', height: '400px' }} />}
                    </>
                }
            </>
                : <>
                    <Lottie options={defaultOptions} style={{ marginTop: '150px', width: '400px', height: '400px' }} />
                    <Typography sx={{ color: 'text.primary', fontFamily: 'Montserrat', fontSize: '15px', textAlign: 'center' }}>Error occured,<Typography sx={{ display: 'inline', color: 'text.primary', fontFamily: 'Montserrat', fontSize: '15px', textAlign: 'center', cursor: 'pointer', "&:hover": { color: '#0096FF' } }} onClick={() => window.location.reload()}> Click here to refresh</Typography></Typography>
                </>}
        </Box>
    )
}

export default HomePage