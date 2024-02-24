import { db } from '../../db/index';
import { profiles } from '../../db/schema';
import { eq, and } from 'drizzle-orm';
import { z } from 'zod';
import { procedure, router } from '../routers/trpc';
import { User } from '@supabase/supabase-js';

// export const profilesRouter = router({
// 	profile: procedure.query(async () => {
// 		const profile = await db
// 			.select()
// 			.from(profiles)
// 			.where(
// 				and(eq(profiles.id, user.id),
// 			);
// 		return profile;
// 	}),
// 	liveExternalScholarships: procedure.query(async () => {
// 		const scholarship = await db
// 			.select()
// 			.from(scholarships)
// 			.where(
// 				and(
// 					eq(scholarships.akama_fund, false),
// 					eq(scholarships.status, 'live'),
// 				),
// 			);
// 		return scholarship;
// 	}),
// });
