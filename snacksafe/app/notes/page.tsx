import { createClient } from "@/utils/supabase/server";
import React, { ReactElement } from "react";
export default async function Notes() {
  const supabase = createClient();
  const { data: notes } = await supabase.from("notes").select();
  const { data: restaurants } = await supabase.from("Restaurants").select();
  return (
    <div className="text-black">
      <pre>{JSON.stringify(restaurants, null, 2)}</pre>
    </div>
  );
}
