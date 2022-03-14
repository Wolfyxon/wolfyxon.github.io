try {
const canvas = document.getElementById("nodes");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var t0 = Date.now();
var dt = 0;



const CHUNK_SIZE = 150;
const MAX_CHUNK_X = Math.ceil(window.innerWidth / CHUNK_SIZE) + 1;
const MAX_CHUNK_Y = Math.ceil(window.innerHeight / CHUNK_SIZE) + 1;

var CHUNK_GRID = new Array();

function getAllNodes()
{
    let nodes = [];
    for (let x of CHUNK_GRID)
    {
        for (let y of x)
        {
            if (y.containedNodes.length)
                { nodes.push(...y.containedNodes); }
        }
    }
    return nodes;
}

function getAllChunksWithNodes()
{
    let chunks = [];
    for (let x of CHUNK_GRID)
    {
        for (let y of x)
        {
            if (y.containedNodes.length)
                { chunks.push(y); }
        }
    }
    return chunks;
}

function range(start, end)
{
    return [...Array(end-start+1)].map((el, ind) => ind + start);
}

class Chunk
{
    constructor(xcoord, ycoord)
    {
        this.x = xcoord;
        this.y = ycoord;
        this.containedNodes = new Array();
    }

    [Symbol.iterator]()
    {
        let i = 0;
        return {
            next: () => ({
                value: this.containedNodes[i++],
                done: i > this.containedNodes.length
            })
        };
    }

    get length()
    {
        return this.containedNodes.length;
    }

    remove(node)
    {
        this.containedNodes = this.containedNodes.filter(x => !x.equals(node))
    }
}

class Node
{
    constructor({id, xpos, ypos, modifier})
    {
        this.id = id;
        this.x = xpos;
        this.y = ypos;
        this.modifier = modifier;
        this.chunk = this.getChunkCoord();

        this.addToChunk(...this.chunk);
    }

    addMoveVector(xcomp, ycomp)
    {
        if(canvas != null && this != null){
        this.x += xcomp;
        this.y += ycomp;

        //Screenwrap
        if (this.x < 0)
            { this.x = canvas.width + (this.x % canvas.width); }

        else if (this.x > canvas.width)
            { this.x = this.x % canvas.width; }

        else if (this.y < 0)
            { this.y = canvas.height + (this.y % canvas.height); }

        else if (this.y > canvas.height)
            { this.y = this.y % canvas.height; }

        //Check if we need to move it
        let newChunk = this.getChunkCoord();
        if(newChunk != null){
        if (newChunk[0] != this.chunk[0] || newChunk[1] != this.chunk[1])
        {
            //Get old chunk and remove this from it
            let _chunk = CHUNK_GRID[this.chunk[0]][this.chunk[1]];
            if(_chunk != null && this != null){
            _chunk.remove(this);

            //Now reassign chunk and add it to the new chunk
            this.addToChunk(...newChunk);
            }
            }
        }
        }
    }

    getChunkCoord()
    {
        return [Math.ceil(this.x / CHUNK_SIZE), Math.ceil(this.y / CHUNK_SIZE)];
    }

    addToChunk(xcoord, ycoord)
    {
        if(CHUNK_GRID){
        this.chunk = [xcoord, ycoord];
        CHUNK_GRID[xcoord][ycoord].containedNodes.push(this);
        }
    }

    equals(node)
    {
        return this.id === node.id;
    }

    toString()
    {
        return `{${this.id}, x: ${this.x}, y: ${this.y}, in chunk: (${this.chunk})}`;
    }
}

class Plexus
{
    constructor({
        width=window.innerWidth,
        height=window.innerHeight,
        particleSize=2,
        lineSize=1,
        maxLineLength=300,
        particleColor="rgba(255,255,255,0.3)",
        lineColor="255,255,255",
        maxLineOpacity=0.3,
        bgInfo=null,
        amountNodes=100,
        speed=20,
    })
    {
        this.width = width;
        this.height = height;
        this.particleSize = particleSize;
        this.lineSize = lineSize;
        this.maxLineLength = maxLineLength;
        this.particleColor = particleColor;
        this.lineColor = lineColor;
        this.maxLineOpacity = maxLineOpacity;

        this.nobg = bgInfo === null;

        if (!this.nobg)
        {
            this.backgroundFrom = bgInfo.from;
            this.backgroundTo = bgInfo.to;
            this.backgroundDuration = bgInfo.duration;
        }
        else
        {
            this.backgroundFrom = null;
            this.backgroundTo = null;
            this.backgroundDuration = null;
        }

        this.amountNodes = amountNodes;
        this.speed = speed;

        this.nodeChunkRange = this.getNodeChunkRange();
        ctx.lineWidth = this.lineSize;

        this.placeNodes(this.amountNodes);
    }

    placeNodes(amountNodes)
    {
        this.nodes = [];

        for (let i=0; i < amountNodes; i++)
        {
            this.nodes.push(
                new Node({
                    id: i,
                    xpos: Math.floor(Math.random() * (canvas.width - 0 + 1)) + 0,
                    ypos: Math.floor(Math.random() * (canvas.height - 0 + 1)) + 0,
                    modifier: Math.random() * (Math.PI * 2 - 0 + 1) + 0,
                })
            )
        }
    }

    getNodeChunkRange()
    {
        return Math.ceil(this.maxLineLength / CHUNK_SIZE);
    }

    animate()
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //drawBoard();
        //Animate bg if necessary
        if (!this.nobg)
        {
            let r = Math.floor(
                ((Math.sin(Math.PI * 2 * Date.now() / this.backgroundDuration - Math.PI/2)+1)/2) * (this.backgroundFrom[0] - this.backgroundTo[0] + 1) + this.backgroundTo[0]
            );
            let g = Math.floor(
                ((Math.sin(Math.PI * 2 * Date.now() / this.backgroundDuration - Math.PI/2)+1)/2) * (this.backgroundFrom[1] - this.backgroundTo[1] + 1) + this.backgroundTo[1]
            );
            let b = Math.floor(
                ((Math.sin(Math.PI * 2 * Date.now() / this.backgroundDuration - Math.PI/2)+1)/2) * (this.backgroundFrom[2] - this.backgroundTo[2] + 1) + this.backgroundTo[2]
            );

            ctx.beginPath();
            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fill();
        }

        for (let _node of this.nodes)
        {
            if(_node == null){return}
            _node.addMoveVector(
                Math.cos(_node.modifier) * this.speed * (dt/1000.0),
                Math.sin(_node.modifier) * this.speed * (dt/1000.0)
            )

            ctx.fillStyle = this.particleColor;

            ctx.beginPath();
            ctx.arc(
                _node.x,
                _node.y,
                this.particleSize,
                0,
                Math.PI * 2,
                true
            );
            ctx.fill();

            //Now we must get all chunks that we're looking for
            //Also get the node's current chunk
            let nc = _node.chunk;

            //Now, first things first, constraints
            let xmin = nc[0] - this.nodeChunkRange;
            xmin = xmin >= 0 ? xmin : 0;
            let xmax = nc[0] + this.nodeChunkRange;
            xmax = xmax <= MAX_CHUNK_X ? xmax : MAX_CHUNK_X;
            let ymin = nc[1] - this.nodeChunkRange;
            ymin = ymin >= 0 ? ymin : 0;
            let ymax = nc[1] + this.nodeChunkRange;
            ymax = ymax <= MAX_CHUNK_Y ? ymax : MAX_CHUNK_Y;

            //Now, create the collection of nodes
            let _nodes = new Array();

            for (let i = xmin; i <= xmax; i++)
            {
                for (let j = ymin; j <= ymax; j++)
                {
                    _nodes.push(...CHUNK_GRID[i][j].containedNodes);
                }
            }

            //Draws connections between nodes
            for (let _node2 of _nodes)
            {
                let maxLineLengthSquare = Math.pow(this.maxLineLength, 2);

                let dx = Math.abs(_node.x - _node2.x);
                let dy = Math.abs(_node.y - _node2.y);

                //Skip if x or y comp is longer than the max lenght, as it'll always fail the distance calc
                if (dx > this.maxLineLength || dy > this.maxLineLength)
                    { continue; }

                let d = Math.pow(dx, 2) + Math.pow(dy, 2);
                let alpha = 0;

                if (d <= maxLineLengthSquare)
                    { alpha = this.maxLineOpacity - ((this.maxLineOpacity * d) / maxLineLengthSquare); }

                if (alpha == 0)
                    { continue; }

                ctx.strokeStyle = `rgba(${this.lineColor},${alpha})`;
                ctx.beginPath();
                ctx.moveTo(_node.x, _node.y);
                ctx.lineTo(_node2.x, _node2.y);
                ctx.stroke();
            }
        }

        dt = Date.now() - t0;
        t0 = Date.now();
    }
}

//Generate the field of chunks
for (let i of range(0, Math.ceil(window.innerWidth/CHUNK_SIZE) + 1))
{
    CHUNK_GRID[i] = new Array();
    for (let j of range(0, Math.ceil(window.innerHeight/CHUNK_SIZE) + 1))
    {
        CHUNK_GRID[i][j] = new Chunk(i, j);
    }
}

function drawBoard(){
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(2,7,159)";
    for (let x = 0; x < window.innerWidth; x += CHUNK_SIZE) {
        for (let y = 0; y < window.innerHeight; y += CHUNK_SIZE) {
           ctx.strokeRect(x, y, CHUNK_SIZE, CHUNK_SIZE);
        }
    }
}
//drawBoard();

const NodesInst = new Plexus({
    width: window.innerWidth + 150,
    height: window.innerHeight + 150,
    particleColor: "rgba(255,0,0, 0)", //"rgba(255,255,255,0.9)",
    lineColor: "255,0,0",
    particleSize: 5,
    lineSize: 1,
    amountNodes: 180,
    speed: 30,
    maxLineLength: 230,
    maxLineOpacity: 1
});

function animate() {
    NodesInst.animate();
}

const intID = setInterval(animate, 1);

window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

}
catch {
    
}