import { Injectable } from "@angular/core";
// import { ConfigChooserInterface } from '../../../config-chooser/shared/interfaces/config-chooser.interfaces';

/**
 * Global variable service
 */
@Injectable()
export class GlobalAccessService {
  /**
   * GlobalAccessService public constructor
   */
  public constructor() {}

  // Active route name
  private _activeRoute: string = "Home";
  // Cache requested url to navigate post authentication
  private _urlCache: string = "";
  // // Current URL page permission
  // private _urlPermission: RMSInterface.IRoutePermission;
  // Portal Header Band Element Height
  private readonly _navbarHeight: number = 50;
 
  // Navigation route to maintain the last route
  // private _routeHistory: RMSInterface.IRouteHistory = <RMSInterface.IRouteHistory>{};
  // Stores the current state, when in fullscreen the nav drawer
  // and the app bar hides and only the content is visible
  private _isFullscreen: boolean = false;

  // Active route name getter
  public get activeRoute(): string {
    return this._activeRoute;
  }

  // Active route name setter
  public set activeRoute(activeRoute: string) {
    this._activeRoute = activeRoute;
  }

  // Cache requested url getter
  public get urlCache(): string {
    return this._urlCache;
  }

  // Cache requested url setter
  public set urlCache(urlCache: string) {
    this._urlCache = urlCache;
  }

  // // Current URL page permission getter
  // public get urlPermission():  RMSInterface.IRoutePermission {
  //   return this._urlPermission;
  // }

  // // Current URL page permission setter
  // public set urlPermission(urlPermission:  RMSInterface.IRoutePermission) {
  //   this._urlPermission = urlPermission;
  // }

  // Portal Header Band Element Height getter
  public get navbarHeight(): number {
    return this._navbarHeight;
  }

  // // Navigation route to maintain the last route getter
  // public get routeHistory(): RMSInterface.IRouteHistory {
  //   return this._routeHistory;
  // }

  // // Navigation route to maintain the last route setter
  // public set routeHistory(routeHistory: RMSInterface.IRouteHistory) {
  //   this._routeHistory = routeHistory;
  // }

  // full screen flag getter
  public get isFullscreen(): boolean {
    return this._isFullscreen;
  }

  // full screen flag setter
  public set isFullscreen(isFullscreen: boolean) {
    this._isFullscreen = isFullscreen;
  }
}
