export interface Reservation {
    reservedperiod : string;
	idmember : string;
	licenseplate: string;
	requirements : string | null;
	idbill : string | null;
	fee : number | null;
	odometerstart : number | null;
	odometerend : number | null;
}