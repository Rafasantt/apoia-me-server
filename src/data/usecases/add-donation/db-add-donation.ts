import type {
  AddDonation,
  AddDonationModel,
  AddDonationRepository,
  DonationModel,
  LoadAccountBySlugRepository
} from './bd-add-donation-protocols'

export class DbAddDonation implements AddDonation {
  constructor (
    private readonly loadAccountBySlugRepository: LoadAccountBySlugRepository,
    private readonly addDonationRepository: AddDonationRepository
  ) {}

  async add (donationData: AddDonationModel): Promise<DonationModel> {
    const account = await this.loadAccountBySlugRepository.loadBySlug(
      donationData.slug
    )

    if (account) {
      const applicationFeeAmount = Math.floor(donationData.price * 0.15)

      const newDonation = await this.addDonationRepository.add({
        ...donationData,
        creatorId: account.id,
        price: (donationData.price - applicationFeeAmount)
      })

      return newDonation
    }

    return null
  }
}
