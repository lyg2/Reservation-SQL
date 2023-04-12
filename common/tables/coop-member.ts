import { Share } from "../other/share";

export interface CoopMember {
    idmember: string;
    idbankaccount: string;
    membername: string;
    preferredparking: string;
    memberpassword: string;
    licenseno: string;
    entitytype: string;
    birthdate: string;
    lastaccidentdate: string;
    mailingaddress: string;
    email: string;
    annualmembership : number|null;
    shares: Share [];
}