import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';

const defaultTheme = createTheme();

export default function Authentication() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false)

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {
                await handleLogin(username, password)
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("");
                setFormState(0);
                setPassword("");
            }
        } catch (err) {
            let msg = err?.response?.data?.message || 'Something went wrong';
            setError(msg);
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" className="authPage" sx={{ height: '100vh' }}>
                <CssBaseline />

                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className="authPanel" sx={{
                    background: 'rgba(12, 18, 42, 0.88)',
                    borderLeft: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Box
                        sx={{
                            my: 6,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: 460,
                        }}
                    >
                        <div className="authBrand">Devhub</div>

                        <Avatar sx={{ m: 1, bgcolor: '#ff9839' }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <div className="authToggle">
                            <Button
                                variant={formState === 0 ? 'contained' : 'text'}
                                onClick={() => setFormState(0)}
                                sx={{
                                    flex: 1,
                                    color: formState === 0 ? 'white' : '#dfe7ff',
                                    background: formState === 0 ? 'linear-gradient(90deg, #ff9839, #ff6a3d)' : 'transparent',
                                    fontWeight: 700,
                                    textTransform: 'none'
                                }}
                            >
                                Sign In
                            </Button>
                            <Button
                                variant={formState === 1 ? 'contained' : 'text'}
                                onClick={() => setFormState(1)}
                                sx={{
                                    flex: 1,
                                    color: formState === 1 ? 'white' : '#dfe7ff',
                                    background: formState === 1 ? 'linear-gradient(90deg, #ff9839, #ff6a3d)' : 'transparent',
                                    fontWeight: 700,
                                    textTransform: 'none'
                                }}
                            >
                                Sign Up
                            </Button>
                        </div>

                        <Box component="form" noValidate className="authForm" sx={{ mt: 1, width: '100%' }}>
                            {formState === 1 && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="fullname"
                                    label="Full Name"
                                    name="fullname"
                                    value={name}
                                    autoFocus
                                    onChange={(e) => setName(e.target.value)}
                                    sx={{
                                        '& .MuiInputBase-input': { color: '#111827' },
                                        '& .MuiInputLabel-root': { color: '#374151' },
                                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(15,23,42,0.18)' },
                                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(15,23,42,0.35)' },
                                        '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ff9839' },
                                        '& .Mui-focused .MuiInputLabel-root': { color: '#ff9839' }
                                    }}
                                />
                            )}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={username}
                                autoFocus={formState === 0}
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{
                                    '& .MuiInputBase-input': { color: '#111827' },
                                    '& .MuiInputLabel-root': { color: '#374151' },
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(15,23,42,0.18)' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(15,23,42,0.35)' },
                                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ff9839' },
                                    '& .Mui-focused .MuiInputLabel-root': { color: '#ff9839' }
                                }}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                sx={{
                                    '& .MuiInputBase-input': { color: '#111827' },
                                    '& .MuiInputLabel-root': { color: '#374151' },
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(15,23,42,0.18)' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(15,23,42,0.35)' },
                                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ff9839' },
                                    '& .Mui-focused .MuiInputLabel-root': { color: '#ff9839' }
                                }}
                            />

                            <p style={{ color: '#ff8d8d', minHeight: '22px', margin: '12px 0 0' }}>{error}</p>

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                className="authSubmit"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? 'Login' : 'Register'}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                message={message}
            />
        </ThemeProvider>
    );
}