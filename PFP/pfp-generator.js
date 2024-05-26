var pfps = load;

console.log(pfps);

$(async function(){
    for (var i = 0; i < pfps.length; i++)
    {
        var pfp = pfps[i];
        console.log(pfp);

        var container = document.getElementById("buttoncontainer");
        var div = document.createElement("div");
        container.appendChild(div);
        await LoadPFP(div);

        var buttons = div.children;
        var button = buttons[0];
        button.id = i;

        button.getElementsByTagName("p")[0].innerHTML = "Made by " + pfp.Creator;
        button.getElementsByTagName("img")[0].src = "Images/PFP/" + pfp.Image;

        OnColourChanged();
    }
});

async function LoadPFP(container){
    return new Promise(function(resolve, reject) {
        $(container).load("PFP/pfp.html", function(){
            resolve();
        });
    })
}

function Download(id){
    var colourButtons = GetColourButtons();
    var image = pfps[id].Image.split("/").at(-1);
    window.open(`https://api.gorillaroyalevr.com/api/pfp/v1/${image}?r=${colourButtons.r}&g=${colourButtons.g}&b=${colourButtons.b}`)
}

function OnColourChanged(){
    var colourButtons = GetColourButtons();

    console.log(colourButtons);

    var elements = document.getElementsByClassName("pfp");
    for (var i = 0; i < elements.length; i++){
        var element = elements[i];
        var style = `background-color: rgb(${colourButtons.r}, ${colourButtons.g}, ${colourButtons.b})`;
        console.log(style);
        element.style.cssText = style;
    }
}

function GetColourButtons(){
    var colourButtons = {
        r: parseInt(document.getElementById("r").value),
        g: parseInt(document.getElementById("g").value),
        b: parseInt(document.getElementById("b").value)
    }

    colourButtons.r = Clamp(colourButtons.r, 9, 0);
    colourButtons.g = Clamp(colourButtons.g, 9, 0);
    colourButtons.b = Clamp(colourButtons.b, 9, 0);

    colourButtons.r = ConvertToColour(colourButtons.r, 9);
    colourButtons.g = ConvertToColour(colourButtons.g, 9);
    colourButtons.b = ConvertToColour(colourButtons.b, 9);

    colourButtons.r = Math.floor(colourButtons.r);
    colourButtons.g = Math.floor(colourButtons.g);
    colourButtons.b = Math.floor(colourButtons.b);

    if (colourButtons.r == undefined)
        colourButtons.r = 0;

    if (colourButtons.g == undefined)
        colourButtons.g = 0;

    if (colourButtons.b == undefined)
        colourButtons.b = 0;

    return colourButtons;
}

function Clamp(value, max, min){
    if (value > max)
        value = max;

    if (value < min)
        value = min;
    
    return value;
}

function ConvertToColour(value, max){
    var t = value / max;
    return t * 255;
}
