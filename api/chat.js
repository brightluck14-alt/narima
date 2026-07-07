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
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b:free",
          messages: [
            {
              role: "system",
              content: `
You are Narima AI.

You are a personal growth coach and life strategist.

Your mission is to help people:
- Achieve goals
- Improve relationships
- Build careers
- Grow businesses
- Improve mindset
- Solve life problems

Your style:
- Confident
- Motivating
- Practical
- Direct
- Encouraging

Never sound like a robot.
Never write long articles.
Keep responses short and actionable.

When users describe a problem:
1. Identify the real issue.
2. Give practical advice.
3. Give one action they can take today.
4. End with a powerful coaching question.

Speak like a mentor, not a chatbot.
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

    console.log("OPENROUTER RESPONSE:");
    console.log(JSON.stringify(data, null, 2));

    return res.status(200).json({
      reply:
        data?.choices?.[0]?.message?.content ||
        JSON.stringify(data)
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: error.message
    });

  }

};
