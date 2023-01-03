import * as React from "react";
import { makeStyles, Paper, Popper, styled, Tooltip, Typography } from "@mui/material";
import { GridCellParams } from '@mui/x-data-grid';

export default function CellExpand(params: GridCellParams) {
    return (
        <>
        <Tooltip 
            title={<Typography>{String(params.value)}</Typography>} 
            PopperProps={{ disablePortal: true }} 
            placement="bottom" 
        >
            <span>
                {params.value}
            </span>
        </Tooltip>
        <style jsx>{`
            span {
                display:block;
                width:2px;
                height:auto
                word-wrap:break-word;
            }
        `}</style>
        </>)
}
