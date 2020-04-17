import { LightningElement, api } from 'lwc'

export default class DatetimeItem extends LightningElement {
  @api epochTime
  @api dtfOptions

  get dateObject () { return this.epochTime ? new Date(this.epochTime) : '' }
  get intlDateTimeFormatted () { return this.epochTime ? this.formatEpoch(this.epochTime) : '' }

  formatEpoch (et) {
    return new Intl.DateTimeFormat(...this.dtfOptions).format(new Date(et))
  }
}