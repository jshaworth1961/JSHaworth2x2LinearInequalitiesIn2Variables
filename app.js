/*

*/


let graphCalc = undefined;
let graphCalc2 = undefined;
let linearInequality1 = undefined;

let pointsCollection1 = [];
let pointsCollection2 = [];
let qIndex = -1;
let highestIndex = -1;



let outcome = undefined;

//this method shows both graphing calculators
function start() {
    let elt = document.getElementById('calculator')

    graphCalc = Desmos.GraphingCalculator(elt,
        {
            expressionsCollapsed: true
        });

    graphCalc.updateSettings(
        {
            showGrid: true,
            projectorMode: true,
            xAxisLabel: 'x',
            yAxisLabel: 'y',
            expressions: true

        });


    let elt2 = document.getElementById('calculator2')

    graphCalc2 = Desmos.GraphingCalculator(elt2,
        {
            expressionsCollapsed: true
        });

    graphCalc2.updateSettings(
        {
            showGrid: true,
            projectorMode: true,
            xAxisLabel: 'x',
            yAxisLabel: 'y'

        });

    document.getElementById('btn-start').hidden = true;

    
    


}




function between(a, b) {
    let range = b - a + 1;
    return a + Math.floor(Math.random() * range);
}

function createPointsLine1()
{

    let point1 = { x: 0, y: 0 };
    let point2 = { x: 0, y: 0 };

    while (point1.x === point2.x && point1.y === point2.y) {
        point1.x = between(-5, 5);
        point1.y = between(-5, 5);
        point2.x = between(-5, 5);
        point2.y = between(-5, 5);
    }

    pointsLine1 = {point1,point2};
    console.log(pointsLine1);
   

    pointsCollection1.push(pointsLine1);
    console.log(pointsCollection1);

    highestIndex++;
    qIndex = highestIndex;
   

}

function createPointsLine2(highestIndex)
{
    
    let point1 = {x:0,y:0};
    let point2 = {x:0,y:0};

    

    while (point1.x === point2.x && point1.y === point2.y) {
        point1.x = between(-5, 5);
        point1.y = between(-5, 5);
        point2.x = between(-5, 5);
        point2.y = between(-5, 5);
    }

    let pointsLine2 = {point1,point2};

    pointsCollection2.push(pointsLine2);

}

function createFraction(numerator,denominator,callback)
{
    let fraction = undefined;

    let helper = graphCalc.HelperExpression(
    {
        latex: '\\gcd(' + numerator + ',' + denominator + ')'

    });


    helper.observe('numericValue',function()
    {

        
        console.log(`The numerator is ${numerator}`);
        console.log(`The denominator is ${denominator}`);

        let sign = numerator * denominator < 0 ? '-' : '';
        console.log(`sign is ${sign}`);

        //reduce fraction to lowest terms
        numerator = Math.abs(numerator/helper.numericValue);
        denominator = Math.abs(denominator/helper.numericValue);
        console.log(`The numerator with numeric value is ${numerator}`);
        console.log(`The denominator with numeric value is ${denominator}`);

        if(denominator === 1)
        {
            fraction = sign + numerator;
            console.log(`fraction is ${fraction}`);
            

        }
        else
        {
            fraction = sign + '\\frac{' + numerator + '}{' + denominator + '}';
            console.log(`fraction is ${fraction}`);
        }

        console.log(fraction);
        callback(fraction);
    });


}

function getLine1SlopeInfo(X1,Y1,X2,Y2)
{
    console.log(`Made it here into getLine1SlopeInfo`);

    let deltaYLine1 = Y2 - Y1;
    let deltaXLine1 = X2 - X1;

    let isZeroLine1 =  (deltaYLine1 === 0 && deltaXLine1 !==0);
    
    let isUndefinedLine1 = (deltaXLine1 === 0);

    //the value of the y-intercept times delta x: purpose is to not have a division calculation
    let yIntTimesDeltaXLine1 = Y1 * deltaXLine1 - X1 * deltaYLine1;

    let line1SlopeInfo = {deltaYLine1,deltaXLine1,isZeroLine1,isUndefinedLine1,yIntTimesDeltaXLine1};

    return line1SlopeInfo;
    
}

