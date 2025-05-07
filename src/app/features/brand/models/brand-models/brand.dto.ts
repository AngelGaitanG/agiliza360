import { BRAND_CATEGORIES } from "../../../../core/models/categories.constant";
import { LANGUAGES } from "../../../../core/models/languages.constant";
import { Timezones } from "../../../../core/models/timezones.constant";

export interface UpdateBrandDto {
    name?: string;
    description?: string;
    businessCategory?: BRAND_CATEGORIES;
    language?: LANGUAGES;
    timezone?: Timezones;
    socialNetworks?: { [key: string]: string };
    allowsOnlineInvoicing?: boolean;
    allowsReceipts?: boolean;
    allowsInvoices?: boolean;
    acceptsOnlinePayments?: boolean;
    currency?: {
        name?: string;
        symbol?: string;
        code: string;
        exchangeRate: number;
    }
}

// {
//     "name": "WaltMart",
//     "description": "SuperMercado EstadoUnidense",
//     "businessCategory": "RETAIL",
//     "language": "en",
//     "timezone": "America/New_York",
//     "socialNetworks": {
//         "facebook": "facebook.com/waltmart",
//         "instagram": "@waltmart"
//     },
//     "allowsOnlineInvoicing": true,
// 		"allowsReceipts": true,
// 		"allowsInvoices": true,
// 		"acceptsOnlinePayments": true,
//     "currency": {
//         "name": "Dollar",
//         "symbol": "$",
//         "code": "01",
//         "exchangeRate": 1
//     }
// }