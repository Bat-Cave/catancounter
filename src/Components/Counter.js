import React, { useState , useEffect} from "react";
import Chart from "react-apexcharts";
import ApexCharts from 'apexcharts';


const Counter = () => {
    let [mean, setMean] = useState(0);
    let [toggleFooter, setToggleFooter] = useState(false);
    let chartOptions = {
        chart: {
            id: "Roll Chart",
            toolbar: {
              show: false
            },
            animations: {
                enabled: true,
                easing: 'easein',
                speed: 100,
                animateGradually: {
                    enabled: true,
                    delay: 0
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 50
                }
            },
            background: 'transparent',
            foreColor: '#000000',
        },
        xaxis: {
            categories: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        },
        fill: {
            colors: ['#c1262a'],
            opacity: 1,
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                type: "vertical",
                opacityFrom: 1,
                opacityTo: 0.3,
                inverseColors: false,
                colorStops: [ 
                    [
                      {
                        offset: 0,
                        color: '#c1262a',
                        opacity: 1
                      },
                      {
                        offset: 80,
                        color: '#ed7921',
                        opacity: .7
                      },
                      {
                        offset: 100,
                        color: '#ffc80b',
                        opacity: .5
                      }
                    ]
                  ]
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    position: 'bottom',
                },
                borderRadius: 4,
            },
        },
        tooltip: {
            enabled: false,
        },
        states: {
            normal: {
                filter: {
                    type: 'none',
                    value: 0,
                }
            },
            hover: {
                filter: {
                    type: 'none',
                    value: 0,
                }
            },
            active: {
                filter: {
                    type: 'none',
                    value: 0,
                }
            },
        },
        dataLabels: {
            style: {
                colors: ["#000000"]
            },
        }
    };
    let [chartSeries, setChartSeries] = useState([
        {
          name: "Rolls",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]);

    let openFooter = () => {
        let footer = document.getElementById('footer');
        if(toggleFooter){
            footer.style.top = "calc(100vh - 5px)";
            setToggleFooter(false);
        } else {
            footer.style.top = "calc(50vh - 5px)";
            setToggleFooter(true);
        }
    }

    let getMean = () => {
        let numArray = chartSeries[0].data;
        let sum = 0;
        let m = 0;
        let length = 0;
        for(let i = 0; i < numArray.length; i++){
            if(numArray[i] !== 0){
                console.log(numArray[i]);
                length++;
                sum += (i+2);
            }
        }
        console.log(sum);
        m = sum / length;
        console.log(length);
        console.log(m);
        setMean(m.toFixed(1));
    }

    let addNumber = (num) => {
        let table = document.getElementById('infoTable');
        let newrow = document.createElement('tr');
        let d = new Date();
        let hour = d.getHours();
        let minute = d.getMinutes();
        let seconds = d.getSeconds();
        let ampm = 'am';

        if(hour > 12){
            hour = hour - 12;
            ampm = 'pm'
        }

        if(hour.toString().length < 2){
            hour = `0${hour}`;
        }
        if(minute.toString().length < 2){
            minute = `0${minute}`;
        }
        if(seconds.toString().length < 2){
            seconds = `0${seconds}`;
        }

        newrow.innerHTML = `
            <td>${hour}:${minute}:${seconds} ${ampm}</td>
            <td>${num}</td>
        `;

        table.appendChild(newrow);

        let newdata = chartSeries[0].data;
        newdata[num-2] = newdata[num-2] + 1;
        let newSeries = [
            {
              name: "Rolls",
              data: newdata
            }
          ]
        setChartSeries(newSeries);
        getMean();
    }

    useEffect(() => {
        setMean(0);
    }, []);

    useEffect(() => {
        ApexCharts.exec("Roll Chart", "updateSeries", chartSeries);
    }, [chartSeries]);



    return (
        <div className='container'>
            <header>
                <h2>Catan Counter</h2>
            </header>
            <div className='info-div'>
                <Chart
                    options={chartOptions}
                    series={chartSeries}
                    type="bar"
                    width="100%"
                    height="100%"
                />
            </div>
            <div className='info-div'>
                <h3>Average: {mean}</h3>
            </div>
            <div className='info-div'>
                <table cellPadding='0' cellSpacing='0' id='infoTable'>
                    <tbody>
                        <tr>
                            <th>Time</th>
                            <th>Roll</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='info-div no-background'>
            </div>
            <footer id='footer'>
                <div className='dice-button'>
                    <button id='opener' onClick={() => openFooter()}>Add Rolls</button>
                </div>
                <div className='dice-selection'>
                    <button onClick={()=>addNumber(2)}>2</button>
                    <button onClick={()=>addNumber(3)}>3</button>
                    <button onClick={()=>addNumber(4)}>4</button>
                    <button onClick={()=>addNumber(5)}>5</button>
                    <button onClick={()=>addNumber(6)}>6</button>
                    <button onClick={()=>addNumber(7)}>7</button>
                    <button onClick={()=>addNumber(8)}>8</button>
                    <button onClick={()=>addNumber(9)}>9</button>
                    <button onClick={()=>addNumber(10)}>10</button>
                    <button onClick={()=>addNumber(11)}>11</button>
                    <button onClick={()=>addNumber(12)}>12</button>
                </div>
            </footer>
        </div>
    );
}

export default Counter;
