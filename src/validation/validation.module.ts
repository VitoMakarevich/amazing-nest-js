import { Module, ValidationPipe } from '@nestjs/common';

@Module({
  providers: [ValidationPipe],
})
export class ValidationModule {}
