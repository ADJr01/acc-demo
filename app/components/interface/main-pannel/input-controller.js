import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { readFilesAsBinary } from '../../../utility/helper';

export default class InterfaceMainPannelInputController extends Component {
  @tracked didFileMenuOpened=false;
  @tracked selectedFileObject = [];

  @action onFileAttachIconClick(){
    const input = document.getElementById('chat_attachment')
    if(!input)throw new Error('No File Input Found');
    input.click();
  }

  @action async onFileItemChange(event) {
    // user can only select .txt, .pdf, .doc/.docx,.xls/.xlsx or image files
    const selectedFiles = event.target.files;
    const processedFiles = [];

    // Convert FileList to Array for easier processing
    const filesArray = Array.from(selectedFiles);

    filesArray.forEach(file => {
      // Get file extension
      const fileName = file.name;
      const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();

      // Validate file type (optional, since input accept already restricts)
      const allowedExtensions = ['txt', 'pdf', 'doc', 'docx', 'xls', 'xlsx'];
      const allowedImageTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];

      const isImage = file.type.startsWith('image/') && allowedImageTypes.includes(fileExtension);
      const isAllowedDoc = allowedExtensions.includes(fileExtension);

      if (isAllowedDoc || isImage) {
        // Create the processed file object
        processedFiles.push({
          binary: file, // The actual File/Blob object
          type: fileExtension
        });
      }
    });

    // If you need to read files as binary data (ArrayBuffer or Base64)
    // Use this async approach:
    /*
    {
        binary: arrayBuffer, // or base64
        type: fileObj.type,
        name: file.name,
        size: file.size,
        mimeType: file.type,
      }
    * */

    this.selectedFileObject =  [...this.selectedFileObject,...await readFilesAsBinary(processedFiles)];
  }




}
