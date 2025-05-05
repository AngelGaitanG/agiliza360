import { Injectable } from "@angular/core";
import { environment } from "../../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { IntegrationComparisonResponse } from "../models/get-comparison.model";

@Injectable({
    providedIn: 'root'
})
export class IntegrationService {
    private apiUrl = `${environment.apiUrl}/integration`;
    private token = localStorage.getItem('auth_token');
    private brandSubdomain = localStorage.getItem('brand-subdomain');

    constructor(private http: HttpClient) {}

    getComparison() {
        return this.http.get<IntegrationComparisonResponse>(`${this.apiUrl}/compare/${this.brandSubdomain}/1`,
            {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            }
        );
    }


}
