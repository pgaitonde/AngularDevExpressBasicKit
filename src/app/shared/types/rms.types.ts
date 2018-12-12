import {
  RMSInterface
} from "../interfaces/rms.interfaces";
import {
  RMSEnum
} from "../enums/rms.enums";
// import {
//   PipelineInterface
// } from "../../pipeline/shared/interfaces/rms.pipeline.details.interface";
import {
  IdeaCategoryConstants
} from "../constants/rms.constants";
import {
  tick
} from "@angular/core/src/render3";
// import { IdeaGeneratorInterface } from "../../idea-generation/shared/interfaces/rms.idea-generation.interface";
// import { AlertsInterface } from "../../alerts/shared/interfaces/rms.alerts.interface";

export module RMSType {

  /**
   * Base class for all client -> server objects.
   */
  export abstract class RMSBase implements RMSInterface.IRMSBase {

    /**
     * Default Const.
     */
    public constructor() {}

    /**
     * Custom json converter that uses a classes get methods.
     */
    public toJSON(): string {
      var result = JSON.stringify(this.onlyGetters(this));
      return result;
    }

    private onlyGetters(obj: any): any {
      // Gotchas: types for which typeof returns "object"
      if (obj === null || obj instanceof Array || obj instanceof Date) {
        return obj;
    }

      let onlyGetters: any = {};

      // Iterate over each property for this object and its prototypes. We'll get each
      // property only once regardless of how many times it exists on parent prototypes.
      for (let key in obj) {

        let proto = obj;

        // Check getOwnPropertyDescriptor to see if the property is a getter. It will only
        // return the descriptor for properties on this object (not prototypes), so we have
        // to walk the prototype chain.
        while (proto) {
          let descriptor = Object.getOwnPropertyDescriptor(proto, key);

          if (descriptor && descriptor.get) {

            // Access the getter on the original object (not proto), because while the getter
            // may be defined on proto, we want the property it gets to be the one from the
            // lowest level
            let val = obj[key];

            if (typeof val === 'object') {
              onlyGetters[key] = this.onlyGetters(val);
            } else {
              onlyGetters[key] = val;
            }
            proto = null;
          } else {
            proto = Object.getPrototypeOf(proto);
          }
        }
      }
      return onlyGetters;
    }
  }

  /**
   * Route permission class
   */
  export class RoutePermission extends RMSBase implements RMSInterface.IRoutePermission {

    private _routeNum: number;
    private _routeUrl: string;
    private _routeName: string;
    private _canReadInd: number;
    private _canCreateInd: number;
    private _canUpdateInd: number;
    private _canDeleteInd: number;

    public constructor() {
      super();
    }

    /**
     * route num getter
     */
    public get routeNum(): number {
      return this._routeNum;
    }

    /**
     * route num setter
     */
    public set routeNum(routeNum: number) {
      this._routeNum = routeNum;
    }

    /**
     * route Url getter
     */
    public get routeUrl(): string {
      return this._routeUrl;
    }

    /**
     * route url setter
     */
    public set routeUrl(routeUrl: string) {
      this._routeUrl = routeUrl;
    }

    /**
     * route Url getter
     */
    public get routeName(): string {
      return this._routeName;
    }

    /**
     * route name setter
     */
    public set routeName(routeName: string) {
      this._routeName = routeName;
    }

    /**
     * can read ind getter
     */
    public get canReadInd(): number {
      return this._canReadInd;
    }

    /**
     * can read ind setter
     */
    public set canReadInd(canReadInd: number) {
      this._canReadInd = canReadInd;
    }

    /**
     * can create ind getter
     */
    public get canCreateInd(): number {
      return this._canCreateInd;
    }

    /**
     * can create ind setter
     */
    public set canCreateInd(canCreateInd: number) {
      this._canCreateInd = canCreateInd;
    }

    /**
     * can update ind getter
     */
    public get canUpdateInd(): number {
      return this._canUpdateInd;
    }

    /**
     * can update ind setter
     */
    public set canUpdateInd(canUpdateInd: number) {
      this._canUpdateInd = canUpdateInd;
    }

    /**
     * can delete ind getter
     */
    public get canDeleteInd(): number {
      return this._canDeleteInd;
    }

    /**
     * can delete ind setter
     */
    public set canDeleteInd(canDeleteInd: number) {
      this._canDeleteInd = canDeleteInd;
    }
  }

  /**
   * 
   */
  export class MenuItem extends RMSBase implements RMSInterface.IMenuItem {

