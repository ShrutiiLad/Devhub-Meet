import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) return;
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`)
    }

    return (
        <div className="homePage">
            <div className="navBar">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h2>Devhub</h2>
                </div>

                <div className="navBarActions">
                    <IconButton className="historyLink" onClick={() => navigate("/history")}>
                        <RestoreIcon />
                        <span>History</span>
                    </IconButton>

                    <Button
                        variant="contained"
                        onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/auth")
                        }}
                        sx={{
                            borderRadius: '12px',
                            background: 'linear-gradient(90deg, #ff9839, #ff6a3d)',
                            color: 'white',
                            fontWeight: 700,
                            textTransform: 'none'
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <p className="authBrand" style={{ marginBottom: '12px' }}>Devhub Connect</p>
                        <h2>Seamless communication, wherever your team is.</h2>
                        <p>Start or join a meeting instantly and keep your conversations moving.</p>

                        <div className="joinActions">
                            <TextField
                                onChange={e => setMeetingCode(e.target.value)}
                                id="meeting-code"
                                label="Meeting Code"
                                variant="outlined"
                                value={meetingCode}
                                size="small"
                                sx={{ minWidth: 220 }}
                            />
                            <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>
                        </div>
                    </div>
                </div>

                <div className='rightPanel'>
                    <img srcSet='/logo3.png' alt="Devhub team communication" />
                </div>
            </div>
        </div>
    )
}

export default withAuth(HomeComponent)