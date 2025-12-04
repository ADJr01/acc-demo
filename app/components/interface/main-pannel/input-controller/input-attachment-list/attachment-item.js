import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class InterfaceMainPannelInputControllerInputAttachmentListAttachmentItem extends Component {
  /*
{
    binary: arrayBuffer, // or base64
    type: fileObj.type,
    name: file.name,
    size: file.size,
    mimeType: file.type,
  }
* */
  @action rendered_content(element){
    const image_types = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
    if(image_types.includes(this.args.attachment.type)){
      const blob = new Blob([this.args.attachment.binary], { type: "image/png" });
      element.src= URL.createObjectURL(blob)
      return;

    }
    element.style.display='none';
    return false

  }
}
