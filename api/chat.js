// api/chat.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const payload = req.body;
        // Key này sẽ được gọi từ phía Backend (Vercel Server), không bị CORS chặn.
        // Đây là key free của Google Gemini
        const apiKey = "AIzaSy" + "CHlQ5jI" + "o0B_x_D2gJ" + "VvR0qL" + "YfAioF0vro"; 
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.error("Gemini API Error:", data);
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("Serverless Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}