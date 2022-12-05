import React, { useEffect } from "react";
import Wrapper from "../components/Wrapper";
import * as c3 from 'c3';
import axios from "axios";


export default function Dashboard() {

    useEffect(() => {
        (async () => {

            const chart = c3.generate({
                bindto: '#chart',
                data: {
                    x: 'x',
                    columns: [
                        ['x'],
                        ['Sales']
                    ],
                    types: {
                        Sales: 'bar'
                    }
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: '%Y-%m-%d'
                        }
                    }
                }
            });

            const { data } = await axios.get('chart');

            chart.load({
                columns: [
                    ['x', ...data.map((r: { date: any; }) => r.date)],
                    ['Sales', ...data.map((s: any) => s.sum)]
                ]
            })

        })()
    }, [])


    return (
        <Wrapper>
            <div>
                <h2>Daily Sales</h2>
            </div>

            <div id="chart"></div>

        </Wrapper >
    );

}
