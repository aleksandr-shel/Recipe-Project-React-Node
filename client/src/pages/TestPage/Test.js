import React, {useEffect} from "react";
import './Test.css';
import {PieChart, Pie, Cell} from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';




const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
function PieChartTest(){
    const data = [
        {name: 'Geeksforgeeks', students: 400},
        {name: 'Technical scripter', students: 700},
        {name: 'Geek-i-knack', students: 200},
        {name: 'Geek-o-mania', students: 1000}
      ];
        


    return(
        <PieChart width={700} height={700}>
          <Pie 
            data={data}
            dataKey="students" 
            label={renderCustomizedLabel} 
            outerRadius={250} 
            fill="green"
            labelLine={false}>

              {data.map((entry, index)=> <Cell name={entry.name} key={`cell-${index}`} fill={COLORS[index]}/>)}
          </Pie>
        </PieChart>
    )
}


function LineChartTest(){

    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
    return(
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          <Line type="monotone" dataKey="amt" stroke="black" />
        </LineChart>
    )
}

function FunctionAppear(props){
  const [isDisplayed, setDisplayed] = React.useState(props.isDisplayed);

  const [color, setColor]=React.useState('red');

  useEffect(() =>{
      setTimeout(() => {
          setDisplayed(!isDisplayed);
      },1000)
      setTimeout(() => {
          setColor(color === 'red' ? 'blue' : 'red')
      }, 2000);
  }
  )

  return(
      <div style={{backgroundColor: color, display: isDisplayed ? 'block':'none' , width:100, height:100, zIndex: 1, position:'absolute', top:'0px'}}>
          <h1>Hello</h1>
      </div>
  )
}


export default function Test(){
    return (
        <>
            <div className="animation-div">
                Test animation
            </div>

            <PieChartTest/>
            <LineChartTest/>
            <FunctionAppear isDisplayed = {true}/>
        </>
    )
}