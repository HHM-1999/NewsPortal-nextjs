export default async function getApi(json){
    const result= await fetch (`${process.env.NEXT_PUBLIC_API_URL + json }`);


    return result.json();
}