function getLine2SlopeInfo(X1,Y1,X2,Y2)
{

    let deltaYLine2 = Y2 - Y1;
    let deltaXLine2 = X2 - X1;

    let isZeroLine2 = (deltaYLine2 === 0 && deltaXLine2 !== 0);

    let isUndefinedLine2 = (deltaXLine2 === 0);

    //the value of the y-intercept times delta x: purpose is to not have a division calculation
    let yIntTimesDeltaXLine2 = Y1 * deltaXLine2 - X1 * deltaYLine2;

    let line2SlopeInfo = {deltaYLine2, deltaXLine2, isZeroLine2, isUndefinedLine2, yIntTimesDeltaXLine2};

    return line2SlopeInfo;

}

function getInequalitySign()
{
    let result = Math.floor(1 + 4 * Math.random());

    

    switch(true)
    {
        case(result===1):
        {
            inequalitySign = '<';
            break;
        }
        case(result===2):
        {
            inequalitySign = '<=';
            break;
        }
        case(result===3):
        {
            inequalitySign = '>';
            break;
        }
        case(result===4):
        {
            inequalitySign = '>=';
            break;
        }
    }

    return inequalitySign;
}

function createLinearInequality1(pointsCollection1,index)
{

    setTitle();

    let linearInequality1 = undefined;

    console.log(pointsCollection1[index])

    let firstPointX = pointsCollection1[index].point1.x
    let firstPointY = pointsCollection1[index].point1.y

    let points1String = '(' + firstPointX + ',' + firstPointY + ')';
    console.log(points1String);

    graphCalc.setExpression({ id: 'point1', latex: points1String });
    
    let secondPointX = pointsCollection1[index].point2.x
    let secondPointY = pointsCollection1[index].point2.y

    let points2String = '(' + secondPointX + ',' + secondPointY + ')';
    console.log(points2String);

    graphCalc.setExpression({ id: 'point2', latex: points2String });


    let line1SlopeInfo = getLine1SlopeInfo(firstPointX,firstPointY,secondPointX,secondPointY);
    console.log(line1SlopeInfo);


    let inequalitySign = getInequalitySign();

    if(line1SlopeInfo.isUndefinedLine1 === true)
    {
        let linearInequality = 'x ' + inequalitySign + ' ' + firstPointX;
        graphCalc.setExpression({ id: 'linearInequality1', latex: linearInequality });
    }
    else if (line1SlopeInfo.isZeroLine1 === true)
    {
        linearInequality ='y ' + inequalitySign + ' ' + firstPointY;
        graphCalc.setExpression({ id: 'linearInequality1', latex: linearInequality });
    }
    else
    {
        console.log(line1SlopeInfo.deltaYLine1);
        console.log(line1SlopeInfo.deltaXLine1);
        createFraction(line1SlopeInfo.deltaYLine1,line1SlopeInfo.deltaXLine1,function(slope)
        {
            createFraction(line1SlopeInfo.yIntTimesDeltaXLine1, line1SlopeInfo.deltaXLine1,function(yIntercept)
            {

                let linearInequality = 'y ' + inequalitySign + ' ' + slope + 'x + ' + yIntercept
                
                graphCalc.setExpression({id:'linearInequality1',latex:linearInequality});
                
                
            });

        });

        
        
        
    }
}

