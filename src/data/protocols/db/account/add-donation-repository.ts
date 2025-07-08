import type { AddDonationModel } from '@/domain/usecases/add-donation'
import type { DonationModel } from '@/domain/models/donation'

export interface AddDonationRepository {
  add: (donationData: AddDonationModel) => Promise<DonationModel>
}
