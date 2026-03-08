from openai import OpenAI

client = OpenAI(api_key="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")

with open("compass-project/backend/data/legal_prompt.txt", "r") as f:
    prompt_template = f.read()

prompt = prompt_template.format(
    industry="FinTech",
    location="Canada",
    stage="Idea",
    idea_description="An AI platform that automates taxes and compliance for small businesses"
)

response = client.chat.completions.create(
    model="gpt-5-mini",
    messages=[{"role": "user", "content": prompt}],
    response_format={"type": "json_object"}
)

print(response.choices[0].message.content)