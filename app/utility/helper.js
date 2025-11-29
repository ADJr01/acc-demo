export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function readFilesAsBinary(processedFiles) {
  const filesWithBinaryData = await Promise.all(
    processedFiles.map(async (fileObj) => {
      const file = fileObj.binary;

      // Option 1: Read as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();

      // Option 2: Read as Base64 (uncomment if needed)
      // const base64 = await fileToBase64(file);

      return {
        binary: arrayBuffer, // or base64
        type: fileObj.type,
        name: file.name,
        size: file.size,
        mimeType: file.type
      };
    })
  );

  return filesWithBinaryData;
}
