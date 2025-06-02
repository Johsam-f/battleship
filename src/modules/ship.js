export default function Ship(length) {
   let hits = 0;
   
   return{

    hit(){
        if(hits < length){
            hits++;
        }
    },

    is_sunk(){
        return hits >= length ;
    },

   };
  }