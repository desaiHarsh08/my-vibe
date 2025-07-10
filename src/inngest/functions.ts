import { inngest } from "./client";
import { Sandbox } from "@e2b/code-interpreter";
import { createAgent, gemini } from "@inngest/agent-kit";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        const sandboxId = await step.run("get-sandbox-id", async () => {
            const { sandboxId } = await Sandbox.create("my-vibe");
            return sandboxId;
        });
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

        const sandboxUrl = await step.run("get-sandbox-url", async () => {
            const sandbox = await getSandbox(sandboxId);
            const host = sandbox.getHost(3000);
            return `https://${host}`
        });

        return { output, sandboxUrl };
    },
);
