import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

interface PrismaClientEvents {
  beforeExit: () => void;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    (
      this as unknown as {
        $on<K extends keyof PrismaClientEvents>(
          eventType: K,
          callback: PrismaClientEvents[K],
        ): void;
      }
    ).$on('beforeExit', async () => {
      await app.close();
    });
  }
}
