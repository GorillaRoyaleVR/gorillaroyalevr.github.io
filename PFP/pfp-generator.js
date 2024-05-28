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
    var colourButtons = GetColour();
    var image = pfps[id].Image.split("/").at(-1);
    window.open(`https://api.gorillaroyalevr.com/api/pfp/v1/${image}?r=${colourButtons.r}&g=${colourButtons.g}&b=${colourButtons.b}`)
}

function OnColourChanged(){
    var colourButtons = GetColour();

    console.log(colourButtons);

    var elements = document.getElementsByClassName("pfp");
    for (var i = 0; i < elements.length; i++){
        var element = elements[i];
        var style = `background-color: rgb(${colourButtons.r}, ${colourButtons.g}, ${colourButtons.b})`;
        console.log(style);
        element.style.cssText = style;
    }
}

function OnLoad(){
    var colourButtons = GetColourButtons();
    colourButtons.r.value = Math.floor(Math.random() * 9);
    colourButtons.g.value = Math.floor(Math.random() * 9);
    colourButtons.b.value = Math.floor(Math.random() * 9);
}

function GetColourButtons(){
    var colourButtons = {
        r: document.getElementById("r"),
        g: document.getElementById("g"),
        b: document.getElementById("b")
    }

    return colourButtons;
}

function GetColour(){
    var colourButtons = GetColourButtons();
    var colour = {
        r: parseInt(colourButtons.r.value),
        g: parseInt(colourButtons.g.value),
        b: parseInt(colourButtons.b.value)
    }

    colour.r = Clamp(colour.r, 9, 0);
    colour.g = Clamp(colour.g, 9, 0);
    colour.b = Clamp(colour.b, 9, 0);

    colour.r = ConvertToColour(colour.r, 9);
    colour.g = ConvertToColour(colour.g, 9);
    colour.b = ConvertToColour(colour.b, 9);

    colour.r = Math.floor(colour.r);
    colour.g = Math.floor(colour.g);
    colour.b = Math.floor(colour.b);

    if (colour.r == undefined)
        colour.r = 0;

    if (colour.g == undefined)
        colour.g = 0;

    if (colour.b == undefined)
        colour.b = 0;

    return colour;
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