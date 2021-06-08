import React, { Component } from "react";
import PropTypes from "prop-types";
import GameRules from './table/GameRules'
import PlayerCard from './table/PlayerCard'
import players from './data/players'
import stages from './data/stages'

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null
    };
    this.calculateTable = this.calculateTable.bind(this)
  }

  calculateTable() {
    let { matches } = this.props
    if (!matches) return []

    let position = 0
    let points = -1

    let playersWithPredictions = players
      // add predictions
      .map(player => ({
        ...player,
        predictions: Object.values(matches)
          .filter(match => !!match.result)
          .sort((a, b) => a.number - b.number)
          .map(match => ({
            match,
            prediction: !!match.predictions && match.predictions[player.number] ?  match.predictions[player.number] : null,
            points: !!match.predictions && !!match.predictions[player.number] && match.predictions[player.number] === match.result ? Object.values(stages).filter(stage => stage.name === match.stage)[0].points : 0
          }))
        }))
      // add total score
      .map(player => ({
        ...player,
        score: player.predictions.reduce((acc, match) => acc + match.points, 0)
      }))
      // sort for position
      .sort((a, b) => this.sortAlphabetically(a.name, b.name))
      .sort((a, b) => b.score - a.score)
      // add position
      .map((player, index) => {
        if (points !== player.score) {
          position = index + 1;
        }
        points = player.score;
        return {
          ...player,
          position
        }
      })

    return playersWithPredictions
  }


  sortAlphabetically(first, second) {
    switch (true) {
      case first > second:
        return 1;
      case first < second:
        return -1;
      default:
        return 0;
    }
  }

  render() {
    const table = this.calculateTable();

    return (
      <main>
        <div style={{width: '100%', maxWidth: '600px', margin: '0 auto'}}>
          {table.map(player =>
            <PlayerCard key={player.number} player={player} />
          )}
        </div>

        <GameRules />
      </main>
    );
  }
}

Table.propTypes = {
  polls: PropTypes.object,
  users: PropTypes.object,
  teams: PropTypes.arrayOf(PropTypes.object),
  number: PropTypes.string
};

export default Table;
