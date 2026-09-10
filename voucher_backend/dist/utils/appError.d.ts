type AppErrorClass = {
    statusCode: number;
    status: string;
    isOperational: boolean;
};
declare class AppError extends Error implements AppErrorClass {
    statusCode: number;
    status: string;
    isOperational: boolean;
    constructor(message: string, statusCode: number);
}
export default AppError;
//# sourceMappingURL=appError.d.ts.map