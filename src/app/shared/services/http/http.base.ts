
import {
  Observable,
  throwError
} from 'rxjs';
import {
  map,
  catchError
} from 'rxjs/operators'
import {
  HeaderType,
  HeaderContentType
} from '../../config/rms.config';
import {
  RMSInterface
} from '../../interfaces/rms.interfaces';
import {
  RMSType
} from '../../types/rms.types';
import {
  RMSEnum
} from '../../enums/rms.enums';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
  HttpResponse
} from '@angular/common/http';

/**
 * Base class to manage all of our CRUD operations.
 */
export abstract class HttpServiceBase < T extends RMSInterface.IRMSBase > {

  private _baseUrl: string;

  /**
   * Public constructor of HttpServiceBase
   * @param http 
   * @param router 
   */
  public constructor(private http: HttpClient) {}

  /**
   * Getter base url of API
   */
  public get baseUrl(): string {
    return this._baseUrl;
  }

  /**
   * Setter for base url of API
   */
  public set baseUrl(baseUrl: string) {
    if (!baseUrl) {
      throw new Error("Attempting to set the base url with a null or undefined value.");
    }

    this._baseUrl = baseUrl;
  }

  /**
   * Base class implemetation of get document method that 
   * returns the name and blob(body) of requested document
   * @param requestUrl 
   * @param documentType 
   */
  public getDocument(requestUrl: string, documentType: RMSEnum.DocumentType): Observable < RMSInterface.IRawDocument > {

    if (!requestUrl) {
      throw new Error("Attempting to access an endpoint with a null or undefined request url.");
    }

    if (!documentType) {
      throw new Error("Attempting to get a document with a null or undefined document type specification.");
    }

    // var responseType: ResponseContentType;
    var headers = new HttpHeaders();
    this.addAuthorizationHeader(headers);

    if (documentType === RMSEnum.DocumentType.Text) {
      headers.append('Content-Type', 'text/plain; charset=utf-8')
    } else {
      // The blob container will work for both byte[] and streamed contents.
      headers.append('Content-Type', 'blob')

      return this.http
        .get < RMSInterface.IRawDocument > (`${this._baseUrl}/${requestUrl}`, {
          headers: headers
        })
        .pipe(catchError(this.handleError));
    }
  }
  

