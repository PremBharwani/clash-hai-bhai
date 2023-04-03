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
        answer:"Click on others option in select branch dropdown and then you can manually select from all the offered courses from all departments section."
    },
]
export default function FAQ(){
    return (
        <Paper sx={{minHeight: "100vh", height:"fit-content"}}>
            <Stack spacing={2} alignItems="center" padding={2}>
            <Typography
            variant="h3"
            noWrap
            component="a"
            sx={{
            mr: 2,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
            }}
          >
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