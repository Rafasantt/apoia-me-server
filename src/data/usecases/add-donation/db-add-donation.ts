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
      const newDonation = await this.addDonationRepository.add(
        Object.assign({}, donationData, { creatorId: account.id })
      )
      return newDonation
    }

    return null
  }
}