  /**
   * post document base implementation
   * @param requestUrl
   * @param body
   */
  public postDocument(requestUrl: string, body: RMSInterface.IDocument): Observable < number > {

    if (!requestUrl) {
      throw new Error("Attempting to access an endpoint with a null or undefined request url.");
    }

    if (!body) {
      throw new Error("Attempting to post a null or undefined file body object.");
    }

    var headers = new HttpHeaders();
    this.addAuthorizationHeader(headers);
    this.addHeader(headers, HeaderType.ContentType, HeaderContentType.ApplicationJson);

    return this.http
      .post < number > (`${this._baseUrl}/${requestUrl}`, body.toJSON(), {
        headers: headers
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * get item request base function for http calls
   * @param requestUrl 
   * @param policy ${AuthorizationPolicy.Windows|JWT }
   */
  public getItem(requestUrl: string, policy: AuthorizationPolicy = AuthorizationPolicy.JWT): Observable < T > {

    if (!requestUrl) {
      throw new Error("Attempting to access an endpoint with a null or undefined request url.");
    }

    var options = this.getHttpOptionsByAuthorizationPolicy(policy);

    return this.http
      .get < T > (`${this._baseUrl}/${requestUrl}`, {
        headers: options.headers,
        withCredentials: options.withCredentials
      })
      .pipe(catchError(this.handleError));

  }

  /**
   * get list request base function for http calls
   * @param requestUrl 
   * @param policy ${AuthorizationPolicy.Windows|JWT }
   */
  public getList(requestUrl: string, policy: AuthorizationPolicy = AuthorizationPolicy.JWT): Observable < T[] > {

    if (!requestUrl) {
      throw new Error("Attempting to access an endpoint with a null or undefined request url.");
    }

    var options = this.getHttpOptionsByAuthorizationPolicy(policy);

    return this.http
      .get < T[] > (`${this._baseUrl}/${requestUrl}`, {
        headers: options.headers,
        withCredentials: options.withCredentials
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * post item request base function for http calls   
   * @param requestUrl 
   * @param body 
   * @param policy ${AuthorizationPolicy.Windows|JWT }
   */
  public postItem(requestUrl: string, body: T, policy: AuthorizationPolicy = AuthorizationPolicy.JWT): Observable < T > {

    if (!requestUrl) {
      throw new Error("Attempting to access an endpoint with a null or undefined request url.");
    }

    if (!body) {
      throw new Error("Attempting to post a null or undefined body object.");
    }

    //  let options = this.getHttpOptionsByAuthorizationPolicy(policy);

    // return this.http
    //   .post < T > (`${this._baseUrl}/${requestUrl}`, body, {
    //     headers: options.headers,
    //     withCredentials: options.withCredentials
    //   })
    //   .pipe(catchError(this.handleError));

    return this.http
      .post(`${this._baseUrl}/${requestUrl}`, body.toJSON(), {
        headers: new HttpHeaders({
          "Content-type": "application/json"
        })
      })
      .pipe(
        map((response: T) => response),
        catchError(this.handleError)
      );
  }

  /**
   * patch item request base function for http calls
   * @param requestUrl 
   * @param body    
   * @param policy ${AuthorizationPolicy.Windows|JWT }
   */
  public patchItem(requestUrl: string, body: T, policy: AuthorizationPolicy = AuthorizationPolicy.JWT): Observable < T > {

    if (!requestUrl) {
      throw new Error("Attempting to access an endpoint with a null or undefined request url.");
    }

    if (!body) {
      throw new Error("Attempting to patch a null or undefined body object.");
    }

    // let options = this.getHttpOptionsByAuthorizationPolicy(policy);

    // return this.http
    //   .patch < T > (`${this._baseUrl}/${requestUrl}`, body, {
    //     headers: options.headers,
    //     withCredentials: options.withCredentials
    //   })
    //   .pipe(catchError(this.handleError));

    return this.http
      .patch(`${this._baseUrl}/${requestUrl}`, JSON.stringify(body) , {
        headers: new HttpHeaders({
          "Content-type": "application/json"
        })
      })
      .pipe(
        map((response: T) => response),
        catchError(this.handleError)
      );
  }

  
  /**
   * patch item request base function for http calls
   * @param requestUrl 
   * @param id    
   * @param policy ${AuthorizationPolicy.Windows|JWT }
   */
  public deleteItem(requestUrl: string, id: number, policy: AuthorizationPolicy = AuthorizationPolicy.JWT): Observable < T > {

    if (!requestUrl) {
      throw new Error("Attempting to access an endpoint with a null or undefined request url.");
    }

    if (!id) {
      throw new Error("Attempting to delete a null or undefined body object.");
    }

    return this.http
      .delete(`${this._baseUrl}/${requestUrl}?id=${id}`, {
        headers: new HttpHeaders({
          "Content-type": "text/plain"
        })
      })
      .pipe(
        map((response: T) => response),
        catchError(this.handleError)
      );
  }

  /**
   * Gets http options for http requests depending on the 
   * authorization policy of the call.
   * @param type 
   */
  private getHttpOptionsByAuthorizationPolicy(type: AuthorizationPolicy): any {
    let headers = new HttpHeaders();
    this.addHeader(headers, HeaderType.ContentType, HeaderContentType.ApplicationJson);
    let withCredentials = false;

    switch (type) {
      case AuthorizationPolicy.Windows:
        withCredentials = true;
        break;
      case AuthorizationPolicy.JWT:
        this.addAuthorizationHeader(headers);
        break;
      default:
        throw "Missing authorization type for http option construct.";
    }

    return {
      headers: headers,
      withCredentials: withCredentials
    };
  }

  /**
   * 
   * @param error 
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  /**
   * adds the authorization header to api requests
   * @param headers 
   */
  private addAuthorizationHeader(headers: HttpHeaders): void {
    var idToken = localStorage.getItem('accessToken');
    headers.append(HeaderType.Authorization, `Bearer ${idToken}`);
  }

  /**
   * adds the authorization header value to api requests
   * @param headers 
   * @param headerName 
   * @param contentType 
   */
  private addHeader(headers: HttpHeaders, headerName: string, contentType: string): void {
    headers.append(headerName, contentType);
  }

  /**
   * This will pull the content type of byte[], stream or text from the body.
   * The response itself contains the details on what the content data is
   * e.g. application/pdf or application/text but we don't really care.
   * @param response 
   */
  private extractDocumentFromResponse(response: Response): RMSInterface.IRawDocument {

    var documentName = "";

    var contentDispositionHeader = response.headers.get(HeaderType.ContentDisposition);

    if (contentDispositionHeader) {
      documentName = this.getDocumentNameFromHeader(contentDispositionHeader);
      if (documentName === "Document Not Found") {
        throw new Error("The response contained no document information.");
      }
    } else {
      throw new Error("The response contained no Content Disposition Header, cannot retrieve document metadata.");
    }

    return new RMSType.RawDocument(response['_body'], documentName);
  }

  /**
   * The disposition header contains data that should look like the following
   * e.g. "attachment; filename=c:\temp\somefilename.txt"
   * @param dispositionHeader 
   */
  private getDocumentNameFromHeader(dispositionHeader: string): string {

    var firstSplit = dispositionHeader.split(';');

    if (firstSplit.length !== 2) {
      return "";
    }

    var secondSplit = firstSplit[1].trim().split('=');

    if (secondSplit.length !== 2) {
      return "";
    }

    // File names were enclosed in quotes to prevent a 
    // ERR_RESPONSE_HEADERS_MULTIPLE_CONTENT_DISPOSITION exception when there are commas in the
    // file name, so we just want to strip them out.
    return secondSplit[1].replace(new RegExp(/"/g), '');
  }
}

/**
 * Authentication type enumeration to construct the header
 */
export enum AuthorizationPolicy {
  Windows,
  JWT
}
