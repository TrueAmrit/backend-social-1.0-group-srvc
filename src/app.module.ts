import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupModule } from './modules/group/group.module';
import { Content } from './submodules/backend-social-1.0-entities/src/entities/content.entity';
import { Group } from './submodules/backend-social-1.0-entities/src/entities/group.entity';
import { Option } from './submodules/backend-social-1.0-entities/src/entities/option.entity';
import { User } from './submodules/backend-social-1.0-entities/src/entities/user.entity';
import { queues } from './submodules/backend-social-1.0-rmq/src/constants/rmqQueues';
import { MsgBrokerService } from './submodules/backend-social-1.0-rmq/src/module/msg-broker-ops/msg-broker-ops.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASS,
      database: process.env.DB,
      entities: [User, Content, Option, Group],
      synchronize: false,
      logging: true,
      ssl: true,
    }),
    ClientsModule.register([
      {
        name: 'GROUP_SERVICE_QUEUE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL],
          queue: queues.GROUP_SERVICE_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    GroupModule,
  ],
  controllers: [AppController],
  providers: [AppService, MsgBrokerService],
})
export class AppModule {}
