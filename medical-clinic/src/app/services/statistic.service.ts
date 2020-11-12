import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StatisticTypes } from '../enums/statistic-types.enum';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private afs: AngularFirestore) {}

  logLogInStatistic({ statistic }) {
    return this.afs.collection(`${StatisticTypes.LOGIN_STAT}-statistics`).add({ ...statistic });
  }

  getLoginStatistics({ userId }) {
    const gameRef = this.afs.collection<any>(`${StatisticTypes.LOGIN_STAT}-statistics`, (ref) =>
      ref.where('uid', '==', userId)
    );
    return gameRef.valueChanges();
  }
  logOperationStatistic({ operation }) {
    return this.afs.collection(`${StatisticTypes.OPERATION_STAT}-statistics`).add({ ...operation });
  }
  getOperationStatistics({ userId }) {
    const gameRef = this.afs.collection<any>(`${StatisticTypes.OPERATION_STAT}-statistics`, (ref) =>
      ref.where('uid', '==', userId)
    );
    return gameRef.valueChanges();
  }
}
