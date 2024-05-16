import poke from "../../static/PTCG-CHS-Datasets-main/pokemon.json"
import ptcg from "../../static/PTCG-CHS-Datasets-main/ptcg_chs_infos.json"


export function getpokeAPI () {
    const pokedata = poke
    return pokedata
}

export function getptcgAPI () {
    const ptcgdata= ptcg
    return ptcgdata
}

export function requireImage(imagePath){
    return new URL('/../static/PTCG-CHS-Datasets-main/'+imagePath,import.meta.url).href;
}


export function requireCollectionImage(collectionName){
    let collectionPath = null
        for (const collection of ptcg.collections){
            if(collectionName===collection.name){
                collectionPath = collection.image
                break
            }
        }
    return new URL('/../static/PTCG-CHS-Datasets-main/'+collectionPath,import.meta.url).href;
}
