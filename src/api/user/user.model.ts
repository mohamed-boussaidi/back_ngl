import { getModelForClass, prop } from '@typegoose/typegoose';

// User Class
export class User {
  @prop({ required: true, unique: true })
  public instagramId: string;

  @prop({ required: true, unique: true })
  public username: string;

  @prop({ required: true, unique: true })
  public ApiTokenId: string;

  @prop({ required: true, unique: true })
  public instagramAccessToken: string;

  @prop({ required: true })
  public instagramTokenExpiration: number;
}
// User Model
export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
