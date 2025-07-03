"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
// import { getQueryClient, trpc } from "@/trpc/server";
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import React, { Suspense } from "react";
// import Client from "./client";

// export default async function RootPage() {
//   const queryClient = getQueryClient();
//   void queryClient.prefetchQuery(
//     trpc.createAI.queryOptions({ text: "HARSH PREFETCH" })
//   );

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <Suspense fallback={<p>Loading...</p>}>
//         <Client />
//       </Suspense>
//     </HydrationBoundary>
//   );
// }

import React from "react";
import { toast } from "sonner";

export default function RootPage() {
  const [value, setValue] = React.useState("");
  const trpc = useTRPC();
  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: () => {
        toast.success("Function invoked successfully!");
      },
    })
  );

  return (
    <div>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      Test
      <Button
        disabled={invoke.isPending}
        onClick={() => invoke.mutate({ value })}
      >
        invoke
      </Button>
    </div>
  );
}
