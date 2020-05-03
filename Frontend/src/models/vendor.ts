export class Vendor {
    vendorId: string;
    storeName : string;
    fname: string;
    lname: string;
    address: [{
        careOf: string;
        doorNo: string;
        addressLine1: string;
        city: string;
        district: string;
        pincode: string;
        country: string;
    }];
    contact: [{
        whatsApp: number;
        mobile: number;
    }];
    createdBy: string;
    deliveryWindow:string;
    pickupWindow: string;
}
