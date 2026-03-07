from openai import OpenAI

client = OpenAI(api_key="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")

with open("grant/prompt.txt", "r") as f:
    prompt_template = f.read()

prompt = prompt_template.format(
    location="Canada",
    industry="AI",
    stage="MVP",
    team_size=2,
    funding_need="100k",
    business_model="B2B SaaS",
    target_market="small businesses"
)

response = client.chat.completions.create(
    model="gpt-5-mini",
    messages=[{"role": "user", "content": prompt}]
)

print(response.choices[0].message.content)