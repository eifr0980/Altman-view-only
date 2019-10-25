import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpParams } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

import { User, Resident, Apartment, Report, Contract, Owner, Cheque, Document } from 'src/app/shared/login/_models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    private apiUrl = '/api';
    private apiAdminUrl = '/api/admin';


    constructor(private http: HttpClient, private auth: AuthenticationService) {

    }
    public getPDF(uri): Observable<Blob> {
        return this.http.get(`${this.apiUrl}/download/${uri}`, { responseType: 'blob' });
    }

    getAllApts() {
        return this.http.get<Apartment[]>(`${this.apiUrl}/apts`);
    }

    getResidents(apt_id) {
        return this.http.get<Resident[]>(`${this.apiUrl}/residents/apt/${apt_id}`);
    }

    getApartment(apt_id) {
        return this.http.get<Apartment>(`${this.apiUrl}/apts/${apt_id}`);
    }

    getLastReport() {
        return this.http.get<Report>(`${this.apiUrl}/reports/last`);
    }
    getContract() {
        return this.http.get<Contract[]>(`${this.apiUrl}/contracts`);
    }
    getContracts(apt_id) {
        return this.http.get<Contract[]>(`${this.apiUrl}/contracts/apt/${apt_id}`);
    }

    getDocumentsCategories(apt_id) {
        return this.http.get<any[]>(`${this.apiUrl}/documents/categories/${apt_id}`);
    }
    getDocumentsOfCategories(apt_id, category) {
        const params = new HttpParams().set('category', category);
        return this.http.get<any[]>(`${this.apiUrl}/documents/category/apt/${apt_id}`, { params });
    }









    // ADMIN
    getAllOwners() {
        return this.http.get<Owner[]>(`${this.apiAdminUrl}/owners`);
    }

    getOwnerApts(owner_id) {
        return this.http.get<any[]>(`${this.apiAdminUrl}/owners/${owner_id}`);
    }

    newOwner(owner) {
        return this.http.post(`${this.apiAdminUrl}/owners`, owner);
    }
    newApartment(apartment) {
        return this.http.post(`${this.apiAdminUrl}/apts`, apartment, {
            reportProgress: true,
            observe: 'events'
        }).pipe(map((event) => {
            switch (event.type) {
                case HttpEventType.UploadProgress:
                    const progress = Math.round(100 * event.loaded / event.total);
                    return { status: 'progress', message: progress };

                case HttpEventType.Response:
                    return { status: 'Done', message: `✔️ דירה נוספה בהצלחה` };
                default:
                    return `Unhandled event: ${event.type}`;
            }
        }));
    }
    newContract(contract) {
        return this.http.post(`${this.apiAdminUrl}/contracts`, contract, {
            reportProgress: true,
            observe: 'events'
        }).pipe(map((event) => {

            switch (event.type) {

                case HttpEventType.UploadProgress:
                    const progress = Math.round(100 * event.loaded / event.total);
                    return { status: 'progress', message: progress };

                case HttpEventType.Response:
                    return { status: 'Done', message: `✔️ חוזה נוסף בהצלחה` };
                default:
                    return `Unhandled event: ${event.type}`;
            }
        }));
    }
    newResident(resident) {
        return this.http.post(`${this.apiAdminUrl}/residents`, resident);
    }
    newReport(report) {
        return this.http.post(`${this.apiAdminUrl}/reports`, report, {
            reportProgress: true,
            observe: 'events'
        }).pipe(map((event) => {
            switch (event.type) {
                case HttpEventType.UploadProgress:
                    const progress = Math.round(100 * event.loaded / event.total);
                    return { status: 'progress', message: progress };

                case HttpEventType.Response:
                    return { status: 'Done', message: `✔️ דו"ח נוסף בהצלחה` };
                default:
                    return `Unhandled event: ${event.type}`;
            }
        }));
    }
    newCheque(cheque) {
        return this.http.post(`${this.apiAdminUrl}/cheques`, cheque, {
            reportProgress: true,
            observe: 'events'
        }).pipe(map((event) => {
            switch (event.type) {
                case HttpEventType.UploadProgress:
                    const progress = Math.round(100 * event.loaded / event.total);
                    return { status: 'progress', message: progress };

                case HttpEventType.Response:
                    return { status: 'Done', message: `✔️ צ'ק נוסף בהצלחה` };
                default:
                    return `Unhandled event: ${event.type}`;
            }
        }));
    }
    newDocument(document) {
        return this.http.post(`${this.apiAdminUrl}/documents`, document, {
            reportProgress: true,
            observe: 'events'
        }).pipe(map((event) => {
            switch (event.type) {
                case HttpEventType.UploadProgress:
                    const progress = Math.round(100 * event.loaded / event.total);
                    return { status: 'progress', message: progress };

                case HttpEventType.Response:
                    return { status: 'Done', message: `✔️ מסמך נוסף בהצלחה` };
                default:
                    return `Unhandled event: ${event.type}`;
            }
        }));
    }

    getLastReportAdmin(owner_id) {
        return this.http.get<Report>(`${this.apiAdminUrl}/reports/${owner_id}`);
    }
    public getPDFadmin(uri): Observable<Blob> {
        return this.http.get(`${this.apiAdminUrl}/download/${uri}`, { responseType: 'blob' });
    }
    getAdminResidents(apt_id) {
        return this.http.get<Resident[]>(`${this.apiAdminUrl}/residents/apt/${apt_id}`);
    }
    getAdminContract() {
        return this.http.get<Contract[]>(`${this.apiAdminUrl}/contracts`);
    }
    getAdminCheques(apt_id) {
        return this.http.get<Cheque[]>(`${this.apiAdminUrl}/cheques/apt/${apt_id}`);
    }
    getAdminChequesByDate(apt_id, year) {
        const monthes = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
        return this.http.get<any[]>(`${this.apiAdminUrl}/cheques/apt/${apt_id}/${year}`)
            .pipe(
                map(object => object
                    .map(mon => {
                        const month = monthes[mon.month - 1];
                        const valid = (mon.valid == 'true');
                        return {
                            month,
                            valid
                        };
                    })
                )
            );
    }
    getAdminDocuments(apt_id) {
        return this.http.get<Document[]>(`${this.apiAdminUrl}/documents/apt/${apt_id}`);
    }
    getAdminDocumentsCategories(apt_id) {
        return this.http.get<any[]>(`${this.apiAdminUrl}/documents/categories/${apt_id}`);
    }
    getAdminDocumentsOfCategories(apt_id, category) {
        let params = new HttpParams().set("category", category);
        return this.http.get<any[]>(`${this.apiAdminUrl}/documents/category/apt/${apt_id}`, { params: params });
    }




    register(user: User) {
        return this.http.post(`${this.apiUrl}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/users/${id}`);
    }
}
