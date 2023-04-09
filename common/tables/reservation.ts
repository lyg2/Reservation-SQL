export interface Reservation {
    reservedperiod : string,
	idmember : string,
	licenseplate: string,
	requirements : string|null,
	idbill : string,
	fee : number,
	odometerstart : number,
	odometerend : number|null,
}