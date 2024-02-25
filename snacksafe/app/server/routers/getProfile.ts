import { db } from "../../db/index";
import { profiles, restaurants } from "../../db/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { procedure, router } from "../routers/trpc";
import { User } from "@supabase/supabase-js";

export const restaurantsRouter = router({
  restaurant: procedure.query(async () => {
    const restaurant = await db.select().from(restaurants);
    return restaurant;
  }),
});
