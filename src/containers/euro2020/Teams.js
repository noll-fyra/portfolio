import React, { Component } from 'react'
import PropTypes from 'prop-types'
import constants from './data/constants'
import teams from './data/teams'
import TeamCard from './teams/TeamCard'

function sortAlphabetically(first, second) {
    switch(true) {
      case first > second:
        return 1
      case first < second:
        return -1
      default:
        return -1
    }
  }

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: null,
      eliminated: 'active'
    }
    this.chooseOption = this.chooseOption.bind(this)
  }

  chooseOption(option) {
    let { database, number } = this.props
    let hasStarted = new Date(constants.startDate) < Date.now()
    if (hasStarted) return

    let prediction = {}
    prediction[number] = option

    database
      .ref(constants.countryURLPath)
      .update(prediction)
  }

  render() {
    let { countries, number } = this.props
    let options = Object.values(teams).sort((a, b) => sortAlphabetically(a.name, b.name))
    let selected = !!number && !!countries && countries[number] ? countries[number] : null
    let countryCount = Object.values(countries).reduce((obj, prediction) => {
      let newObj = Object.assign(obj)
      newObj[prediction] = obj[prediction] ? obj[prediction] + 1 : 1
      return newObj
    } ,{})

    return (
      <div style={{width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto', padding: '12px'}}>
        <p style={{width: '100%', padding: '24px', backgroundColor: constants.colors.cream, borderRadius: '12px', marginBottom: '24px'}}>
          <b>Pick the team that will win Euro 2020</b>
        </p>

      {options.map(country =>
        <button key={country.name} type='button' onClick={() => this.chooseOption(country.name)} style={{width: '100%'}}>
          <TeamCard country={country} isSelected={country.name === selected} count={countryCount[country.name] || 0} />
        </button>
        )}

      </div>
    )
  }
}

Teams.propTypes = {
  countries: PropTypes.PropTypes.object.isRequired,
  number: PropTypes.string.isRequired,
  database: PropTypes.object.isRequired
}

export default Teams
