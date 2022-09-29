/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

export const protobufPackage = 'films';

export interface Empty {}

export interface Pagination {
  page: number;
  size: number;
}

export interface PaginationMetadata {
  page: number;
  size: number;
  totalRecords: number;
  totalPages: number;
}

export interface Films {
  items: Film[];
}

export interface FilmListingQuery {
  pagination: Pagination | undefined;
  search: string;
}

export interface Film {
  id: number;
  title: string;
  content: string;
}

export const FILMS_PACKAGE_NAME = 'films';

export interface FilmsServiceClient {
  findAll(request: FilmListingQuery, metadata?: Metadata): Observable<Films>;
}

export interface FilmsServiceController {
  findAll(
    request: FilmListingQuery,
    metadata?: Metadata,
  ): Promise<Films> | Observable<Films> | Films;
}

export function FilmsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['findAll'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('FilmsService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('FilmsService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const FILMS_SERVICE_NAME = 'FilmsService';
