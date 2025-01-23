import React, { useState } from 'react';

function App() {
    const [email, setEmail] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send data to the backend to schedule the reminder
        await fetch('http://localhost:3001/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, time }),
        });
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="Schedule time"
                />
                <button type="submit">Set Reminder</button>
            </form>
        </div>
    );
}

export default App;
