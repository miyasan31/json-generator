import { JSON_SPACE_WIDTH } from "~/constants/form/jsonSpaceWidth";
import type { ICreateJson, ICreateJsonResponse } from "~/interfaces/useCase/json";
import { supabaseClient } from "~/libs/supabase/supabaseClient";

interface ISupabaseRepository {
  generateJson: (jsonCreateBody: ICreateJson) => Promise<string>;
}

export const supabaseRepository: ISupabaseRepository = {
  generateJson: async (jsonCreateBody: ICreateJson): Promise<string> => {
    return await supabaseClient.functions
      .invoke<ICreateJsonResponse>("generateJson", {
        body: JSON.stringify(jsonCreateBody),
      })
      .then((res) => {
        if (!res.data || res.error) {
          throw new Error();
        }
        return JSON.stringify(res.data, null, JSON_SPACE_WIDTH);
      });
  },
};
