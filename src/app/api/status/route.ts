import { getLlmStatus } from "@/lib/ollama";

export async function GET() {
  const status = await getLlmStatus();
  return Response.json(status);
}
