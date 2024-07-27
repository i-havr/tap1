import { Expose, Type, plainToClass } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

import 'dotenv/config';

export class ConfigDto {
  @Type(() => Number)
  @Expose()
  @IsInt()
  @IsNotEmpty()
  APP_PORT!: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_HOST!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_NAME!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_PASSWORD!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_USER!: string;

  @Type(() => Number)
  @Expose()
  @IsInt()
  @IsNotEmpty()
  DB_PORT!: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  FIREBASE_API_KEY!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  FIREBASE_AUTH_DOMAIN!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  FIREBASE_DB_URL!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  FIREBASE_PROJECT_ID!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  FIREBASE_STORAGE_BUCKET!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  FIREBASE_MESSAGING_SENDER_ID!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  FIREBASE_APP_ID!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  FIREBASE_MEASUREMENT_ID!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  CRON_PING_URL!: string;
}

export const getConfig = (): ConfigDto => {
  const config = plainToClass(ConfigDto, process.env, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });

  return config;
};
