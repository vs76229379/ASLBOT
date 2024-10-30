const express = require('express');
const cors = require('cors');
const path = require('path');
const sdk = require('microsoft-cognitiveservices-speech-sdk'); // Import the SDK

const app = express();
app.use(cors());

// Define the paths to your avatar GLB files
const avatarPaths = {
    a: 'a.glb', b: 'b.glb', c: 'c.glb', /* ... remaining paths */
    space: 'space.glb',
};

// Serve the avatars directory as static files
app.use('/avatars', express.static(path.join(__dirname, 'avatars')));

// Azure Speech Service Configuration
const speechConfig = sdk.SpeechConfig.fromSubscription('8maBUqrkRHoXnRMe7DFj7bdrW5W6b7dTKeXf39fa3UrWgjm9RZPSJQQJ99AJACGhslBXJ3w3AAAYACOGekPi', 'centralindia');
speechConfig.speechRecognitionLanguage = "en-US";

// Route to Process Speech and Return Avatar Paths
app.post('/processSpeech', (req, res) => {
    const audioStream = req.body.audio; // Assuming you're sending audio as base64 encoded

    const audioConfig = sdk.AudioConfig.fromWavFileInput(audioStream);
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync((result) => {
        if (result.reason === sdk.ResultReason.RecognizedSpeech) {
            const recognizedText = result.text.toLowerCase();
            const glbFiles = [];

            // Map recognized text to avatar paths
            for (const char of recognizedText) {
                if (avatarPaths[char]) {
                    glbFiles.push(`/avatars/${avatarPaths[char]}`);
                } else if (char === ' ') {
                    glbFiles.push(`/avatars/${avatarPaths.space}`);
                }
            }

            res.json(glbFiles);
        } else {
            res.status(500).send("Speech recognition failed");
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
