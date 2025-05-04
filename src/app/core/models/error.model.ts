export interface ErrorResponse {
    error: {
        type: string;
        message: string;
        statusCode: number;
    }
    status: number;
    statusText: string;
    url: string;
    ok: boolean;
    name: string;
    message: string;
}
// {
//     "headers": {
//         "normalizedNames": {},
//         "lazyUpdate": null
//     },
//     "status": 400,
//     "statusText": "Bad Request",
//     "url": "http://localhost:3002/api/v3/brand",
//     "ok": false,
//     "name": "HttpErrorResponse",
//     "message": "Http failure response for http://localhost:3002/api/v3/brand: 400 Bad Request",
//     "error": {
//         "statusCode": 400,
//         "message": "Ya existe una marca con este subdominio"
//     }
// }