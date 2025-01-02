import { ClientOnly } from "./client";

export function generateStaticParams() {
  return [
    { slug: ["feed"] },
    { slug: ["hotchart"] },
    { slug: ["recentuploads"] },
  ];
}

export default function Page() {
  return <ClientOnly />;
}
