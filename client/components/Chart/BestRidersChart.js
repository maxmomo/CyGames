import React from 'react';
import { View } from 'react-native';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLegend, VictoryScatter } from 'victory-native';

export default function BestRidersChart(props) {

    const seasons = props.statistics.map((element) => parseInt(element['season']))
    const best_result = props.statistics.map((element) => parseInt(element['best_result']))
    const best_result_cumulated = props.statistics.map((element) => parseInt(element['best_result_cumulated']))
    
    const max_result = Math.max(...best_result)
    const min_result = Math.min(...best_result)
    const max_season = Math.max(...seasons)
    const min_season = Math.min(...seasons)
    let mid_result = 0
    let quart_result = 0
    let trois_quart_result = 0
    let mid_season = 0
    let quart_season = 0
    let trois_quart_season = 0

    const best_result_data = seasons.map((season, index) => ({ x: season, y: best_result[index] }));
    const best_result_cumulated_data = seasons.map((season, index) => ({ x: season, y: best_result_cumulated[index] }));

    let scatter_list = []
    let scatter_list2 = []

    if (seasons.length === 1) {
        scatter_list = [best_result[0]]
        scatter_list2 = [seasons[0]]
    } else if (seasons.length === 2) {
        scatter_list = [best_result[0], best_result[1]]
        scatter_list2 = [seasons[0], seasons[1]]
    } else if (seasons.length === 3) {
        scatter_list = [best_result[0], best_result[1], best_result[2]]
        scatter_list2 = [seasons[0], seasons[1], seasons[2]]
    } else if (seasons.length === 4) {
        scatter_list = [best_result[0], best_result[1], best_result[2], best_result[3]]
        scatter_list2 = [seasons[0], seasons[1], seasons[2], seasons[3]]
    } else if (seasons.length === 5) {
        scatter_list = [best_result[0], best_result[1], best_result[2], best_result[3], best_result[4]]
        scatter_list2 = [seasons[0], seasons[1], seasons[2], seasons[3], seasons[4]]
    } else {
        mid_result = Math.round((min_result + max_result) / 2)
        mid_season = Math.round((min_season + max_season) / 2)
        quart_result = Math.round((min_result + mid_result) / 2)
        quart_season = Math.round((min_season + mid_season) / 2)
        trois_quart_result = Math.round((max_result + mid_result) / 2)
        trois_quart_season = Math.round((max_season + mid_season) / 2)
        scatter_list = [min_result, quart_result, mid_result, trois_quart_result, max_result]
        scatter_list2 = [min_season, quart_season, mid_season, trois_quart_season, max_season]
    }

    return (
        <View>
            {props.statistics && <View>
                <VictoryChart>
                    <VictoryAxis
                        dependentAxis
                        invertAxis={true}
                        tickValues={scatter_list}
                        label='Résultat'
                        style={{
                            ticks: { stroke: 'white', size: 5 },
                            tickLabels: { fill: 'white', fontSize: 12, padding: 5 },
                            axisLabel: { padding: 30, fill: 'white', fontSize: 15 }
                        }}
                    />
                    <VictoryAxis
                        label='Saison'
                        tickFormat={(tick) => `${Math.round(tick)}`}
                        tickValues={scatter_list2}
                        style={{
                            ticks: { stroke: 'white', size: 5 },
                            tickLabels: { fill: 'white', fontSize: 12, padding: 2 },
                            axisLabel: { padding: 30, fill: '#E4E9F2', fontSize: 15 }
                        }}
                    />
                    <VictoryLine
                        data={best_result_data}
                        interpolation='linear'
                        style={{
                            data: { stroke: '#c43a31' },
                            parent: { border: '1px solid #E4E9F2' }
                        }}
                    />
                    <VictoryScatter
                        data={best_result_data}
                        size={4}
                        style={{ data: { fill: '#c43a31' } }}
                    />
                    <VictoryLine
                        data={best_result_cumulated_data}
                        interpolation='linear'
                        style={{
                            data: { stroke: '#3498db' },
                            parent: { border: '1px solid #E4E9F2' }
                        }}
                    />
                    <VictoryScatter
                        data={best_result_cumulated_data}
                        size={2}
                        style={{ data: { fill: '#3498db' } }}
                    />
                    <VictoryLegend 
                        x={10} 
                        y={0}
                        orientation='horizontal'
                        style={{ 
                            labels: { fill: '#E4E9F2', fontSize: 12 }, 
                            title: { fontSize: 20 }
                        }}
                        data={[
                            { name: 'Meilleur résultat', symbol: { fill: '#c43a31', type: 'circle' } },
                            { name: 'Meilleur résultat cumulé', symbol: { fill: '#3498db', type: 'circle' } }
                        ]}
                    />
                </VictoryChart>
            </View>}
        </View>
    );
}