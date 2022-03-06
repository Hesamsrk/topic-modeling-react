export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
            resolve(String(reader.result))
        }, false);

        reader.readAsDataURL(file);
    })

}