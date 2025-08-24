export interface UpdateDonationRepository {
  update: (donationData: { donationId: string, donationStatus: string }) => Promise<any>
}
