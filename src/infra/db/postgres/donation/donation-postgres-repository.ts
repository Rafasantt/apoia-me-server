import { AppDataSource } from '../data-source/data-source'
import type { AddDonationRepository } from '@/data/protocols/db/account/add-donation-repository'
import type { AddDonationModel } from '@/domain/usecases/add-donation'
import type { DonationModel } from '@/domain/models/donation'

export class DonationPostgresRepository
implements
    AddDonationRepository {
  async add (donationData: AddDonationModel): Promise<DonationModel> {
    const donationRepository = AppDataSource.getRepository('donations')
    const donationToBeInserted = donationRepository.create(donationData)
    const result = await donationRepository.save(donationToBeInserted)
    const account = Object.assign({}, donationData, { id: result.id })
    return account
  }
}
