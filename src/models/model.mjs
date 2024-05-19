"use strict"; 
import https from 'https'; 
import geoip from 'geoip-lite';
export default class Person 
{
  
  constructor(name, age, orientation, personality, desiredAge, desiredPersonality, location) {
    this.name = name;
    this.age = age;
    this.locationPromise = location; 
    this.orientation = orientation; // sexual orientation
    this.personality = personality; // introvert, extrovert, both
    this.desiredAge = desiredAge;
    this.desiredPersonality = desiredPersonality;
  }

  async getPersonLocation(){
    const location = await this.fetchPersonLocation(); 
    return location; 
  }

  fetchPersonLocation() {
    return new Promise((resolve, reject) => {
      https.get(`https://api.ipify.org?format=json`, (res) => {
        let data = '';
        console.log("chunk has been loaded"); 
        res.on('data', (chunk) => {
          data += chunk; 
        }); 

        res.on("end", () => {
          const parsedData = JSON.parse(data); 
          const geo = geoip.lookup(parsedData.ip); 
          console.log(geo.city); 
          resolve(geo.city); 
        }); 
      })
      .on("error", (err) => {
        console.log(`Error is ${err.message}`)
        reject(); 
      }); 
  })
  }
}

class Matcher 
{

  constructor() {
    // Properties
    this.locationPeopleDict = {} // key, value = location, list of people
    this.matches = {} // key, value = person, list of similar people
  }

  addPerson(person) {
    // this.allPeople.push(person);
    this.updateSimilaritiesLocation(person);
  }

  // issues solving:
  // are they catfishing?
  
  // Get similarities:
    // Check if person's location is already a key 
    //      - if it is, then add a person to the list
    //      - if not, create new key and add person there
    // Then call updateSimilaritiesField()
  updateSimilaritiesLocation(person) {
    // const location = person.locationPromise.then(location => location);
    const location = "Edmonton"
    if (location in this.locationPeopleDict) {
        this.locationPeopleDict[location].push(person);
    } else {
        this.locationPeopleDict[location] = new Array();
        this.locationPeopleDict[location].push(person); 
    }
    this.updateSimilaritiesField();
  }

    updateSimilaritiesField() {
        for (const people_list of Object.values(this.locationPeopleDict)){
            for (let i = 0; i < people_list.length; i++) { // i
                for (let j = i + 1; j < people_list.length; j++) { // j = i + 1
                  if (!this.matches[people_list[j]]) {
                    this.matches[people_list[j]] = []; // Initialize if it doesn't exist
                }
                if (!this.matches[people_list[i]]) {
                  this.matches[people_list[i]] = []; // Initialize if it doesn't exist
                }
                    if (this.areMatched(people_list[i], people_list[j])) {
                        this.matches[people_list[i]].push(people_list[j]); // add to each other's respective match lists
                        this.matches[people_list[j]].push(people_list[i]); 
                    }
                }
            }
        }
    }

    areMatched(person1, person2) {
      // TODO
      return true; 
    }

}
// write the code below my comment 
const matcher = new Matcher();
const person1 = new Person('Jake', 15, "straight", "introvert", 20, "outrovert", "Vancouver")
const person2 = new Person('Allie', 20, "straight", "outrovert", 23, "outrovert", "Edmonton")
matcher.addPerson(person1);
matcher.addPerson(person2);
// console.log(matcher.locationPeopleDict);
console.log(matcher.matches);
console.log("This is for person1: ", matcher.matches[person1]);
console.log("This is for person2: ",  matcher.matches[person2]);

  

  
