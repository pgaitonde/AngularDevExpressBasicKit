import {
  Component,
  OnInit
} from "@angular/core";
import {
  Router
} from "@angular/router";
import {
  RMSInterface
} from "../shared/interfaces/rms.interfaces";
import {
  BroadcasterService
} from "../shared/services/broadcaster/broadcaster.service";
import {
  GlobalAccessService
} from "../shared/services/global-access/global-access.service";
import {
  Constants
} from "../shared/constants/rms.constants";
import {
  HttpMenuItemService
} from "../shared/services/http/menu-item/http-menu-item.service";
import {
  RMSEnum
} from "../shared/enums/rms.enums";

@Component({
  selector: "app-drawer",
  templateUrl: "./drawer.component.html",
  styleUrls: ["./drawer.component.scss"]
})
export class DrawerComponent implements OnInit {
  // Reference to the search input box
  // asd @ViewChild('searchElement') searchBox: ElementRef;

  //Maintains the current state of the search box
  public searchState: string = "nofocus";

  //Handles the expand/collapse state of the drawer
  public isExpanded: boolean = false;

  //Contains a list of all the menu items available for user
  public menuItems: RMSInterface.IMenuItem[] = [];

  //Tracks the name of the current page to show it in the navigation bar
  public currentPage: string = "Home";

  //Retains the scroll position when the drawer opens up in a phone
  public scrollRetainPosition: number;

  //Notification count to be displayed over notification icon
  public unreadNotificationCount: number = 3;

  //Has the notification been checked
  public notificationChecked: boolean = true;

  // Controls the top navbar show status
  public fullScreenMode: RMSEnum.FullScreenMode = RMSEnum.FullScreenMode.None;

  // Full screen mode enum instance
  public fullScreenModeEnum = RMSEnum.FullScreenMode;

  // flag to indicate fetching state of menu items
  public fetchingMenuItems: boolean = false;

  /**
   * DrawerComponent public constructor
   * @param portalService - Menu service
   * @param route - Activated route
   * @param router - Route service
   * @param broadcastService - Broadcaster service
   * @param dialogService - Dialog service
   */
  public constructor(
    private broadcastService: BroadcasterService,
    private router: Router,
    // public authService: AuthenticationService,
    private _globalAccessService: GlobalAccessService,
    private _menuItemService: HttpMenuItemService
  ) {}

  /**
   * Component on init page life cycle event handler
   */
  public ngOnInit() {
    this.fetchingMenuItems = true;
    this._menuItemService.getList(`1`).subscribe(
      items => {
        if (items.length) {
          this.menuItems = items;
        }
        this.fetchingMenuItems = false;
      },
      err => {
        this.fetchingMenuItems = false;
      }
    );
    this.broadcastService
      .on(Constants.keyDrawerState)
      .subscribe((state: string) => {
        if (state === "opened") {
          if (!this.isExpanded) {
            this.openDrawer();
          }
        } else {
          if (this.isExpanded) {
            this.closeDrawer();
          }
        }
      });
    this.broadcastService.on(Constants.keyClearAllActives).subscribe(() => {
      this.clearAllActive(this.menuItems);
    });
    this.broadcastService
      .on(Constants.keyUnreadNotificationCount)
      .subscribe((state: number) => {
        this.unreadNotificationCount = state;
      });
    this.broadcastService
      .on(Constants.keyActiveRoute)
      .subscribe((state: string) => {
        this._globalAccessService.activeRoute = state;
      });
    this.broadcastService
      .on(Constants.keyMaximizeContent)
      .subscribe((mode: RMSEnum.FullScreenMode) => {
        this.fullScreenMode = mode;
      });
  }

  /**
   *
   */
  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.broadcastService.broadcast(Constants.keyRefreshMenu);
    });
  }

  /**
   *
   */
  public goToHome(): void {
    this.router.navigate(["/"]);
  }

  /**
   * Recursive function to make sure none of the nodes have isActive as true
   * Called every time before setting isActive to true for any node
   * @param menulist - List of menuitems
   */
  private clearAllActive(menulist: RMSInterface.IMenuItem[]): void {
    menulist.forEach(menu => {
      menu.isActive = false;
      if (menu.childRoutes.length) {
        this.clearAllActive(menu.childRoutes);
      }
    });
  }

  /**
   * Recursive function to expand the node if it has an active child node
   * @param menulist - List of menu items
   */
  private expandRecursivelyIfActive(
    menulist: RMSInterface.IMenuItem[]
  ): boolean {
    let state: boolean = false;
    menulist.forEach(menu => {
      if (menu.childRoutes.length) {
        menu.isItemExpanded = this.expandRecursivelyIfActive(menu.childRoutes);
      }
      if (menu.isActive || menu.isItemExpanded) {
        state = true;
      }
    });
    return state;
  }

  /**
   * Opens the navigation drawer
   * Also expands to the active menu item
   */
  private openDrawer(): void {
    this.isExpanded = true;
    this.expandRecursivelyIfActive(this.menuItems);
    //Copy the scroll position and block the scrollbar
    if (document.documentElement.offsetWidth <= 768) {
      this.scrollRetainPosition = document.documentElement.scrollTop;
      document.documentElement.classList.add("cdk-global-scrollblock");
    }
    this.broadcastService.broadcast(Constants.keyDrawerOpened, true);
  }

  /**
   * Toggles the navigation drawer
   */
  public toggleDrawer(): void {
    if (this.isExpanded) {
      this.closeDrawer();
    } else this.openDrawer();
  }

  /**
   * Returns whether a search is taking place
   */
  public isSearching(): boolean {
    // return this.getSearchState(this.searchBox.nativeElement.value) == 'infocus' ? true : false;
    return false;
  }

  /**
   * Returns the state of the search input box
   * @param searchString - search string
   */
  public getSearchState(searchString: string): string {
    return searchString.length > 0 ? "infocus" : this.searchState;
  }

  /**
   * Clears and removes the focus from the search box
   */
  public cancelSearch(): void {
    // this.searchBox.nativeElement.value = "";
    // this.searchBox.nativeElement.blur();
    this.searchState = "nofocus";
  }

  /**
   * Closes the navigation drawer
   */
  public closeDrawer(): void {
    this.isExpanded = false;
    this.collapseChildNodesRecursively(this.menuItems);
    // Unblock the scrollbar and restore the scroll position
    if (document.documentElement.offsetWidth <= 768) {
      document.documentElement.classList.remove("cdk-global-scrollblock");
      document.documentElement.scrollTop = this.scrollRetainPosition;
    }
    this.broadcastService.broadcast(Constants.keyDrawerOpened, false);
  }

  /**
   * Recursively collapses all menus
   * @param children - List of menu items
   */
  public collapseChildNodesRecursively(
    children: RMSInterface.IMenuItem[]
  ): void {
    if (children.length)
      children.forEach(node => {
        node.isItemExpanded = false;
        this.collapseChildNodesRecursively(node.childRoutes);
      });
  }

}
