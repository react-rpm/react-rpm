// import { colors } from './colors';
import template from './PerfComponentTemplate';

export default class PerfComponent {


  constructor(name) {

    this.name = name;

    this.graphData = [];

    this.RENDER = JSON.parse(JSON.stringify(this.compileComponent()));

    console.log(
      '-------------------------\n',
      '-----[Component View]----\n',
      '* New Perf Component Created *\n',
      '\tName:', this.name, '\n',
      '-------------------------\n',
    )
  }

  compileComponent() {

    let emptyRenderTemplate = {};

    template.renderMetrics.forEach(metric => {
      if (!emptyRenderTemplate[metric]) emptyRenderTemplate[metric] = {};
      emptyRenderTemplate[metric] = template.data.RENDER
    })

    return emptyRenderTemplate
  }

  toggleActiveMetric(category, metric, graph, graphStyle, color) {
    this[category][metric].graphDisplay = graphStyle
    this[category][metric].colorTheme = color;
    console.log('\n\n\nCreating on graph #',graph,'\n\n\n');
    this[category][metric].activeGraphs[graph] = !this[category][metric].activeGraphs[graph];
  }

  //This method loops through to gather all the graphs this PerfComponent is active on, and returns them as an array
  //This gets called in a PerfComponent, exportGraphData, and is called by App, then passed as a prop to Plot
  getActiveMetrics() {

    let categoryTracker = 'RENDER';
    let activeMetrics = [];

    Object.keys(this[categoryTracker]).forEach(metric => {
      this.getActiveGraphsForMetric(metric).forEach(graph => {
        this.RENDER[metric].isRenderedOnGraph[graph] ? this.RENDER[metric].animationIsActive = false
          : this.RENDER[metric].animationIsActive = true

        this.RENDER[metric].cache = [
          this.RENDER[metric],
          this.name,
          metric,
          graph,
          this.RENDER[metric].animationIsActive
        ]
        this.RENDER[metric].cacheIsCurrent = true;
        this.RENDER[metric].isRenderedOnGraph[graph] = true;
        activeMetrics.push(this.RENDER[metric].cache);
      })
    })
    return activeMetrics;
  }

  setValues(value, category, metric) {
    this[category][metric].data = value;
  }

  addValue(value, category, metric) {
    this[category][metric].data.push(value);
  }

  getValue(category, metric) {
    return this[category][metric].data;
  }

  getMetricObject(category, metric) {
    return this[category][metric];
  }

  getMetricTotal(metric) {
    if (this.RENDER[metric].data.length)
      return this.RENDER[metric].data.reduce((acc, val) =>
        acc + val
        , 0).toFixed(2);
    else 
      return 0;
  }

  exportGraphData() {
    this.graphData = this.getActiveMetrics();
    return this.graphData;
  }

  enableMetricAnimation(category, metric) {
    this[category][metric].animationIsActive = true;
  }

  disableMetricAnimation(category, metric) {
    this[category][metric].animationIsActive = false;
  }

  enableAllMetricAnimation() {
    Object.keys(this.RENDER).forEach(metric => {
      [0, 1, 2, 3, 4, 5, 6].forEach(graph => {
        this.RENDER[metric].isRenderedOnGraph[graph] = false;
      })
      this.enableMetricAnimation('RENDER', metric);
    })
  }

  getActiveGraphsForMetric(metric) {
    let arr = [];
    if (this.RENDER[metric].activeGraphs[0]) arr.push(0);
    if (this.RENDER[metric].activeGraphs[1]) arr.push(1);
    return arr;
  }

  disableMetricOnGraph(metric, graph) {
    this.RENDER[metric].activeGraphs[graph] = false;
  }
}
