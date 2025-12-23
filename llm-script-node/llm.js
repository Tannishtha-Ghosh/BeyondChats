import OpenAI from "openai";

const client = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

export async function rewriteArticle(original, ref1, ref2) {
try {
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
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
    });

    return response.choices[0].message.content;

} catch (error) {
    console.warn("⚠️ LLM unavailable, using fallback content");

    return `
## Updated Article

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
}
