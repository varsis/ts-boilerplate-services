export class ResponseSpace {

  public response

  public set(res: any) {
    this.response = res
    this.code = res.status
    this.body = res.body
  }

  public code: number
  public body: any = {}
}
