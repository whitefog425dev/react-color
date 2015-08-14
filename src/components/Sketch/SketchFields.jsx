'use strict';

var React = require('react');
var ReactCSS = require('reactcss');
var tinycolor = require('tinycolor2');

var EditableInput = require('../common/EditableInput');

class ShetchFields extends ReactCSS.Component {

  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  classes() {
    return {
      'default': {
        fields: {
          display: 'flex',
          paddingTop: '4px',
        },
        single: {
          flex: '1',
          paddingLeft: '6px',
        },
        double: {
          flex: '2',
        },
        Input: {
          style: {
            input: {
              width: '80%',
              padding: '4px 10% 3px',
              border: 'none',
              boxShadow: 'inset 0 0 0 1px #ccc',
              fontSize: '11px',
            },
            label: {
              display: 'block',
              textAlign: 'center',
              fontSize: '11px',
              color: '#222',
              paddingTop: '3px',
              paddingBottom: '4px',
              textTransform: 'capitalize',
            },
          },
        },
      },
    };
  }

  handleChange(data) {
    if (data.hex) {
      var color = tinycolor(data.hex);
      if (color.isValid()) {
        var hsl = color.toHsl();
        this.props.onChange({ h: hsl.h, s: hsl.s, l: hsl.l });
      }
    } else if (data.r || data.g || data.b) {
      var oldColor = tinycolor({ h: this.props.h, s: this.props.s, l: this.props.l}).toRgb();
      for (var key in data) {
        oldColor[key] = Number(data[key]);
      }

      var hsl = tinycolor(oldColor).toHsl();
      this.props.onChange({ h: hsl.h, s: hsl.s, l: hsl.l });
    } else if (data.a) {
      if (data.a < 0) {
        data.a = 0;
      } else if (data.a > 100) {
        data.a = 100;
      }

      data.a = data.a / 100;
      this.props.onChange(data);
    }
  }

  render() {
    var color = tinycolor({ h: this.props.h, s: this.props.s, l: this.props.l });

    return (
      <div is="fields">
        <div is="double">
          <EditableInput is="Input" label="hex" value={ color.toHexString().replace('#', '') } onChange={ this.handleChange }/>
        </div>
        <div is="single">
          <EditableInput is="Input" label="r" value={ color.toRgb().r } onChange={ this.handleChange } dragLabel="true" dragMax="255"/>
        </div>
        <div is="single">
          <EditableInput is="Input" label="g" value={ color.toRgb().g } onChange={ this.handleChange } dragLabel="true" dragMax="255"/>
        </div>
        <div is="single">
          <EditableInput is="Input" label="b" value={ color.toRgb().b } onChange={ this.handleChange } dragLabel="true" dragMax="255"/>
        </div>
        <div is="single">
          <EditableInput is="Input" label="a" value={ Math.round(this.props.a * 100) } onChange={ this.handleChange } dragLabel="true" dragMax="100"/>
        </div>
      </div>
    );
  }

}

module.exports = ShetchFields;
