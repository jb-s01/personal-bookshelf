"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import type { LlmStatus } from "@/lib/types";

export function LlmStatusBadge() {
  const [status, setStatus] = useState<LlmStatus | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/status")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("status");
        }
        return (await response.json()) as LlmStatus;
      })
      .then((body) => {
        if (!cancelled) {
          setStatus(body);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) {
    return (
      <Badge variant="outline" className="border-destructive/40 text-destructive">
        Summary service unreachable
      </Badge>
    );
  }

  if (!status) {
    return (
      <Badge variant="outline" className="text-muted-foreground">
        Checking Ollama…
      </Badge>
    );
  }

  if (status.available && status.model) {
    return (
      <Badge className="bg-[color:var(--brass)] text-[color:var(--walnut)]">
        Ollama · {status.model}
      </Badge>
    );
  }

  return (
    <Badge variant="secondary">
      Static notes · Ollama offline
    </Badge>
  );
}
