import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import {action} from '@ember/object';
import AcStreamPipe from '../AgentCore/ACST/AcStreamPipe';
import BrowserID from '../utility/BrowserID';


export default class ChatService extends Service {
  @tracked interface = new AcStreamPipe(BrowserID());

  @action onFileAttach(files){

  }


}
