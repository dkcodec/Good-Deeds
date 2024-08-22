import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { DeedsModule } from "./deeds/deeds.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot(), // Поддержка переменных окружения
    MongooseModule.forRoot(process.env.MONGO_URI), // Подключение к MongoDB
    UsersModule,
    DeedsModule,
    AuthModule,
  ],
})
export class AppModule {}
