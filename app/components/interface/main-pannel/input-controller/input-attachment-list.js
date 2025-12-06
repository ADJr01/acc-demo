import Component from '@glimmer/component';
import {action,set} from '@ember/object';

export default class InterfaceMainPannelInputControllerInputAttachmentList extends Component {
    @action deleteAttachment(attachmentIndex){
      let attachment= this.args.attachmentList;
      attachment = this.args.attachmentList.filter((item,item_index)=>item_index !== attachmentIndex)
      set(this.args,'attachmentList',attachment)
    }


}
