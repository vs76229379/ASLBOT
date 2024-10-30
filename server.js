const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Define the paths to your avatar GLB files
const avatarPaths = {
    a: 'a.glb',
    b: 'b.glb',
    c: 'c.glb',
    d: 'd.glb',
    e: 'e.glb',
    f: 'f.glb',
    g: 'g.glb',
    h: 'h.glb',
    i: 'i.glb',
    j: 'j.glb',
    k: 'k.glb',
    l: 'l.glb',
    m: 'm.glb',
    n: 'n.glb',
    o: 'o.glb',
    p: 'p.glb',
    q: 'q.glb',
    r: 'r.glb',
    s: 's.glb',
    t: 't.glb',
    u: 'u.glb',
    v: 'v.glb',
    w: 'w.glb',
    x: 'x.glb',
    y: 'y.glb',
    z: 'z.glb',
    space: 'space.glb',
};

// Serve the avatars directory as static files
app.use('/avatars', express.static(path.join(__dirname, 'avatars')));

// Handle the GET request to fetch avatar paths based on input text
app.get('/getAvatars/:text', (req, res) => {
    const inputText = req.params.text.toLowerCase();
    const glbFiles = [];

    for (const char of inputText) {
        if (avatarPaths[char]) {
            glbFiles.push(`/avatars/${avatarPaths[char]}`);
        } else if (char === ' ') {
            glbFiles.push(`/avatars/${avatarPaths.space}`);
        }
    }

    res.json(glbFiles);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
