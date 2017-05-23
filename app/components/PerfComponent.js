// import { colors } from './colors';
import template from './PerfComponentTemplate';

export default class PerfComponent {


  constructor(name, color = 'blue') {


    this.name = name;

    //I haven't implemented this yet, but App will use it to check to see if there's any new information that needs to be reflect on the graph. We don't want to run the PerfComponent compileComponent method if we don't have to
    this.pushData = false;

    //this stores all the graph data for ACTIVE metrics (i.e. ones that should be displaying on a graph)
    this.graphData = [];

    //component holds the return value of compileComponent, that uses PerfComponentTemplate to build out the structure of our PerfComponent. I chose to do it with a template because it was more efficient than hard coding out the structure of the entire PerfComponent. Also, it makes making big changes easier -- we just modify one value in the template, and every PerfComponent will reflect those changes.
    //compiledComponent returns an array of two values, an object specific to this.RENDER and one to this.SUMMARY because they both have different structrues -- hence [0] and [1]
    let component = this.compileComponent(true);

    //use JSON.parse and JSON.stringify to deep clone, because otherwise they're all pointing to the same object. Changing the value of one PerfComponent would change the value of every PerfComponent otherwise.
    this.RENDER = JSON.parse(JSON.stringify(component[0]));
    this.SUMMARY = JSON.parse(JSON.stringify(component[1]));
    //

    this.currentlyRenderedMetrics = [];

    console.log(
      '-------------------------\n',
      '-----[Component View]----\n',
      '* New Perf Component Created *\n',
      '\tName:', this.name, '\n',
      '-------------------------\n',
    )
  }

  //This method is ONLY called in the PerfComponents constructor to create the component.
  compileComponent(isParent = false) {

    //I start out with two empty objects to build PerfComponents RENDER and SUMMARY portions.
    //these are returned at the end in an array.
    let emptyRenderTemplate = {};
    let emptySummaryTemplate = {};

    //this just helps me keep track of if we're on RENDER or SUMMARY (categories)
    let categoryTracker;

    //this for loop tracks whether or not we're focusing on RENDER or SUMMARY
    for (let i = 0; i < 4; i += 1) {
      i < 2 ? categoryTracker = 'RENDER' : categoryTracker = 'SUMMARY'
      if (categoryTracker === 'RENDER') {
        template.renderMetrics.forEach(metric => {
          if (!emptyRenderTemplate[metric]) emptyRenderTemplate[metric] = {};
          emptyRenderTemplate[metric] = template.data.RENDER

          //this assigns a random hex color to the PerfComponent. We'll eventually switch to a user selected version, but this works for now.
          if (emptyRenderTemplate[metric].colorTheme = 'Random') {
            emptyRenderTemplate[metric].colorTheme = '#' + Math.floor(Math.random() * 16777215).toString(16);
          }
        })
      }
      else if (categoryTracker === 'SUMMARY') {
        template.summaryMetrics.forEach(metric => {
          emptySummaryTemplate[metric] = {}
          emptySummaryTemplate[metric]['activeGraphs'] = template.data.SUMMARY.graphTemplate.activeGraphs;
          emptySummaryTemplate[metric] = template.data.SUMMARY.INSTANCE_GLOBAL[metric];
        });
      }
    }
    return [emptyRenderTemplate, emptySummaryTemplate];
  }

  toggleActiveMetric(category, metric, graph, graphStyle = null, color = null) {
    if (graphStyle && color) {
      this[category][metric].graphDisplay = graphStyle
      this[category][metric].colorTheme = color;
    }
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
    // console.log('[PERFCOMONENT]:',this.name,'\n',
    //   'Adding value to:', metric,'\n',
    //   'New value of data array:', this[category][metric].data,'\n'
    // )
  }

  getValue(category, metric) {
    return this[category][metric].data;
  }

  getMetricObject(category, metric) {
    return this[category][metric];
  }

  getMetricTotal(metric) {
    return this.RENDER[metric].data.reduce((acc, val) =>
      acc + val
      , 0).toFixed(2);
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
