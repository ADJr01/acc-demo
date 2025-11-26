class AcsObjectProgress{
  constructor(initilProgress=0,statusMessage='') {
    this.progress = initilProgress;
    this.statusMessage = statusMessage;
  }

  setStatus(status){
    this.statusMessage = status;
  }

  setProgress(progress){
    if(typeof progress === 'number'){
      this.progress = progress;
      return
    }
    throw new Error("Progress can't be anything other than number")
  }
}

export default class AcsInfo {

  constructor(acs_object_id){
    this.acs_object_id = acs_object_id;
    this.timestamp = Date.now();
    this.completion_time= 0;
    this.progress=new AcsObjectProgress(0);
    this.queryAttachment=[];
    this.userReview=0;
  }

  setProgressPercentageOfMessage(progress){
      this.progress.setProgress(progress);
  }

  setProgressStatusOfMessage(status){
    this.progress.setStatus(status);
  }
}
