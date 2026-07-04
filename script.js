console.log("Narima AI Loaded");

let step = 0;
let goalData = {};

function sendMessage() {

    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const message = input.value.trim();

    if (message === "") return;

    chatBox.innerHTML += `
        <div class="user-message">
            ${message}
        </div>
    `;

    input.value = "";

    let reply = "";

    if (step === 0) {

        goalData.goal = message;

        reply = `
        Excellent goal.

        When would you like to achieve this goal?
        `;

        step = 1;
    }

    else if (step === 1) {

        goalData.deadline = message;

        reply = `
        Great.

        How many hours per week can you realistically dedicate to this goal?
        `;

        step = 2;
    }

    else if (step === 2) {

        goalData.hours = message;

        const goal = goalData.goal.toLowerCase();

        if (
            goal.includes("coding") ||
            goal.includes("programming") ||
            goal.includes("developer")
        ) {

            reply = `
🚀 CODING ROADMAP

Goal: ${goalData.goal}

Target: ${goalData.deadline}

Hours Per Week: ${goalData.hours}

Month 1 → HTML & CSS

Month 2 → JavaScript

Month 3 → Build Small Projects

Month 4 → Git & GitHub

Month 5 → React

Month 6 → Portfolio & Job Search

Remember:
Consistency beats intensity.
`;

        }

        else if (
            goal.includes("business") ||
            goal.includes("startup")
        ) {

            reply = `
💼 BUSINESS ROADMAP

Goal: ${goalData.goal}

Target: ${goalData.deadline}

Hours Per Week: ${goalData.hours}

Week 1 → Market Research

Week 2 → Define Target Customers

Week 3 → Build MVP

Week 4 → Find First Users

Week 5 → Collect Feedback

Week 6 → Improve Product

Focus on solving a real problem.
`;

        }

        else if (
            goal.includes("english")
        ) {

            reply = `
📚 ENGLISH ROADMAP

Goal: ${goalData.goal}

Week 1 → Vocabulary

Week 2 → Grammar

Week 3 → Listening

Week 4 → Speaking Practice

Week 5 → Reading

Week 6 → Daily Conversations

Practice every day, even for 15 minutes.
`;

        }

        else if (
            goal.includes("relationship") ||
            goal.includes("dating") ||
            goal.includes("marriage")
        ) {

            reply = `
❤️ RELATIONSHIP ROADMAP

Goal: ${goalData.goal}

Week 1 → Active Listening

Week 2 → Better Communication

Week 3 → Emotional Awareness

Week 4 → Conflict Resolution

Week 5 → Trust Building

Week 6 → Shared Goals

Healthy relationships grow through consistent effort.
`;

        }

        else {

            reply = `
🎯 GENERAL ROADMAP

Goal: ${goalData.goal}

Target: ${goalData.deadline}

Hours Per Week: ${goalData.hours}

Step 1 → Define Success

Step 2 → Break Goal Into Tasks

Step 3 → Take Daily Action

Step 4 → Review Weekly

Step 5 → Improve Continuously

Small progress every day creates massive results.
`;

        }

        let savedGoals =
        JSON.parse(localStorage.getItem("narimaGoals")) || [];

        savedGoals.push({
            goal: goalData.goal,
            deadline: goalData.deadline,
            hours: goalData.hours,
            progress: 0
        });

        localStorage.setItem(
            "narimaGoals",
            JSON.stringify(savedGoals)
        );

        step = 0;
        goalData = {};
    }

    setTimeout(() => {

        chatBox.innerHTML += `
            <div class="ai-message">
                ${reply}
            </div>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;

    }, 700);

}