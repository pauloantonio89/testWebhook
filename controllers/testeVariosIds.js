const Game = require("../models/Game");
const GameDay = require("../models/GameDay");
const Player = require("../models/Players");
const PlayerStatistics = require('../models/PlayerStatistics');
const ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');
require("../config/db.js");

const getPlayersNames = async () => {
  try {

    const id = ObjectId("64500290cc86657f90e47c9d")
    const checkGames = await GameDay.find({ _id: id });
    // console.log(checkGames);
    let teamA = ''
    let teamB = ''
    checkGames.forEach(element => {
      teamA = element.teamA
      if (teamA == "Los Angeles Clippers") {
        teamA = "LA Clippers"
      }
      teamA = teamA.replace(/basketball$/i, '').trim()
      teamB = element.teamB
      if (teamB == "Los Angeles Clippers") {
        teamB = "LA Clippers"
      }
      teamB = teamB.replace(/basketball$/i, '').trim()

    });
    // console.log({teamA,teamB})
    const players = await Player.find({
      $or: [
        { team: teamA },
        { team: teamB }
      ]
    }).sort({ player: 1 });
    let arrayData = []
    

    for (let element of players) {

      let allStatistics = await PlayerStatistics.find({
        playerId:element._id,
        allStatistics: {
          $exists: true,
          $ne: []
        }
      }).sort({ createdAt: -1 }).limit(5);; // Busca as estatísticas de todos os jogos do jogador, ordenados por data
   
       const last5Games = allStatistics.slice(0, 5); // Filtra as estatísticas dos últimos 5 jogos
      
      const gamesPlayed = last5Games.length;
      
      const totalMinutes = last5Games.reduce((acc, game) => acc + game.allStatistics[0].minutesInGame, 0);
      
      const totalPoints = last5Games.reduce((acc, game) => acc + game.allStatistics[0].playerPoints, 0);
      const totalRebounds = last5Games.reduce((acc, game) => acc + game.allStatistics[0].playerRebounds, 0);
      const totalAssists = last5Games.reduce((acc, game) => acc + game.allStatistics[0].playerAssistance, 0);
      const totalSteals = last5Games.reduce((acc, game) => acc + game.allStatistics[0].playerSteals, 0);
      const totalBlocks = last5Games.reduce((acc, game) => acc + game.allStatistics[0].playerBlocks, 0);
      const total3PointsAttempted = last5Games.reduce((acc, game) => acc + game.allStatistics[0].player3PointsAttempted, 0);
      const total3PointsMade = last5Games.reduce((acc, game) => acc + game.allStatistics[0].player3PointsMade, 0);
      const totalTurnover = last5Games.reduce((acc, game) => acc + game.allStatistics[0].playerTurnover, 0);
  
      const playerName = element.player;
      const team = element.team;
  
      const avgMinutes = totalMinutes / gamesPlayed;
      const avgPoints = totalPoints / gamesPlayed;
      const avgRebounds = totalRebounds / gamesPlayed;
      const avgAssists = totalAssists / gamesPlayed;
      const avgSteals = totalSteals / gamesPlayed;
      const avgBlocks = totalBlocks / gamesPlayed;
      const avg3PointsAttempted = total3PointsAttempted / gamesPlayed;
      const avg3PointsMade = total3PointsMade / gamesPlayed;
      const avgTurnover = totalTurnover / gamesPlayed;
  
      const playerData = {
        playerId: element._id,
        playerName,
        team,
        avgMinutes,
        avgPoints,
        avgRebounds,
        avgAssists,
        avgSteals,
        avgBlocks,
        avg3PointsAttempted,
        avg3PointsMade,
        avgTurnover,
      };
  
      arrayData.push(playerData);
    }
  
    const sortedData = arrayData.sort((a, b) => b.avgMinutes - a.avgMinutes);
    console.log(sortedData)
   
    // return res.status(200).json(arrayData);
  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: 'Internal server error' });
  }
};

getPlayersNames()
