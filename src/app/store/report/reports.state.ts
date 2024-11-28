import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { ApiService } from '../../service/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ReportAction } from './reports.action';
import { tap } from 'rxjs';

export interface reportStateModel {
  reports: any[];
  status: boolean;
}

@State<reportStateModel>({
  name: 'Reports',
  defaults: {
    reports: [],
    status: false,
  },
})
@Injectable()
export class ReportState {
  constructor(
    private apiService: ApiService,
    // private store: Store,
    private message: NzMessageService,
  ) {}

  @Selector()
  static reports({ reports }: reportStateModel): any[] {
    return reports;
  }
  @Selector()
  static status({ status }: reportStateModel): boolean {
    return status;
  }
  @Action(ReportAction.GetReport)
  getReport(
    ctx: StateContext<reportStateModel>,
    action: ReportAction.GetReport,
  ) {
    this.apiService.reports
      .getReport(0, 10)
      .pipe(
        tap((response: any) => {
          ctx.patchState({ reports: response.result });
        }),
      )
      .subscribe();
  }
  @Action(ReportAction.CreateReport)
  createReport(
    ctx: StateContext<reportStateModel>,
    action: ReportAction.CreateReport,
  ) {
    this.apiService.reports
      .createReport(action.blogId, action.reportForm)
      .pipe(
        tap((response) => {
          if (response.code !== 200) {
            return this.message.error(response.error);
          }
          this.message.success('Report submitted');
          return ctx.patchState({ reports: response.result, status: true });
        }),
      )
      .subscribe();
  }
}