    private _routeNum: number;
    private _routeCode: string;
    private _routeName: string;
    private _routeUrl: string;
    private _moduleNodeInd: number;
    private _parentNodeInd: number;
    private _adjNodeInd: number;
    private _nodeIcon: string;
    private _nodeIconLabel: string;
    private _parentRouteNum: number;
    private _adjRouteNum: number;
    private _seqNum: number;
    private _childRoutes: RMSInterface.IMenuItem[];
    private _adjRoutes: string[];

    public constructor() {
      super();
    }

    /**
     * route num getter
     */
    public get routeNum(): number {
      return this._routeNum;
    }

    /**
     * route num setter
     */
    public set routeNum(routeNum: number) {
      this._routeNum = routeNum;
    }

    /**
     * route code getter
     */
    public get routeCode(): string {
      return this._routeCode;
    }

    /**
     * route code setter
     */
    public set routeCode(routeCode: string) {
      this._routeCode = routeCode;
    }

    /**
     * route name getter
     */
    public get routeName(): string {
      return this._routeName;
    }

    /**
     * route name setter
     */
    public set routeName(routeName: string) {
      this._routeName = routeName;
    }

    /**
     * route url getter
     */
    public get routeUrl(): string {
      return this._routeUrl;
    }

    /**
     * route url setter
     */
    public set routeUrl(routeUrl: string) {
      this._routeUrl = routeUrl;
    }

    /**
     * module node ind getter
     */
    public get moduleNodeInd(): number {
      return this._moduleNodeInd;
    }

    /**
     * module node ind setter
     */
    public set moduleNodeInd(moduleNodeInd: number) {
      this._moduleNodeInd = moduleNodeInd;
    }

    /**
     * parent node ind getter
     */
    public get parentNodeInd(): number {
      return this._parentNodeInd;
    }

    /**
     * parent node ind setter
     */
    public set parentNodeInd(parentNodeInd: number) {
      this._parentNodeInd = parentNodeInd;
    }

    /**
     * adj node ind getter
     */
    public get adjNodeInd(): number {
      return this._adjNodeInd;
    }

    /**
     * adj node ind setter
     */
    public set adjNodeInd(adjNodeInd: number) {
      this._adjNodeInd = adjNodeInd;
    }

    /**
     * node icon getter
     */
    public get nodeIcon(): string {
      return this._nodeIcon;
    }

    /**
     * node icon setter
     */
    public set nodeIcon(nodeIcon: string) {
      this._nodeIcon = nodeIcon;
    }

    /**
     * node icon label getter
     */
    public get nodeIconLabel(): string {
      return this._nodeIconLabel;
    }

    /**
     * node icon label setter
     */
    public set nodeIconLabel(nodeIconLabel: string) {
      this._nodeIconLabel = nodeIconLabel;
    }

    /**
     * parent route num getter
     */
    public get parentRouteNum(): number {
      return this._parentRouteNum;
    }

    /**
     * parent route num setter
     */
    public set parentRouteNum(parentRouteNum: number) {
      this._parentRouteNum = parentRouteNum;
    }

    /**
     * adj route num getter
     */
    public get adjRouteNum(): number {
      return this._adjRouteNum;
    }

    /**
     * adj route num setter
     */
    public set adjRouteNum(adjRouteNum: number) {
      this._adjRouteNum = adjRouteNum;
    }

    /**
     * seq num getter
     */
    public get seqNum(): number {
      return this._seqNum;
    }

    /**
     * seq num setter
     */
    public set seqNum(seqNum: number) {
      this._seqNum = seqNum;
    }

    /**
     * child routes getter
     */
    public get childRoutes(): RMSInterface.IMenuItem[] {
      return this._childRoutes;
    }

    /**
     * child routes setter
     */
    public set childRoutes(childRoutes: RMSInterface.IMenuItem[]) {
      this._childRoutes = childRoutes;
    }

    /**
     * adj routes getter
     */
    public get adjRoutes(): string[] {
      return this._adjRoutes;
    }

    /**
     * adj routes setter
     */
    public set adjRoutes(adjRoutes: string[]) {
      this._adjRoutes = adjRoutes;
    }
  }

  /**
   * Raw Document Class.
   */
  export class RawDocument extends RMSBase implements RMSInterface.IRawDocument {

    private readonly _body: Blob;
    private readonly _documentName: string;

    /**
     * RawDocument constructor
     * @param body 
     * @param documentName 
     */
    public constructor(body: Blob, documentName: string) {
      super();
      this._body = body;
      this._documentName = documentName;
    }

    /**
     * Document's body getter
     */
    public get body(): Blob {
      return this._body;
    }

    /**
     * DocumentName getter
     */
    public get documentName(): string {
      return this._documentName;
    }
  }

