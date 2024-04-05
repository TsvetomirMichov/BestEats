
export function FileToDataString(file: File) {
    return new Promise<string>((resolve, rejects) => {
        const reader = new FileReader

        reader.readAsDataURL(file)
        reader.onerror = (error) => rejects(error)
        reader.onload = () => resolve(reader.result as string )
    })
}