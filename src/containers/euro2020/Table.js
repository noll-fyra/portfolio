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
    this.calculateTable = this.calculateTable.bind(this);
    this.calculateTable2 = this.calculateTable2.bind(this);
  }

  calculateTable() {
    const { polls, users } = this.props;
    if (!polls || !users) {
      return [];
    }
    for (var u in users) {
      users[u].points = 0;
    }

    Object.values(polls)
      .filter(poll => poll.finishedResult !== null)
      .forEach(poll => {
        for (var p in poll.users) {
          // console.log(p);
          if (
            poll.users[p].answered &&
            poll.users[p].answer === poll.finalResult
          ) {
            users[p].points += parseInt(poll.pointValue, 10);
          }
        }
      });

    let position = 0;
    let points = -1;

    return Object.values(users)
      .filter(u => !!u.finalWinner)
      .filter(u => u.points > 0)
      .sort((a, b) => this.sortAlphabetically(a.name, b.name))
      .sort((a, b) => b.points - a.points)
      .map((u, index) => {
        if (points !== u.points) {
          position = index + 1;
        }
        points = u.points;
        return { ...u, position: position };
      });
  }

  calculateTable2() {
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
    const { polls, number } = this.props;
    const teams = this.props.teams
      ? this.props.teams.reduce((obj, team) => {
          obj[team.name] = team;
          return obj;
        }, {})
      : {};
    const pointsLeft = Object.values(polls)
      .filter(p => typeof p.finalResult === "undefined")
      .reduce((a, b) => a + b.pointValue, 0);

    return (
      <div>

        <div style={{width: '100%', maxWidth: '600px', margin: '0 auto'}}>
          {this.calculateTable2().map(player =>
        <PlayerCard key={player.number} player={player} />
          )}
          </div>

        {table.map((user, index) => (
          <div
            key={user.number}
            style={{
              width: "100%",
              maxWidth: "600px",
              margin: "0 auto",
              backgroundColor:
                this.state.expanded === user.number ? "#ccdae5" : "",
              cursor: "pointer",
              borderBottom:
                user.points + pointsLeft >= table[0].points &&
                table[index + 1].points + pointsLeft < table[0].points
                  ? "4px solid red"
                  : ""
            }}
            onClick={() =>
              this.setState({
                expanded:
                  this.state.expanded === user.number ? null : user.number
              })
            }
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                backgroundColor:
                  user.points === table[0].points && user.points > 0
                    ? "gold"
                    : "",
                justifyContent: "center",
                alignItems: "center",
                padding: "4px 8px"
              }}
            >
              <h2 style={{ width: "15%", textAlign: "center" }}>
                {user.position}
              </h2>
              <h2
                style={{ width: "70%", display: "flex", alignItems: "center" }}
              >
                <img
                  src={teams[user.finalWinner].flag}
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "1px solid #ccdae5",
                    marginRight: "4px",
                    filter: teams[user.finalWinner].eliminated
                      ? "grayscale(100%)"
                      : ""
                  }}
                  alt={user.finalWinner}
                />
                &nbsp;{user.name[0].toUpperCase().concat(user.name.slice(1))}
              </h2>
              <h2 style={{ width: "15%", textAlign: "center" }}>
                {user.points}
              </h2>
            </div>
            {this.state.expanded === user.number && (
              <div
                style={{
                  backgroundColor: "white",
                  border: "1px solid #ccdae5",
                  paddingBottom: "12px"
                }}
              >
                {Object.values(polls).length > 0 && (
                  <div>
                    <div style={{ marginTop: "12px", padding: "0 8px" }}>
                      <b>Group Stage</b>
                    </div>
                    {Object.values(polls)
                      .filter(poll => !poll.isHidden)
                      .slice(0, 8)
                      .sort((a, b) => a.index - b.index)
                      .map(poll => (
                        <div
                          key={poll.index}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "4px 8px"
                          }}
                        >
                          <span style={{ width: "50%" }}>{poll.title}</span>
                          {poll.users[user.number].answered ? (
                            new Date(poll.date) - Date.now() > 0 &&
                            user.number !== number ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center"
                                }}
                              >
                                <b>Team Picked</b>
                              </div>
                            ) : (
                              <div
                                style={{
                                  width: "30%",
                                  display: "flex",
                                  alignItems: "center"
                                }}
                              >
                                <img
                                  src={
                                    teams[
                                      poll.options[
                                        poll.users[user.number].answer
                                      ].option
                                    ].flag
                                  }
                                  style={{
                                    width: "24px",
                                    height: "24px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    border: "1px solid #ccdae5",
                                    marginRight: "4px"
                                  }}
                                  alt={
                                    poll.options[poll.users[user.number].answer]
                                      .option
                                  }
                                />
                                <b>
                                  {
                                    poll.options[poll.users[user.number].answer]
                                      .option
                                  }
                                </b>
                              </div>
                            )
                          ) : (
                            <span />
                          )}
                          <div style={{ width: "15%", textAlign: "center" }}>
                            {typeof poll.finalResult !== "undefined"
                              ? poll.finalResult ===
                                poll.users[user.number].answer
                                ? poll.pointValue
                                : 0
                              : ""}
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {Object.values(polls).length > 8 && (
                  <div>
                    <div style={{ marginTop: "12px", padding: "0 8px" }}>
                      <b>Round of 16</b>
                    </div>
                    {Object.values(polls)
                      .filter(poll => !poll.isHidden)
                      .slice(8, 16)
                      .sort((a, b) => a.index - b.index)
                      .map(poll => (
                        <div
                          key={poll.index}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "4px 8px"
                          }}
                        >
                          <span style={{ width: "50%" }}>{poll.title}</span>
                          {poll.users[user.number].answered ? (
                            new Date(poll.date) - Date.now() > 0 &&
                            user.number !== number ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center"
                                }}
                              >
                                <b>Team Picked</b>
                              </div>
                            ) : (
                              <div
                                style={{
                                  width: "30%",
                                  display: "flex",
                                  alignItems: "center"
                                }}
                              >
                                <img
                                  src={
                                    teams[
                                      poll.options[
                                        poll.users[user.number].answer
                                      ].option
                                    ].flag
                                  }
                                  style={{
                                    width: "24px",
                                    height: "24px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    border: "1px solid #ccdae5",
                                    marginRight: "4px"
                                  }}
                                  alt={
                                    poll.options[poll.users[user.number].answer]
                                      .option
                                  }
                                />
                                <b>
                                  {
                                    poll.options[poll.users[user.number].answer]
                                      .option
                                  }
                                </b>
                              </div>
                            )
                          ) : (
                            <span />
                          )}
                          <div style={{ width: "15%", textAlign: "center" }}>
                            {typeof poll.finalResult !== "undefined"
                              ? poll.finalResult ===
                                poll.users[user.number].answer
                                ? poll.pointValue
                                : 0
                              : ""}
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {Object.values(polls).length > 16 && (
                  <div>
                    <div style={{ marginTop: "12px", padding: "0 8px" }}>
                      <b>Quarterfinals</b>
                    </div>
                    {Object.values(polls)
                      .filter(poll => !poll.isHidden)
                      .slice(16, 20)
                      .sort((a, b) => a.index - b.index)
                      .map(poll => (
                        <div
                          key={poll.index}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "4px 8px"
                          }}
                        >
                          <span style={{ width: "50%" }}>{poll.title}</span>
                          {poll.users[user.number].answered ? (
                            new Date(poll.date) - Date.now() > 0 &&
                            user.number !== number ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center"
                                }}
                              >
                                <b>Team Picked</b>
                              </div>
                            ) : (
                              <div
                                style={{
                                  width: "30%",
                                  display: "flex",
                                  alignItems: "center"
                                }}
                              >
                                <img
                                  src={
                                    teams[
                                      poll.options[
                                        poll.users[user.number].answer
                                      ].option
                                    ].flag
                                  }
                                  style={{
                                    width: "24px",
                                    height: "24px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    border: "1px solid #ccdae5",
                                    marginRight: "4px"
                                  }}
                                  alt={
                                    poll.options[poll.users[user.number].answer]
                                      .option
                                  }
                                />
                                <b>
                                  {
                                    poll.options[poll.users[user.number].answer]
                                      .option
                                  }
                                </b>
                              </div>
                            )
                          ) : (
                            <span />
                          )}
                          <div style={{ width: "15%", textAlign: "center" }}>
                            {typeof poll.finalResult !== "undefined"
                              ? poll.finalResult ===
                                poll.users[user.number].answer
                                ? poll.pointValue
                                : 0
                              : ""}
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {Object.values(polls).length > 20 && (
                  <div>
                    <div style={{ marginTop: "12px", padding: "0 8px" }}>
                      <b>Semifinals</b>
                    </div>
                    {Object.values(polls)
                      .filter(poll => !poll.isHidden)
                      .slice(20, 22)
                      .sort((a, b) => a.index - b.index)
                      .map(poll => (
                        <div
                          key={poll.index}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "4px 8px"
                          }}
                        >
                          <span style={{ width: "50%" }}>{poll.title}</span>
                          {poll.users[user.number].answered ? (
                            new Date(poll.date) - Date.now() > 0 &&
                            user.number !== number ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center"
                                }}
                              >
                                <b>Team Picked</b>
                              </div>
                            ) : (
                              <div
                                style={{
                                  width: "30%",
                                  display: "flex",
                                  alignItems: "center"
                                }}
                              >
                                <img
                                  src={
                                    teams[
                                      poll.options[
                                        poll.users[user.number].answer
                                      ].option
                                    ].flag
                                  }
                                  style={{
                                    width: "24px",
                                    height: "24px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    border: "1px solid #ccdae5",
                                    marginRight: "4px"
                                  }}
                                  alt={
                                    poll.options[poll.users[user.number].answer]
                                      .option
                                  }
                                />
                                <b>
                                  {
                                    poll.options[poll.users[user.number].answer]
                                      .option
                                  }
                                </b>
                              </div>
                            )
                          ) : (
                            <span />
                          )}
                          <div style={{ width: "15%", textAlign: "center" }}>
                            {typeof poll.finalResult !== "undefined"
                              ? poll.finalResult ===
                                poll.users[user.number].answer
                                ? poll.pointValue
                                : 0
                              : ""}
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {Object.values(polls).length > 22 && (
                  <div>
                    <div style={{ marginTop: "12px", padding: "0 8px" }}>
                      <b>Finals</b>
                    </div>
                    {Object.values(polls)
                      .filter(poll => !poll.isHidden)
                      .slice(22)
                      .sort((a, b) => a.index - b.index)
                      .map(poll => (
                        <div
                          key={poll.index}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "4px 8px"
                          }}
                        >
                          <span style={{ width: "50%" }}>{poll.title}</span>
                          {poll.users[user.number].answered ? (
                            new Date(poll.date) - Date.now() > 0 &&
                            user.number !== number ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center"
                                }}
                              >
                                <b>Team Picked</b>
                              </div>
                            ) : (
                              <div
                                style={{
                                  width: "30%",
                                  display: "flex",
                                  alignItems: "center"
                                }}
                              >
                                <img
                                  src={
                                    teams[
                                      poll.options[
                                        poll.users[user.number].answer
                                      ].option
                                    ].flag
                                  }
                                  style={{
                                    width: "24px",
                                    height: "24px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    border: "1px solid #ccdae5",
                                    marginRight: "4px"
                                  }}
                                  alt={
                                    poll.options[poll.users[user.number].answer]
                                      .option
                                  }
                                />
                                <b>
                                  {
                                    poll.options[poll.users[user.number].answer]
                                      .option
                                  }
                                </b>
                              </div>
                            )
                          ) : (
                            <span />
                          )}
                          <div style={{ width: "15%", textAlign: "center" }}>
                            {typeof poll.finalResult !== "undefined"
                              ? poll.finalResult ===
                                poll.users[user.number].answer
                                ? poll.pointValue
                                : 0
                              : ""}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

            <strong>Points to play for: {pointsLeft}</strong>

        <GameRules />

      </div>
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
