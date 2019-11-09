import React, { Component } from 'react'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  // componentDidMount() {
  //   let users = Object.values(this.props.data.users).reduce((obj, u) => {
  //     obj[u.name] = u
  //     return obj
  //   }, {})
  //
  //   let chosen = this.randomise()
  //   // console.log('hello', users, chosen)
  //   let chosen2 = {}
  //   // console.log(chosen)
  //   // console.log(users)
  //   for (var name in chosen) {
  //     if (users[name].number && users[chosen[name]].number) {
  //       chosen2[users[name].number] = users[chosen[name]].number
  //     } else {
  //       console.log(users[name].number, users[chosen[name]].number)
  //     }
  //   }
  //
  //   this.props.database
  //     .ref()
  //     .child('christmas/pairs')
  //     .set(chosen2)
  // }

  randomise() {
    const list = [
      'jonathan',
      'max',
      'rae',
      'linus',
      'cara',
      'nicholas',
      'nicole',
      'marc',
      'madeleine',
      'kellyn',
      'ian',
      'bryan',
      'ines'
    ]
    let pickers, options, chosen
    let avoid = {
      jonathan: ['max', 'rae', 'linus', 'cara'],
      max: ['jonathan', 'rae', 'linus'],
      rae: ['jonathan', 'max', 'linus'],
      linus: ['jonathan', 'max', 'rae'],
      cara: ['jonathan'],
      nicholas: [],
      nicole: ['marc', 'madeleine'],
      madeleine: ['nicole'],
      marc: ['nicole', 'kellyn'],
      kellyn: ['marc'],
      ian: ['bryan', 'ines'],
      bryan: ['ian'],
      ines: ['ian']
    }

    function initialise() {
      pickers = list.slice()
      options = list.slice()
      chosen = list.slice().reduce((obj, p) => {
        obj[p] = null
        return obj
      }, {})
    }

    function randomiseSantas() {
      while (pickers.length > 0) {
        // rerun if you can only pick yourself
        if (
          pickers.length === 1 &&
          options.length === 1 &&
          pickers[0] === options[0]
        ) {
          initialise()
          randomiseSantas()
          return
        }
        let currentSanta = pickers[Math.floor(Math.random() * pickers.length)]
        let canChoose = options
          .slice()
          .filter(p => p !== currentSanta && !avoid[currentSanta].includes(p))
        if (!canChoose.length) {
          initialise()
          randomiseSantas()
          return
        }
        let picked = canChoose[Math.floor(Math.random() * canChoose.length)]
        chosen[currentSanta] = picked
        pickers = pickers.filter(p => p !== currentSanta)
        options = options.filter(p => p !== picked)
      }
    }

    initialise()
    randomiseSantas()
    return chosen
  }

  render() {
    const { data, number } = this.props
    return (
      <div
        style={{
          background: `url(https://images.unsplash.com/photo-1512245570055-6b5febf5af6f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=258ef1195bca0ac4369e87f3b34a794a&auto=format&fit=crop&w=800&q=60) no-repeat center center fixed`,
          width: '100vw',
          height: '100vh',
          backgroundSize: 'cover'
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            padding: 24,
            fontSize: '3em',
            color: 'darkGreen'
          }}
        >
          Secret Santa
        </h1>

        <h1 style={{ textAlign: 'center' }}>
          Hi{' '}
          {data.users[number].name[0]
            .toUpperCase()
            .concat(data.users[number].name.slice(1))}
          !
        </h1>
        <h1 style={{ textAlign: 'center' }}> You got ...</h1>
        <h1
          style={{
            textAlign: 'center',
            height: '80px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {this.state.show && (
            <span style={{ color: 'blue' }}>
              {data.users[data.pairs[number]].name[0]
                .toUpperCase()
                .concat(data.users[data.pairs[number]].name.slice(1))}
            </span>
          )}
        </h1>

        <div
          onClick={() => this.setState({ show: !this.state.show })}
          style={{
            margin: '0 auto',
            width: '80px',
            padding: '12px',
            borderRadius: '12px',
            cursor: 'pointer',
            backgroundColor: 'red',
            textAlign: 'center'
          }}
        >
          <b style={{ color: 'white' }}>{this.state.show ? 'Hide' : 'Show'}</b>
        </div>

        {this.state.show && (
          <p style={{ textAlign: 'center', marginTop: '24px' }}>
            <strong>
              Remember to get gift(s) worth between $100 and $120.
            </strong>
          </p>
        )}
      </div>
    )
  }
}

export default Index
