import { UserService } from './user.service';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UserService);
    validateUser(token: string): Promise<any>;
}
