import { Stack, Card, Typography,    Paper, Grid, Box, Avatar, } from "@mui/material";
import React from "react";
import Link from 'next/link'

interface profile{
    image: string;
    name: string;
    mail: string;
}

const credits:profile[] = [
    {
        image:"/images/profile.png",
        name:"Prem Bharwani",
        mail:"premr20@iitk.ac.in"
    },
    {
        image:"/images/profile.png",
        name:"Abhishek Shree",
        mail:"shreea20@iitk.ac.in"
    },
    {
        image:"/images/profile.png",
        name:"Krishnansh Agarwal",
        mail:"krishnansh21@iitk.ac.in"
    },
    {
        image:"/images/profile.png",
        name:"Rahul Jha",
        mail:"rahulj21@iitk.ac.in"
    },
    {
        image:"/images/profile.png",
        name:"Ridin Dutta",
        mail:"ridind21@iitk.ac.in"
    },
    {
        image:"/images/profile.png",
        name:"Geetika",
        mail:"geetika21@iitk.ac.in"
    }
]

export default function Credits(){
    return (
        <Paper sx={{minHeight: "100vh", height:"fit-content"}}>
            <Stack spacing={2} alignItems="center">
                <Stack 
                    direction="row" 
                    justifyContent="flex-end" 
                    spacing={1} 
                    padding={1} 
                    sx={{width: "100%"}}
                >
                    <Link href="/">HOME</Link>
                    <Link href="/faq">FAQ</Link>
                    <Link href="/credits">Credits</Link>
                </Stack>
                <Typography variant="h3" align="center" gutterBottom>
                    Credits
                </Typography>
                    <Card
                        elevation={5}
                        sx={{
                        padding: 5,
                        width: {
                            md: "90%",
                            xs: "100%",
                        },
                        }}
                    >
                        <Grid container spacing={4}>
                            {
                                (credits.map((profile) => {
                                    return (
                                        <Grid item md={4}>
                                            <Card sx={{minHeight: "100px", bgcolor:'#1a1a1a', padding:"10px"}}>
                                                <Stack spacing={4} alignItems="center">
                                                    <Box>
                                                        {/* <Avatar 
                                                            src={profile.image}
                                                            sx={{ width: 112, height: 112 }}
                                                        /> */}
                                                        <Typography variant="h5" color="text.primary">{profile.name}</Typography>
                                                        <Typography variant="h6" color="text.secondary">{profile.mail}</Typography>
                                                    </Box>
                                                </Stack>   
                                            </Card>
                                        </Grid> 
                                    )
                                    })
                                )
                            }
                        </Grid>
                    </Card>
            </Stack>
        </Paper>
    )
}