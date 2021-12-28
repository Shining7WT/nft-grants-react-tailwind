import { fork } from "redux-saga/effects";
import watchMilestoneSaga from './MilestoneSaga';
import watchGrantSaga from './GrantSaga';
import watchRecipientSaga from './RecipientSaga';
import watchUserNoteSaga from './UserNoteSaga';
import watchGrantCommentsSaga from './GrantCommentsSaga';
import watchReportSaga from './ReportSaga';

export default function* startForman(context = {}) {
  yield fork(watchMilestoneSaga, context);
  yield fork(watchGrantSaga, context);
  yield fork(watchRecipientSaga, context);
  yield fork(watchUserNoteSaga, context);
  yield fork(watchGrantCommentsSaga, context);
  yield fork(watchReportSaga, context);
}
