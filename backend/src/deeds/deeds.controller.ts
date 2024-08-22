import { Controller, Post, Body, Param, Delete, Put, Get, UseGuards, Req } from "@nestjs/common";
import { DeedsService } from "./deeds.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Deed } from "./deed.schema";

@Controller("deeds")
export class DeedsController {
  constructor(private readonly deedsService: DeedsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createDeed(@Req() req, @Body("description") description: string) {
    return this.deedsService.createDeed(req.user.userId, description);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getDeeds(@Req() req) {
    return this.deedsService.getDeedsByUserId(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async updateDeed(@Param("id") id: string, @Body() body: Partial<Deed>) {
    return this.deedsService.updateDeed(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteDeed(@Param("id") id: string) {
    return this.deedsService.deleteDeed(id);
  }
}
