import { RMSEnum } from "../enums/rms.enums";
import { IdeaCategoryConstants } from "../constants/rms.constants";

/**
 * Portal Interface module
 */
export namespace RMSInterface {

  /**
   * Portal route interface
   */
  export interface IRoute {
    routeNum: number;
    routeCode: string;
    routeName: string;
    routeUrl: string;
    moduleNodeInd: number;
    parentNodeInd: number;
    adjNodeInd: number;
    nodeIcon: string;
    nodeIconLabel: string;
    parentRouteNum: number;
    adjRouteNum: number;
    seqNum: number;
  }

  /**
   * Portal menu item interface
   */
  export interface IMenuItem extends IRoute, IRMSBase {
    childRoutes: IMenuItem[];
    adjRoutes: string[];
    isActive?: boolean;
    isItemExpanded?: boolean;
  }

  /**
   * Base Interface
   */
  export interface IRMSBase {
    toJSON(): string;
  }

  /**
   * Raw Document Interface
   */
  export interface IRawDocument extends IRMSBase {
    documentName: string;
    body: Blob;
  }

  /**
   * Document interface
   */
  export interface IDocument extends IRawDocument, IRMSBase, IAuditable {
    documentNum: number;
    documentGuid: string;
    documentTitle: string;
    documentPath: string;
    documentDate: Date;
    documentSource: IDocumentSource;
    modifiedMetadata: boolean;
    modifiedDocument: boolean;

    // View manupulation properties
    uploadQueueNum?: number;
    file?: File;
    isBlobConversionActive?: boolean;
    disSize?: string;
    formStatus?: RMSEnum.DocumentFormStatus;
    isFormInEditMode?: boolean;
    docFormStepperNum?: number;
    uploadProgress?: any;
    uploadStatus?: RMSEnum.DocumentUploadStatus;
  }

  /**
   * Document source interface for mapping uploaded
   * document with its entity
   */
  export interface IDocumentSource extends IAuditable {
    documentSourceNum: RMSEnum.DocumentSourceNum;
    documentSourceEntityNum: number;
    documentSourceEntityName: string;
    documentTypeNum: number;
    documentTypeCd: string;
    documentNum: number;
    modified: boolean;
  }

   /**
   * Route Permisssion interface
   */
  export interface IRoutePermission extends IPermissionInd, IRMSBase {
    routeNum: number;
    routeUrl: string;
    routeName: string;
  }


  /**
   * Auditable Interface.
   */
  export interface IAuditable extends IRMSBase {
    statusInd: number;
    lockNum: number;
    createdBy: string;
    createdDate: Date;
    lastModifiedBy: string;
    lastModifiedDate: Date;
  }

  /**
   * Header Type Interface.
   */
  export interface IHeaderType {
    Authorization: string;
    ContentDisposition: string;
    ContentType: string;
  }

  /**
   * Header Content Type Interface.
   */
  export interface IHeaderContentType {
    ApplicationJson: string;
    ApplicationPdf: string;
  }

   /**
   * Permission indicator interface
   */
  export interface IPermissionInd {
    canReadInd: number;
    canCreateInd: number;
    canUpdateInd: number;
    canDeleteInd: number;
  }

  
  /**
   * Idea detail object mapped same as rms.idea_detail table
   */
  export interface IIdeaDetail extends IRMSBase {
    ideaDetailId: number;
    ideaName: string;
    ideaCategory: IdeaCategoryConstants;
    securityId: string;
    side: string;
    expirationDt: Date;
    assignedTo: string;
    evernoteTags: string[];
    comments: string;
    createdBy: string;
    createdTs: Date;
    ideaStatus: string;
  }

  
  /**
   * Idea detail object mapped same as rms.idea_detail table
   */
  export interface ISecurityDetails extends IRMSBase {
    securityId: number;
    companyName: string;
    securityDesc: string;
    ticker: string;
    exchangeTicker: string;
    cusip: string;
    sedol: string;
    isin: string;
    exchCode: string;
    domicile: string;
    securityStatus: string;
    price: number;
    marketCap:number;
    volume:number;
    priceChange:number;
    tev:number;

    createdOn:string;
    createdBy:string;
    modifiedOn:string;
    modifiedBy:string;
    searchString:string;
    fCode:string;
    cikCode:string;
    reportDate:string;
  }

}

