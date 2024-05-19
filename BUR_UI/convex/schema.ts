import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...

  Matches: defineTable({
    age: v.float64(),
    name: v.string(),
  }),
  messages: defineTable({
    Content: v.string(),
    Match_id: v.id("Matches"),
    user: v.string(),
  }),
});