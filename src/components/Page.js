import React, { Component } from 'react';
import DATA from '../data/data.json';
import toKey from '../utils/nameToKey';
import fetch from '../utils/fetch';

import Chart from './Chart'
import Fields from './Fields'

import './Page.css';

class Page extends Component {
  constructor(props){
    super(props);
    let states = [];
    let statistics = DATA.stateMap.reduce((acc, obj) => {
      let key = toKey(obj.name);
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

    this.fillGraphData = this.fillGraphData.bind(this);
    this.onStateSelect = this.onStateSelect.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.onCheckUncheckAll = this.onCheckUncheckAll.bind(this);
  }

  fillGraphData(url, key) {
    let statistics = this.state.statistics;
    statistics[key] = statistics[key] || {};
    if(!statistics[key].data) {
      fetch(url).then(res => {
        res.fields.splice(0, 2);
        let fields = res.fields.map(field => {
          field.enabled = true;
          return field
        });
        statistics[key].data = res;
        this.setState({statistics, fields, key});
      });
    }
  }

  onStateSelect(e) {
    const key = e.target.value;
    const url = this.state.statistics[key].dataUrl;
    this.fillGraphData(url, key);
  }

  onCheckChange(e) {
    let fields = this.state.fields;
    const val = e.target.value;
    const checked = e.target.checked;
    fields[val].enabled = checked
    this.setState({fields});
  }

  onCheckUncheckAll(e) {
    const checked = e.target.checked;
    let fields = this.state.fields.map(field => {
      field.enabled = checked;
      return field
    });
    this.setState({fields});
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-1-of-3">
            <form method="GET" name="configs">
              <p>
                <select name="states" onChange={this.onStateSelect}>
                  <option value="">Select State</option>
                  {this.state.states.map(state => <option key={state.key} value={state.key}>{state.name}</option>)}
                </select>
              </p>
              <Fields fields={this.state.fields} onChange={this.onCheckChange} onCheckUncheckAll={this.onCheckUncheckAll} />
            </form>
          </div>
          <div className="col-2-of-3">
            {
              this.state.key !== '' 
                ? <Chart fields={this.state.fields}
                  data={this.state.statistics[this.state.key].data.stats} />
                : '' 
            }
          </div>
        </div>
      </div>
    );
  }
}
export default Page;
