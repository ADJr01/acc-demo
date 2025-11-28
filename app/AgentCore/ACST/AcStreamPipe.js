import AcsObject from './AgentCoreStreamObject/AcsObject';

export default class AcStreamPipe {

  constructor(bowser_id,stream=[]) {
    this.stream_id = `browser_identity_${bowser_id}`
    this.pipeID = null;
    this.pipe = [];
  }

  addToPipe(acsobject){
    if(acsobject instanceof AcsObject){
      this.pipe.push(acsobject);
    }
  }
}
