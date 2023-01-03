import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Container, Toolbar, Typography, Box, Link, Stack, IconButton, createTheme } from '@mui/material';
import { useState, useMemo } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const pages = [["/","HOME"], ["/faq","FAQ"],["/credits","CREDITS"],["https://forms.gle/eW5zmw757HMzPQfy7","FEEDBACK"]]

export default function TopNavBar({
    theme,
    colorMode
}: any){
    return (
        <AppBar position="static">
            <Stack justifyContent="space-around" direction={{ xs: 'column', sm: 'row' }} padding={2} spacing={2}>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    CLASH HAI BHAI!
                </Typography>
                <Stack justifyContent="space-between" direction="row">
                    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            {pages.map((page) => (
                                <Typography
                                noWrap
                                component="a"
                                href={page[0]}
                                sx={{
                                  mr: 2,
                                  fontFamily: 'monospace',
                                  fontWeight: 200,
                                  letterSpacing: '.3rem',
                                  color: 'inherit',
                                }}
                              >
                                  {page[1]}
                              </Typography>
                            ))}
                    </Stack>
                    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Stack>
            </Stack>
        </AppBar>
    )
}