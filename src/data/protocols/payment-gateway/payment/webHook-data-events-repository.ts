export interface GetDataEventsRepository {
  paymentIntent: (event: any) => Promise<any>
}
