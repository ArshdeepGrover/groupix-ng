import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { ICategory } from 'src/app/modules/finasync/models/category.model';
import { Observable } from 'rxjs';
import { ROUTES } from 'src/app/apiRoutes/api';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  create(formValues: any): Observable<ICategory> {
    return this.http.post<ICategory>(
      `${this.apiUrl}/${ROUTES.CATEGORIES.CREATE}`,
      {
        category: formValues,
      }
    );
  }

  index(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${ROUTES.CATEGORIES.INDEX}`);
  }

  update(categoryId: number, formValues: any): Observable<ICategory> {
    return this.http.put<ICategory>(
      `${this.apiUrl}/${ROUTES.CATEGORIES.UPDATE}`,
      {
        category: formValues,
        id: categoryId,
      }
    );
  }

  delete(categoryId: number): Observable<boolean> {
    const params = new HttpParams().set('category_id', categoryId);
    return this.http.delete<boolean>(
      `${this.apiUrl}/${ROUTES.CATEGORIES.DESTROY}`,
      {
        params,
      }
    );
  }
}
