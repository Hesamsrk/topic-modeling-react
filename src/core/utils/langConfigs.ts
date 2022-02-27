export type Languages = "fa" | "en"

export type Directions = "ltr" | "rtl"

interface langConfigs {
    fontFamily: string,
    direction: Directions
}


export const getLangConfigs = (lang: Languages): langConfigs => {
    switch (lang) {
        case "fa":
            return {
                fontFamily: "IRANSans, sans-serif",
                direction: "rtl"
            }
        default:
            return {
                fontFamily: "Nunito, sans-serif",
                direction: "ltr"
            }
    }
}


export const getAnchor = (dir: Directions) => {
    return dir === "rtl" ? "Right" : "Left"
}