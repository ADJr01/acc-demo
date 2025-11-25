import AcsInfo from './AcsInfo';
import AcsConfig from './AcsConfig';
export default class AcsObject{

  constructor(){
    this.acsConfig = new AcsConfig();
    this.acsInfo = new AcsInfo();
    this.userQuery='';
    this.assistantReply='';
  }


}
