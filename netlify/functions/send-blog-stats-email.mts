import { createClient } from "@sanity/client";
import groq from "groq";
import sgMail from "@sendgrid/mail";

export default async (req: Request) => {
  async function sendEmail() {
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY is not set");
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const sanityClient = createClient({
      projectId: "t8gds5es",
      dataset: "production",
      useCdn: true,
      apiVersion: "2024-01-17",
    });

    const amountOfBlogPosts = await sanityClient.fetch(
      groq`*[_type == "post"]`
    );
    const blogPostTitles = await sanityClient.fetch(
      groq`*[_type == "post"] {title}`
    );

    const hidingMyEmails = {
      to: "domitriusaclark@gmail.com",
      from: "domitriusaclark+sendgrid@gmail.com",
    };

    const msg = {
      to: hidingMyEmails.to,
      from: hidingMyEmails.from,
      subject: "Hourly Blog stats",
      text: `
      Amount of blog posts: ${amountOfBlogPosts}
      Blog post titles: ${blogPostTitles.map((title: any) => title.title).join(", ")}
      `,
      html: `
      <p>Amount of blog posts: ${amountOfBlogPosts.length}</p>
      <p>Blog post titles: 
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${blogPostTitles.map((title: any) => `<li>${title.title}</li>`).join("")}
        </div>
      </p>
      `,
    };

    await sgMail.send(msg);
  }

  await sendEmail();

  return new Response("Email sent", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    },
  });
};
