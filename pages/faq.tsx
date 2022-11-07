import { Stack, Card, Typography, List, ListItem, ListItemText, Paper, Divider } from "@mui/material";
import React from "react";
import Link from 'next/link';

interface faq{
    question: string;
    answer: string;
}

const faq:faq[] = [
    {
        question:"What do I do if the template for my branch/sem is not available?",
        answer:"Click on Build Custom Template button and then you can manually select from all the offered courses from all departments"
    },
]
export default function FAQ(){
    return (
        <Paper sx={{minHeight: "100vh", height:"fit-content"}}>
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
            <Stack spacing={2} alignItems="center">
                <Typography variant="h3" align="center" gutterBottom>
                    FAQ
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
                    {
                        (faq.map((question) => {
                            return (
                                <React.Fragment>
                                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemText
                                                primary={question.question}
                                                secondary={
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {question.answer}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                    </List>
                                    <br />
                                    <Divider variant="inset" />
                                    <br />
                                </React.Fragment>
                                )
                            })
                        )
                    }
                </Card> 
            </Stack>
        </Paper>
    )
}