import React from 'react';
import './Fields.css';

const log = (e) => { console.log(e.target.value)}

export default (props) => (<div>
    <ul className="list">
      {props.fields.length > 1 && <li>
        <label className="has-input">
          <input type="checkbox" defaultChecked onClick={props.onCheckUncheckAll || log} /> Check/Uncheck All
        </label>
      </li>}
      {props.fields.map((field, i) => <li key={i + '_' + field.enabled}>
          <label className="has-input">
            <input type="checkbox" name="fields[]" value={i} onClick={props.onChange || log} defaultChecked={field.enabled} />
            {field.label}
          </label>
        </li>)}
    </ul>
  </div>);
