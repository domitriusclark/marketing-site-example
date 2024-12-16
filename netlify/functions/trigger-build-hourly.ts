import type { Config } from "@netlify/functions";

export default async (req: Request) => {
  await fetch(
    "https://ntl-marketing-site-example.netlify.app/.netlify/functions/send-blog-stats-email",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.AWL_API_KEY}`,
      },
    }
  );

  await fetch("https://api.netlify.com/build_hooks/675fd6db315992a7037b5652");
};

export const config: Config = {
  schedule: "@hourly",
};
