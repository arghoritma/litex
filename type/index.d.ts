import { Request, Response } from "ultimate-express";

export interface Response extends Response {
    view(view: string, data?: any): void,
    inertia(view: string, data?: any): void,
    flash(message: string, data: any): Response,
}

export interface Request extends Request {
    user: {
        id: number;
        name: string;
        email: string;
        phone: string;
        is_admin: boolean;
        is_verified: boolean;
        created_at: number;
    };
    share: {
        user: {
            id: number;
            name: string;
            email: string;
            phone: string;
            is_admin: boolean;
            is_verified: boolean;
        };
    };
}
