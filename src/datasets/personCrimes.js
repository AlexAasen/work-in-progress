const personCrimes = [
  {
    id: 'Threat',
    measurements: [
      {
        date: new Date(Date.UTC(2013, 0, 1)),
        value: 10
      },
      {
        date: new Date(Date.UTC(2014, 0, 1)),
        value: 15
      },
      {
        date: new Date(Date.UTC(2015, 0, 1)),
        value: 25
      },
      {
        date: new Date(Date.UTC(2016, 0, 1)),
        value: 20
      },
      {
        date: new Date(Date.UTC(2017, 0, 1)),
        value: 20
      }
    ]
  },
  {
    id: 'Harrassment',
    measurements: [
      {
        date: new Date(Date.UTC(2013, 0, 1)),
        value: 35
      },
      {
        date: new Date(Date.UTC(2014, 0, 1)),
        value: 40
      },
      {
        date: new Date(Date.UTC(2015, 0, 1)),
        value: 35
      },
      {
        date: new Date(Date.UTC(2016, 0, 1)),
        value: 25
      },
      {
        date: new Date(Date.UTC(2017, 0, 1)),
        value: 35
      }
    ]
  },
  {
    id: 'Fraud',
    measurements: [
      {
        date: new Date(Date.UTC(2013, 0, 1)),
        value: 30
      },
      {
        date: new Date(Date.UTC(2014, 0, 1)),
        value: 20
      },
      {
        date: new Date(Date.UTC(2015, 0, 1)),
        value: 10
      },
      {
        date: new Date(Date.UTC(2016, 0, 1)),
        value: 10
      },
      {
        date: new Date(Date.UTC(2017, 0, 1)),
        value: 5
      }
    ]
  },
  {
    id: 'Sexual assault',
    measurements: [
      {
        date: new Date(Date.UTC(2013, 0, 1)),
        value: 25
      },
      {
        date: new Date(Date.UTC(2014, 0, 1)),
        value: 25
      },
      {
        date: new Date(Date.UTC(2015, 0, 1)),
        value: 30
      },
      {
        date: new Date(Date.UTC(2016, 0, 1)),
        value: 45
      },
      {
        date: new Date(Date.UTC(2017, 0, 1)),
        value: 40
      }
    ]
  }
]

module.exports = {
  personCrimes
}
