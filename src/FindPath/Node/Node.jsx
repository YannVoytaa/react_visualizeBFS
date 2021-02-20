import React, {Component} from 'react'

import './Node.css'

export default class Node extends Component {
  constructor(props){
    super(props);
    this.state={};
  }

  render(){
    const classGroup=this.props.start? 'start': this.props.end? 'end': '';
    const classGroup2=this.props.wall? 'wall':'';
    return (
      <div onMouseDown={()=>this.props.onMouseDown(this.props.row,this.props.col)}
           className={`node ${classGroup} ${classGroup2}`}
           id={`node-${this.props.row}-${this.props.col}`}
           onMouseEnter={()=>{if(this.props.clicked)this.props.onMouseDown(this.props.row,this.props.col)}}
           onMouseUp={()=>this.props.onMouseUp()}>
      </div>
    )
  }
}
