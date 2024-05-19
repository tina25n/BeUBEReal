import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const sendMessage = mutation({
	args: {
        Content: v.string(),
        Match_id: v.id("Matches"),
        user: v.string(),
		file: v.optional(v.string())
	},
	handler: async (ctx, args) => {
		await ctx.db.insert('messages', args);
	}
});

export const get = query({
	args: { chatId: v.id('Matches') },
	handler: async ({ db, storage }, { chatId }) => {
		return await db
			.query('messages')
			.filter((q) => q.eq(q.field('Match_id'), chatId))
			.collect();
	}
});