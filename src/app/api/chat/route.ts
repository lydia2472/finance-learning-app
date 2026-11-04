// AI 对话后端路由：代理调用 OpenAI 兼容的 LLM API
// 用户在前端配置自己的 API Key 和 Endpoint（存 localStorage，不经过第三方）

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, apiKey, baseUrl, model } = body as {
      messages: { role: string; content: string }[];
      apiKey: string;
      baseUrl: string;
      model: string;
    };

    if (!apiKey || !baseUrl || !model) {
      return Response.json(
        { error: "请先在设置中配置 API Key、Endpoint 和模型名称" },
        { status: 400 }
      );
    }

    const endpoint = `${baseUrl.replace(/\/$/, "")}/chat/completions`;

    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!resp.ok) {
      const err = await resp.text();
      return Response.json(
        { error: `API 调用失败 (${resp.status}): ${err.slice(0, 200)}` },
        { status: 502 }
      );
    }

    const data = await resp.json();
    const reply =
      data.choices?.[0]?.message?.content ?? "（AI 未返回内容）";

    return Response.json({ reply });
  } catch (e) {
    return Response.json(
      { error: `请求失败: ${e instanceof Error ? e.message : String(e)}` },
      { status: 500 }
    );
  }
}
