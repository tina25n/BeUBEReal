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
    this.locationPeopleDict = {}; // key, value = location, list of people
    this.matches = new Map(); // key, value = person, list of similar people
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
    const location = person.locationPromise;
    if (location in this.locationPeopleDict) {
        this.locationPeopleDict[location].push(person);
    } else {
        this.locationPeopleDict[location] = new Array();
        this.locationPeopleDict[location].push(person); 
    }
    this.updateSimilaritiesField(person);
  }

  updateSimilaritiesField(newPerson) {
    const people_list = this.locationPeopleDict[newPerson.locationPromise];
    for (const existingPerson of people_list) {
        if (existingPerson !== newPerson) {
          // Instantiate matches list for both people if DNE
            if (!this.matches.has(newPerson)) {
                this.matches.set(newPerson, []);
            }
            if (!this.matches.has(existingPerson)) {
                this.matches.set(existingPerson, []);
            }
            // Add to each other's matching list
            if (this.areMatched(newPerson, existingPerson)) {
                this.matches.get(newPerson).push(existingPerson);
                this.matches.get(existingPerson).push(newPerson);
            }
        }
    }
}


    areMatched(person1, person2) {
      // TODO
      return true; 
    }

}

const matcher = new Matcher();

// TESTS:

// Vancouver
const person1 = new Person('Jake', 15, "straight", "introvert", 20, "outrovert", "Vancouver")
const person2 = new Person('Bob', 29, "bisexual", "introvert", 25, "introvert", "Vancouver")
const person3 = new Person('Anne', 21, "straight", "introvert", 21, "introvert", "Vancouver")

// Edmonton
const person4 = new Person('Allie', 20, "straight", "outrovert", 23, "outrovert", "Edmonton")
const person5 = new Person('Cam', 22, "straight", "outrovert", 28, "introvert", "Edmonton")

matcher.addPerson(person1);
matcher.addPerson(person2);
matcher.addPerson(person3);
matcher.addPerson(person4);
matcher.addPerson(person5);


// console.log(matcher.locationPeopleDict);
console.log("Here are the matches: ", matcher.matches);
// console.log("This is for person1: ", matcher.matches[person1]);
// console.log("This is for person2: ",  matcher.matches[person2]);

  

  
