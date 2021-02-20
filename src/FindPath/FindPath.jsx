import React, {Component} from 'react'
import Node from './Node/Node'

import './FindPath.css'

const start_row=5,start_col=5,end_row=19,end_col=43;
const create= (row,col)=>{
  return{
    row,
    col,
    start:row==start_row&&col==start_col,
    end:row==end_row&&col==end_col,
    vis:false,
    dist:0,
    wall:false,
  };
};

export default class FindPath extends Component {
  constructor(props){
    super(props);
    this.state={
      nodes: [],
      clicked:false,
    };
  }

  componentDidMount(){
    const nodes=[];
    for(let i=0;i<25;i++){
      const row=[];
      for(let j=0;j<50;j++){
        row.push(create(i,j));
      }
    nodes.push(row);
    }
    this.setState({nodes:nodes});
  }
  visualize(){
    let queue=[];
    let grid=this.state.nodes;
    queue.push(start_row,start_col);
    let cnt=0;
    while (queue.length>0){
      let a=queue.shift();
      let b=queue.shift();
      //console.log(a,b);
      grid[a][b].vis=true;
      if (a<grid.length-1&&grid[a+1][b].wall==false&&grid[a+1][b].vis==false){
        grid[a+1][b].vis=true;
        grid[a+1][b].dist=grid[a][b].dist+1;
        queue.push(a+1,b);
      }
      if (b<grid[0].length-1&&grid[a][b+1].wall==false&&grid[a][b+1].vis==false){
        grid[a][b+1].vis=true;
        grid[a][b+1].dist=grid[a][b].dist+1;
        queue.push(a,b+1);
      }
      if (a>0&&grid[a-1][b].wall==false&&grid[a-1][b].vis==false){
        grid[a-1][b].vis=true;
        grid[a-1][b].dist=grid[a][b].dist+1;
        queue.push(a-1,b);
      }
      if (b>0&&grid[a][b-1].wall==false&&grid[a][b-1].vis==false){
        grid[a][b-1].vis=true;
        grid[a][b-1].dist=grid[a][b].dist+1;
        queue.push(a,b-1);
      }
    setTimeout(()=>document.getElementById(`node-${a}-${b}`).classList.add('node-visit'),5*cnt);
    cnt++;
    }
    let x=end_row,y=end_col;
    if(grid[x][y].vis==false)return ;
    let resq=[];
    setTimeout(()=>{
        while(x!=start_row||y!=start_col){
          //console.log(cnt);
          resq.push(x,y);
          document.getElementById(`node-${x}-${y}`).classList.add('node-shortest');
          //setTimeout(()=>document.getElementById(`node-${x}-${y}`).className='node node-shortest',20*cnt);
          cnt++;
          if(x-1>=0&&grid[x][y].dist==grid[x-1][y].dist+1)x--;
          else if(y-1>=0&&grid[x][y].dist==grid[x][y-1].dist+1)y--;
          else if(x+1<grid.length&&grid[x][y].dist==grid[x+1][y].dist+1)x++;
          else y++;
        }
      },5*cnt);
  /*setTimeout(()=>{
      while(resq.length>0){
        setTimeout(()=>{cnt++;let x=resq.shift();let y=resq.shift();console.log(x,y);document.getElementById(`node-${x}-${y}`).className='node node-shortest'},5*cnt);
      }
    },5*cnt);*/
  }
  click(row,col){
    let grid=this.state.nodes;
    grid[row][col].wall=true;
    this.setState({nodes:grid,clicked:true});
  }
  unclick(){
    this.setState({clicked:false});
  }
  reset(){
    /*for(let i=0;i<25;i++){
      for(let j=0;j<50;j++){
        document.getElementById(`node-${i}-${j}`).className='node';
      }
    }
    setTimeout(this.componentDidMount(),5000);*/
    let nodes=document.getElementsByClassName('node-visit');
    while(nodes[0]){
      nodes[0].classList.remove('node-visit')
    }
    nodes=document.getElementsByClassName('node-shortest');
    while(nodes[0]){
      nodes[0].classList.remove('node-shortest')
    }
    nodes=document.getElementsByClassName('wall');
    while(nodes[0]){
      nodes[0].classList.remove('wall')
    }
    this.componentDidMount();
  }
  render(){
    const nodes=this.state.nodes;
    return (
      <div onMouseUp={()=>this.unclick()}>
      <button onClick={()=>this.visualize()}>Visualize Bfs</button>
      <button onClick={()=>this.reset()}>Reset</button>
      <div className='grid'>
        {nodes.map((row,rowId)=>{

          return <div key={rowId} className='row'>
            {row.map((node,nodeId)=>{
              const {row,col,start,end,vis,dist,wall}=node;
              return <Node key={nodeId}
                           row={row}
                           col={col}
                           start={start}
                           end={end}
                           dist={dist}
                           vis={vis}
                           wall={wall}
                           onMouseDown={(row,col)=>this.click(row,col)}
                           onMouseUp={()=>this.unclick()}
                           clicked={this.state.clicked}></Node>
            })}
          </div>
        })}
      </div>
      </div>
    )
  }
}
