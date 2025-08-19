import type {
  GetDataEventsRepository,
  UpdateDonationStatus,
  WebHookEventsRepository
} from './db-update-donation-status-protocols'

export class DbAUpdateDonationStatus implements UpdateDonationStatus {
  constructor (
    private readonly webHookEventsRepository: WebHookEventsRepository,
    private readonly getDataEventsRepository: GetDataEventsRepository
  ) {}

  async update (data: any | any): Promise<any> {
    const event = await this.webHookEventsRepository.event(data)

    const paymentIntent = await this.getDataEventsRepository.paymentIntent(event)
    console.log(paymentIntent)

    switch (event.type) {
      case 'checkout.session.completed':
    }
  }
}
