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
  get render_image(){
      const blob = new Blob([this.args.attachment.binary], { type: "image/png" });
      return URL.createObjectURL(blob);
  }

  get is_image_attachment(){
    const image_types = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
    return image_types.includes(this.args.attachment.type)
  }
}
