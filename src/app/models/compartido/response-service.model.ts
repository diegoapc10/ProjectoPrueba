import { HttpStatusCode } from "@angular/common/http";

export interface ResponseService{
    result: boolean;
    message: string;
    statusCode: HttpStatusCode,
    data: any
}