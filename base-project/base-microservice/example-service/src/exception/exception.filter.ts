import {
  BadRequestException,
  Catch,
  Logger,
  RpcExceptionFilter,
} from '@nestjs/common';
import { NewsGrpcExceptionCode } from './exception-client-code.constant';
import { BaseRpcException } from './rpc/base-rpc.exception';
import { UnavailableRpcException } from './rpc/unavailable-rpc.exception';
import { throwError } from 'rxjs';
import { InvalidArgumentRpcException } from './rpc/invalid-argument-rpc.exception';
import { generateClientException } from './exception-generator';

@Catch()
export class AllExceptionsFilter implements RpcExceptionFilter {
  private static logger: Logger = new Logger(AllExceptionsFilter.name);

  catch(exception: BaseRpcException | Error) {
    if (exception instanceof BaseRpcException) {
      return;
    }

    if (exception instanceof BadRequestException) {
      return throwError(() =>
        new InvalidArgumentRpcException(
          generateClientException({
            errorCode: 'BAD_REQUEST',
            message: (exception.getResponse() as { message: string }).message,
          }),
        ).getError(),
      );
    }

    AllExceptionsFilter.logger.error(exception.message);
    AllExceptionsFilter.logger.error(exception.stack);
    return throwError(() =>
      new UnavailableRpcException(NewsGrpcExceptionCode.GOT_ISSUE).getError(),
    );
  }
}
