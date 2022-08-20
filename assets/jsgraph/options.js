// -----------------------------------------------
// Scatter Plots
// -----------------------------------------------
const continents = ["Europe", "Asie", "Am\u00e9rique", "Afrique", "Oc\u00e9anie"];

const data = publication_byYear
    .map(function (item) {
    return [item[1], item[0], item[2]];
    });

option_scatter_single = {

    visualMap: {
      type: 'piecewise',
      show: false, 
      dimension: 1,
      min: 0,
      max: 4,
      inRange: {
        color: ['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00']
      },
    },
  toolbox: {
    left: 'center',
    itemSize: 25,
    top: 55,
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
	max: 2100,
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
        return 10 + val[2] * 2;
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
      left: 'none',
      min: 0,
      max: 100,
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
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
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
        data: countryStatAuthor
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
      max: 1000,
      inRange: {
        color: ['#f7fcf5','#e5f5e0','#c7e9c0','#a1d99b','#74c476','#41ab5d','#238b45','#006d2c','#00441b']
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
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
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
        data: countryStatBook
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
    data: root_author,
    radius: [0, '90%'],
    label: {
      rotate: 'radial'
    }
  }
};

  
