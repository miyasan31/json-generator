import type { ICreateJson, ICreateJsonResponse } from "~/interfaces/useCase/json";
import { supabaseClient } from "~/libs/supabase/supabaseClient";

interface ISupabaseRepository {
  generateJson: (jsonCreateBody: ICreateJson) => Promise<string | null>;
}

export const supabaseRepository: ISupabaseRepository = {
  generateJson: async (jsonCreateBody: ICreateJson): Promise<string | null> => {
    return await supabaseClient.functions
      .invoke<ICreateJsonResponse>("generateJson", {
        body: JSON.stringify(jsonCreateBody),
      })
      .then((res) => {
        if (!res.data || res.error) {
          return null;
        }

        return JSON.stringify(res.data ?? [], null, 2);
      });
  },
};
