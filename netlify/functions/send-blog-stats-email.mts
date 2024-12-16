import { createClient } from "@sanity/client";
import groq from "groq";

// create a netlify function handler
export default async (req: Request) => {
  async function sendEmail() {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // get amount of blog posts from sanity
    const sanityClient = createClient({
      projectId: "t8gds5es",
      dataset: "production",
      useCdn: true,
    });

    const amountOfBlogPosts = await sanityClient.fetch(
      groq`*[_type == "post"].length`
    );
    const blogPostTitles = await sanityClient.fetch(
      groq`*[_type == "post"] {title}`
    );

    const msg = {
      to: "domitrius.clark@netlify.com",
      from: "domitrius.clark@netlify.com",
      subject: "Hourly Blog stats",
      text: `
      Amount of blog posts: ${amountOfBlogPosts}
      Blog post titles: ${blogPostTitles.map((title: any) => title.title).join(", ")}
      `,
      html: `
      <p>Amount of blog posts: ${amountOfBlogPosts}</p>
      <p>Blog post titles: 
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${blogPostTitles.map((title: any) => `<li>${title.title}</li>`).join("")}
        </div>
      </p>
      `,
    };

    await sgMail.send(msg);
  }
};
