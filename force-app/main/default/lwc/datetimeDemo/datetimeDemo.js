import { LightningElement, track } from 'lwc'
// import { getEpochTime, echoDateTime } from '@salesforce/apex/DateTimeAuraService'
import getEpochTimes from '@salesforce/apex/DateTimeAuraService.getEpochTimes'
import getEpochTime from '@salesforce/apex/DateTimeAuraService.getEpochTime'
import echoDateTime from '@salesforce/apex/DateTimeAuraService.echoDateTime'


export default class DatetimeDemo extends LightningElement {
  @track times
  @track epochTime
  @track dt
  @track sortAsc = true
  @track dtfOptions = [
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    }
  ]

  onClickSort () {
    const asc = (a, b) => a - b
    const desc = (a, b) => b - a

    this.sortAsc
      ? this.times.sort(asc)
      : this.times.sort(desc)

    this.sortAsc = !this.sortAsc
  }

  get formattedDatetime () {
    if (this.epochTime) {
      return new Intl.DateTimeFormat(...this.dtfOptions).format(new Date(this.epochTime))
    }
    return ''
  }

  connectedCallback () {
    this.fetchEpochTimes()

    this.fetchEpochTime()
      .then(() => {
        this.echoEpoch()
      })
  }

  fetchEpochTimes () {
    return getEpochTimes()
      .then(data => {
        this.times = data
        console.log('epochTimes', data)
      })
      .catch(error => {
        console.error('error fetching times', error)
      })
  }

  fetchEpochTime () {
    return getEpochTime()
      .then(epochTime => {
        this.epochTime = epochTime
        this.dt = new Date(epochTime)

        console.log('epochtime', this.epochTime)
        console.log('date', this.dt)
      })
      .catch(error => {
        console.error('error fetching epoctime', error)
      })
  }

  echoEpoch () {
    return echoDateTime({ epochTime: this.epochTime })
      .then(dateTimeString => {
        console.log('epochTime', this.epochTime)
        console.log('datetime string', dateTimeString)
      })
      .catch(error => {
        console.error('error during echo', error)
      })
  }
}