// -----------------------------------------------
// Scatter Plots
// -----------------------------------------------
// const continents = ["Europe", "Asie", "Am\u00e9rique", "Afrique", "Oc\u00e9anie"];

// const data = publication_byYear
    // .map(function (item) {
    // return [item[1], item[0], item[2]];
    // });

// option_scatter_single = {

    // visualMap: {
      // type: 'piecewise',
      // show: false, 
      // dimension: 1,
      // min: 0,
      // max: 4,
      // inRange: {
        // color: ['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00']
      // },
    // },
  // toolbox: {
      // show: true,
//      orient: 'vertical',
      // left: 'left',
      // top: 'top',
    // feature: {
      // dataZoom: {
        // yAxisIndex: 'none'
      // },
      // restore: {}
    // }
  // },
  // tooltip: {
    // position: 'top',
    // formatter: function (params) {
      // return (params.value[2] + ' livres');
    // }
  // },
  // grid: {
    // left: 2,
    // bottom: 10,
    // right: 10,
    // containLabel: true
  // },
  // xAxis: {
    // type: 'value',
	// min: -1500,
	// max: 2100,
    // boundaryGap: false,
    // splitLine: {
      // show: true
    // },
    // axisLine: {
      // show: false
    // },
	// axisLabel: {fontSize: 14}
  // },
  // yAxis: {
    // type: 'category',
    // data: continents,
    // axisLine: {
      // show: false
    // },
	// axisLabel: {fontSize: 14}
  // },
  // series: [
    // {
      // name: 'Publication',
      // type: 'scatter',
      // symbolSize: function (val) {
        // return 10 + val[2] * 2;
      // },
      // itemStyle: {
        // opacity: 0.4
        // },
      // data: data      
    // }
  // ]
// };

// -----------------------------------------------
// Cartes
// -----------------------------------------------
 
  var option_map_author = {
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2
    },
    visualMap: {
      left: 'none',
      top: 'middle',
      min: 0,
      max: 500,
      inRange: {
        color: ['#f7fcf5','#e5f5e0','#c7e9c0','#a1d99b','#74c476','#41ab5d','#238b45','#006d2c','#00441b']
      },
	  outOfRange: {
		color: ['rgba(255, 255, 255, 0.4)'],
	  },
		  
     text: ['High', 'Low'],
     calculable: true
    },
    toolbox: {
      show: true,
      //orient: 'vertical',
      left: 'left',
      top: 'top',
      feature: {
        restore: {}
		}
    },
    series: [
      {
        name: "Nombre d'auteurs",
        type: 'map',
        map: 'WORLD',
        projection: {
          project: function (point) {
            return projection_world(point);
          },
          unproject: function (point) {
            return projection_world.invert(point);
          }
        },
        emphasis: {
          label: {
            show: true
          }
        },
		nameProperty: 'NAME_FR',
        data: authorStat,
		roam: true
      }
    ]
  };

  var option_map_book = {
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2
    },
    visualMap: {
      left: 'none',
      top: 'middle',
      min: 0,
      max: 1100,
      inRange: {
        color: ['#f7fcf5','#e5f5e0','#c7e9c0','#a1d99b','#74c476','#41ab5d','#238b45','#006d2c','#00441b']
      },
     text: ['Max', 'Min'],
     calculable: true
    },
    toolbox: {
      show: true,
      //orient: 'vertical',
      left: 'left',
      top: 'top',
      feature: {
        restore: {}
      }
    },
    series: [
      {
        name: 'Nombre de livres',
        type: 'map',
        map: 'WORLD',
        projection: {
          project: function (point) {
            return projection_world(point);
          },
          unproject: function (point) {
            return projection_world.invert(point);
          }
        },
        emphasis: {
          label: {
            show: true
          }
        },
		nameProperty: 'NAME_FR',
        data: bookStat,
		roam: true
      }
    ]
  };

 var option_map_continent = {
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2
    },
    visualMap: {
      left: 'none',
      top: 'middle',
      min: 0,
      max: 5,
      inRange: {
        color: ['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00']
      },
	  outOfRange: {
		color: ['rgba(255, 255, 255, 0.48)'],
	  },
		  
     text: ['High', 'Low'],
     calculable: true
    },
    toolbox: {
      show: true,
      //orient: 'vertical',
      left: 'left',
      top: 'top',
      feature: {
        restore: {}
		}
    },
    series: [
      {
        name: "Continent",
        type: 'map',
        map: 'WORLD',
        projection: {
          project: function (point) {
            return projection_world(point);
          },
          unproject: function (point) {
            return projection_world.invert(point);
          }
        },
        emphasis: {
          label: {
            show: true
          }
        },
		nameProperty: 'NAME_FR',
        data: continentStat,
		roam: true
      }
    ]
  };
  
  
// -----------------------------------------------
// Sunburn
// -----------------------------------------------
option_sunburn = {
  visualMap: {
    type: 'continuous',
    orient: 'horizontal',
    left: 'center',
    min: 0,
    max: 350,
    inRange: {
      color: ['#2F93C8', '#AEC48F', '#FFDB5C', '#F98862']
    }
  },
  series: {
    type: 'sunburst',
    data: sunburstAuthor,
    radius: [0, '90%'],
    label: {
      rotate: 'radial'
    }
  }
};

