import { RMSInterface } from '../interfaces/rms.interfaces';


/**
 * API request header type config
 */
export const HeaderType: RMSInterface.IHeaderType = {
    Authorization: "Authorization",
    ContentDisposition: "Content-Disposition",
    ContentType: "Content-Type"
}

/**
 * API request header content type config
 */
export const HeaderContentType: RMSInterface.IHeaderContentType = {
    ApplicationJson: "application/json",
    ApplicationPdf: "application/pdf"
}

