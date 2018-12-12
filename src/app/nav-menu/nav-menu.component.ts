import { BroadcasterService } from "../shared/services/broadcaster/broadcaster.service";
import { NavigationEnd, Router } from "@angular/router";
import { Component, Input } from "@angular/core";
import { PlatformLocation } from "@angular/common";
import { RMSInterface } from "../shared/interfaces/rms.interfaces";
import { Constants } from "../shared/constants/rms.constants";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.scss"]
})

/**
 * Navigation menu at the left side
 */
export class NavMenuComponent {
  // List of menu items
  @Input() public nodes: RMSInterface.IMenuItem[];

  // Indicates whether the current component is the root of the navigation menu
  @Input() public isRoot: boolean;

  // States whether the drawer is opened
  @Input() public isDrawerOpened: boolean = false;

  /**
   * Constructor for MenuComponent
   * @param router - Router
   * @param broadcastService - Broadcaster service
   * @param platformLocation - Platform Location to handle back button clicks
   */
  public constructor(
    private router: Router,
    private broadcastService: BroadcasterService
  ) {
    /**
     * Refresh menu on broadcast of refreshMenu
     */
    broadcastService.on(Constants.keyRefreshMenu).subscribe(() => {
      if (this.isRoot) {
        this.clearAllActive(this.nodes);
        let activeNode: RMSInterface.IMenuItem;
        this.nodes.forEach(node => {
          let tempNode;
          if (node.childRoutes.length) {
            tempNode = node.childRoutes.find(v => this.doesUrlMatch(v));
          } else if (node.routeUrl) {
            if (this.doesUrlMatch(node)) {
              tempNode = node;
            }
          }
          if (tempNode) {
            activeNode = tempNode;
          }
        });
        if (activeNode) {
          setTimeout(() => {
            activeNode.isActive = true;
          });
        }
      }
    });
  }

  /**
   * Every time any navigation takes place
   * send a broadcast to refresh the menu
   */
  public ngOnInit(): void {
    this.router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        this.broadcastService.broadcast(Constants.keyRefreshMenu);
      }
    });
  }

  /**
   * Does the param url match with browser's current url
   * @param paramNode
   */
  public doesUrlMatch(paramNode: RMSInterface.IMenuItem): boolean {
    if (this.router.url.startsWith(paramNode.routeUrl)) {
      return true;
    } else if (
      paramNode.adjRoutes &&
      this.isAdjunctUrl(paramNode.adjRoutes, this.router.url)
    ) {
      return true;
    } else {
      return false;
    }
  }

  public isAdjunctUrl(adjunctUrls: string[], routerUrl: string): boolean {
    let urlMatches: boolean = false;
    if (adjunctUrls.length) {
      adjunctUrls.forEach(adjunctUrl => {
        if (routerUrl.startsWith(adjunctUrl)) {
          urlMatches = true;
        }
      });
      return urlMatches;
    } else {
      return urlMatches;
    }
  }

  /**
   * Parent menu-item click listener
   * Opens the drawer if the drawer is closed
   * Expands/collapses the menu item
   * @param menu - The clicked menu item
   */
  public onParentNodeClick(menu: RMSInterface.IMenuItem): void {
    this.broadcastService.broadcast(Constants.keyDrawerState, "opened");
    menu.isItemExpanded = !menu.isItemExpanded;
  }

  /**
   * Child menu-item click listener
   * Sets the current menu-item as uniquely active
   * @param menu - The clicked menu item
   */
  public onChildNodeClick(menu: RMSInterface.IMenuItem): void {
    this.setActiveNode(menu);
    if (document.documentElement.offsetWidth <= 768) {
      this.broadcastService.broadcast(Constants.keyDrawerState, "closed");
    }
  }

  /**
   * Sets the passed menu item as the active page
   * @param node HC2Interface.PortalMenu item to be set as active
   */
  private setActiveNode(node: RMSInterface.IMenuItem): void {
    this.clearAllActive(this.nodes);
    setTimeout(() => {
      node.isActive = true;
    });
  }

  /**
   * Checks if a child node is active and accordingly
   * decides whether the menu should be highlighted
   * @param menu - The menu that needs to be checked
   */
  public shouldHighlight(menu: RMSInterface.IMenuItem): boolean {
    if (this.nodes.length) {
      return menu.isItemExpanded ? false : this.isAChildActive(menu);
    } else {
      return false;
    }
  }

  /**
   * Decides whether the menu should be highlighted
   * @param menu - The menu that needs to be checked
   */
  public shouldHighlightChild(menu: RMSInterface.IMenuItem): boolean {
    if (this.nodes.length) {
      return menu.isActive;
    } else {
      return false;
    }
  }

  /**
   * Checks whether the passed menu should be highlighted
   * based on recursively checking if a child is active
   * @param menulist
   */
  private isAChildActive(menulist: RMSInterface.IMenuItem): boolean {
    let returnValue: boolean = false;
    if (menulist.childRoutes.length) {
      for (let i = 0; i < menulist.childRoutes.length; i++) {
        if (menulist.childRoutes[i].isActive) {
          returnValue = true;
          break;
        } else if (this.isAChildActive(menulist.childRoutes[i])) {
          returnValue = true;
          break;
        }
      }
    }
    return returnValue;
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
}
