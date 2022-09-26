import type { UseMutationOptions, UseMutationResult } from "react-query";
import { useMutation } from "react-query";

import type { JsonCreateForm } from "~/interfaces/model/form";
import { supabaseRepository } from "~/repositories/supabase.repository";

const { generateJson } = supabaseRepository;

interface ISupabaseService {
  useCreateJson: (
    options?: UseMutationOptions<unknown, unknown, JsonCreateForm, unknown>,
  ) => UseMutationResult<unknown, unknown, JsonCreateForm, unknown>;
}

export const supabaseService: ISupabaseService = {
  useCreateJson: (options) => {
    return useMutation(generateJson, options);
  },
};
