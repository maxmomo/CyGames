// import db from "../config/database.js"
const db = require("../../config/database")

const getStatisticsTeamRace = async (req, res) => {
    params = req.query

    statistics = {}
    
    const statistics_best_result = await db.query(
        "SELECT ri.fullName as rider_name, ri.id as rider_id, ra.season as season, re.result_rank, re.id " +
        "FROM results re " +
        "JOIN riders ri ON ri.id = re.RiderId " +
        "JOIN races ra ON ra.id = re.RaceId " + 
        "LEFT JOIN stages st ON st.id = re.StageId " + 
        "JOIN teams t2 ON t2.related_team_id = :team_id " + 
        "JOIN ridersteams rt ON rt.RiderId = ri.id AND rt.TeamId = t2.id AND rt.season =  ra.season " + 
        "WHERE " + 
        "re.BetTypeId = 4 AND " + 
        "ra.pcs_id = :pcs_race_id AND " + 
        "(ra.season != EXTRACT(YEAR FROM CURRENT_DATE) OR " +
        "(ra.season = EXTRACT(YEAR FROM CURRENT_DATE) AND ra.end_date < CURRENT_DATE)) AND " + 
        "result_rank = (SELECT min(result_rank) " +  
        "FROM results re " +  
        "JOIN riders ri ON ri.id = re.RiderId " + 
        "JOIN races ra ON ra.id = re.RaceId " +  
        "LEFT JOIN stages st ON st.id = re.StageId " + 
        "JOIN teams t2 ON t2.related_team_id = :team_id  " + 
        "JOIN ridersteams rt ON rt.RiderId = ri.id AND rt.TeamId = t2.id AND rt.season =  ra.season " + 
        "WHERE " + 
        "re.BetTypeId = 4 AND " + 
        "(ra.season != EXTRACT(YEAR FROM CURRENT_DATE) OR " +
        "(ra.season = EXTRACT(YEAR FROM CURRENT_DATE) AND ra.end_date < CURRENT_DATE)) AND " +
        "ra.pcs_id = :pcs_race_id) " + 
        "ORDER BY result_rank, ra.season",
        {
            type: db.SELECT,
            replacements: { 
                team_id: params['related_team_id'],
                pcs_race_id: params['pcs_race_id']
            },
        }
    )
    
    const statistics_best_result_evolution = await db.query(
        "WITH BestResults AS ( " +
        "SELECT ra.season, MIN(re.result_rank) as best_rank " +
        "FROM results re " + 
        "JOIN riders ri ON ri.id = re.RiderId " +
        "JOIN races ra ON ra.id = re.RaceId " + 
        "LEFT JOIN stages st ON st.id = re.StageId " +
        "JOIN teams t2 ON t2.related_team_id = :team_id " +
        "JOIN ridersteams rt ON rt.RiderId = ri.id AND rt.TeamId = t2.id AND rt.season =  ra.season " +
        "WHERE re.BetTypeId = 4 AND ra.pcs_id = :pcs_race_id AND " +
        "(ra.season != EXTRACT(YEAR FROM CURRENT_DATE) OR " +
        "(ra.season = EXTRACT(YEAR FROM CURRENT_DATE) AND ra.end_date < CURRENT_DATE)) " +
        "GROUP BY ra.season) " +
        "SELECT br1.season, " + 
        "MIN(br1.best_rank) OVER (ORDER BY br1.season ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as best_result_cumulated, " +
        "br1.best_rank best_result " +
        "FROM BestResults br1 " +
        "ORDER BY br1.season",
        {
            type: db.SELECT,
            replacements: { 
                team_id: params['related_team_id'],
                pcs_race_id: params['pcs_race_id']
            },
        }
    )

    const statistics_best_point = await db.query(
        "SELECT ri.fullName as rider_name, ri.id as rider_id, ra.season as season, re.result_rank, re.id " +
        "FROM results re " +
        "JOIN riders ri ON ri.id = re.RiderId " +
        "JOIN races ra ON ra.id = re.RaceId " + 
        "LEFT JOIN stages st ON st.id = re.StageId " + 
        "JOIN teams t2 ON t2.related_team_id = :team_id " + 
        "JOIN ridersteams rt ON rt.RiderId = ri.id AND rt.TeamId = t2.id AND rt.season =  ra.season " + 
        "WHERE " + 
        "re.BetTypeId = 5 AND " + 
        "(ra.season != EXTRACT(YEAR FROM CURRENT_DATE) OR " +
        "(ra.season = EXTRACT(YEAR FROM CURRENT_DATE) AND ra.end_date < CURRENT_DATE)) AND " +
        "ra.pcs_id = :pcs_race_id AND " +  
        "result_rank = (SELECT min(result_rank) " +  
        "FROM results re " +  
        "JOIN riders ri ON ri.id = re.RiderId " + 
        "JOIN races ra ON ra.id = re.RaceId " +  
        "LEFT JOIN stages st ON st.id = re.StageId " + 
        "JOIN teams t2 ON t2.related_team_id = :team_id  " + 
        "JOIN ridersteams rt ON rt.RiderId = ri.id AND rt.TeamId = t2.id AND rt.season =  ra.season " + 
        "WHERE " + 
        "re.BetTypeId = 5 AND " + 
        "(ra.season != EXTRACT(YEAR FROM CURRENT_DATE) OR " +
        "(ra.season = EXTRACT(YEAR FROM CURRENT_DATE) AND ra.end_date < CURRENT_DATE)) AND " +
        "ra.pcs_id = :pcs_race_id) " + 
        "ORDER BY result_rank, ra.season",
        {
            type: db.SELECT,
            replacements: { 
                team_id: params['related_team_id'],
                pcs_race_id: params['pcs_race_id']
            },
        }
    )
    
    const statistics_best_point_evolution = await db.query(
        "WITH BestResults AS ( " +
        "SELECT ra.season, MIN(re.result_rank) as best_rank " +
        "FROM results re " + 
        "JOIN riders ri ON ri.id = re.RiderId " +
        "JOIN races ra ON ra.id = re.RaceId " + 
        "LEFT JOIN stages st ON st.id = re.StageId " +
        "JOIN teams t2 ON t2.related_team_id = :team_id " +
        "JOIN ridersteams rt ON rt.RiderId = ri.id AND rt.TeamId = t2.id AND rt.season =  ra.season " +
        "WHERE re.BetTypeId = 5 AND ra.pcs_id = :pcs_race_id AND " +
        "(ra.season != EXTRACT(YEAR FROM CURRENT_DATE) OR " +
        "(ra.season = EXTRACT(YEAR FROM CURRENT_DATE) AND ra.end_date < CURRENT_DATE)) " +
        "GROUP BY ra.season) " +
        "SELECT br1.season, " + 
        "MIN(br1.best_rank) OVER (ORDER BY br1.season ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as best_result_cumulated, " +
        "br1.best_rank best_result " +
        "FROM BestResults br1 " +
        "ORDER BY br1.season",
        {
            type: db.SELECT,
            replacements: { 
                team_id: params['related_team_id'],
                pcs_race_id: params['pcs_race_id']
            },
        }
    )

    const statistics_best_young = await db.query(
        "SELECT ri.fullName as rider_name, ri.id as rider_id, ra.season as season, re.result_rank, re.id " +
        "FROM results re " +
        "JOIN riders ri ON ri.id = re.RiderId " +
        "JOIN races ra ON ra.id = re.RaceId " + 
        "LEFT JOIN stages st ON st.id = re.StageId " + 
        "JOIN teams t2 ON t2.related_team_id = :team_id " + 
        "JOIN ridersteams rt ON rt.RiderId = ri.id AND rt.TeamId = t2.id AND rt.season =  ra.season " + 
        "WHERE " + 
        "re.BetTypeId = 6 AND " + 
        "(ra.season != EXTRACT(YEAR FROM CURRENT_DATE) OR " +
        "(ra.season = EXTRACT(YEAR FROM CURRENT_DATE) AND ra.end_date < CURRENT_DATE)) AND " +
        "ra.pcs_id = :pcs_race_id AND " +  
        "result_rank = (SELECT min(result_rank) " +  
        "FROM results re " +  
        "JOIN riders ri ON ri.id = re.RiderId " + 
        "JOIN races ra ON ra.id = re.RaceId " +  
        "LEFT JOIN stages st ON st.id = re.StageId " + 
        "JOIN teams t2 ON t2.related_team_id = :team_id  " + 
        "JOIN ridersteams rt ON rt.RiderId = ri.id AND rt.TeamId = t2.id AND rt.season =  ra.season " + 
        "WHERE " + 
        "re.BetTypeId = 6 AND " + 
        "(ra.season != EXTRACT(YEAR FROM CURRENT_DATE) OR " +
        "(ra.season = EXTRACT(YEAR FROM CURRENT_DATE) AND ra.end_date < CURRENT_DATE)) AND " +
        "ra.pcs_id = :pcs_race_id) " + 
        "ORDER BY result_rank, ra.season",
        {
            type: db.SELECT,
            replacements: { 
                team_id: params['related_team_id'],
                pcs_race_id: params['pcs_race_id']
            },
        }
    )
    
    const statistics_best_young_evolution = await db.query(
        "WITH BestResults AS ( " +
        "SELECT ra.season, MIN(re.result_rank) as best_rank " +
        "FROM results re " + 
        "JOIN riders ri ON ri.id = re.RiderId " +
        "JOIN races ra ON ra.id = re.RaceId " + 
        "LEFT JOIN stages st ON st.id = re.StageId " +
        "JOIN teams t2 ON t2.related_team_id = :team_id " +
        "JOIN ridersteams rt ON rt.RiderId = ri.id AND rt.TeamId = t2.id AND rt.season =  ra.season " +
        "WHERE re.BetTypeId = 6 AND ra.pcs_id = :pcs_race_id AND " +
        "(ra.season != EXTRACT(YEAR FROM CURRENT_DATE) OR " +
        "(ra.season = EXTRACT(YEAR FROM CURRENT_DATE) AND ra.end_date < CURRENT_DATE)) " +
        "GROUP BY ra.season) " +
        "SELECT br1.season, " + 
        "MIN(br1.best_rank) OVER (ORDER BY br1.season ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as best_result_cumulated, " +
        "br1.best_rank best_result " +
        "FROM BestResults br1 " +
        "ORDER BY br1.season",
        {
            type: db.SELECT,
            replacements: { 
                team_id: params['related_team_id'],
                pcs_race_id: params['pcs_race_id']
            },
        }
    )

    const statistics_best_montain = await db.query(
        "SELECT ri.fullName as rider_name, ri.id as rider_id, ra.season as season, re.result_rank, re.id " +
        "FROM results re " +
        "JOIN riders ri ON ri.id = re.RiderId " +
        "JOIN races ra ON ra.id = re.RaceId " + 
        "LEFT JOIN stages st ON st.id = re.StageId " + 
        "JOIN teams t2 ON t2.related_team_id = :team_id " + 
        "JOIN ridersteams rt ON rt.RiderId = ri.id AND rt.TeamId = t2.id AND rt.season =  ra.season " + 
        "WHERE " + 
        "re.BetTypeId = 7 AND " + 
        "(ra.season != EXTRACT(YEAR FROM CURRENT_DATE) OR " +
        "(ra.season = EXTRACT(YEAR FROM CURRENT_DATE) AND ra.end_date < CURRENT_DATE)) AND " +
        "ra.pcs_id = :pcs_race_id AND " +  
        "result_rank = (SELECT min(result_rank) " +  
        "FROM results re " +  
        "JOIN riders ri ON ri.id = re.RiderId " + 
        "JOIN races ra ON ra.id = re.RaceId " +  
        "LEFT JOIN stages st ON st.id = re.StageId " + 
        "JOIN teams t2 ON t2.related_team_id = :team_id  " + 
        "JOIN ridersteams rt ON rt.RiderId = ri.id AND rt.TeamId = t2.id AND rt.season =  ra.season " + 
        "WHERE " + 
        "re.BetTypeId = 7 AND " + 
        "(ra.season != EXTRACT(YEAR FROM CURRENT_DATE) OR " +
        "(ra.season = EXTRACT(YEAR FROM CURRENT_DATE) AND ra.end_date < CURRENT_DATE)) AND " +
        "ra.pcs_id = :pcs_race_id) " + 
        "ORDER BY result_rank, ra.season",
        {
            type: db.SELECT,
            replacements: { 
                team_id: params['related_team_id'],
                pcs_race_id: params['pcs_race_id']
            },
        }
    )
    
    const statistics_best_montain_evolution = await db.query(
        "WITH BestResults AS ( " +
        "SELECT ra.season, MIN(re.result_rank) as best_rank " +
        "FROM results re " + 
        "JOIN riders ri ON ri.id = re.RiderId " +
        "JOIN races ra ON ra.id = re.RaceId " + 
        "LEFT JOIN stages st ON st.id = re.StageId " +
        "JOIN teams t2 ON t2.related_team_id = :team_id " +
        "JOIN ridersteams rt ON rt.RiderId = ri.id AND rt.TeamId = t2.id AND rt.season =  ra.season " +
        "WHERE re.BetTypeId = 7 AND ra.pcs_id = :pcs_race_id AND " +
        "(ra.season != EXTRACT(YEAR FROM CURRENT_DATE) OR " +
        "(ra.season = EXTRACT(YEAR FROM CURRENT_DATE) AND ra.end_date < CURRENT_DATE)) " +
        "GROUP BY ra.season) " +
        "SELECT br1.season, " + 
        "MIN(br1.best_rank) OVER (ORDER BY br1.season ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as best_result_cumulated, " +
        "br1.best_rank best_result " +
        "FROM BestResults br1 " +
        "ORDER BY br1.season",
        {
            type: db.SELECT,
            replacements: { 
                team_id: params['related_team_id'],
                pcs_race_id: params['pcs_race_id']
            },
        }
    )
        
    statistics['statistics_best_result'] = statistics_best_result[0]
    statistics['statistics_best_result_evolution'] = statistics_best_result_evolution[0]
    statistics['statistics_best_point'] = statistics_best_point[0]
    statistics['statistics_best_point_evolution'] = statistics_best_point_evolution[0]
    statistics['statistics_best_montain'] = statistics_best_montain[0]
    statistics['statistics_best_montain_evolution'] = statistics_best_montain_evolution[0]
    statistics['statistics_best_young'] = statistics_best_young[0]
    statistics['statistics_best_young_evolution'] = statistics_best_young_evolution[0]

    res.json(statistics)
};

module.exports = {getStatisticsTeamRace};