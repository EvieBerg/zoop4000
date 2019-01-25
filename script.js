var allAnimals = [];

function run(){
    var buffy = new Buffalo("buffy");
    listAnimal(buffy);
    var fifi = new Fish("fifi");
    listAnimal(fifi);
    var lolo = new Loser("lolo");
    listAnimal(lolo);
    var dog = new Doggo("dog");
    listAnimal(dog);
    var slimy = new Worm("slimy");
    listAnimal(slimy);
}

function createAnimal(name){
    var newAnimal;
    //jq fix
    switch($("#animalType").val()){
        case "buffalo":
            newAnimal = new Buffalo(name);
            break;
        case "fish":
            newAnimal = new Fish(name);
            break;
        case "loser":
            newAnimal = new Loser(name);
            break;
        case "doggo":
            newAnimal = new Doggo(name);
            break;
        case "worm":
            newAnimal = new Worm(name);
    }
    $("#stuff").html("<div>" + name + " the " + newAnimal.constructor.name + " was created</div>");
    listAnimal(newAnimal);
}

//function alert(x){
//
// }
$(document).ready(function(){
    $("#make").click(function (){
        createAnimal($("#name").val());
    });
    $("#feedThem").click(function(){
        feedAnimal($("#food").val());
    });
    $("#kill").click(function(){
        deleteAnimal($("#murder").val());
    });
    $("#changeAnName").click(function(){
        changeName($("#oldName").val(),$("#newName").val());
    });
});

function deleteAnimal(name){
    for(var i = 0; i < allAnimals.length; i++){
        if(allAnimals[i].name === name){
            $("#stuff").html("<div>" + name +  " was terminated :( </div>");
            //get rid
            allAnimals.splice(i, i);
        }
    }
    $("." + name).hide();
}

function listAnimal(animal){
    allAnimals.push(animal);
    var name = "";
    var animalType = "";
    for(var i = 0; i < allAnimals.length; i++){
        if(allAnimals[i] === animal){
            name = allAnimals[i].name;
            animalType = allAnimals[i].constructor.name;
            $("#put").append("<div class=" + name + ">" + name + " the " + animalType + "</div>");
        }
    }
}

function feedAnimal(food){
    $("#stuff").html("");
    for(var i = 0; i <  allAnimals.length; i++){
        allAnimals[i].eat(food);
    }
}

function changeName(oldName, newName){
    for(var i = 0; i < allAnimals.length; i++){
        if(oldName === allAnimals[i].name){
            allAnimals[i].name = newName;
            $("." + oldName).html("<div class=" + newName + ">" + newName + " the " + allAnimals[i].constructor.name + "</div>");
        }
    }
    //listAnimal(newName);
    $("#stuff").html("<div>" + oldName + "'s name is now " + newName);
}

class Animal {
    constructor(name,favoriteFood) {
        this.name = name;
        this.favoriteFood = favoriteFood;
    }
    sleep() {
        $("#stuff").append("<div>" + this.name + " sleeps for 8 hours</div>");
    }
    eat(food) {
        $("#stuff").append("<div>" + this.name + " eats " + food + "</div>");
        (food === this.favoriteFood) ? $("#stuff").append("<div>YUM!!! " + this.name + " wants more " + food + "</div>") : this.sleep();
    }
}

class Buffalo extends Animal{
    constructor(name) {
        super(name, "carbs");
    }
}

class Fish extends Animal{
    constructor(name) {
        super(name, "flowers");
    }
    sleep() {
        $("#stuff").append("<div>" + this.name + " sleeps in davey jones' locker!!!!!</div>");
    }
}

class Loser extends Animal{
    constructor(name){
        super(name, "meat");
    }
    sleep(){
        $("#stuff").append("<div>" + this.name + " doesnt sleep bc they are a loser</div>");
    }
}

class Doggo extends Animal{
    constructor(name){
        super(name, "banana");
    }
    eat(food){
        (food === this.favoriteFood) ? super.eat("banana") : $("#stuff").append("<div>" + this.name + " eats " + food + "</div>") +
            $("#stuff").append("<div>YUCK!!! " + this.name + " will not eat " + food + "</div>");
    }
}

class Worm extends Animal {
    constructor(name) {
        super(name, "cliff bar");
    }
    sleep() {
        console.log(this.name + " never sleeps");
    }
}
