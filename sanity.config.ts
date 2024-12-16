import { defineConfig } from "sanity";

export default defineConfig({
  name: "default",
  title: "My Marketing Site",
  projectId: "t8gds5es",
  dataset: "production",
  schema: {
    types: [
      {
        name: "home",
        title: "Home Page",
        type: "document",
        fields: [
          {
            name: "title",
            title: "Title",
            type: "string",
          },
          {
            name: "description",
            title: "Description",
            type: "text",
          },
          {
            name: "heroImage",
            title: "Hero Image",
            type: "image",
          },
          {
            name: "features",
            title: "Features",
            type: "array",
            of: [
              {
                type: "object",
                fields: [
                  { name: "title", type: "string" },
                  { name: "description", type: "text" },
                  { name: "icon", type: "string" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "post",
        title: "Blog Post",
        type: "document",
        fields: [
          {
            name: "title",
            title: "Title",
            type: "string",
          },
          {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
              source: "title",
            },
          },
          {
            name: "publishedAt",
            title: "Published at",
            type: "datetime",
          },
          {
            name: "excerpt",
            title: "Excerpt",
            type: "text",
          },
          {
            name: "mainImage",
            title: "Main image",
            type: "image",
          },
          {
            name: "body",
            title: "Body",
            type: "array",
            of: [{ type: "block" }],
          },
          {
            name: "author",
            title: "Author",
            type: "reference",
            to: [{ type: "author" }],
          },
        ],
      },
      {
        name: "author",
        title: "Author",
        type: "document",
        fields: [
          {
            name: "name",
            title: "Name",
            type: "string",
          },
          {
            name: "image",
            title: "Image",
            type: "image",
          },
        ],
      },
    ],
  },
});
