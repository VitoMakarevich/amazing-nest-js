import { AuthService } from '../services/auth.service';
declare const HttpStrategy_base: new (...args: any[]) => any;
export declare class HttpStrategy extends HttpStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(token: string): Promise<any>;
}
export {};
