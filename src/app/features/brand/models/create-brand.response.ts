import { Brand } from "./brand.model";

export interface CreateBrandResponse {
    type: string;
    message: string;
    statusCode: number;
    data: Partial<Brand>;
}
// {
// 	"type": "1",
// 	"message": "Marca creada correctamente",
// 	"statusCode": 200,
// 	"data": {
// 		"name": "River Platees",
// 		"description": "Equipo De Futbol",
// 		"subdomain": "riverplatees",
// 		"domainUrl": "riverplatees.agiliza360.com",
// 		"businessCategory": "Electrónica y Tecnología",
// 		"language": "es",
// 		"timezone": "America/Lima",
// 		"allowsOnlineInvoicing": false,
// 		"allowsReceipts": false,
// 		"allowsInvoices": false,
// 		"acceptsOnlinePayments": false,
// 		"status": true,
// 		"branches": [],
// 		"_id": "6817bf2482d2345ec030631d",
// 		"createdAt": "2025-05-04T19:25:24.061Z",
// 		"updatedAt": "2025-05-04T19:25:24.061Z",
// 		"__v": 0
// 	}
// }