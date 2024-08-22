import { Controller, Post, Body, Param, Delete, Put, Get, UseGuards, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { User } from "./user.schema";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  async register(@Body() body: { username: string; password: string }) {
    return this.usersService.createUser(body.username, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async update(@Param("id") id: string, @Body() body: Partial<User>) {
    return this.usersService.updateUser(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.usersService.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id/friends")
  async addFriend(@Param("id") id: string, @Body("tag") tag: string) {
    return this.usersService.addFriend(id, tag);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id/friends/deeds")
  async getFriendsDeeds(@Param("id") id: string) {
    return this.usersService.getFriendsDeeds(id);
  }
}
