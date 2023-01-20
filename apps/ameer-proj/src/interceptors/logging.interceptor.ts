import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    NestInterceptor
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices';
import { Observable, tap } from 'rxjs'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    
    constructor(@Inject('LOGGER_SERVICE') private readonly loggerService: ClientProxy){}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        const userAgent: string = req.get('user-agent') || '';
        const { _ip, _method, path: _url } = req;
        const url: string = _url;
        const ip: string = _ip; 
        const method: string = _method;
        const now: number = Date.now()
        const datestamp = new Date()
        
        return next.handle().pipe(
            tap((res) => {
                const response = context.switchToHttp().getResponse();
                const { stCode } = response;
                const statusCode: number = stCode;
                const duration: string = `${Date.now() - now}ms`;
                const body = {
                datestamp: Date,
                method,
                url,
                statusCode, 
                userAgent,
                ip,
                duration,
                response: res
                };
                this.loggerService.emit('events', body);
            })
        )
    }
}