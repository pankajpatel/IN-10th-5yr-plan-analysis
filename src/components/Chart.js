import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default (props) => (<LineChart width={800} height={600} 
    style={{margin: '0 auto'}}
    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    data={props.data} >
    {props.fields.map((field, i) => field.enabled !== false && <Line type="monotone" dataKey={field.label} key={i} stroke="#8884d8" />)}
      <CartesianGrid stroke="#ddd" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>);
