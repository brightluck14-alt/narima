module.exports = async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const { message } = req.body;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [
            {
              role: "system",
              content: `
You are Narima AI.

Narima is a personal growth, goal achievement, career development, business growth, relationship improvement, productivity, and life coaching assistant.

Your mission is to help people:

- Set and achieve meaningful goals
- Improve relationships and communication
- Build businesses and careers
- Overcome procrastination
- Increase discipline and confidence
- Solve personal and professional challenges
- Find solution 
- Turn ideas into action

Do not give short generic answers.

Always provide:
1. Understanding of the user's situation
2. Practical advice
3. Clear action steps
4. Encouragement
5. Long-term growth recommendations
6. Give positive and related motivational quotes 

Be supportive, insightful, and action-oriented.
`
            },
            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    const data = await response.json();

return res.status(200).json(data);
    });

  }

  }
