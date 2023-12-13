function determinePayment(durationInSec) {
   let payout
   let thirdGrade = 0.5294
   let firstGrade = 0.4286

   payout = durationInSec * ((4.08 - 0.4)/60) * firstGrade

   return payout
}

console.log(determinePayment(88)) 


