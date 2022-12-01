import { object, string, TypeOf } from 'zod';

// Login Schema
export const loginSchema = {
  body: object({
    instagramDisplayCode: string({
      required_error: 'Code is required',
    }),
  }),
};
// Input Types
export type LoginBody = TypeOf<typeof loginSchema.body>;
