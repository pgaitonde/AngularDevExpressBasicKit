/**
 * Portal Enumeration module
 */
export module RMSEnum {

    /**
     * Enumeration for full screen requests made through broadcasts.
     */
    export enum FullScreenMode {
      None,
      WithTitle,
      WithoutTitle
    }
  
      /**
     * Document type enum.
     * Note: This describes all the supported serialization options for a document.
     */
    export enum DocumentType {
      Stream,
      ByteArray,
      Text
    }
  
    /**
     * Document upload form status
     */
    export enum DocumentFormStatus {
      Incomplete = -1,
        Edit,
        Complete
    }
  
    /**
     * Document upload status
     */
    export enum DocumentUploadStatus {
      Error = -1,
        None,
        Indeterminate,
        Buffer,
        Determinate,
        Complete
    }
  
    
    /**
     * Document source num enum
     */
    export enum DocumentSourceNum {
  
    }

    /**
     * Long Short 
     */
    export enum Side {
      LONG,
      SHORT
    }
  
    /**
     * Idea Categories
     */
    export enum IdeaCategory {
      Active,
      Watchlist,
      Historical
    }

    
    /**
     * Idea Status
     */
    export enum IdeaStatus {
      InPortfolio="IN_PORTFOLIO",
      Deleted="DELETED",
      Live="LIVE"
    }
  }
  