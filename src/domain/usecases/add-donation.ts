import type { DonationModel } from '@/domain/models/donation'

export interface AddDonationModel {
  name: string
  message: string
  creatorId: string
  slug: string
  price: string
}

export interface AddDonation {
  add: (account: AddDonationModel | any) => Promise<DonationModel>
}
