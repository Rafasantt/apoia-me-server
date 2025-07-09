import type {
  AddDonation,
  AddDonationModel,
  AddDonationRepository,
  DonationModel
} from './bd-add-donation-protocols'

export class DbAddDonation implements AddDonation {
  constructor (
    private readonly addDonationRepository: AddDonationRepository
  ) {}

  async add (accountData: AddDonationModel): Promise<DonationModel> {
    const newDonation = await this.addDonationRepository.add(accountData)
    return newDonation
  }
}
