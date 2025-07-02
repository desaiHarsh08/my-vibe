import { prisma } from "@/lib/db";
import React from "react";

export default async function HomePage() {
  const users = await prisma.user.findMany();
  return (
    <div className="font-bold text-rose-500">
      {JSON.stringify(users, null, 4)}
    </div>
  );
}
