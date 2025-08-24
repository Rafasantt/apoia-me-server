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

    const updateData = {
      id: paymentIntent.metadata?.donationId,
      status: 'paid'
    }

    switch (data.type) {
      case 'checkout.session.completed':
        await this.updateDonationRepository.update(updateData)
        break
    }
  }
}
