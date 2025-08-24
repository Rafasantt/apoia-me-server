import type { UpdateDonationModel } from '@/domain/models/updateDonation'

export interface UpdateDonationRepository {
  update: (updateData: UpdateDonationModel) => Promise<any>
}
