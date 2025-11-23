// app/components/MockWorker.tsx
"use client";

import { useEffect } from "react";

export default function MockWorker() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      import("../../mocks/browser")
        .then(({ worker }) => {
          worker.start({ onUnhandledRequest: "bypass" });
          console.log("%cMSW active (mock mode ON)", "color: green; font-weight: bold;");
        })
        .catch((err) => console.error("Failed to start MSW:", err));
    }
  }, []);

  return null;
}
