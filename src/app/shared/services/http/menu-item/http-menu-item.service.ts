import {
  Injectable
} from '@angular/core';
import {
  HttpServiceBase
} from '../http.base';
import {
  RMSInterface
} from '../../../interfaces/rms.interfaces';
import {
  Observable
} from 'rxjs';
import {
  RMSEnum
} from '../../../enums/rms.enums';
import {
  EnvironmentService
} from '../../../../../environments/environment';
import { of
} from 'rxjs';
import {
  map,
  catchError
} from 'rxjs/operators';
import {
  HttpClient
} from '@angular/common/http';

@Injectable()
export class HttpMenuItemService extends HttpServiceBase < RMSInterface.IMenuItem > {

  // Base url
  public baseUrl: string;
  // Portal menu items
  private _menuItems: RMSInterface.IMenuItem[] = [];
  // Flag to indicate initial fetch of menu items
  private _fetchedMenuItems: boolean = false;

  private _httpClient: HttpClient;

  /**
   * HttpMenuItemService public constructor
   * @param httpClient 
   * @param router 
   * @param environmentService 
   */
  public constructor(httpClient: HttpClient, environmentService: EnvironmentService) {
    super(httpClient);
    this.baseUrl = environmentService.serverUrl;
    this._httpClient = httpClient;
  }

  public getDocument(requestUrl: string, documentType: RMSEnum.DocumentType): Observable < RMSInterface.IRawDocument > {
    throw new Error("Method not implemented.");
  }
  public postDocument(requestUrl: string, body: RMSInterface.IDocument): Observable < number > {
    throw new Error("Method not implemented.");
  }
  public getItem(requestUrl: string): Observable < RMSInterface.IMenuItem > {
    throw new Error("Method not implemented.");
  }
  /**
   * Returns portal menu list
   * @param requestUrl ${userNum}
   */
  public getList(requestUrl: string): Observable < RMSInterface.IMenuItem[] > {
    // return super.getList(`webapi/menu-item/list/${requestUrl}`);
    return this._httpClient.get<RMSInterface.IMenuItem[]>("../../../../../assets/stubs/menu-item.json");
  }
  /**
   * Returns user's portal menu items
   * @param userNum 
   */
  public getMenuItems(userNum: number): Observable < RMSInterface.IMenuItem[] > {
    if (this._fetchedMenuItems) {
      return of(this._menuItems);
    } else {
      return this.getList(`${userNum}`)
        .pipe(
          map((items: RMSInterface.IMenuItem[]) => {
            this._fetchedMenuItems = true;
            if (items) {
              this._menuItems = items;
              return items;
            } else {
              return [];
            }
          }, catchError => {
            this._fetchedMenuItems = true;
            return [];
          })
        );

    }
  }
  /**
   * Fetched menu item flag getter
   */
  public get fetchedMenuItems(): boolean {
    return this.fetchedMenuItems;
  }
  public postItem(requestUrl: string, body: RMSInterface.IMenuItem): Observable < RMSInterface.IMenuItem > {
    throw new Error("Method not implemented.");
  }

  public patchItem(requestUrl: string, body: RMSInterface.IMenuItem): Observable < RMSInterface.IMenuItem > {
    throw new Error("Method not implemented.");
  }

}
