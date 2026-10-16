const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// সার্ভার মেমোরিতে ডাটা সংরক্ষণের জন্য
let unlockedDatabase = new Set(["123456789", "987654321"]);

app.post('/api/unlock', (req, res) => {
    const { uid } = req.body;

    if (!uid) {
        return res.json({ success: false, message: "Not Unlock Your Account" });
    }

    if (uid.length >= 5) {
        unlockedDatabase.add(uid);
        return res.json({ success: true, message: "Successfully Unlocked" });
    } else {
        return res.json({ success: false, message: "Not Unlock Your Account" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
