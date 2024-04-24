import{initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import{getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-991f6-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const workoutsInDB = ref(database, "workouts")


const inputField = document.getElementById("input-field")
const addButton = document.getElementById("add-button")
const exerciseList = document.getElementById("exercise-list")
const removeHint = document.getElementById("remove-hint")



addButton.addEventListener("click", function(){

    let inputValue = inputField.value
    push(workoutsInDB, inputValue)
    clearInputField()
    
    
})

onValue(workoutsInDB, function(snapshot){
    if(snapshot.exists()){
        let workoutArray = Object.entries(snapshot.val())
    exerciseList.innerHTML = ""
    removeHint.innerText = "Double Click Items to Remove!"
    for( let i=0; i < workoutArray.length; i++){
        let currentItem = workoutArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        appendItemsToExerciseList(currentItem)
   }
    } else{
        exerciseList.innerHTML= "Workout List Empty..."
        removeHint.innerText = ""
    }
    
})
    

function clearInputField(){
    inputField.value = ""
}

function appendItemsToExerciseList(exercise){
   let exerciseID = exercise[0]
   let exerciseValue = exercise[1]
   let newEl = document.createElement("li")
   newEl.textContent = exerciseValue

   newEl.addEventListener("dblclick", function(){
        let exerciseLocationInDB = ref(database, `workouts/${exerciseID}`)
        remove(exerciseLocationInDB)
   })
   exerciseList.append(newEl)
}