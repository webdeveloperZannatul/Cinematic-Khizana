import { createFileRoute } from "@tanstack/react-router";
import Landing from "@/components/Landing";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Khizana — Smart Design Platform for Wardrobe Workshops" },
      {
        name: "description",
        content:
          "Design wardrobes and win clients in minutes. Khizana is the smart design platform for wardrobe workshops, carpentry showrooms and fabricators in the UAE & GCC.",
      },
      { property: "og:title", content: "Khizana — Smart Design Platform for Wardrobe Workshops" },
      {
        property: "og:description",
        content:
          "Design wardrobes and win clients in minutes. Khizana is the smart design platform for wardrobe workshops, carpentry showrooms and fabricators in the UAE & GCC.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
