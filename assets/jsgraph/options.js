// -----------------------------------------------
// Scatter Plots
// -----------------------------------------------
const continents = ["Europe", "Asie", "Afrique", "Am\u00e9rique", "Oc\u00e9anie"];

const data = publication_byYear
    .map(function (item) {
    return [item["Publication"], item["Continent"], item["Status"]];
    });	

option_scatter_single = {

    visualMap: {
      type: 'piecewise',
      show: false, 
      dimension: 1,
      min: 0,
      max: 4,
      inRange: {
        color: ['#e41a1c','#377eb8', '#984ea3', '#4daf4a', '#ff7f00']
      },
    },
	toolbox: {
      show: true,
      orient: 'horizontal',
      left: 'center',
      top: 'top',
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
      restore: {}
      } 
    },
	  tooltip: {
		position: 'top',
		formatter: function (params) {
		  return (params.value[2] + ' livres');
		}
  },
  grid: {
    left: 2,
    bottom: 10,
    right: 10,
    containLabel: true
  },
  xAxis: {
    type: 'value',
	min: -1500,
	max: 2030,
    boundaryGap: false,
    splitLine: {
      show: true
    },
    axisLine: {
      show: false
    },
	axisLabel: {fontSize: 14}
  },
  yAxis: {
    type: 'category',
    data: continents,
    axisLine: {
      show: false
    },
	axisLabel: {fontSize: 14}
  },
  series: [
    {
      name: 'Publication',
      type: 'scatter',
      symbolSize: function (val) {
        return 10 * Math.sqrt(val[2]);
      },
      itemStyle: {
        opacity: 0.4
        },
      data: data      
    }
  ]
};

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
      type: 'piecewise',
      show: true, 
      left: 'none',
      top: 'middle',
      dimension: 0,
      min: 0,
      max: 500,
	  pieces: [
		{min: 400, label: 'Plus de 400'},
		{min: 100, max: 400, label: 'Entre 100 et 400'},
		{min: 50, max: 100, label: 'Entre 50 et 100'},
		{min: 10, max: 50, label: 'Entre 10 et 50'},
		{min: 5, max: 10, label: 'Entre 5 et 10'},
		{min: 1, max: 5, label: 'Entre 1 et 5'},
		{min: 0, max: 1, label: 'Aucun auteur'},
	  ],
      inRange: {
        color: ["#fef0d9","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#990000"]
      },
     calculable: true
    },
	toolbox: {
      show: true,
      orient: 'horizontal',
      left: 'center',
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
      type: 'piecewise',
      show: true, 
      left: 'none',
      top: 'middle',
      dimension: 0,
      min: 0,
      max: 500,
	  pieces: [
		{min: 1000, label: 'Plus de 1000'},
		{min: 500, max: 1000, label: 'Entre 500 et 1000'},
		{min: 100, max: 500, label: 'Entre 100 et 500'},
		{min: 50, max: 100, label: 'Entre 50 et 100'},
		{min: 10, max: 50, label: 'Entre 10 et 50'},
		{min: 5, max: 10, label: 'Entre 5 et 10'},
		{min: 1, max: 5, label: 'Entre 1 et 5'},
		{min: 0, max: 1, label: 'Aucun livre'},
	  ],
      inRange: {
        color: ["#ffffcc","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#005a32"]
      },
     calculable: true
    },
	toolbox: {
      show: true,
      orient: 'horizontal',
      left: 'center',
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
    type: "piecewise",
      show: true, 
      left: 'none',
      top: 'middle',
    min: -0.5,
    max: 5.5,
	  pieces: [
		{min: 5, max: 6, label: 'Antartique'},
		{min: 4, max: 5, label: 'Océanie'},
		{min: 3, max: 4, label: 'Amérique'},
		{min: 2, max: 3, label: 'Afrique'},
		{min: 1, max: 2, label: 'Asie'},
		{min: 0, max: 1, label: 'Europe'},
	  ],
    calculable: true,
    realtime: false,
    inRange: {
      color: ["#d73027","#fc8d59","#fee08b","#d9ef8b","#91cf60","#1a9850"]
    }
  },
	toolbox: {
      show: true,
      orient: 'horizontal',
      left: 'center',
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
option_sunburn_1 = {
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
	toolbox: {
      show: true,
     orient: 'horizontal',
      left: 'center',
      top: 'top',
    feature: {
      dataZoom: {},
      restore: {}
    }
  },
    dataZoom: [
      {
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'weakFilter',
        height: 20,
        bottom: 0,
        start: 0,
        end: 100,
		backgroundColor: '#ffb72700',
        showDetail: false
      },
      {
        type: 'inside',
        id: 'insideX',
        xAxisIndex: 0,
        filterMode: 'weakFilter',
        start: 0,
        end: 100,
        zoomOnMouseWheel: false,
        moveOnMouseMove: true
      },
      {
        type: 'slider',
        yAxisIndex: 0,
        filterMode: 'weakFilter',
        width: 10,
        right: 10,
        start: 0,
        end: 100,
		backgroundColor: '#ffb72700',
        showDetail: false
      },
      {
        type: 'inside',
        id: 'insideY',
        yAxisIndex: 0,
        start: 0,
        end: 100,
        zoomOnMouseWheel: false,
        moveOnMouseMove: true
      }
    ],
    grid: {
      show: true,
      top: 70,
      bottom: 20,
      left: 100,
      right: 20,
      backgroundColor: '#fff',
      borderWidth: 2,
	  borderColor: '#000'
    },
    xAxis: {
      type: 'value',
      position: 'top',
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#aaa']
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        lineStyle: {
          color: '#aaa'
        }
      },
      axisLabel: {
        color: '#000',
        inside: false,
        align: 'center'
      },
	  min: -1500,
	  max: 2020
    },
    yAxis: {
      axisTick: { show: false },
      splitLine: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false },
      min: 0,
      max: _rawData.author.data.length
    },
    series: [
      {
        id: 'bookData',
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


  
