import type {
  AddDonation,
  AddDonationModel,
  AddDonationRepository,
  CreateCheckoutSessionRepository,
  DonationModel,
  LoadAccountBySlugRepository
} from './bd-add-donation-protocols'

export class DbAddDonation implements AddDonation {
  constructor (
    private readonly loadAccountBySlugRepository: LoadAccountBySlugRepository,
    private readonly addDonationRepository: AddDonationRepository,
    private readonly createCheckoutSessionRepository: CreateCheckoutSessionRepository
  ) {}

  async add (donationData: AddDonationModel): Promise<DonationModel> {
    const account = await this.loadAccountBySlugRepository.loadBySlug(
      donationData.slug
    )

    if (account) {
      const convertedPrice = donationData.price * 100

      const applicationFeeAmount = Math.floor(convertedPrice * 0.15)

      const newDonation = await this.addDonationRepository.add({
        ...donationData,
        creatorId: account.id,
        price: (convertedPrice - applicationFeeAmount)
      })

      if (newDonation) {
        const checkoutSession = await this.createCheckoutSessionRepository.checkout({
          name: account.name,
          price: convertedPrice,
          applicationFeeAmount,
          connectedStripeAccountId: account.connectedStripeAccountId,
          donationId: newDonation.id
        })
        return checkoutSession
      }
    }

    return null
  }
}
