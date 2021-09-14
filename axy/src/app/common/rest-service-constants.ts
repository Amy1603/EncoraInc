import { Constants } from "./constants";

export class RestServiceConstants{
    // login module urls
    public static loginUrl = Constants.RESTPath + 'users';
    // dashboard module urls
    public static getCompaniesUrl = Constants.RESTPath + 'companies';
    // contacts module urls
    public static getContactsDataUrl = Constants.RESTPath + 'contacts';
}