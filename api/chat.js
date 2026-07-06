export default async function handler(req, res) {

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
              content:
"You are Narima AI, an intelligent goal-achievement and personal growth coach. Your mission is to help users set goals, build discipline, improve productivity, learn skills, grow businesses, improve fitness, find solution and become better versions of themselves. Give practical, actionable advice and clear step-by-step plans."
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

    return res.status(200).json({
      reply:
        data.choices?.[0]?.message?.content ||
        "No response received."
    });

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });

  }

  }
