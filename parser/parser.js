const dateRegex = /(\w*)\s(AM|PM)\s(\w*)\s(\w*)\s(\w*)\s(\d*)\s(\w*).*/
const dataRegex = /\s*(\w*)\s*(\S*)\s*(\S*)\s*(\S*)\s*(\S*) KT\s*(\S*) MPH.*/

class Parser {
  parse(text) {
    var forecast = {
      date: null,
      data: {}
    }
    var started = false
    var finished = false

    text.split('\n').forEach(line => {
      if (line.includes('AM') || line.includes('PM')) {
        this.parseDateLine(line, forecast)
      } else if (!started && line.includes('FORECAST POSITIONS AND MAX WINDS')) {
        started = true
      } else if (started && !finished && line.includes('$$')) {
        finished = true
      } else if (started && !finished && line.trim() != '') {
        this.parseDataLine(line, forecast)
      }
    })

    return forecast
  }

  parseDateLine(line, forecast) {
    var group = dateRegex.exec(line)
    if (group != null) {
      forecast.date = {
        time: {
          readout: group[1],
          meridiem: group[2]
        },
        timezone: group[3],
        dayName: group[4],
        month: group[5],
        day: group[6],
        year: group[7]
      }
    }
  }

  parseDataLine(line, forecast) {
    var group = dataRegex.exec(line)
    if (group != null) {
      forecast.data[group[1]] = {
        position: {
          lat: group[3],
          lng: group[4],
          other: group[2]
        },
        speed: {
          kt: group[5],
          mph: group[6]
        }
      }
    }
  }
}

module.exports = Parser
