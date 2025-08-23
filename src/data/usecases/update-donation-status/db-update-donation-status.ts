import type {
  GetDataEventsRepository,
  UpdateDonationStatus
} from './db-update-donation-status-protocols'

export class DbAUpdateDonationStatus implements UpdateDonationStatus {
  constructor (
    private readonly getDataEventsRepository: GetDataEventsRepository
  ) {}

  async update (data: any | any): Promise<any> {
    const paymentIntent = await this.getDataEventsRepository.paymentIntent(data)
    console.log(paymentIntent.metadata?.donationId)

    switch (data.type) {
      case 'checkout.session.completed':
        console.log('Pagamento recebido com sucesso!')
    }
  }
}
