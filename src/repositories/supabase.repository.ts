import type { JsonCreateForm } from "~/interfaces/model/form";
import { supabaseClient } from "~/libs/supabase/supabaseClient";

interface ISupabaseRepository {
  generateJson: (jsonCreateBody: JsonCreateForm) => Promise<unknown>;
}

export const supabaseRepository: ISupabaseRepository = {
  generateJson: async (jsonCreateBody: JsonCreateForm): Promise<unknown> => {
    return await supabaseClient.functions
      .invoke("generateJson", {
        body: JSON.stringify(jsonCreateBody),
      })
      .then((res) => {
        console.info(res);
        return res;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
