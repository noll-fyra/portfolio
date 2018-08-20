import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MotW from './MotW'
import Table from './Table'
import styled from 'styled-components'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 'matches'
    }
  }
  render() {
    const { data, database, number } = this.props
    const users = data.users
    const motw = data.motw
    const teams = data.teams
    return (
      <main>
        <h2
          style={{
            textAlign: 'center',
            // borderBottom: '1px solid purple',
            padding: '12px'
          }}>
          Fantasy Premier League
        </h2>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // borderBottom: '1px solid purple',
            backgroundColor: 'purple'
          }}>
          {['matches', 'table'].map(tab => (
            <div
              key={tab}
              style={{
                padding: '12px',
                width: '50%',
                maxWidth: '200px',
                cursor: 'pointer',
                backgroundColor: this.state.active === tab ? 'gold' : '',
                textAlign: 'center'
              }}
              onClick={() => this.setState({ active: tab })}>
              <b
                style={{
                  color: this.state.active === tab ? '' : 'white'
                }}>
                {tab[0].toUpperCase().concat(tab.slice(1))}
              </b>
            </div>
          ))}
        </div>

        {this.state.active === 'matches' && (
          <Container>
            <MotW
              motw={motw}
              users={users}
              teams={teams}
              database={database}
              number={number}
            />
          </Container>
        )}

        {this.state.active === 'table' && (
          <Container>
            <Table motw={motw} users={users} teams={teams} />
          </Container>
        )}
      </main>
    )
  }
}

Index.propTypes = {
  data: PropTypes.object.isRequired,
  database: PropTypes.object.isRequired,
  number: PropTypes.string.isRequired
}

export default Index

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`
