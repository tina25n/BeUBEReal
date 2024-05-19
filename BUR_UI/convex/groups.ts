import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const get = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query('Matches').collect();
	}
});

export const getGroup = query({
	args: { id: v.id('Matches') },
	handler: async (ctx, { id }) => {
		return await ctx.db
			.query('Matches')
			.filter((q) => q.eq(q.field('_id'), id))
			.unique();
	}
});

export const create = mutation({
	args: { age: v.number(), name: v.string() },
	handler: async ({ db }, args) => {
		await db.insert('Matches', args);
	}
});