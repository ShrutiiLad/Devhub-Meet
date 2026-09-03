import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([])

    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                // IMPLEMENT SNACKBAR
            }
        }

        fetchHistory();
    }, [])

    let formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();

        return `${day}/${month}/${year}`
    }

    return (
        <div className="historyPage">
            <div className="historyHeader">
                <h2>Meeting History</h2>
                <IconButton
                    onClick={() => routeTo("/home")}
                    sx={{
                        background: 'rgba(255,255,255,0.05)',
                        color: 'white',
                        borderRadius: '12px'
                    }}
                >
                    <HomeIcon />
                </IconButton>
            </div>

            {(meetings.length !== 0) ? (
                <div className="historyList">
                    {meetings.map((e, i) => (
                        <div key={i} className="historyCard">
                            <p><strong>Code:</strong> {e.meetingCode}</p>
                            <p><strong>Date:</strong> {formatDate(e.date)}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="emptyHistory">No meeting history yet.</div>
            )}
        </div>
    )
}
