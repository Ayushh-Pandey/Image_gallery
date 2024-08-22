import { Avatar, Box, ImageListItem, Typography, } from '@mui/material'
import React, {useState } from 'react'
import ImagePopUp from '../Components/ImagePopUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Lottie from 'react-lottie';
import animationData from '../LoadingAnimation.json';
import { useTheme } from '@emotion/react';

const ImageCards = ({ image }) => {

    const theme = useTheme();
    
    const [loading, setLoading] = useState(true);
    
    setTimeout(() =>setLoading(false), 2000)

    const defaultOptions = {
        loop: { loading },
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (

        <ImageListItem sx={{borderRadius: '8px',border:'1px solid gray'}}>
            <ImagePopUp img={image} key={image.id} >
                <ImageListItem key={image.id} sx={{ cursor: 'pointer'}}>

                    <img
                        srcSet={`${image.urls.regular}?w=248&h=auto&fit=crop&auto=format&dpr=2 2x`}
                        src={`${image.urls.regular}?w=248&h=auto&fit=crop&auto=format`}
                        alt={image.alt_description}
                        loading="eager"
                        style={{ display: loading ? "none" : "block",borderRadius:'8px 8px 0 0',}}
                    
                    />

                </ImageListItem>

            </ImagePopUp>
            
            
            {!loading ? 
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '68px', backgroundColor: 'background.default', color: 'text.primary',borderRadius:'0 0 8px 8px'}}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',width:'auto',height:'59px',backgroundColor:'background.default',marginLeft:'5px' }}>
                        <Avatar alt={image.user.name} src={image.user.profile_image.large} sx={{width:'59px',height:'59px'}} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'start',height:'32px',marginLeft:'5px'}}>
                            <Typography sx={{ color:`${theme.palette.mode === 'light' ? '#4F4F4F':'#E5E5E5'}`,fontFamily:'Montserrat',fontWeight:700,fontSize:'12px'  }}>{image.user.name}</Typography>
                            <Typography sx={{ color:`${theme.palette.mode === 'light' ? '#A7A7A7':'#A7A7A7'}`,fontFamily:'Poppins',fontStyle:'italic',fontWeight:600,fontSize:'10px' }}>{`@${image.user.username}`}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '5px' }}>
                        <ThumbUpOffAltIcon sx={{color:`${theme.palette.mode === 'light' ? '#E5E5E5':'#E5E5E5'}`}}/>
                        <Typography sx={{ color:`${theme.palette.mode === 'light' ? '#4F4F4F':'#E5E5E5'}`,fontFamily:'Montserrat',fontWeight:700,fontSize:'10px', marginRight: '5px' }}>{image.likes}</Typography>
                    </Box>
                </Box>
                : <Lottie options={defaultOptions} style={{ width: '200px', height: '200px' }} />
            }

        </ImageListItem>
    )
}

export default ImageCards