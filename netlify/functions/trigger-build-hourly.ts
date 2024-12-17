import type { Context, Config } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  await fetch(
    // "http://localhost:8888/.netlify/functions/send-blog-stats-email",
    "https://ntl-marketing-site-example.netlify.app/.netlify/functions/send-blog-stats-email",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AWL_API_KEY}`,
      },
    }
  );

  await fetch("https://api.netlify.com/build_hooks/675fd6db315992a7037b5652", {
    method: "POST",
  });

  return new Response("Build triggered", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    },
  });
};
