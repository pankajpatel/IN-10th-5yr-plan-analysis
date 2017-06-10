import React, { Component } from 'react';
import DATA from '../data/data.json';
import fetch from 'isomorphic-fetch';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const createKeyFromString = (name) => {
  return name.toLowerCase().replace(/\s/g, '-');
}

const decorator = (response) => {
  let fields = response.fields;
  let stats = response.data.map((data) => {
    let stat = fields.reduce((acc, field, i) => {
      acc[field.label] = isNaN(Number(data[i])) ? data[i] : Number(data[i]);
      return acc;
    }, {})
    return stat;
  });
  return {stats, fields};
}

const pullData = async (url) => {
  return fetch(url)
    .then(res => res.json())
    .then(decorator);
}

class StatsGraph extends Component {
  constructor(props){
    super(props);
    let states = [];
    let statistics = DATA.stateMap.reduce((acc, obj) => {
      let key = createKeyFromString(obj.name);
      acc[key] = Object.assign({}, obj);
      states.push(Object.assign({}, obj, {key}));
      return acc;
    }, {});
    this.state = {
      states,
      key: '',
      statistics,
      fields: []
    };

    this.onStateSelect = this.onStateSelect.bind(this);
    this.fillGraphData = this.fillGraphData.bind(this);
  }

  fillGraphData(url, key) {
    let statistics = this.state.statistics;
    statistics[key] = statistics[key] || {};
    if(!statistics[key].data) {
      pullData(url).then(res => {
        statistics[key].data = res;
        this.setState({statistics, fields: res.fields, key});
      });
    }
  }

  onStateSelect(e) {
    const key = e.target.value;
    const url = this.state.statistics[key].dataUrl;
    this.fillGraphData(url, key);
  }

  render() {
    return (
      <div>
        <p><select name="states" onChange={this.onStateSelect}>
          <option value="">Select State</option>
          {this.state.states.map(state => <option key={state.key} value={state.key}>{state.name}</option>)}
        </select></p>
        <LineChart width={800} height={600} 
          style={{margin: '0 auto'}}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          data={this.state.key !== '' ? this.state.statistics[this.state.key].data.stats : []} >
          {this.state.fields.map((field, i) => i > 1 ? <Line type="monotone" dataKey={field.label} key={i} stroke="#8884d8" />: '')}
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    );
  }
}
export default StatsGraph;
