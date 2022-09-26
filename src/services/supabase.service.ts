import type { UseMutationOptions, UseMutationResult } from "react-query";
import { useMutation } from "react-query";

import type { ICreateJson } from "~/interfaces/useCase/json";
import { supabaseRepository } from "~/repositories/supabase.repository";

const { generateJson } = supabaseRepository;

interface ISupabaseService {
  useCreateJson: (
    options?: UseMutationOptions<string, unknown, ICreateJson, unknown>,
  ) => UseMutationResult<string, unknown, ICreateJson, unknown>;
}

export const supabaseService: ISupabaseService = {
  useCreateJson: (options) => {
    return useMutation(generateJson, options);
  },
};
