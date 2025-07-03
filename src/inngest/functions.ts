import { inngest } from "./client";
import { createAgent, gemini } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event }) => {
        const codeWriterAgent = createAgent({
            name: 'code-agent',
            system:
                'You are an expert next.js developer. You write readable, maintainable, and efficient code. You right simple nextjs code that is easy to understand. You write code that is easy to read and understand. You write code that is efficient and performant. You write code that is simple and elegant.',
            model: gemini({ model: "gemini-2.0-flash" }),
        });

        const { output } = await codeWriterAgent.run(
            `Write the following snippet: ${event.data.value}`,
        );
        console.log(output);
        // [{ role: 'assistant', content: 'function removeUnecessaryWhitespace(...' }]

        return { output };
    },
);
