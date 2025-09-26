# Clone repo
git clone https://github.com/your-username/ai-code-reviewer.git
cd ai-code-reviewer/server

# Install dependencies
npm install

# Add environment variables
echo "GOOGLE_API_KEY=your_api_key_here" > .env

# Start server
npm run dev

2️⃣ Frontend Setup

cd ../client

# Install dependencies
npm install

# Start Vite dev server
npm run dev


📂 Project Structure

ai-code-reviewer/
│
├── server/               # Backend (Express.js + Google Generative AI)
│   ├── index.js          # Server setup
│   ├── routes/           # API routes
│   └── controllers/      # AI logic
│
├── client/               # Frontend (React + Vite)
│   ├── src/
│   │   ├── App.jsx       # Main UI
│   │   ├── components/   # CodeEditor, ReviewPanel etc.
│   │   └── styles/       # Styling & PrismJS setup
│
└── README.md

🚀 Usage

1.Open the React app in your browser.

2.Paste your code snippet into the editor.

3.Click Review Code → The AI will provide detailed feedback.

🎯 Future Improvements

✅ User authentication (login/signup)

✅ Save code review history

✅ Multi-language code support

✅ Dark/Light theme toggle
