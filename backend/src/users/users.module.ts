import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User, UserSchema } from "./user.schema";
import { DeedsModule } from "../deeds/deeds.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    DeedsModule, // Импортируем DeedsModule для использования в UsersService
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Экспортируем UsersService для использования в AuthModule
})
export class UsersModule {}
