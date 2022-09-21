import { list } from "@keystone-6/core";
import { password, relationship, text } from "@keystone-6/core/fields";

export const User = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    posts: relationship({ ref: "Post.author", many: true }),
    password: password({ validation: { isRequired: true } }),
  },
});
