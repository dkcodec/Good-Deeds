import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Deed extends Document {
  @Prop()
  description: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ type: String, ref: 'User' })
  userId: string;
}

export const DeedSchema = SchemaFactory.createForClass(Deed);
