import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
// createApp(App).use(router).mount('#app');
// createApp(App).use(Element)
// createApp(App).use(Select)




// axios.get("../static/PTCG-CHS-Datasets-main/ptcg_chs_infos.json")
//     .then(response=>{
//         const appData = new Vue({
//             data:{
//                 card:response.data
//             }
//         })
//     });

//     new Vue({
//         render:h=>h(App),
//         provide:{
//             appData
//         }
//     }).$mount('#app')
    
//     .catch(error=>{
//         console.error('Error loading JSON file:',error)
//     });


// export default{
//     data(){
//         return{
//             ptcg
//         }
//     },
//     mounted(){
//         const ptcgdata = this.ptcg;
//         console.log(ptcgdata);
//     }
// }

// import pokemon from 'pokemontcgsdk'
// pokemon.configure({apiKey: '3b3bc866-2a06-4e93-860d-b0536667e078'})

// Get all cards (will take awhile, automatically pages through data)
// pokemon.card.all()
//   .then((cards) => {
//       console.log(cards[0].name) // "Blastoise"
//   })

// Get a single page of cards
// pokemon.card.where({ pageSize: 250, page: 1 })
//   .then(result => {
//       console.log(result.data[0].name) // "Blastoise"
//   })

// pokemon.card.where({ pageSize: 250, page: 1 })
//   .then(result => {
//       console.log(result.data[2]) // "Blastoise"
//   })


// // Filter cards via query parameters
// pokemon.card.all({ q: 'set.name:generations subtypes:mega' })
// .then(result => {
//     console.log(result.data[0].name) // "Venusaur"
// })

// // Order by release date (descending)
// pokemon.card.all({ q: 'subtypes:mega', orderBy: '-set.releaseDate' })
// .then(result => {
//     console.log(result.data[0].name)
// })
