import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import { User } from "./user.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      username,
      password: hashedPassword,
      tag: `@${username}_${Math.floor(Math.random() * 1000)}`,
    });
    return user.save();
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async findUserById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).exec();
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException("User not found");
  }

  async addFriend(userId: string, friendTag: string): Promise<User> {
    const user = await this.findUserById(userId);
    if (!user) throw new NotFoundException("User not found");

    const friend = await this.userModel.findOne({ tag: friendTag }).exec();
    if (!friend) throw new NotFoundException("Friend not found");

    user.friends.push(friendTag);
    return user.save();
  }

  async getFriendsDeeds(userId: string): Promise<any> {
    const user = await this.findUserById(userId);
    if (!user) throw new NotFoundException("User not found");

    const friends = await this.userModel.find({ tag: { $in: user.friends } }).exec();
    return friends.map(friend => ({ tag: friend.tag, deeds: friend.deeds }));
  }
}
