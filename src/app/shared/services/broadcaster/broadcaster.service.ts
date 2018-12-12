import {
  Injectable
} from '@angular/core';
import {
  Subject,
  Observable
} from 'rxjs';
import {
  filter,
  map
} from 'rxjs/operators'

@Injectable()
export class BroadcasterService {

  // Object queue for the service
  private _eventBus: Subject < {
    key: any;data ? : any;
  } > ;

  /**
   * Constructor for BroadcasterService
   */
  public constructor() {
    this._eventBus = new Subject < {
      key: any;data ? : any;
    } > ();

  }

  /**
   * Broadcasts the event
   * @param key - key for the broadcast
   * @param data - adjacent data, if any
   */
  public broadcast(key: any, data ? : any): void {
    this._eventBus.next({
      key,
      data
    });
  }

  /**
   * Interceptor for the broadcast events
   * @param key - key for the broadcast
   */
  public on < T > (key: any): Observable < T > {
    return this._eventBus.asObservable()
      .pipe(
        filter(event => event.key === key),
        map(event => < T > event.data)
      );
  }
}
