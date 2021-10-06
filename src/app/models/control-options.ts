export class ReadingControlOptions {
  unreadOnly = false;
  constructor(opt: Partial<ReadingControlOptions>) {
    Object.assign(this, opt)
  }
  autoOpenInViewer = true
  allowGoingBack = false
  markCurrentReadWhenNext = true

}
