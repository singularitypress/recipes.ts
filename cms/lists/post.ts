import { list } from "@keystone-6/core";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

export const Post = list({
  fields: {
    title: text(),
    slug: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    publishedAt: timestamp(),
    status: select({
      options: [
        {
          label: "Published",
          value: "published",
        },
        {
          label: "Draft",
          value: "draft",
        },
      ],
      defaultValue: "draft",
      ui: {
        displayMode: "segmented-control",
      },
    }),
    author: relationship({ ref: "User.posts" }),
    content: document({
      formatting: true,
      dividers: true,
      links: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
      ],
    }),
  },
});
