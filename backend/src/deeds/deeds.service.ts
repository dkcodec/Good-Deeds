import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Deed } from "./deed.schema";

@Injectable()
export class DeedsService {
  constructor(@InjectModel(Deed.name) private deedModel: Model<Deed>) {}

  async createDeed(userId: string, description: string): Promise<Deed> {
    const deed = new this.deedModel({ userId, description });
    return deed.save();
  }

  async getDeedsByUserId(userId: string): Promise<Deed[]> {
    return this.deedModel.find({ userId }).exec();
  }

  async updateDeed(id: string, updateData: Partial<Deed>): Promise<Deed> {
    return this.deedModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteDeed(id: string): Promise<void> {
    const result = await this.deedModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException("Deed not found");
  }
}
