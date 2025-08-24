import { AppDataSource } from '../data-source/data-source'
import type { AddDonationRepository } from '@/data/protocols/db/account/add-donation-repository'
import type { AddDonationModel } from '@/domain/usecases/add-donation'
import type { DonationModel } from '@/domain/models/donation'
import type { UpdateDonationRepository } from '@/data/usecases/update-donation-status/db-update-donation-status-protocols'
import type { UpdateDonationModel } from '@/domain/models/updateDonation'

export class DonationPostgresRepository
implements
    AddDonationRepository,
    UpdateDonationRepository {
  async add (donationData: AddDonationModel): Promise<DonationModel> {
    const donationRepository = AppDataSource.getRepository('donations')
    const donationToBeInserted = donationRepository.create(donationData)
    const result = await donationRepository.save(donationToBeInserted)
    const account = Object.assign({}, donationData, { id: result.id })
    return account
  }

  async update (updateData: UpdateDonationModel): Promise<any> {
    const donationRepository = AppDataSource.getRepository('donations')
    await donationRepository.update(updateData.id, { status: updateData.status })
  }
}
