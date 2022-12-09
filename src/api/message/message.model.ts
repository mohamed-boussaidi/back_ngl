import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { User } from '../user/user.model';

// User Class
export class Message {
  @prop({ required: true })
  public message: string;

  @prop({ ref: () => User })
  public messageTo: Ref<User>;

  @prop({ ref: () => User })
  public messageFrom: Ref<User>;
}
// User Model
export const MessageModel = getModelForClass(Message, {
  schemaOptions: {
    timestamps: true,
  },
});
