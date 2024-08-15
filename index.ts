import dotenv from "dotenv";
import supportRequests from "./support_requests.json";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

dotenv.config();

async function main() {
  const result = await generateObject({
    model: openai("gpt-4o-mini"),
    prompt:
      "Classify the following support tickets: " +
      JSON.stringify(supportRequests),
    schema: z.object({
      supportTickets: z.array(
        z.object({
          id: z.number(),
          text: z.string(),
          category: z.enum(["billing", "technical", "general", "sales"]),
        }),
      ),
    }),
  });
  console.log(result.object)
}

main().catch(console.error);
