import { environment as env } from '../../environments/environment';

export class Constants{
    public static RESTPath = 'bokadedarvin/AngularDeveloperSample/';
    // header module labels
    public static headerConstants = {
        logout:"Logout"
    };
    // login module labels
    public static loginConstants = {
        errorMsg:"Please provide valid login credentials.",
        loginTitle:"Log In to AXY",
        emailIsRequired:"Email is invalid.",
        pwdIsRequired:"Password is required.",
        loginBtn:"Log In"
    };
    // dashboard module labels
    public static dashboardConstants = {
        title:"Company Details",
        contactBtn:"Contacts Details"
    };
    // contacts module labels
    public static contactsConstants = {
        title:"Company's Contacts Details",
        add:"ADD",
        edit:"Edit",
        delete:"Delete",
        noRecords:"No contacts found...",
        modalTitle:"Contact Details",
        name:"Name",
        country:"Country",
        phone:"Contact No",
        errorMsg:"Please fill all the values to add a contact."
    };

}