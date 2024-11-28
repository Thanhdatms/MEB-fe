export enum Actions {
  GET_REPORT = '[REPORT] Get blog report',
  CREATE_REPORT = '[REPORT] Create blog report',
}
export namespace ReportAction {
  export class GetReport {
    static type = Actions.GET_REPORT;
    constructor() {}
  }
  export class CreateReport {
    static type = Actions.CREATE_REPORT;
    constructor(
      public blogId: any,
      public reportForm: any,
    ) {}
  }
}
