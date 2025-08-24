import type {
  GetDataEventsRepository,
  UpdateDonationRepository,
  UpdateDonationStatus
} from './db-update-donation-status-protocols'

export class DbAUpdateDonationStatus implements UpdateDonationStatus {
  constructor (
    private readonly getDataEventsRepository: GetDataEventsRepository,
    private readonly updateDonationRepository: UpdateDonationRepository
  ) {}

  async update (data: any | any): Promise<any> {
    const paymentIntent = await this.getDataEventsRepository.paymentIntent(data)

    switch (data.type) {
      case 'checkout.session.completed':
        await this.updateDonationRepository.update({
          donationId: paymentIntent.metadata?.donationId,
          donationStatus: 'paid'
        })
    }
  }
}
