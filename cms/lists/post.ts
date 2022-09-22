import { list } from "@keystone-6/core";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { readdirSync } from "fs";
import { resolve } from "path";

const nameOptions = (subDir: string) => {
  return readdirSync(resolve("content", subDir)).map((filename) => ({
    label: filename.replace(/\.md$/, ""),
    value: filename.replace(/\.md$/, ""),
  }));
};

export const Post = (subDir: string) =>
  list({
    fields: {
      title: text({ validation: { isRequired: true }, isIndexed: "unique" }),
      type: select({
        options: [
          {
            label: subDir,
            value: subDir,
          },
        ],
        validation: {
          isRequired: true,
        },
        defaultValue: subDir,
        ui: {
          displayMode: "segmented-control",
        },
      }),
      slug: select({
        options: nameOptions(subDir),
        ui: {
          displayMode: "select",
        },
        validation: {
          isRequired: true,
        },
        isIndexed: "unique",
      }),
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
      hero: relationship({ ref: "Hero" }),
    },
  });
