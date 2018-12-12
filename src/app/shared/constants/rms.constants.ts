/**
 * If the constant is a broadcast key add key before the name of the variable (not the value)
 * If the constant is a broadcast key make sure to check if another constant with the same value already exists
 * All constants are stated in an ascending order as per their values to make it easy for value checking
 */

export class Constants {
  public static readonly keyActiveRoute: string = 'activeRoute';
  public static readonly keyClearAllActives: string = 'clearAllActives';
  public static readonly keyDrawerOpened: string = 'drawerOpened';
  public static readonly keyDrawerState: string = 'drawerState';
  public static readonly keyMaximizeContent: string = 'maximizeContent';
  public static readonly keyRefreshMenu: string = 'refreshMenu';
  public static readonly keyUnreadNotificationCount: string = 'unreadNotificationCount';
  public static readonly keyIdeaCreated: string ='ideaCreated';
  public static readonly keyPageRefresh: string='pageRefresh';
  public static readonly keyFilterRefresh: string='filterRefresh';
  public static readonly keySecurityId: string='securityId';
  public static readonly keyExecutiveChanged: string='executiveChanged';
  public static readonly keyExecutiveNewsDataLoad: string='executiveNewsDataLoad';
  public static readonly rmsToolBarHeight=42;
  

}

/**
 * Idea Categories
 */
export class IdeaCategoryConstants {
  public static readonly keyActive: string = 'ACTIVE';
  public static readonly keyWatchlist: string = 'WATCHLIST';
  public static readonly keyHistorical: string = 'HISTORICAL';
}

/**
 * Search Dropdown Type
 */
 export class SearchDropdownCategoryConstants{
   public static readonly keyRecentSearch:string='RECENT';
   public static readonly keyTopSearch:string='TOP';
 }

/**
 * Factiva Article
 */
export class FactivaArticleConstants{
  public static readonly artcileUrl: string = 'http://api.beta.dowjones.com/api/public/2.0/Content/PDF/ArticleRef/json?articleRef=';
  public static readonly encryptedToken: string = 'IAL_JUYTKNBSGA2TMNRSGQXTKOLZMNBW4RTYIQ3VMULFKVQW4L3PJQ3UIMCCJBIEW53LJBKDGYKDMV2EIUDRF5JUM6JWOFMFIZTQMRYHAR2NMVUDOSC2IRBTON2FKRFEIZCQMFSVGMKCNJHTS3CZLBRESNJUNVCVON2SOI3FM23BJZDUCSRQKVRE6SJSOBSVOU22MNLGU32GJVBHUTTTGBTWWYTGIZRESRBSJBZE2VRRIJSEK2TLGFJXQMSEMFJDM2CBPF3T2PKH';
  
}

