'use strict';

var React = require('react');
var ReactCSS = require('reactcss');
var tinycolor = require('../../../modules/tinycolor2');

var { Raised } = require('../../../modules/react-material-design');
var CompactColor = require('./CompactColor');
var CompactFields = require('./CompactFields');

class Compact extends ReactCSS.Component {

  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  classes() {
    return {
      'default': {
        Compact: {
          background: '#f6f6f6',
          radius: '4px',
        },
        compact: {
          paddingTop: '5px',
          paddingLeft: '5px',
          width: '240px',
        },

        clear: {
          clear: 'both',
        },
      },
    };
  }

  handleChange(data) {
    if (data.hex) {
      tinycolor(data.hex).isValid() && this.props.onChange(data.hex);
    } else {
      this.props.onChange(data);
    }
  }

  render() {
    var colors = [];
    if (this.props.colors) {
      for (var i = 0; i < this.props.colors.length; i++) {
        var color = this.props.colors[i];
        colors.push(<CompactColor key={ color } color={ color } active={ color.replace('#', '').toLowerCase() == this.props.hex } onClick={ this.handleChange } />);
      }
    }

    return (
      <Raised is="Compact">
        <div is="compact">
          { colors }
          <div is="clear" />
          <CompactFields {...this.props} onChange={ this.handleChange } />
        </div>
      </Raised>
    );
  }
}

Compact.defaultProps = {
  colors: ['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00',
           '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF',
           '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400',
           '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF',
           '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00',
           '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E',],
};

module.exports = Compact;