  /**
   * Security Selection Count
   */
// export class SecuritySelectCount extends RMSBase implements IdeaGeneratorInterface.ISecuritySelectCount{
//   private _securityId:string;

//   public constructor(data: SecuritySelectCount = {} as SecuritySelectCount) {
//     super();

//     let {
//       securityId="",
//     } = data

//     this._securityId=securityId;

  
//   }
//   public get securityId(): string {
//     return this._securityId; 
//   }
//   public set securityId(securityId: string) {
//     this._securityId = securityId;
//   }
   
// }

//   // export class AlertPassItem extends RMSBase implements AlertsInterface.IPassAlert{
//   //   private _alertId:number;
//   //   private _comments:string;
//   //   private _reason:string;
//   //   private _alertStatus:boolean;

//   //   public constructor(data: AlertPassItem = {} as AlertPassItem) {
//   //     super();

//   //     var today = new Date(); //Today's Date
//   //     let {
//   //         alertId = 0,
//   //         comments = "",
//   //         reason = "",
//   //         alertsStatus = true,
//   //     } = data

//   //     this._alertId = alertId;
//   //     this._comments = comments;
//   //     this._reason = reason;
//   //     this._alertStatus = alertsStatus;
//   //   }

//   //   public get alertId(): number {
//   //     return this._alertId;
//   //   }
//   //   public set alertId(alertId: number) {
//   //     this._alertId = alertId;
//   //   }

//   //   public get reason(): string {
//   //     return this._reason;
//   //   }
//   //   public set reason(reason: string) {
//   //     this._reason = reason;
//   //   }

//   //   public get alertStatus(): boolean{
//   //     return this._alertStatus;
//   //   }
//   //   public set alertStatus(alertStatus: boolean) {
//   //     this._alertStatus = alertStatus;
//   //   }

//   // }

//   /**
//    * 
//    */
//   export class PipelineDataItem extends RMSBase implements PipelineInterface.IPipelineData {

//     private _targetPrice: number;
//     private _currentPrice: number;
//     private _securityName: string;
//     private _securityDesc: string;
//     private _ticker: string;
//     private _remainingDays: number;
//     private _assigneeId: string;
//     private _createdUserId: string;
//     private _ideaDetailId: number;
//     private _ideaName: string;
//     private _ideaCategory: IdeaCategoryConstants;
//     private _securityId: string;
//     private _side: string;
//     private _expirationDt: Date;
//     private _assignedTo: string;
//     private _evernoteTags: string[];
//     private _comments: string;
//     private _createdBy: string;
//     private _createdTs: Date;
//     private _ideaStatus: string;

//     public constructor(data: PipelineDataItem = {} as PipelineDataItem) {
//       super();

//       var today = new Date(); //Today's Date
//       let {
//         targetPrice = 0,
//           currentPrice = 0,
//           securityName = "",
//           actions = "",
//           companyName = "",
//           securityDesc = "",
//           ticker = "",
//           remainingDays = 0,
//           assigneeId = "",
//           createdUserId = "",
//           ideaDetailId = -1,
//           ideaName = "",
//           ideaCategory = IdeaCategoryConstants.keyActive,
//           securityId = "",
//           side = "",
//           expirationDt = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30),
//           assignedTo = "",
//           evernoteTags = [],
//           comments = "",
//           createdBy = "Grant",
//           createdTs = new Date(),
//           ideaStatus = RMSEnum.IdeaStatus.Live
//       } = data

//       this._targetPrice = targetPrice;
//       this._currentPrice = currentPrice;
//       this._securityName = securityName;
//       this._actions = actions;
//       this._companyName = companyName;
//       this._securityDesc = securityDesc;
//       this._ticker = ticker;
//       this._remainingDays = remainingDays;
//       this._assigneeId = assigneeId;
//       this._createdUserId = createdUserId;
//       this._ideaDetailId = ideaDetailId;
//       this._ideaName = ideaName;
//       this._ideaCategory = ideaCategory;
//       this._securityId = securityId;
//       this._side = side;
//       this._expirationDt = expirationDt;
//       this._assignedTo = assignedTo;
//       this._evernoteTags = evernoteTags;
//       this._comments = comments;
//       this._createdBy = createdBy;
//       this._createdTs = createdTs;
//       this._ideaStatus = ideaStatus;
//     }

//     /**
//      * targetPrice getter setter
//      */
//     public get targetPrice(): number {
//       return this._targetPrice;
//     }
//     public set targetPrice(targetPrice: number) {
//       this._targetPrice = targetPrice;
//     }

//     /**
//      * currentPrice getter setter
//      */
//     public get currentPrice(): number {
//       return this._currentPrice;
//     }
//     public set currentPrice(currentPrice: number) {
//       this._currentPrice = currentPrice;
//     }


//     /**
//      * securityName getter setter
//      */
//     public get securityName(): string {
//       return this._securityName;
//     }
//     public set securityName(securityName: string) {
//       this._securityName = securityName;
//     }


//     /**
//      * actions getter setter
//      */
//     private _actions: string;
//     public get actions(): string {
//       return this._actions;
//     }
//     public set actions(actions: string) {
//       this._actions = actions;
//     }

//     /**
//      * companyName getter setter
//      */
//     private _companyName: string;
//     public get companyName(): string {
//       return this._companyName;
//     }
//     public set companyName(companyName: string) {
//       this._companyName = companyName;
//     }

//     /**
//      * securityDesc getter setter
//      */
//     public get securityDesc(): string {
//       return this._securityDesc;
//     }
//     public set securityDesc(securityDesc: string) {
//       this._securityDesc = securityDesc;
//     }

//     /**
//      * ticker getter setter
//      */
//     public get ticker(): string {
//       return this._ticker;
//     }
//     public set ticker(ticker: string) {
//       this._ticker = ticker;
//     }

//     /**
//      * remainingDays getter setter
//      */
//     public get remainingDays(): number {
//       return this._remainingDays;
//     }
//     public set remainingDays(remainingDays: number) {
//       this._remainingDays = remainingDays;
//     }

//     /**
//      * assigneeId getter setter
//      */
//     public get assigneeId(): string {
//       return this._assigneeId;
//     }
//     public set assigneeId(assigneeId: string) {
//       this._assigneeId = assigneeId;
//     }

//     /**
//      * createdUserId getter setter
//      */
//     public get createdUserId(): string {
//       return this._createdUserId;
//     }
//     public set createdUserId(v: string) {
//       this._createdUserId = v;
//     }

//     /**
//      * ideaDetailId getter setter
//      */
//     public get ideaDetailId(): number {
//       return this._ideaDetailId;
//     }
//     public set ideaDetailId(v: number) {
//       this._ideaDetailId = v;
//     }

//     /**
//      * ideaName getter setter
//      */
//     public get ideaName(): string {
//       return this._ideaName;
//     }
//     public set ideaName(v: string) {
//       this._ideaName = v;
//     }

//     /**
//      * ideaCategory getter setter
//      */
//     public get ideaCategory(): IdeaCategoryConstants {
//       return this._ideaCategory;
//     }
//     public set ideaCategory(v: IdeaCategoryConstants) {
//       this._ideaCategory = v;
//     }

//     /**
//      * securityId getter setter
//      */
//     public get securityId(): string {
//       return this._securityId;
//     }
//     public set securityId(securityId: string) {
//       this._securityId = securityId;
//     }

//     /**
//      * side getter setter
//      */
//     public get side(): string {
//       return this._side;
//     }
//     public set side(side: string) {
//       this._side = side;
//     }

//     /**
//      * expirationDt getter setter
//      */
//     public get expirationDt(): Date {
//       return this._expirationDt;
//     }
//     public set expirationDt(v: Date) {
//       this._expirationDt = v;
//     }

//     /**
//      * assignedTo getter setter
//      */
//     public get assignedTo(): string {
//       return this._assignedTo;
//     }
//     public set assignedTo(v: string) {
//       this._assignedTo = v;
//     }

//     /**
//      * evernoteTags getter setter
//      */
//     public get evernoteTags(): string[] {
//       return this._evernoteTags;
//     }
//     public set evernoteTags(v: string[]) {
//       this._evernoteTags = v;
//     }

//     /**
//      * comments getter setter
//      */
//     public get comments(): string {
//       return this._comments;
//     }
//     public set comments(v: string) {
//       this._comments = v;
//     }

//     /**
//      * createdBy getter setter
//      */
//     public get createdBy(): string {
//       return this._createdBy;
//     }
//     public set createdBy(v: string) {
//       this._createdBy = v;
//     }

//     /**
//      * createdTs getter setter
//      */
//     public get createdTs(): Date {
//       return this._createdTs;
//     }
//     public set createdTs(v: Date) {
//       this._createdTs = v;
//     }

//     /**
//      * ideaStatus getter setter
//      */
    
//     public get ideaStatus() : string {
//         return this._ideaStatus;
//     }
//     public set ideaStatus(ideaStatus : string) {
//         this._ideaStatus = ideaStatus;
//     }
    


//   }


}
