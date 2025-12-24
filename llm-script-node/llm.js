import OpenAI from "openai";

const client = new OpenAI({
<<<<<<< HEAD
apiKey: process.env.OPENAI_API_KEY
});

export async function rewriteArticle(original, ref1, ref2) {
try {
=======
  apiKey: process.env.OPENAI_API_KEY
});

export async function rewriteArticle(original, ref1, ref2) {
  try {
>>>>>>> 01e8489 (Initial commit: BeyondChats full-stack assignment)
    const prompt = `
Rewrite the article to improve structure, clarity, and tone.
Use reference articles only for inspiration.
Do not copy text.

Original:
${original}

Reference 1:
${ref1}

Reference 2:
${ref2}
`;

    const response = await client.chat.completions.create({
<<<<<<< HEAD
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
=======
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
>>>>>>> 01e8489 (Initial commit: BeyondChats full-stack assignment)
    });

    return response.choices[0].message.content;

<<<<<<< HEAD
} catch (error) {
    console.warn("⚠️ LLM unavailable, using fallback content");
=======
  } catch (error) {
    console.warn("⚠️ LLM unavailable, using fallback");
>>>>>>> 01e8489 (Initial commit: BeyondChats full-stack assignment)

    return `
## Updated Article

<<<<<<< HEAD
This article has been restructured to improve readability and clarity.
It incorporates best practices observed in high-ranking customer service blogs,
including clearer sectioning, actionable insights, and a professional tone.

Key improvements:
- Better formatting
- Clearer explanations
- Modern customer support perspectives

(Note: LLM generation fallback used due to API quota limits.)
`;
}
=======
This article has been rewritten to improve clarity and structure.
It reflects best practices from high-performing customer support blogs,
with actionable insights and a professional tone.

(Note: LLM fallback content used.)
`;
  }
>>>>>>> 01e8489 (Initial commit: BeyondChats full-stack assignment)
}
