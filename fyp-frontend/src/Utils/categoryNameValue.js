export const categories = [
    {name:"boots", value:"Boots"},
    {name:"heels", value:"Heels"},
    {name:"loafers", value:"Loafers"},
    {name:"sandals", value:"Sandals"},
    {name:"slippers", value:"Slippers"},
    {name:"sneakers", value:"Sneakers"},
    {name:"m-button-down", value:"Men's Button Down"},
    {name:"m-formal-trousers", value:"Men's Formal Pants"},
    {name:"m-informal-pants", value:"Men's Trousers"},
    {name:"m-kurta", value:"Men's Kurta"},
    {name:"m-shalwar", value:"Men's Shalwar"},
    {name:"m-shirts", value:"Men's Shirt"},
    {name:"outerwear", value:"Outerwear"},
    {name:"w-dress", value:"Women's Dress"},
    {name:"w-dupatta", value:"Women's Dupatta"},
    {name:"w-eastern-trouser", value: "Women's Eastern Trouser"},
    {name:"w-kameez", value:"Women's Kameez"},
    {name:"w-shalwar", value:"Women's Shalwar"},
    {name:"w-western-shirt", value:"Women's Western Shirt"},
    {name:"w-western-trouser", value:"Women's Western Trousers"},
]

export const functionFindValue = (item) => {
    let result = categories.find((category) => category.name === item);
    return result ? result.value : null;
  }