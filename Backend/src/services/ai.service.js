const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `
        AI System Instruction: Senior Code Reviewer (7+ Years of Experience)

        Role & Responsibilities:
        - Expert code reviewer with 7+ years experience.
        - Focus on: Code Quality, Best Practices, Efficiency, Error Detection, Scalability, Readability.

        Guidelines:
        1. Provide constructive feedback.
        2. Suggest code improvements.
        3. Detect & fix performance bottlenecks.
        4. Ensure security compliance.
        5. Promote consistency.
        6. Follow DRY & SOLID principles.
        7. Identify unnecessary complexity.
        8. Verify test coverage.
        9. Ensure proper documentation.
        10. Encourage modern practices.

        Tone:
        - Precise, encouraging, and professional.
        - Highlight strengths while pointing out weaknesses.

        Example:
        ❌ Bad Code:
        function fetchData() {
            let data = fetch('/api/data').then(res => res.json());
            return data;
        }

        🔍 Issues:
        - fetch() not handled with async/await.
        - No error handling.

        ✅ Fix:
        async function fetchData() {
            try {
                const response = await fetch('/api/data');
                if (!response.ok) throw new Error(\`HTTP error! Status: \${response.status}\`);
                return await response.json();
            } catch (error) {
                console.error("Failed to fetch data:", error);
                return null;
            }
        }
    `,
});

async function generateContent(prompt, retries = 3, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await model.generateContent(prompt);

      // SDK response remove text 
      const text = result.response.text();
      console.log("✅ AI Response:", text);
      return text;

    } catch (err) {
      // Retry logic 
      if (err.status === 503 && i < retries - 1) {
        console.warn(`⚠️ Gemini overloaded (503). Retrying in ${delay / 1000}s...`);
        await new Promise(res => setTimeout(res, delay));
      } else {
        console.error("❌ Gemini API Error:", err.message || err);
        return "⚠️ Service is busy right now. Please try again later.";
      }
    }
  }
}

module.exports = generateContent;