function createLinearInequality2(pointsCollection2, index) {
    let linearInequality2 = undefined;

    console.log(pointsCollection2[index])

    let firstPointX = pointsCollection2[index].point1.x
    let firstPointY = pointsCollection2[index].point1.y

    let points1String = '(' + firstPointX + ',' + firstPointY + ')';
    console.log(points1String);

    graphCalc.setExpression({ id: 'point3', latex: points1String });

    let secondPointX = pointsCollection2[index].point2.x
    let secondPointY = pointsCollection2[index].point2.y

    let points2String = '(' + secondPointX + ',' + secondPointY + ')';
    console.log(points2String);

    graphCalc.setExpression({ id: 'point4', latex: points2String });


    let line2SlopeInfo = getLine2SlopeInfo(firstPointX, firstPointY, secondPointX, secondPointY);
    console.log(line2SlopeInfo);


    let inequalitySign = getInequalitySign();

    if (line2SlopeInfo.isUndefinedLine2 === true) {
        let linearInequality = 'x ' + inequalitySign + ' ' + firstPointX;
        graphCalc.setExpression({ id: 'linearInequality2', latex: linearInequality });
        
    }
    else if (line2SlopeInfo.isZeroLine2 === true) {
        linearInequality = 'y ' + inequalitySign + ' ' + firstPointY;
        graphCalc.setExpression({ id: 'linearInequality2', latex: linearInequality });

    }
    else {
        console.log(line2SlopeInfo.deltaYLine2);
        console.log(line2SlopeInfo.deltaXLine2);
        createFraction(line2SlopeInfo.deltaYLine2, line2SlopeInfo.deltaXLine2, function (slope) {
            createFraction(line2SlopeInfo.yIntTimesDeltaXLine2, line2SlopeInfo.deltaXLine2, function (yIntercept) {

                let linearInequality = 'y ' + inequalitySign + ' ' + slope + 'x + ' + yIntercept

                graphCalc.setExpression({ id: 'linearInequality2', latex: linearInequality });


            });

        });




    }
}






function next() {



    graphCalc.updateSettings(
        {
            showGrid: true,
            projectorMode: true,
            xAxisLabel: 'x',
            yAxisLabel: 'y',
            expressions: false

        });



    if (highestIndex === pointsCollection1.length - 1) {
        createPointsLine1();
        createLinearInequality1(pointsCollection1,highestIndex);

        createPointsLine2();
        createLinearInequality2(pointsCollection2,highestIndex);

        
    }

}



function prev() {
    if (qIndex > 0) {
        qIndex--;
        createLinearInequality1(pointsCollection1, qIndex);
        createLinearInequality2(pointsCollection2, qIndex);
        
    }
}

function first() {
    if (pointsCollection1.length) {
        qIndex = 0;
        createLinearInequality1(pointsCollection1,0);
        createLinearInequality2(pointsCollection2,0);
        
    }
}

function last() {
    if (pointsCollection1.length) {
        qIndex = pointsCollection1.length - 1;
        createLinearInequality1(pointsCollection1, qIndex);
        createLinearInequality2(pointsCollection2, qIndex);
    }
}

function clearLines() {
    qIndex = -1;
    highestIndex = -1;
    pointsCollection1 = [];
    pointsCollection2 = [];
    setTitle();


    graphCalc.removeExpressions(
        [
            { id: 'point1' },
            { id: 'point2' },
            { id: 'point3' },
            { id: 'point4' },
            { id: 'linearInequality1' },
            { id: 'linearInequality2'}
        ]);


}




function setTitle() {
    let title = '2 x 2 Systems of Linear Inequalities: ';
    let desmosTitle = document.getElementById('desmosTitle');

    if (pointsCollection1.length) {
        title += 'Problem ' + (qIndex + 1) + ' of ' + pointsCollection1.length;
    }
    else {
        title += 'Click \'Next\' to create a new 2 x 2 system of linear inequalities problem';
    }

    desmosTitle.innerText = title;
}



function showAnswer() {

    graphCalc.updateSettings(
        {
            showGrid: true,
            projectorMode: true,
            xAxisLabel: 'x',
            yAxisLabel: 'y',
            expressions: true

        });

    clearTimeout(showAnswer);


};


