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

  async add (accountData: AddDonationModel): Promise<DonationModel> {
    await this.loadAccountBySlugRepository.loadBySlug(accountData.slug)
    console.log('Account found with slug:', accountData.slug)
    const newDonation = await this.addDonationRepository.add(accountData)
    return newDonation
  }
}
