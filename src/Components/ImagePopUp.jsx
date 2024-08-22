import { Avatar, Box, Button, capitalize, IconButton, Modal, Typography } from '@mui/material';
import React, { useState } from 'react'
import ShareIcon from '@mui/icons-material/Share';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useTheme } from '@emotion/react';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '388.08px', sm: '550px', md: '945px' },
    height: '710.49px',
    bgcolor: 'background.default',
    color: 'text.primary',
    outline: 'none',
    border: '1px solid #E5E5E5',
    borderRadius: '16px'
}

const ImagePopUp = ({ img, children }) => {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        open === true ? setOpen(false) : setOpen(true);
    }

    const theme = useTheme();

    const downloadImage = async (imageSrc, imageName) => {

        const image = await fetch(imageSrc);
        const imageBlog = await image.blob()
        const imageURL = URL.createObjectURL(imageBlog)
        const link = document.createElement('a')
        link.href = imageURL;
        link.download = "" + imageName + "";
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div>
            <span onClick={handleClick}>{children}</span>
            <Modal open={open} onClose={handleClick}>
                <Box sx={style}>
                    <IconButton variant='contained' size='small' sx={{ top: 0, right: 0, position: 'absolute', backgroundColor: '#ECECEC', color: '#4F4F4F', "&:hover": { backgroundColor: '#ECECEC' } }} onClick={handleClick}>
                        <CloseIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', height: '575px', borderRadius: '16px 16px 0 0 ', backgroundImage: `url(${img.urls.full})` }}>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '5px' }}>
                            <Button variant='outlined' sx={{ textDecoration: 'none', textTransform: 'none', fontFamily: 'Montserrat', fontWeight: 500, fontSize: '10px', lineHeight: '10.04px', textAlign: 'center', color: '#ECECEC' }} startIcon={<ShareIcon />} >
                                Share
                            </Button>
                            <Button variant='outlined' sx={{ textDecoration: 'none', textTransform: 'none', fontFamily: 'Montserrat', fontWeight: 500, fontSize: '10px', lineHeight: '10.04px', textAlign: 'center', color: '#ECECEC' }} startIcon={<InfoIcon />}>
                                Info
                            </Button>
                        </Box>
                        <Box sx={{ margin: '5px' }}>
                            <Button variant='contained' sx={{ textDecoration: 'none', textTransform: 'none', backgroundColor: '#3CB46E', fontFamily: 'Montserrat', fontWeight: 700, fontSize: '10px', lineHeight: '12.19px', color: '#FFFFFF' }} onClick={() => downloadImage(img.urls.full, img.alt_description)}>
                                Download Image
                            </Button>
                        </Box>

                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '5px', }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '5px' }}>
                            <Avatar src={img.user.profile_image.large} sx={{ width: '56px', height: '56px' }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'start', marginLeft: '5px' }}>
                                <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '14px', lineHeight: '17.07px', color: `${theme.palette.mode === 'light' ? '#4F4F4F' : '#E5E5E5'}` }}>{img.user.name}</Typography>
                                <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, fontStyle: 'italic', fontSize: '12px', lineHeight: '18px', color: `${theme.palette.mode === 'light' ? '#4F4F4F' : '#A7A7A7'}` }}>{`@${img.user.username}`}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '5px' }}>
                            <ThumbUpOffAltIcon sx={{ color: '#858484' }} />
                            <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '15px', lineHeight: '18.29px', color: '#858484', marginRight: '5px' }}>{img.likes}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', margin: '5px' }}>
                        <Typography sx={{ marginLeft: '5px', backgroundColor: 'background.default', fontFamily: 'Montserrat', fontWeight: 700, fontSize: '12px', lineHeight: '14.63px', color: `${theme.palette.mode === 'light' ? '#4F4F4F' : 'E5E5E5'}` }}>Related Tags</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginLeft: '5px', marginTop: '5px' }}>
                            {img?.tags?.map((item) => (
                                <Box sx={{ width: 'auto', height: '28px', padding: '8px 12px 8px 12px', borderRadius: '4px', backgroundColor: '#ECECEC' }}>
                                    <Typography sx={{ height: '12px', fontFamily: 'Montserrat', fontWeight: 500, fontSize: '10px', lineHeight: '12.19px', textAlign: 'center', color: '#4F4F4F' }}>{capitalize(item.title)}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default ImagePopUp