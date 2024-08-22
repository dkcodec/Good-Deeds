import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Deed } from "../deeds/deed.schema";

@Schema()
export class User extends Document {
  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({ unique: true })
  tag: string;

  @Prop([String])
  friends: string[];

  @Prop({ type: [{ type: String, ref: 'Deed' }] })
  deeds: Deed[];  // Добавляем поле для добрых дел
}

export const UserSchema = SchemaFactory.createForClass(User);
