import { Button, Paper, Typography } from '@mui/material'
import React from 'react'

const PageNotFound = () => {
    return (
        <Paper
            sx={{
                backgroundColor: (t) => t.palette.background.default,
                margin: 0,
                height: `100vh`,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: `100%`,
                }}
            >
                <Typography variant="h1">404</Typography>
                <Typography variant="h2">
                    Page not found
                </Typography>
                <Button
                    color="success"
                    aria-label="home"
                    href="/"
                    style={{ marginTop: 20 }}
                >
                    Home
                </Button>
            </div>
        </Paper>
    )
}

export default PageNotFound