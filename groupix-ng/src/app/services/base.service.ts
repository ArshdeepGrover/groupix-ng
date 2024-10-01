import { environment } from 'src/environments/environment';

export class BaseService {
  protected readonly apiUrl = environment.apiUrl;
}
