import { createClient } from "@/utils/supabase/server";
import React, { ReactElement } from "react";
export default async function Notes() {
  const supabase = createClient();
  const { data: notes } = await supabase.from("notes").select();

  return (
    <div className="text-black">
      hello
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </div>
  );
}
