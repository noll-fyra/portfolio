import teams from './teams'
import stadiums from './stadiums'
import stages from './stages'

const matches = [
  {
    number: 1,
    home_team: teams.turkey.name,
    away_team: teams.italy.name,
    date: new Date("2021-06-11T19:00:00Z").toISOString(),
    stadium: stadiums.rome,
    stage: stages.group.name
  },
  {
    number: 2,
    home_team: teams.wales.name,
    away_team: teams.switzerland.name,
    date: new Date("2021-06-12T13:00:00Z").toISOString(),
    stadium: stadiums.baku,
    stage: stages.group.name
  },
  {
    number: 3,
    home_team: teams.denmark.name,
    away_team: teams.finland.name,
    date: new Date("2021-06-12T16:00:00Z").toISOString(),
    stadium: stadiums.copenhagen,
    stage: stages.group.name
  },
  {
    number: 4,
    home_team: teams.belgium.name,
    away_team: teams.russia.name,
    date: new Date("2021-06-12T19:00:00Z").toISOString(),
    stadium: stadiums.stPetersburg,
    stage: stages.group.name
  },
  {
    number: 5,
    home_team: teams.england.name,
    away_team: teams.croatia.name,
    date: new Date("2021-06-13T11:00:00Z").toISOString(),
    stadium: stadiums.london,
    stage: stages.group.name
  },
  {
    number: 6,
    home_team: teams.austria.name,
    away_team: teams.northMacedonia.name,
    date: new Date("2021-06-13T16:00:00Z").toISOString(),
    stadium: stadiums.bucharest,
    stage: stages.group.name
  },
  {
    number: 7,
    home_team: teams.netherlands.name,
    away_team: teams.ukraine.name,
    date: new Date("2021-06-13T19:00:00Z").toISOString(),
    stadium: stadiums.amsterdam,
    stage: stages.group.name
  },
  {
    number: 8,
    home_team: teams.scotland.name,
    away_team: teams.czechRepublic.name,
    date: new Date("2021-06-14T13:00:00Z").toISOString(),
    stadium: stadiums.glasgow,
    stage: stages.group.name
  },
  {
    number: 9,
    home_team: teams.poland.name,
    away_team: teams.slovakia.name,
    date: new Date("2021-06-14T16:00:00Z").toISOString(),
    stadium: stadiums.stPetersburg,
    stage: stages.group.name
  },
  {
    number: 10,
    home_team: teams.spain.name,
    away_team: teams.sweden.name,
    date: new Date("2021-06-14T19:00:00Z").toISOString(),
    stadium: stadiums.seville,
    stage: stages.group.name,
  },
  {
    number: 11,
    home_team: teams.hungary.name,
    away_team: teams.portugal.name,
    date: new Date("2021-06-15T16:00:00Z").toISOString(),
    stadium: stadiums.budapest,
    stage: stages.group.name
  },
  {
    number: 12,
    home_team: teams.france.name,
    away_team: teams.germany.name,
    date: new Date("2021-06-15T19:00:00Z").toISOString(),
    stadium: stadiums.munich,
    stage: stages.group.name
  },
  {
    number: 13,
    home_team: teams.finland.name,
    away_team: teams.russia.name,
    date: new Date("2021-06-16T13:00:00Z").toISOString(),
    stadium: stadiums.stPetersburg,
    stage: stages.group.name
  },
  {
    number: 14,
    home_team: teams.turkey.name,
    away_team: teams.wales.name,
    date: new Date("2021-06-16T16:00:00Z").toISOString(),
    stadium: stadiums.baku,
    stage: stages.group.name
  },
  {
    number: 15,
    home_team: teams.italy.name,
    away_team: teams.switzerland.name,
    date: new Date("2021-06-16T19:00:00Z").toISOString(),
    stadium: stadiums.rome,
    stage: stages.group.name,
  },
  {
    number: 16,
    home_team: teams.ukraine.name,
    away_team: teams.northMacedonia.name,
    date: new Date("2021-06-17T13:00:00Z").toISOString(),
    stadium: stadiums.bucharest,
    stage: stages.group.name
  },
  {
    number: 17,
    home_team: teams.denmark.name,
    away_team: teams.belgium.name,
    date: new Date("2021-06-17T16:00:00Z").toISOString(),
    stadium: stadiums.copenhagen,
    stage: stages.group.name
  },
  {
    number: 18,
    home_team: teams.netherlands.name,
    away_team: teams.austria.name,
    date: new Date("2021-06-17T19:00:00Z").toISOString(),
    stadium: stadiums.amsterdam,
    stage: stages.group.name,
  },
  {
    number: 19,
    home_team: teams.sweden.name,
    away_team: teams.slovakia.name,
    date: new Date("2021-06-18T13:00:00Z").toISOString(),
    stadium: stadiums.stPetersburg,
    stage: stages.group.name
  },
  {
    number: 20,
    home_team: teams.croatia.name,
    away_team: teams.czechRepublic.name,
    date: new Date("2021-06-18T16:00:00Z").toISOString(),
    stadium: stadiums.glasgow,
    stage: stages.group.name
  },
  {
    number: 21,
    home_team: teams.england.name,
    away_team: teams.scotland.name,
    date: new Date("2021-06-18T19:00:00Z").toISOString(),
    stadium: stadiums.london,
    stage: stages.group.name,
  },
  {
    number: 22,
    home_team: teams.hungary.name,
    away_team: teams.france.name,
    date: new Date("2021-06-19T13:00:00Z").toISOString(),
    stadium: stadiums.budapest,
    stage: stages.group.name
  },
  {
    number: 23,
    home_team: teams.portugal.name,
    away_team: teams.germany.name,
    date: new Date("2021-06-19T16:00:00Z").toISOString(),
    stadium: stadiums.munich,
    stage: stages.group.name
  },
  {
    number: 24,
    home_team: teams.spain.name,
    away_team: teams.poland.name,
    date: new Date("2021-06-19T19:00:00Z").toISOString(),
    stadium: stadiums.seville,
    stage: stages.group.name,
  },
  {
    number: 25,
    home_team: teams.italy.name,
    away_team: teams.wales.name,
    date: new Date("2021-06-20T16:00:00Z").toISOString(),
    stadium: stadiums.rome,
    stage: stages.group.name
  },
  {
    number: 26,
    home_team: teams.switzerland.name,
    away_team: teams.turkey.name,
    date: new Date("2021-06-20T16:00:00Z").toISOString(),
    stadium: stadiums.baku,
    stage: stages.group.name
  },
  {
    number: 27,
    home_team: teams.northMacedonia.name,
    away_team: teams.netherlands.name,
    date: new Date("2021-06-21T16:00:00Z").toISOString(),
    stadium: stadiums.amsterdam,
    stage: stages.group.name
  },
  {
    number: 28,
    home_team: teams.ukraine.name,
    away_team: teams.austria.name,
    date: new Date("2021-06-21T16:00:00Z").toISOString(),
    stadium: stadiums.bucharest,
    stage: stages.group.name
  },
  {
    number: 29,
    home_team: teams.russia.name,
    away_team: teams.denmark.name,
    date: new Date("2021-06-21T19:00:00Z").toISOString(),
    stadium: stadiums.copenhagen,
    stage: stages.group.name
  },
  {
    number: 30,
    home_team: teams.finland.name,
    away_team: teams.belgium.name,
    date: new Date("2021-06-21T19:00:00Z").toISOString(),
    stadium: stadiums.stPetersburg,
    stage: stages.group.name
  },
  {
    number: 31,
    home_team: teams.czechRepublic.name,
    away_team: teams.england.name,
    date: new Date("2021-06-22T19:00:00Z").toISOString(),
    stadium: stadiums.london,
    stage: stages.group.name
  },
  {
    number: 32,
    home_team: teams.croatia.name,
    away_team: teams.scotland.name,
    date: new Date("2021-06-22T19:00:00Z").toISOString(),
    stadium: stadiums.glasgow,
    stage: stages.group.name
  },
  {
    number: 33,
    home_team: teams.slovakia.name,
    away_team: teams.spain.name,
    date: new Date("2021-06-23T16:00:00Z").toISOString(),
    stadium: stadiums.seville,
    stage: stages.group.name
  },
  {
    number: 34,
    home_team: teams.sweden.name,
    away_team: teams.poland.name,
    date: new Date("2021-06-23T16:00:00Z").toISOString(),
    stadium: stadiums.stPetersburg,
    stage: stages.group.name
  },
  {
    number: 35,
    home_team: teams.germany.name,
    away_team: teams.hungary.name,
    date: new Date("2021-06-23T19:00:00Z").toISOString(),
    stadium: stadiums.munich,
    stage: stages.group.name
  },
  {
    number: 36,
    home_team: teams.portugal.name,
    away_team: teams.france.name,
    date: new Date("2021-06-23T19:00:00Z").toISOString(),
    stadium: stadiums.budapest,
    stage: stages.group.name
  },
  {
    number: 37,
    home_team: "2A",
    away_team: "2B",
    date: new Date("2021-06-26T16:00:00Z").toISOString(),
    stadium: stadiums.amsterdam,
    stage: stages.roundOf16.name
  },
  {
    number: 38,
    home_team: "1A",
    away_team: "2C",
    date: new Date("2021-06-26T19:00:00Z").toISOString(),
    stadium: stadiums.london,
    stage: stages.roundOf16.name
  },
  {
    number: 39,
    home_team: "1C",
    away_team: "3D/E/F",
    date: new Date("2021-06-27T16:00:00Z").toISOString(),
    stadium: stadiums.budapest,
    stage: stages.roundOf16.name
  },
  {
    number: 40,
    home_team: "1B",
    away_team: "3A/D/E/F",
    date: new Date("2021-06-27T19:00:00Z").toISOString(),
    stadium: stadiums.seville,
    stage: stages.roundOf16.name
  },
  {
    number: 41,
    home_team: "2D",
    away_team: "2E",
    date: new Date("2021-06-28T16:00:00Z").toISOString(),
    stadium: stadiums.copenhagen,
    stage: stages.roundOf16.name
  },
  {
    number: 42,
    home_team: "1F",
    away_team: "3A/B/C",
    date: new Date("2021-06-28T19:00:00Z").toISOString(),
    stadium: stadiums.bucharest,
    stage: stages.roundOf16.name
  },
  {
    number: 43,
    home_team: "1D",
    away_team: "2F",
    date: new Date("2021-06-29T16:00:00Z").toISOString(),
    stadium: stadiums.london,
    stage: stages.roundOf16.name
  },
  {
    number: 44,
    home_team: "1E",
    away_team: "3A/B/C/D",
    date: new Date("2021-06-29T19:00:00Z").toISOString(),
    stadium: stadiums.glasgow,
    stage: stages.roundOf16.name
  },
  {
    number: 45,
    home_team: "Winner 42",
    away_team: "Winner 41",
    date: new Date("2021-07-02T16:00:00Z").toISOString(),
    stadium: stadiums.stPetersburg,
    stage: stages.quarterfinals.name
  },
  {
    number: 46,
    home_team: "Winner 40",
    away_team: "Winner 38",
    date: new Date("2021-07-02T19:00:00Z").toISOString(),
    stadium: stadiums.munich,
    stage: stages.quarterfinals.name
  },
  {
    number: 47,
    home_team: "Winner 39",
    away_team: "Winner 37",
    date: new Date("2021-07-02T16:00:00Z").toISOString(),
    stadium: stadiums.baku,
    stage: stages.quarterfinals.name
  },
  {
    number: 48,
    home_team: "Winner 44",
    away_team: "Winner 43",
    date: new Date("2021-07-02T19:00:00Z").toISOString(),
    stadium: stadiums.rome,
    stage: stages.quarterfinals.name
  },
  {
    number: 49,
    home_team: "Winner 46 (QF2)",
    away_team: "Winner 45 (QF1)",
    date: new Date("2021-07-06T19:00:00Z").toISOString(),
    stadium: stadiums.london,
    stage: stages.semifinals.name
  },
  {
    number: 50,
    home_team: "Winner 48 (QF4)",
    away_team: "Winner 47 (QF3)",
    date: new Date("2021-07-06T19:00:00Z").toISOString(),
    stadium: stadiums.london,
    stage: stages.semifinals.name
  },
  {
    number: 51,
    home_team: "Winner 49 (SF1)",
    away_team: "Winner 50 (SF2)",
    date: new Date("2021-07-11T19:00:00Z").toISOString(),
    stadium: stadiums.london,
    stage: stages.final.name
  },
]

export default matches
