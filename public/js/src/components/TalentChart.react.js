var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;


var Chart = require('react-chartjs');
var Bar = Chart.Bar;


var Helper = require('../utils/kompetensi.helper');
var ReportHelper  = require('../utils/report.helper');


var TalentChart = React.createClass({
    getDefaultProps: function(){
        return {
            type: "bar",
            data: ['okay']
        }
    },
    getInitialState: function(){
        return {
            data: {
                      labels: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
                      datasets: [
                          {
                              label: "My Second dataset",
                              fillColor: "rgba(151,187,205,0.5)",
                              strokeColor: "rgba(151,187,205,0.8)",
                              highlightFill: "rgba(151,187,205,0.75)",
                              highlightStroke: "rgba(151,187,205,1)",
                              data: [28,0, 48, 40, 19, 86, 27, 90]
                          }
                      ]
                  }

        }
    },
    componentDidMount: function(){
        this._processData(this.props.data);
    },
    _processData: function(data){
        var newData = {};
        var scores = this._parseKuadran(data);

        var labels = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

        var Report = new ReportHelper();
        Report.getFromClass(data);
        var bar = Report.getDataForBar();
           newData.datasets = [];

           var dataset = {
             label: "My Second dataset",
             fillColor: "rgba(151,187,205,0.5)",
             strokeColor: "rgba(151,187,205,0.8)",
             highlightFill: "rgba(151,187,205,0.75)",
             highlightStroke: "rgba(151,187,205,1)",
             data: bar
           }
           newData.labels = labels;
           newData.datasets.push(dataset);

           chart_data = newData;

    },
    _parseKuadran: function(score){
        var helper = Helper(score);
        var scores_with_kuadran;
        var component = this;
        scores_with_kuadran = score.map(function(item){
            var total_kompetensi = parseInt(item.ku) + parseInt(item.ki);
            item.rangeKompetensi = total_kompetensi > parseInt(helper.alpha_high) ? "tinggi" : parseInt(item.ku + item.ki) < parseInt(helper.alpha_low) ? "rendah" : "sedang";
            item.rangeNKP = (parseInt(item.nkp) < 75) ? "rendah" : (parseInt(item.nkp) < 90) ? "sedang" : "tinggi";
            item.kuadran = component._getKuadran(item);

            return item;
        });
        return scores_with_kuadran;
    },
    _getKuadran: function(score){
        var item = score;
        // Kuadran
        kuadran = 0;

        if(item.rangeKompetensi == "tinggi" && item.rangeNKP == "tinggi"){
            kuadran = 9
        } else if(item.rangeKompetensi == "sedang" && item.rangeNKP == "tinggi"){
            kuadran = 8
        } else if(item.rangeKompetensi == "rendah" && item.rangeNKP == "tinggi"){
            kuadran = 7
        } else if(item.rangeKompetensi == "tinggi" && item.rangeNKP == "sedang"){
            kuadran = 6
        } else if(item.rangeKompetensi == "sedang" && item.rangeNKP == "sedang"){
            kuadran = 5
        } else if(item.rangeKompetensi == "rendah" && item.rangeNKP == "sedang"){
            kuadran = 4
        } else if(item.rangeKompetensi == "tinggi" && item.rangeNKP == "rendah"){
            kuadran = 3
        } else if(item.rangeKompetensi == "sedang" && item.rangeNKP == "rendah"){
            kuadran = 2
        } else if(item.rangeKompetensi == "rendah" && item.rangeNKP == "rendah"){
            kuadran = 1
        }

        return kuadran;
    },
    render: function(){
        this._processData(this.props.data)
        return <div>

                <Bar data={chart_data} width="600" redraw/>
        </div>
    }
});

module.exports = TalentChart;