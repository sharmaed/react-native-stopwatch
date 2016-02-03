/*
* Stopwatch
* http//sharmaed.com
*/

var React = require('react-native');
var formatTime = require('minutes-seconds-milliseconds');

var {
  Text,
  View,
  AppRegistry,
  StyleSheet,
  TouchableHighlight
} = React;

var StopWatch = React.createClass ({
  getInitialState: function() {
    return {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    }
  },
  render: function() {
    return <View style={styles.container}>
      <View style={[styles.header, this.borderColor('yellow')]}> 
        <View style={[styles.timeWrapper, this.borderColor('red')]}>
          <Text style={styles.timeFont}>
            {formatTime(this.state.timeElapsed)}
          </Text>
        </View>
        <View style={[styles.buttonWrapper, this.borderColor('green')]}>
          {this.lapButton()}
          {this.startButton()}
        </View>        
      </View>

      <View style={[styles.footer, this.borderColor('blue')]}>
        {this.displayLaps()}
      </View>
    </View>
  },
  styleTest: function() {
    return{
    }
  },
  displayLaps: function() {
    return this.state.laps.map(function(time,index) {
      return <View 
      style={styles.lapRow}
      >
        <Text style={styles.lapText}>
          Lap {index + 1} 
        </Text>
        <Text style={styles.lapText}>
           {formatTime(time)}
        </Text>
      </View>
    });
  },
  startButton: function() {
    var styleLocal = this.state.running ? styles.stopButton : styles.startButton;

    return <TouchableHighlight 
    underlayColor='#E0E0E0' 
    onPress={this.handleStartPress}
    style={[styles.button, styleLocal]}
    >
      <Text style={styles.buttonText}>
        { this.state.running ? 'STOP' : 'GO'}
      </Text>      
    </TouchableHighlight>
  },
  lapButton: function() {
    return <TouchableHighlight 
    underlayColor='#E0E0E0'
    onPress={this.handleLapPress}
    style={[styles.button, styles.lapButton]}
    >
      <Text style={styles.buttonText}>
        LAP
      </Text>
    </TouchableHighlight>
  },
  borderColor: function(color) {
    return {
      borderColor: color,
      borderWidth: 0
    }
  },
  handleStartPress: function() {
    if(this.state.running){
      clearInterval(this.interval);
      this.setState({running: false});
      return
    }

    this.setState({
      startTime: new Date(),
      laps: []
    });

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true,
      });
    },30);
  },
  handleLapPress: function() {
    var lapTime = this.state.timeElapsed;
    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lapTime])
    });
  }

});

var styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    marginTop: 30
  },
  header: {
    flex: 5
  },
  footer: {
    flex: 6,
    marginTop: 30
  },
  timeWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'

  },
  timeFont: {
    color: '#424242',
    fontSize: 70,
    fontWeight: '100',
    fontFamily: 'HelveticaNeue-Light'
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'    
  },
  startButton: {
    borderColor: '#00C853'
  },
  stopButton: {
    borderColor: '#D50000'
  },
  lapButton: {
    borderColor: '#9E9E9E'
  },
  buttonText: {
    fontFamily: 'HelveticaNeue',
    color: '#212121'
  },
  lapRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15
  },
  lapText: {
    fontSize: 24,
    color: '#BDBDBD',
    fontFamily: 'HelveticaNeue-Light'
  }
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);