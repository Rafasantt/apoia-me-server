export interface WebHookEventsRepository {
  event: (data: any) => Promise<any>
}