option_sunburn_2 = {
  series: {
    type: 'sunburst',
    data: sunburstAuthor,
    radius: ["0%", '95%'],
    sort: 'desc',
    label: {'minAngle': 10},
    emphasis: {
      focus: 'descendant'
    },
    levels: [
      {},
      {
        r0: '0%',
        r: '10%',
        itemStyle: {
          borderWidth: 2
        },
        label: {
          rotate: 'tangential'
        }
      },
      {
        r0: '10%',
        r: '70%',
        label: {
          align: 'center'
        }
      },
      {
        r0: '70%',
        r: '72%',
        label: {
          position: 'outside',
          padding: 3,
          silent: false
        },
        itemStyle: {
          borderWidth: 3
        }
      }
    ]
  }
};

// -----------------------------------------------
// Chronologie
// -----------------------------------------------

var app = {};
// var option;

var HEIGHT_RATIO = 0.6;
var DIM_CATEGORY_INDEX = 0;
var DIM_TIME_ARRIVAL = 1;
var DIM_TIME_DEPARTURE = 2;
var DIM_NAME_INDEX = 3;

var _cartesianXBounds = [];
var _cartesianYBounds = [];

var _rawData;


  _rawData = chronos;

  option_chronology = makeOption();

function makeOption() {
  return {
    tooltip: {},
    animation: false,
    title: {
      text: 'Gantt of Airport Flight',
      left: 'center'
    },
    dataZoom: [
      {
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'weakFilter',
        height: 20,
        bottom: 0,
        start: 0,
        end: 26,
        handleIcon:
          'path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        showDetail: false
      },
      {
        type: 'inside',
        id: 'insideX',
        xAxisIndex: 0,
        filterMode: 'weakFilter',
        start: 0,
        end: 26,
        zoomOnMouseWheel: false,
        moveOnMouseMove: true
      },
      {
        type: 'slider',
        yAxisIndex: 0,
        zoomLock: true,
        width: 10,
        right: 10,
        top: 70,
        bottom: 20,
        start: 95,
        end: 100,
        handleSize: 0,
        showDetail: false
      },
      {
        type: 'inside',
        id: 'insideY',
        yAxisIndex: 0,
        start: 95,
        end: 100,
        zoomOnMouseWheel: false,
        moveOnMouseMove: true,
        moveOnMouseWheel: true
      }
    ],
    grid: {
      show: true,
      top: 70,
      bottom: 20,
      left: 100,
      right: 20,
      backgroundColor: '#fff',
      borderWidth: 0
    },
    xAxis: {
      type: 'value',
      position: 'top',
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#38dbff']
        }
      },
      axisLine: {
        show: true
      },
      axisTick: {
        lineStyle: {
          color: '#ba929f'
        }
      },
      axisLabel: {
        color: '#ba929f',
        inside: false,
        align: 'center'
      }
    },
    yAxis: {
      axisTick: { show: true },
      splitLine: { show: true },
      axisLine: { show: true },
      axisLabel: { show: true },
      min: 0,
      max: _rawData.author.data.length
    },
    series: [
      {
        id: 'flightData',
        type: 'custom',
        renderItem: renderGanttItem,
        dimensions: _rawData.author.dimensions,
        encode: {
          x: [DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE],
          y: DIM_CATEGORY_INDEX,
          tooltip: [DIM_NAME_INDEX, DIM_TIME_DEPARTURE, DIM_TIME_ARRIVAL]
        },
        data: _rawData.author.data
      }
    ]
  };
}
function renderGanttItem(params, api) {
  var categoryIndex = api.value(DIM_CATEGORY_INDEX);
  var timeArrival = api.coord([api.value(DIM_TIME_ARRIVAL), categoryIndex]);
  var timeDeparture = api.coord([api.value(DIM_TIME_DEPARTURE), categoryIndex]);

  var coordSys = params.coordSys;
  _cartesianXBounds[0] = coordSys.x;
  _cartesianXBounds[1] = coordSys.x + coordSys.width;
  _cartesianYBounds[0] = coordSys.y;
  _cartesianYBounds[1] = coordSys.y + coordSys.height;
  var barLength = timeDeparture[0] - timeArrival[0];

  // Get the heigth corresponds to length 1 on y axis.
  var barHeight = api.size([0, 1])[1] * HEIGHT_RATIO;
  var x = timeArrival[0];
  var y = timeArrival[1] - barHeight;
  var flightNumber = api.value(3) + '';
  var flightNumberWidth = echarts.format.getTextRect(flightNumber).width;


  var color = api.value(4);

  
  var text =
    barLength > flightNumberWidth + 40 && x + barLength >= 180
      ? flightNumber
      : '';
  var rectNormal = clipRectByRect(params, {
    x: x,
    y: y,
    width: barLength,
    height: barHeight
  });
  var rectVIP = clipRectByRect(params, {
    x: x,
    y: y,
    width: barLength / 4,
    height: barHeight
  });
  var rectText = clipRectByRect(params, {
    x: x,
    y: y,
    width: barLength,
    height: barHeight
  });

  return {
    type: 'group',
    children: [
      {
        type: 'rect',
        ignore: !rectNormal,
        shape: rectNormal,
        style: api.style({fill: color})
      },
//      {
//        type: 'rect',
//        ignore: !rectVIP && !api.value(4),
//        shape: rectVIP,
//        style: api.style({ fill: '#ddb30b' }) // yellow
//      },
      {
        type: 'rect',
        ignore: !rectText,
        shape: rectText,
        style: api.style({
          fill: 'transparent',
          stroke: 'transparent',
          text: text,
          textFill: '#fff'
        })
      }
    ]
  };
}

function clipRectByRect(params, rect) {
  return echarts.graphic.clipRectByRect(rect, {
    x: params.coordSys.x,
    y: params.coordSys.y,
    width: params.coordSys.width,
    height: params.coordSys.height
  });
}


  
