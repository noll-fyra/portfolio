import React from 'react'
import constants from '../data/constants'
import stages from '../data/stages'

const headers = [ "Stage", "Points", "Matches", "Total"]
const body = Object.values(stages).sort((a, b) => a.number - b.number)

function GameRules() {
  return (
    <section style={{ width: "100%", textAlign: "center", margin: "0 auto", marginTop: '24px' }}>
      <h3
        style={{
          backgroundColor: constants.colors.blue,
          color: constants.colors.cream,
          padding: "8px"
        }}
      >
        Rules
      </h3>


        <div style={{ width: "100%", maxWidth: '600px', margin: "24px auto", textAlign: "left", padding: '8px' }}>
          <strong>What you can win</strong>
          <p>
            All participants put in $15 at the beginning, and the winner gets
            everything at the end (the prize money is split equally if there is
            a tie).
          </p>
          <br />

          <strong>How to win</strong>
          <p>Finish with the most points.</p>
          <br />

          <strong>Getting points</strong>
          <p>
            Before each match begins, predict the match result (win, lose or draw). You are allowed to change
            your prediction as many times as you like before the match begins. For every correct
            answer, you get points depending on the stage.
          </p>
          <br />

          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                {headers.map((header, index) => <th key={header} style={{ textAlign: index === 0 ? "left" : "center" }}>{header}</th> )}
              </tr>
            </thead>
            <tbody>
              {body.map(stage =>
              <tr key={stage.name}>
                <td style={{ textAlign: "left" }}>{stage.name}</td>
                <td style={{ textAlign: "center" }}>{stage.points}</td>
                <td style={{ textAlign: "center" }}>{stage.matches}</td>
                <td style={{ textAlign: "center" }}>{stage.points * stage.matches}</td>
              </tr>
                )}
            </tbody>
          </table>
          <br />

          <p>The best possible score is 79 pts.</p>
        </div>
    </section>
  )
}

export default GameRules
