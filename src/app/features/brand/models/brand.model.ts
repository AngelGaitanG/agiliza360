export interface Brand {
  _id: string;
  name: string;
  description: string;
  logo: string;
  subdomain: string;
  domainUrl: string;
  businessCategory: string;
  language: string;
  timezone: string;
  socialNetworks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  allowsOnlineInvoicing: boolean;
  allowsReceipts: boolean;
  allowsInvoices: boolean;
  acceptsOnlinePayments: boolean;
  currency: {
    name: string;
    symbol: string;
    code: string;
    exchangeRate: number;
  };
  status: boolean;
  branches: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
} 