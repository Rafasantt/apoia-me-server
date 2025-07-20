import type { DonationModel } from '@/domain/models/donation'

export interface AddDonationModel {
  name: string
  message: string
  creatorId: string
  slug: string
  price: number
}

export interface AddDonation {
  add: (donationData: AddDonationModel | any) => Promise<DonationModel>
}
