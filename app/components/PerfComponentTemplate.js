module.exports =  {

  renderMetrics:[
    'timeWasted',
    'instanceCount',
    'renderCount',
    'renderTime',
    'totalRenderTime',
    'averageRenderTime',
    'totalTime'
  ],

  summaryMetrics: [
  ],

  graphTemplate : {
    RENDER: {
      0: false,
      1: false,
    },
    SUMMARY: {
      2: false,
      3: false,
      4: false,
      5: false,
    }
  },

  data: {
    RENDER: {
      data: [],
      median: 0,
      min: 0,
      max: 0,
      graphDisplay: 'Line',
      colorTheme: 'blue',
      strokeWidth: 2,
      dotColor: 'blue',
      activeGraphs: {
        '0': false,
        '1': false
      },
      isRenderedOnGraph: {
        '0': false,
        '1': false
      },
      cache: [],
      cacheIsCurrent: false,
      animationIsActive: true
    },

    SUMMARY: {
      INSTANCE_GLOBAL: {
        renderCount: {data: 0, colorTheme: 'blue', activeGraphs: {}},
        recycleCount: {data: 0, colorTheme: 'blue', activeGraphs: {}},
        createdCount: {data: 0, colorTheme: 'blue', activeGraphs: {}}, 
      },
      graphTemplate: {
        activeGraphs: {
          '2': false,
          '3': false,
          '4': false,
          '5': false
        }
      }
    }
  }
}