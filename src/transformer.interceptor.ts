import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { classToPlain, ClassTransformOptions } from 'class-transformer';
import { ReflectMetadata } from '@nestjs/common';

export interface PlainLiteralObject {
  [key: string]: any;
}

const OUT_TYPE = 'class_serializer:options'

// NOTE (external)
// We need to deduplicate them here due to the circular dependency
// between core and common packages
const REFLECTOR = 'Reflector';

export const OutType = (type: any) => ReflectMetadata(OUT_TYPE, type);

@Injectable()
export class TransformerInterceptor implements NestInterceptor {
  constructor(@Inject(REFLECTOR) protected readonly reflector: any) {
  }

  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {

    return call$.pipe(
      map((res:any) =>
        this.serialize(res, context),
      ),
    );
  }

  serialize(
    response: PlainLiteralObject | Array<PlainLiteralObject>,
    context: ExecutionContext,
  ): PlainLiteralObject | PlainLiteralObject[] {
    const OutTypeValue: any = this.getContextOptions(context);
    const isArray = Array.isArray(response);
    return isArray
      ? (response as PlainLiteralObject[]).map(item =>
        new OutTypeValue(item),
      )
      : new OutTypeValue(response);
  }

  transformToPlain(
    plainOrClass,
  ): PlainLiteralObject {
    return plainOrClass && plainOrClass.constructor !== Object
      ? classToPlain(plainOrClass)
      : plainOrClass;
  }

  private getContextOptions(
    context: ExecutionContext,
  ): ClassTransformOptions | undefined {
    return (
      this.reflectSerializeMetadata(context.getHandler()) ||
      this.reflectSerializeMetadata(context.getClass())
    );
  }

  private reflectSerializeMetadata(obj): ClassTransformOptions | undefined {
    return this.reflector.get(OUT_TYPE, obj);
  }
}
