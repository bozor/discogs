import { Suspense } from "react";

import PageRelease from "@/components/PageRelease";

export default function Page() {
  return (
    <Suspense>
      <PageRelease />
    </Suspense>
  );
}
