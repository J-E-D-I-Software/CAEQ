/**
 * This function will compress the image into a smaller size.
 * 
 * @param {File} file: File to resize
 * @param {Number} maxWidth: Max width of the image
 * @param {Number} maxHeight: Max height of the image
 * @returns Promise<File>: on resolve will return the resized image
 */
export const resizeImage = (file, maxWidth=1000, maxHeight=1000) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const image = new Image();
            image.src = e.target.result;

            image.onload = () => {
                const canvas = document.createElement('canvas');

                let width = image.width;
                let height = image.height;

                if (width > maxWidth || height > maxHeight) {
                    if (width > height) {
                        height = (height / width) * maxWidth;
                        width = maxWidth;
                    } else {
                        width = (width / height) * maxHeight;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    const resizedFile = new File([blob], file.name, { type: file.type });
                    resolve(resizedFile);
                }, file.type);
            };
        };

        reader.readAsDataURL(file);
    });
};
